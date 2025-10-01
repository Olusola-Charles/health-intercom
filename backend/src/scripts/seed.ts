import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  try {
    console.log('🌱 Starting database seeding...');

    // Clear existing data
    await prisma.appointment.deleteMany({});
    await prisma.user.deleteMany({});
    console.log('🗑️ Cleared existing data');

    // Hash password for demo users
    const hashedPassword = await bcrypt.hash('password123', 12);

    // Create sample patients
    const patient1 = await prisma.user.create({
      data: {
        email: 'patient@demo.com',
        password: hashedPassword,
        firstName: 'John',
        lastName: 'Doe',
        phone: '+1234567890',
        role: 'PATIENT',
        isVerified: true,
        dateOfBirth: new Date('1985-06-15'),
      }
    });

    const patient2 = await prisma.user.create({
      data: {
        email: 'patient2@demo.com',
        password: hashedPassword,
        firstName: 'Sarah',
        lastName: 'Johnson',
        phone: '+1234567892',
        role: 'PATIENT',
        isVerified: true,
        dateOfBirth: new Date('1990-03-22'),
      }
    });

    // Create sample doctors
    const doctor1 = await prisma.user.create({
      data: {
        email: 'doctor@demo.com',
        password: hashedPassword,
        firstName: 'Dr. Michael',
        lastName: 'Chen',
        phone: '+1234567894',
        role: 'DOCTOR',
        isVerified: true,
        specialization: 'Cardiology',
        consultationFee: 200,
        bio: 'Experienced cardiologist with over 15 years of practice.'
      }
    });

    const doctor2 = await prisma.user.create({
      data: {
        email: 'doctor2@demo.com',
        password: hashedPassword,
        firstName: 'Dr. Emily',
        lastName: 'Rodriguez',
        phone: '+1234567895',
        role: 'DOCTOR',
        isVerified: true,
        specialization: 'Pediatrics',
        consultationFee: 150,
        bio: 'Dedicated pediatrician committed to providing comprehensive care for children.'
      }
    });

    // Create admin user
    const admin = await prisma.user.create({
      data: {
        email: 'admin@demo.com',
        password: hashedPassword,
        firstName: 'Admin',
        lastName: 'User',
        phone: '+1234567897',
        role: 'ADMIN',
        isVerified: true,
      }
    });

    console.log('👥 Created users:');
    console.log(`  Patients: ${patient1.email}, ${patient2.email}`);
    console.log(`  Doctors: ${doctor1.email}, ${doctor2.email}`);
    console.log(`  Admin: ${admin.email}`);

    // Create sample appointments
    const appointment1 = await prisma.appointment.create({
      data: {
        appointmentDate: new Date(Date.now() + 86400000), // Tomorrow
        appointmentTime: '10:00',
        status: 'SCHEDULED',
        reason: 'Regular checkup',
        fee: 200,
        patientId: patient1.id,
        doctorId: doctor1.id,
        createdById: patient1.id, // Patient created the appointment
      }
    });

    const appointment2 = await prisma.appointment.create({
      data: {
        appointmentDate: new Date(Date.now() + 172800000), // Day after tomorrow
        appointmentTime: '14:30',
        status: 'CONFIRMED',
        reason: 'Follow-up consultation',
        fee: 150,
        patientId: patient2.id,
        doctorId: doctor2.id,
        createdById: patient2.id, // Patient created the appointment
      }
    });

    const appointment3 = await prisma.appointment.create({
      data: {
        appointmentDate: new Date(Date.now() - 86400000), // Yesterday
        appointmentTime: '09:00',
        status: 'COMPLETED',
        reason: 'Blood pressure check',
        fee: 200,
        patientId: patient1.id,
        doctorId: doctor1.id,
        createdById: patient1.id, // Patient created the appointment
        notes: 'Blood pressure slightly elevated, recommend lifestyle changes'
      }
    });

    console.log('📅 Created appointments:');
    console.log(`  Scheduled: ${appointment1.reason}`);
    console.log(`  Confirmed: ${appointment2.reason}`);
    console.log(`  Completed: ${appointment3.reason}`);

    console.log('\n✅ Database seeding completed successfully!');
    console.log('\n📊 Summary:');
    console.log(`   Users: 5 (2 patients, 2 doctors, 1 admin)`);
    console.log(`   Appointments: 3`);
    
    console.log('\n🔐 Demo Accounts (password: password123):');
    console.log('   Patient: patient@demo.com');
    console.log('   Doctor: doctor@demo.com');
    console.log('   Admin: admin@demo.com');

  } catch (error) {
    console.error('❌ Error seeding database:', error);
    throw error;
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });