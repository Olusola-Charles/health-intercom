import express, { Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { auth, AuthRequest } from '../middleware/auth';

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
router.post('/', auth, async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    // Check if user is a patient
    if (req.currentUser.role !== 'PATIENT') {
      res.status(403).json({
        success: false,
        message: 'Access denied. Patients only.'
      });
      return;
    }

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

// GET /api/appointments/available-slots/:doctorId - Get available time slots for a doctor
router.get('/available-slots/:doctorId', async (req: express.Request, res: express.Response): Promise<void> => {
  try {
    const { doctorId } = req.params;
    const { date } = req.query;

    if (!date) {
      res.status(400).json({
        success: false,
        message: 'Date is required'
      });
      return;
    }

    // Verify doctor exists
    const doctor = await prisma.user.findFirst({
      where: {
        id: doctorId,
        role: 'DOCTOR',
        isActive: true
      }
    });

    if (!doctor) {
      res.status(404).json({
        success: false,
        message: 'Doctor not found'
      });
      return;
    }

    // Get all booked appointments for this doctor on this date
    const bookedAppointments = await prisma.appointment.findMany({
      where: {
        doctorId: doctorId,
        appointmentDate: new Date(date as string),
        status: {
          in: ['SCHEDULED', 'CONFIRMED']
        }
      },
      select: {
        appointmentTime: true
      }
    });

    const bookedSlots = bookedAppointments.map(apt => apt.appointmentTime);

    // Define all possible time slots (customize as needed)
    const allSlots = [
      '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
      '12:00', '12:30', '14:00', '14:30', '15:00', '15:30',
      '16:00', '16:30', '17:00'
    ];

    // Filter out booked slots
    const availableSlots = allSlots.filter(slot => !bookedSlots.includes(slot));

    res.json({
      success: true,
      data: { availableSlots }
    });

  } catch (error) {
    console.error('Get available slots error:', error);
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
router.put('/:id/status', auth, async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    // Check if user is a doctor
    if (req.currentUser.role !== 'DOCTOR') {
      res.status(403).json({
        success: false,
        message: 'Access denied. Doctors only.'
      });
      return;
    }

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