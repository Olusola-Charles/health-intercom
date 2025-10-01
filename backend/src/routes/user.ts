import express, { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const router = express.Router();
const prisma = new PrismaClient();

// GET /api/users - Get all users (for testing)
router.get('/', async (req: Request, res: Response) => {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        role: true,
        specialization: true,
        isVerified: true,
        createdAt: true
      }
    });

    res.json({
      success: true,
      data: { users },
      count: users.length
    });
  } catch (error) {
    console.error('Get users error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// GET /api/users/doctors - Get all doctors
router.get('/doctors', async (req: Request, res: Response) => {
  try {
    const doctors = await prisma.user.findMany({
      where: {
        role: 'DOCTOR',
        isActive: true
      },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        specialization: true,
        consultationFee: true,
        bio: true,
        isVerified: true
      }
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

// GET /api/users/appointments - Get all appointments with user details
router.get('/appointments', async (req: Request, res: Response) => {
  try {
    const appointments = await prisma.appointment.findMany({
      include: {
        patient: {
          select: {
            firstName: true,
            lastName: true,
            email: true
          }
        },
        doctor: {
          select: {
            firstName: true,
            lastName: true,
            specialization: true
          }
        }
      },
      orderBy: {
        appointmentDate: 'asc'
      }
    });

    res.json({
      success: true,
      data: { appointments },
      count: appointments.length
    });
  } catch (error) {
    console.error('Get appointments error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

export default router;