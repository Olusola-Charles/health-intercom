import express, { Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { auth, patientOnly, doctorOnly, medicalStaffOnly, AuthRequest } from '../middleware/auth';

const router = express.Router();
const prisma = new PrismaClient();

// GET /api/appointments - Get user's appointments (requires authentication)
router.get('/', auth, async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const userId = req.user!.userId;
    const userRole = req.currentUser.role;

    let filter: any = {};

    // Filter based on user role
    if (userRole === 'PATIENT') {
      filter.patientId = userId;
    } else if (userRole === 'DOCTOR') {
      filter.doctorId = userId;
    }
    // Admin can see all appointments (no filter)

    const appointments = await prisma.appointment.findMany({
      where: filter,
      include: {
        patient: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
            phone: true
          }
        },
        doctor: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            specialization: true,
            consultationFee: true
          }
        }
      },
      orderBy: {
        appointmentDate: 'desc'
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

// POST /api/appointments - Book a new appointment (patients only)
router.post('/', patientOnly, async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { doctorId, appointmentDate, appointmentTime, reason, symptoms } = req.body;
    const patientId = req.user!.userId;

    // Validation
    if (!doctorId || !appointmentDate || !appointmentTime || !reason) {
      res.status(400).json({
        success: false,
        message: 'Doctor, date, time, and reason are required'
      });
      return;
    }

    // Verify doctor exists and is active
    const doctor = await prisma.user.findFirst({
      where: {
        id: doctorId,
        role: 'DOCTOR',
        isActive: true,
        isVerified: true
      }
    });

    if (!doctor) {
      res.status(404).json({
        success: false,
        message: 'Doctor not found or not available'
      });
      return;
    }

    // Check if appointment date is in the future
    const appointmentDateTime = new Date(appointmentDate);
    if (appointmentDateTime < new Date()) {
      res.status(400).json({
        success: false,
        message: 'Appointment date must be in the future'
      });
      return;
    }

    // Check if time slot is available
    const existingAppointment = await prisma.appointment.findFirst({
      where: {
        doctorId,
        appointmentDate: appointmentDateTime,
        appointmentTime,
        status: {
          in: ['SCHEDULED', 'CONFIRMED']
        }
      }
    });

    if (existingAppointment) {
      res.status(400).json({
        success: false,
        message: 'This time slot is already booked'
      });
      return;
    }

    // Create appointment
    const appointment = await prisma.appointment.create({
      data: {
        patientId,
        doctorId,
        appointmentDate: appointmentDateTime,
        appointmentTime,
        reason,
        symptoms: symptoms || [],
        fee: doctor.consultationFee || 0,
        status: 'SCHEDULED',
        createdById: patientId
      },
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
            specialization: true,
            consultationFee: true
          }
        }
      }
    });

    res.status(201).json({
      success: true,
      message: 'Appointment booked successfully',
      data: { appointment }
    });

  } catch (error) {
    console.error('Book appointment error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// GET /api/appointments/:id - Get specific appointment
router.get('/:id', auth, async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const appointmentId = req.params.id;
    const userId = req.user!.userId;
    const userRole = req.currentUser.role;

    const appointment = await prisma.appointment.findUnique({
      where: { id: appointmentId },
      include: {
        patient: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
            phone: true,
            dateOfBirth: true
          }
        },
        doctor: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            specialization: true,
            consultationFee: true
          }
        }
      }
    });

    if (!appointment) {
      res.status(404).json({
        success: false,
        message: 'Appointment not found'
      });
      return;
    }

    // Check if user has access to this appointment
    if (userRole === 'PATIENT' && appointment.patientId !== userId) {
      res.status(403).json({
        success: false,
        message: 'Access denied'
      });
      return;
    }

    if (userRole === 'DOCTOR' && appointment.doctorId !== userId) {
      res.status(403).json({
        success: false,
        message: 'Access denied'
      });
      return;
    }

    res.json({
      success: true,
      data: { appointment }
    });

  } catch (error) {
    console.error('Get appointment error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// PUT /api/appointments/:id/status - Update appointment status (doctors only)
router.put('/:id/status', doctorOnly, async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const appointmentId = req.params.id;
    const { status, notes } = req.body;
    const doctorId = req.user!.userId;

    if (!['CONFIRMED', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED'].includes(status)) {
      res.status(400).json({
        success: false,
        message: 'Invalid status'
      });
      return;
    }

    const appointment = await prisma.appointment.findUnique({
      where: { id: appointmentId }
    });

    if (!appointment) {
      res.status(404).json({
        success: false,
        message: 'Appointment not found'
      });
      return;
    }

    // Check if doctor owns this appointment
    if (appointment.doctorId !== doctorId) {
      res.status(403).json({
        success: false,
        message: 'Access denied'
      });
      return;
    }

    // Update appointment
    const updatedAppointment = await prisma.appointment.update({
      where: { id: appointmentId },
      data: {
        status,
        notes: notes || appointment.notes,
        checkedInAt: status === 'IN_PROGRESS' ? new Date() : appointment.checkedInAt,
        checkedOutAt: status === 'COMPLETED' ? new Date() : appointment.checkedOutAt
      },
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
      }
    });

    res.json({
      success: true,
      message: 'Appointment status updated successfully',
      data: { appointment: updatedAppointment }
    });

  } catch (error) {
    console.error('Update appointment status error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// DELETE /api/appointments/:id - Cancel appointment
router.delete('/:id', auth, async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const appointmentId = req.params.id;
    const userId = req.user!.userId;
    const userRole = req.currentUser.role;
    const { reason } = req.body;

    const appointment = await prisma.appointment.findUnique({
      where: { id: appointmentId }
    });

    if (!appointment) {
      res.status(404).json({
        success: false,
        message: 'Appointment not found'
      });
      return;
    }

    // Check if user can cancel this appointment
    if (userRole === 'PATIENT' && appointment.patientId !== userId) {
      res.status(403).json({
        success: false,
        message: 'Access denied'
      });
      return;
    }

    if (userRole === 'DOCTOR' && appointment.doctorId !== userId) {
      res.status(403).json({
        success: false,
        message: 'Access denied'
      });
      return;
    }

    // Check if appointment can be cancelled (at least 24 hours in advance)
    const appointmentDateTime = new Date(appointment.appointmentDate);
    const now = new Date();
    const timeDiff = appointmentDateTime.getTime() - now.getTime();
    const hoursDiff = timeDiff / (1000 * 3600);

    if (hoursDiff < 24 && !['ADMIN', 'DOCTOR'].includes(userRole)) {
      res.status(400).json({
        success: false,
        message: 'Appointment can only be cancelled at least 24 hours in advance'
      });
      return;
    }

    // Update appointment to cancelled
    const cancelledAppointment = await prisma.appointment.update({
      where: { id: appointmentId },
      data: {
        status: 'CANCELLED',
        cancellationReason: reason,
        cancelledAt: new Date()
      }
    });

    res.json({
      success: true,
      message: 'Appointment cancelled successfully',
      data: { appointment: cancelledAppointment }
    });

  } catch (error) {
    console.error('Cancel appointment error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

export default router; 