Health InterComm (HIC) Healthcare Management System
A comprehensive full-stack healthcare management system built with the MERN stack (MongoDB, Express.js, React.js, Node.js) featuring role-based authentication, electronic medical records (EMR), appointment booking, and multi-dashboard interfaces for different user roles.

🏥 About Health InterComm
Health InterComm (HIC) is a modern healthcare management platform that bridges the communication gap between patients and healthcare providers. Our system enables seamless interaction, efficient record management, and comprehensive care coordination.

🚀 Features
Core Features
Role-Based Authentication: Support for 6 different roles (Patient, Doctor, Nurse, Admin, Pharmacy, Lab)
Electronic Medical Records (EMR): Complete patient health records with vitals, diagnoses, medications, and lab results
Appointment Management: Smart booking system with scheduling, reminders, and status tracking
Blog System: Public-facing blog for health tips and medical information
Real-time Notifications: Socket.io integration for instant updates
Responsive Design: Mobile-first design with Tailwind CSS
Role-Specific Dashboards
👤 Patient Dashboard
View and book appointments
Access complete medical records
Manage prescriptions
View lab results
Update personal information
🩺 Doctor Dashboard
Manage patient appointments
Access patient medical records
Add diagnoses and prescriptions
View patient history
Schedule management
👩‍⚕️ Nurse Dashboard
Patient care management
Vital signs recording
Medication administration
Patient monitoring
🔧 Admin Dashboard
User management (all roles)
Hospital operations oversight
Analytics and reporting
Blog content management
System settings
💊 Pharmacy Dashboard
Prescription management
Medication inventory
Patient medication history
Prescription fulfillment
🔬 Lab Dashboard
Lab test management
Result reporting
Test scheduling
Quality control
🛠️ Technology Stack
Backend
Node.js - Runtime environment
Express.js - Web framework
MongoDB - Database
Mongoose - ODM
JWT - Authentication
bcryptjs - Password hashing
Socket.io - Real-time communication
Nodemailer - Email service
Multer & Cloudinary - File upload
Helmet - Security middleware
Frontend
React.js - UI library
React Router - Navigation
React Query - Data fetching
React Hook Form - Form handling
Tailwind CSS - Styling
Framer Motion - Animations
Chart.js - Data visualization
React Hot Toast - Notifications
React Icons - Icon library
📋 Prerequisites
Before running this application, make sure you have the following installed:

Node.js (v16.0.0 or higher)
MongoDB (v4.4 or higher)
npm or yarn package manager
🚀 Getting Started
1. Clone the Repository
bash
git clone https://github.com/yourusername/prescripto-healthcare-system.git
cd prescripto-healthcare-system
2. Install Dependencies
Install root dependencies and both backend and frontend dependencies:

bash
npm run install-deps
Or install manually:

bash
# Install root dependencies
npm install

# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
3. Environment Variables
Create a .env file in the backend directory with the following variables:

env
# Server Configuration
NODE_ENV=development
PORT=5000
CLIENT_URL=http://localhost:3000

# Database
MONGODB_URI=mongodb://localhost:27017/prescripto

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-here
JWT_EXPIRE=7d

# Email Configuration (Optional - for development)
EMAIL_FROM=noreply@prescripto.com
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_EMAIL=your-email@gmail.com
SMTP_PASSWORD=your-app-password

# Cloudinary Configuration (Optional - for image uploads)
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
4. Database Setup
Make sure MongoDB is running on your system. The application will automatically create the database and collections when you start the server.

Optionally, you can seed the database with sample data:

bash
npm run seed
5. Start the Application
Development Mode
Run both backend and frontend simultaneously:

bash
npm run dev
This will start:

Backend server on http://localhost:5000
Frontend development server on http://localhost:3000
Production Mode
Build and start the application:

bash
# Build frontend
cd frontend
npm run build

# Start backend server
cd ../backend
npm start
👥 Demo Accounts
The system comes with pre-configured demo accounts for testing different roles:

Role	Email	Password	Dashboard
Patient	patient@demo.com	password123	/patient/dashboard
Doctor	doctor@demo.com	password123	/doctor/dashboard
Admin	admin@demo.com	password123	/admin/dashboard
Nurse	nurse@demo.com	password123	/nurse/dashboard
Pharmacy	pharmacy@demo.com	password123	/pharmacy/dashboard
Lab	lab@demo.com	password123	/lab/dashboard
📁 Project Structure
prescripto-healthcare-system/
├── backend/                    # Node.js/Express backend
│   ├── config/                # Database and app configuration
│   ├── controllers/           # Route controllers
│   ├── middleware/            # Custom middleware
│   ├── models/                # Mongoose models
│   ├── routes/                # API routes
│   ├── scripts/               # Database seeding scripts
│   ├── utils/                 # Utility functions
│   └── server.js              # Entry point
├── frontend/                  # React frontend
│   ├── public/                # Static assets
│   ├── src/
│   │   ├── components/        # Reusable components
│   │   ├── contexts/          # React contexts
│   │   ├── hooks/             # Custom hooks
│   │   ├── pages/             # Page components
│   │   ├── services/          # API services
│   │   ├── utils/             # Utility functions
│   │   └── App.js             # Main app component
│   └── package.json
├── package.json               # Root package.json
└── README.md
🔐 Security Features
JWT Authentication with secure token storage
Role-based Access Control (RBAC)
Password Hashing with bcrypt
Rate Limiting to prevent abuse
Input Validation and sanitization
CORS Protection
Helmet.js for security headers
Account Lockout after failed login attempts
Email Verification for new accounts
📊 API Documentation
Authentication Endpoints
POST /api/auth/register - User registration
POST /api/auth/login - User login
GET /api/auth/me - Get current user
POST /api/auth/forgot-password - Request password reset
POST /api/auth/reset-password/:token - Reset password
POST /api/auth/verify-email/:token - Verify email address
POST /api/auth/logout - User logout
User Management
GET /api/users - Get all users (Admin only)
GET /api/users/:id - Get user by ID
PUT /api/users/profile - Update user profile
DELETE /api/users/:id - Delete user (Admin only)
Appointments
GET /api/appointments - Get user appointments
POST /api/appointments - Create new appointment
GET /api/appointments/:id - Get appointment details
PUT /api/appointments/:id - Update appointment
DELETE /api/appointments/:id - Cancel appointment
POST /api/appointments/:id/reschedule - Reschedule appointment
Medical Records
GET /api/medical-records/patient/:patientId - Get patient medical record
PUT /api/medical-records/:id/vitals - Update vital signs
POST /api/medical-records/:id/diagnosis - Add diagnosis
POST /api/medical-records/:id/medication - Add medication
POST /api/medical-records/:id/lab-result - Add lab result
Blog Management
GET /api/blog - Get all published blog posts
GET /api/blog/:slug - Get blog post by slug
POST /api/blog - Create blog post (Admin/Doctor only)
PUT /api/blog/:id - Update blog post
DELETE /api/blog/:id - Delete blog post
Doctors
GET /api/doctors - Get all active doctors
GET /api/doctors/:id - Get doctor details
GET /api/doctors/:id/availability - Get doctor availability
PUT /api/doctors/profile - Update doctor profile
Admin Operations
GET /api/admin/analytics - Get system analytics
GET /api/admin/users - Get all users with filters
PUT /api/admin/users/:id/status - Update user status
GET /api/admin/appointments - Get all appointments
GET /api/admin/reports - Generate system reports
🎨 UI/UX Features
Design System
Modern Design: Clean, professional healthcare interface
Responsive Layout: Works seamlessly on desktop, tablet, and mobile
Dark/Light Theme: Support for user preference (optional)
Accessibility: WCAG 2.1 compliant with proper ARIA labels
Loading States: Smooth loading animations and skeleton screens
Error Handling: User-friendly error messages and recovery options
User Experience
Intuitive Navigation: Role-based navigation with clear menu structure
Smart Forms: Auto-validation with helpful error messages
Search & Filters: Advanced search capabilities across all modules
Real-time Updates: Live notifications for appointments and messages
Offline Support: Basic offline functionality for critical features
Print Support: Optimized printing for medical records and reports
🧪 Testing
Running Tests
bash
# Backend tests
cd backend
npm test

# Frontend tests
cd frontend
npm test

# Run all tests
npm run test
Test Coverage
Unit tests for all utility functions
Integration tests for API endpoints
Component tests for React components
E2E tests for critical user flows
📈 Performance Optimization
Backend Optimizations
Database Indexing: Optimized MongoDB indexes for fast queries
Caching: Redis caching for frequently accessed data
Compression: Gzip compression for API responses
Rate Limiting: Prevents API abuse and ensures stability
Connection Pooling: Efficient database connection management
Frontend Optimizations
Code Splitting: Lazy loading of components and routes
Image Optimization: Responsive images with proper formats
Bundle Optimization: Tree shaking and minification
Caching Strategy: Service worker for offline functionality
Performance Monitoring: Web vitals tracking
🚀 Deployment
Environment Setup
Production Environment Variables
env
NODE_ENV=production
PORT=5000
CLIENT_URL=https://your-domain.com
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/prescripto
JWT_SECRET=your-production-jwt-secret
# ... other production variables
Deployment Options
1. Traditional VPS/Server
bash
# Clone repository
git clone <repository-url>
cd prescripto-healthcare-system

# Install dependencies
npm run install-deps

# Build frontend
cd frontend
npm run build

# Start with PM2
cd ../backend
pm2 start server.js --name prescripto-api
2. Docker Deployment
bash
# Build and run with Docker Compose
docker-compose up -d
3. Cloud Deployment
Heroku: Use the included Procfile
AWS: Deploy using Elastic Beanstalk or EC2
DigitalOcean: Use App Platform or Droplets
Vercel/Netlify: Frontend deployment with serverless functions
🔧 Configuration Options
Database Configuration
Connection Pooling: Adjust pool size based on load
Indexes: Custom indexes for performance optimization
Backup Strategy: Automated backup configuration
Replication: Master-slave setup for high availability
Email Configuration
SMTP Providers: Gmail, SendGrid, AWS SES support
Templates: Customizable email templates
Queue System: Background email processing
Delivery Tracking: Email delivery status monitoring
File Upload Configuration
Storage Options: Local storage, AWS S3, Cloudinary
File Validation: Type, size, and security checks
Image Processing: Automatic resize and optimization
CDN Integration: Fast file delivery
🤝 Contributing
We welcome contributions to the Prescripto Healthcare Management System! Please follow these guidelines:

Development Workflow
Fork the repository
Create a feature branch (git checkout -b feature/amazing-feature)
Make your changes with proper tests
Commit your changes (git commit -m 'Add amazing feature')
Push to the branch (git push origin feature/amazing-feature)
Open a Pull Request
Code Standards
ESLint: Follow the configured ESLint rules
Prettier: Code formatting is automatically applied
Commit Convention: Use conventional commits
Documentation: Update documentation for new features
Testing: Include tests for new functionality
📄 License
This project is licensed under the MIT License - see the LICENSE file for details.

🆘 Support
Documentation
API Documentation: Available at /api/docs when server is running
Component Storybook: Frontend component documentation
Database Schema: ERD available in /docs folder
Getting Help
Issues: Report bugs and feature requests on GitHub Issues
Discussions: Community discussions on GitHub Discussions
Email: Technical support at support@prescripto.com
FAQ
Q: Can I use this for a real healthcare facility?
A: This is a demo/educational project. For production use, ensure HIPAA compliance, proper security audits, and legal review.

Q: How do I add new user roles?
A: Update the User model enum, add role-specific routes, and create corresponding dashboard components.

Q: Can I customize the UI theme?
A: Yes! Update the Tailwind configuration and CSS variables to match your branding.

Q: Is this HIPAA compliant?
A: The basic security features are implemented, but full HIPAA compliance requires additional measures like audit logs, encryption at rest, and proper data handling procedures.

🔄 Changelog
Version 1.0.0 (Current)
Initial release with core functionality
Role-based authentication system
Basic EMR functionality
Appointment management
Blog system
Admin dashboard
Roadmap
 Mobile app (React Native)
 Telemedicine integration
 Payment gateway integration
 Advanced analytics
 Multi-language support
 AI-powered features
 FHIR compliance
 Integration with medical devices
🙏 Acknowledgments
React Team for the amazing frontend library
Express.js for the robust backend framework
MongoDB for the flexible database
Tailwind CSS for the utility-first CSS framework
Healthcare Community for inspiration and requirements
Open Source Contributors who make projects like this possible
Built with ❤️ for the healthcare community

For more information, visit our documentation site or check out the live demo.

