import express, { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { auth, AuthRequest } from '../middleware/auth';

const router = express.Router();
const prisma = new PrismaClient();

// GET /api/doctors - Get all verified doctors (public)
router.get('/', async (req: Request, res: Response): Promise<void> => {
  try {
    const { specialization, search } = req.query;

    const filter: any = {
      role: 'DOCTOR',
      isActive: true,
      isVerified: true
    };

    if (specialization) {
      filter.specialization = { contains: specialization as string, mode: 'insensitive' };
    }

    if (search) {
      filter.OR = [
        { firstName: { contains: search as string, mode: 'insensitive' } },
        { lastName: { contains: search as string, mode: 'insensitive' } }
      ];
    }

    const doctors = await prisma.user.findMany({
      where: filter,
      select: {
        id: true,
        firstName: true,
        lastName: true,
        specialization: true,
        consultationFee: true,
        bio: true,
        experience: true,
        rating: true,
        totalRatings: true,
        availableDays: true,
        availableTimeStart: true,
        availableTimeEnd: true
      },
      orderBy: { rating: 'desc' }
    });

    res.json({
      success: true,
      data: { doctors },
      count: doctors.length
    });
  } catch (error) {
    console.error('Get doctors error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// GET /api/doctors/:id - Get specific doctor
router.get('/:id', async (req: Request, res: Response): Promise<void> => {
  try {
    const doctor = await prisma.user.findFirst({
      where: {
        id: req.params.id,
        role: 'DOCTOR',
        isActive: true
      },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        specialization: true,
        consultationFee: true,
        bio: true,
        experience: true,
        qualifications: true,
        rating: true,
        totalRatings: true,
        availableDays: true,
        availableTimeStart: true,
        availableTimeEnd: true,
        isVerified: true
      }
    });

    if (!doctor) {
      res.status(404).json({
        success: false,
        message: 'Doctor not found'
      });
      return;
    }

    res.json({
      success: true,
      data: { doctor }
    });
  } catch (error) {
    console.error('Get doctor error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// GET /api/doctors/me/dashboard - Doctor dashboard data
router.get('/me/dashboard', auth, async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    if (req.currentUser.role !== 'DOCTOR') {
      res.status(403).json({
        success: false,
        message: 'Access denied. Doctors only.'
      });
      return;
    }

    const doctorId = req.user!.userId;

    // Get appointments statistics
    const totalAppointments = await prisma.appointment.count({
      where: { doctorId }
    });

    const upcomingAppointments = await prisma.appointment.count({
      where: {
        doctorId,
        appointmentDate: { gte: new Date() },
        status: { in: ['SCHEDULED', 'CONFIRMED'] }
      }
    });

    const completedAppointments = await prisma.appointment.count({
      where: {
        doctorId,
        status: 'COMPLETED'
      }
    });

    // Get recent appointments
    const recentAppointments = await prisma.appointment.findMany({
      where: { doctorId },
      include: {
        patient: {
          select: {
            firstName: true,
            lastName: true,
            email: true
          }
        }
      },
      orderBy: { appointmentDate: 'desc' },
      take: 5
    });

    res.json({
      success: true,
      data: {
        stats: {
          total: totalAppointments,
          upcoming: upcomingAppointments,
          completed: completedAppointments
        },
        recentAppointments
      }
    });
  } catch (error) {
    console.error('Get doctor dashboard error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

export default router;