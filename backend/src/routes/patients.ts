import express, { Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { auth, AuthRequest } from '../middleware/auth';

const router = express.Router();
const prisma = new PrismaClient();

// GET /api/patients/me/dashboard - Patient dashboard
router.get('/me/dashboard', auth, async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    if (req.currentUser.role !== 'PATIENT') {
      res.status(403).json({
        success: false,
        message: 'Access denied. Patients only.'
      });
      return;
    }

    const patientId = req.user!.userId;

    // Get upcoming appointments
    const upcomingAppointments = await prisma.appointment.findMany({
      where: {
        patientId,
        appointmentDate: { gte: new Date() },
        status: { in: ['SCHEDULED', 'CONFIRMED'] }
      },
      include: {
        doctor: {
          select: {
            firstName: true,
            lastName: true,
            specialization: true
          }
        }
      },
      orderBy: { appointmentDate: 'asc' },
      take: 5
    });

    // Get appointment history
    const appointmentHistory = await prisma.appointment.findMany({
      where: {
        patientId,
        status: 'COMPLETED'
      },
      include: {
        doctor: {
          select: {
            firstName: true,
            lastName: true,
            specialization: true
          }
        }
      },
      orderBy: { appointmentDate: 'desc' },
      take: 5
    });

    // Get stats
    const totalAppointments = await prisma.appointment.count({
      where: { patientId }
    });

    const upcomingCount = await prisma.appointment.count({
      where: {
        patientId,
        appointmentDate: { gte: new Date() },
        status: { in: ['SCHEDULED', 'CONFIRMED'] }
      }
    });

    res.json({
      success: true,
      data: {
        stats: {
          total: totalAppointments,
          upcoming: upcomingCount,
          completed: appointmentHistory.length
        },
        upcomingAppointments,
        appointmentHistory
      }
    });
  } catch (error) {
    console.error('Get patient dashboard error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// PUT /api/patients/me/profile - Update patient profile
router.put('/me/profile', auth, async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    if (req.currentUser.role !== 'PATIENT') {
      res.status(403).json({
        success: false,
        message: 'Access denied. Patients only.'
      });
      return;
    }

    const { firstName, lastName, phone, dateOfBirth, gender, bloodGroup } = req.body;

    const updatedUser = await prisma.user.update({
      where: { id: req.user!.userId },
      data: {
        firstName,
        lastName,
        phone,
        dateOfBirth: dateOfBirth ? new Date(dateOfBirth) : undefined,
        gender,
        bloodGroup
      },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        phone: true,
        dateOfBirth: true,
        gender: true,
        bloodGroup: true,
        role: true
      }
    });

    res.json({
      success: true,
      message: 'Profile updated successfully',
      data: { user: updatedUser }
    });
  } catch (error) {
    console.error('Update profile error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

export default router;