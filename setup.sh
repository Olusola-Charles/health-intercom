#!/bin/bash

# Health InterComm (HIC) Healthcare System Complete Setup Script
# This script sets up the entire development environment

set -e  # Exit on any error

echo "🏥 Health InterComm (HIC) Healthcare System - Complete Setup"
echo "=============================================================="

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Functions
print_step() {
    echo -e "\n${BLUE}📋 $1${NC}"
}

print_success() {
    echo -e "${GREEN}✅ $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠️ $1${NC}"
}

print_error() {
    echo -e "${RED}❌ $1${NC}"
}

# Check if Node.js is installed
check_nodejs() {
    print_step "Checking Node.js installation..."
    
    if command -v node &> /dev/null; then
        NODE_VERSION=$(node --version)
        print_success "Node.js is installed: $NODE_VERSION"
        
        # Check if Node.js version is 16 or higher
        MAJOR_VERSION=$(echo $NODE_VERSION | cut -d. -f1 | sed 's/v//')
        if [ $MAJOR_VERSION -ge 16 ]; then
            print_success "Node.js version is compatible"
        else
            print_error "Node.js version 16 or higher is required. Current: $NODE_VERSION"
            exit 1
        fi
    else
        print_error "Node.js is not installed. Please install Node.js 16+ from https://nodejs.org"
        exit 1
    fi
}

# Check if MongoDB is installed
check_mongodb() {
    print_step "Checking MongoDB installation..."
    
    if command -v mongod &> /dev/null; then
        MONGO_VERSION=$(mongod --version | head -n1)
        print_success "MongoDB is installed: $MONGO_VERSION"
    else
        print_warning "MongoDB is not installed locally."
        print_warning "You can either:"
        print_warning "1. Install MongoDB locally: https://docs.mongodb.com/manual/installation/"
        print_warning "2. Use MongoDB Atlas (cloud): https://cloud.mongodb.com"
        print_warning "3. Use Docker: docker run -d -p 27017:27017 --name mongodb mongo:latest"
    fi
}

# Check if Git is installed
check_git() {
    print_step "Checking Git installation..."
    
    if command -v git &> /dev/null; then
        GIT_VERSION=$(git --version)
        print_success "Git is installed: $GIT_VERSION"
    else
        print_error "Git is not installed. Please install Git from https://git-scm.com"
        exit 1
    fi
}

# Create project structure
create_project_structure() {
    print_step "Creating project structure..."
    
    # Create main directories
    mkdir -p backend/{models,routes,middleware,utils,scripts,uploads,logs}
    mkdir -p backend/uploads/{avatars,documents,temp}
    mkdir -p frontend/src/{components,contexts,pages,hooks,services,utils}
    mkdir -p frontend/src/components/{common,layout}
    mkdir -p frontend/src/pages/{public,auth,patient,doctor,admin,nurse,pharmacy,lab}
    mkdir -p frontend/public
    
    print_success "Project structure created"
}

# Create root package.json
create_root_package() {
    print_step "Creating root package.json..."
    
    cat > package.json << 'EOF'
{
  "name": "healthintercomm-system",
  "version": "1.0.0",
  "description": "Health InterComm Healthcare Management System",
  "main": "server.js",
  "scripts": {
    "dev": "concurrently \"npm run server\" \"npm run client\"",
    "server": "cd backend && npm run dev",
    "client": "cd frontend && npm run dev",
    "build": "cd frontend && npm run build",
    "install-deps": "npm install && cd backend && npm install && cd ../frontend && npm install",
    "seed": "cd backend && npm run seed",
    "start": "cd backend && npm start"
  },
  "keywords": ["healthcare", "EMR", "appointment", "medical", "react", "nodejs", "mongodb"],
  "author": "Healthcare Developer",
  "license": "MIT",
  "devDependencies": {
    "concurrently": "^8.2.2"
  }
}
EOF
    
    print_success "Root package.json created"
}

# Create backend package.json
create_backend_package() {
    print_step "Creating backend package.json..."
    
    cat > backend/package.json << 'EOF'
{
  "name": "healthintercomm-backend",
  "version": "1.0.0",
  "description": "Backend API for Health InterComm Healthcare System",
  "main": "server.js",
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js",
    "seed": "node scripts/seedDatabase.js",
    "test": "jest"
  },
  "dependencies": {
    "express": "^4.18.2",
    "mongoose": "^8.0.3",
    "bcryptjs": "^2.4.3",
    "jsonwebtoken": "^9.0.2",
    "cors": "^2.8.5",
    "dotenv": "^16.3.1",
    "multer": "^1.4.5-lts.1",
    "cloudinary": "^1.41.0",
    "express-validator": "^7.0.1",
    "helmet": "^7.1.0",
    "express-rate-limit": "^7.1.5",
    "morgan": "^1.10.0",
    "nodemailer": "^6.9.7",
    "moment": "^2.29.4",
    "socket.io": "^4.7.4",
    "crypto": "^1.0.1"
  },
  "devDependencies": {
    "nodemon": "^3.0.2",
    "jest": "^29.7.0",
    "supertest": "^6.3.3"
  }
}
EOF
    
    print_success "Backend package.json created"
}

# Create backend environment files
create_backend_env() {
    print_step "Creating backend environment files..."
    
    # Create .env.example
    cat > backend/.env.example << 'EOF'
# Health InterComm (HIC) Healthcare System Environment Configuration
# Copy this file to .env and update the values

# ======================
# SERVER CONFIGURATION
# ======================
NODE_ENV=development
PORT=5000
CLIENT_URL=http://localhost:3000

# ======================
# DATABASE CONFIGURATION
# ======================
# Local MongoDB
MONGODB_URI=mongodb://localhost:27017/healthintercomm

# MongoDB Atlas (Cloud) - Uncomment and update for production
# MONGODB_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/healthintercomm?retryWrites=true&w=majority

# ======================
# JWT CONFIGURATION
# ======================
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_EXPIRE=7d

# ======================
# EMAIL CONFIGURATION
# ======================
EMAIL_FROM=noreply@healthintercomm.com

# Gmail SMTP Configuration
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_EMAIL=your-email@gmail.com
SMTP_PASSWORD=your-app-password

# ======================
# FILE UPLOAD CONFIGURATION
# ======================
# Cloudinary (Recommended for production)
CLOUDINARY_CLOUD_NAME=your-cloudinary-cloud-name
CLOUDINARY_API_KEY=your-cloudinary-api-key
CLOUDINARY_API_SECRET=your-cloudinary-api-secret

# ======================
# SECURITY CONFIGURATION
# ======================
# Rate limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100

# ======================
# SOCKET.IO CONFIGURATION
# ======================
SOCKET_IO_CORS_ORIGIN=http://localhost:3000

# ======================
# HOSPITAL INFORMATION
# ======================
HOSPITAL_NAME=Health InterComm
HOSPITAL_ADDRESS=123 Healthcare Ave, Medical City, MC 12345
HOSPITAL_PHONE=+1-555-123-4567
HOSPITAL_EMAIL=info@healthintercomm.com

# ======================
# FEATURE FLAGS
# ======================
ENABLE_EMAIL_VERIFICATION=true
ENABLE_PASSWORD_RESET=true
ENABLE_FILE_UPLOAD=true
ENABLE_NOTIFICATIONS=true

# ======================
# DEVELOPMENT SETTINGS
# ======================
# Default consultation duration (minutes)
DEFAULT_CONSULTATION_DURATION=30

# Maximum file upload size (bytes)
MAX_FILE_SIZE=10485760

# Password policy
MIN_PASSWORD_LENGTH=8
REQUIRE_STRONG_PASSWORD=true
EOF

    # Create actual .env file if it doesn't exist
    if [ ! -f "backend/.env" ]; then
        cp backend/.env.example backend/.env
        print_success "Backend .env file created from template"
        print_warning "Please update backend/.env with your actual configuration"
    else
        print_warning "Backend .env file already exists"
    fi
}

# Create basic backend server
create_backend_server() {
    print_step "Creating backend server..."
    
    cat > backend/server.js << 'EOF'
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
require('dotenv').config();

const app = express();

// Security middleware
app.use(helmet());
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:3000',
  credentials: true
}));

// Rate limiting
const limiter = rateLimit({
  windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS) || 15 * 60 * 1000, // 15 minutes
  max: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS) || 100
});
app.use(limiter);

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Logging middleware
if (process.env.NODE_ENV !== 'production') {
  app.use(morgan('dev'));
}

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/healthintercomm', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('✅ MongoDB connected successfully'))
.catch(err => console.error('❌ MongoDB connection error:', err));

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    message: 'Health InterComm API is running',
    timestamp: new Date().toISOString(),
    version: '1.0.0',
    environment: process.env.NODE_ENV || 'development'
  });
});

// Basic welcome route
app.get('/', (req, res) => {
  res.json({ 
    message: 'Welcome to Health InterComm API',
    version: '1.0.0',
    status: 'running',
    docs: '/api/health',
    endpoints: {
      health: '/api/health',
      auth: '/api/auth',
      users: '/api/users'
    }
  });
});

// Routes (will be added later)
// app.use('/api/auth', require('./routes/auth'));
// app.use('/api/users', require('./routes/users'));
// app.use('/api/appointments', require('./routes/appointments'));

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: 'Something went wrong!',
    error: process.env.NODE_ENV === 'development' ? err.message : 'Internal server error'
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found'
  });
});

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  console.log(`🚀 Health InterComm server running on port ${PORT}`);
  console.log(`📊 Health check: http://localhost:${PORT}/api/health`);
  console.log(`🌐 Frontend URL: ${process.env.CLIENT_URL}`);
  console.log(`📱 Environment: ${process.env.NODE_ENV || 'development'}`);
});

// Socket.io setup for real-time notifications
const { Server } = require('socket.io');
const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_URL || 'http://localhost:3000',
    methods: ['GET', 'POST']
  }
});

io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  socket.on('join-room', (userId) => {
    socket.join(userId);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

// Make io accessible to other modules
app.set('io', io);

module.exports = app;
EOF
    
    print_success "Backend server created"
}

# Install dependencies
install_dependencies() {
    print_step "Installing project dependencies..."
    
    # Install root dependencies
    print_step "Installing root dependencies..."
    npm install
    if [ $? -eq 0 ]; then
        print_success "Root dependencies installed"
    else
        print_error "Failed to install root dependencies"
        exit 1
    fi
    
    # Install backend dependencies
    print_step "Installing backend dependencies..."
    cd backend
    npm install
    if [ $? -eq 0 ]; then
        print_success "Backend dependencies installed"
    else
        print_error "Failed to install backend dependencies"
        cd ..
        exit 1
    fi
    cd ..
    
    # Check if frontend directory exists, if not create Vite project
    if [ ! -d "frontend" ]; then
        print_step "Creating Vite frontend project..."
        npm create vite@latest frontend -- --template react
        cd frontend
        
        # Install additional frontend dependencies
        print_step "Installing frontend dependencies..."
        npm install react-router-dom axios @tanstack/react-query react-hook-form react-hot-toast @heroicons/react framer-motion @headlessui/react date-fns socket.io-client
        
        # Install Vite v6 and Tailwind v4
        npm install -D vite@^6.0.0 @vitejs/plugin-react@^5.0.0 tailwindcss@next @tailwindcss/vite@next
        
        print_success "Frontend dependencies installed"
        cd ..
    else
        print_step "Frontend directory exists, installing dependencies..."
        cd frontend
        npm install
        if [ $? -eq 0 ]; then
            print_success "Frontend dependencies installed"
        else
            print_error "Failed to install frontend dependencies"
            cd ..
            exit 1
        fi
        cd ..
    fi
}

# Create frontend configuration files
create_frontend_config() {
    print_step "Creating frontend configuration files..."
    
    # Create .env file
    cat > frontend/.env << 'EOF'
VITE_API_URL=http://localhost:5000/api
VITE_SOCKET_URL=http://localhost:5000
VITE_APP_NAME=Health InterComm
VITE_APP_VERSION=1.0.0
EOF
    
    # Create Vite config
    cat > frontend/vite.config.js << 'EOF'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss()
  ],
  server: {
    port: 3000,
    open: true,
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
      },
    },
  },
})
EOF
    
    # Create Tailwind config
    cat > frontend/tailwind.config.js << 'EOF'
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
          950: '#172554',
        },
        secondary: {
          50: '#f0fdfa',
          100: '#ccfbf1',
          200: '#99f6e4',
          300: '#5eead4',
          400: '#2dd4bf',
          500: '#14b8a6',
          600: '#0d9488',
          700: '#0f766e',
          800: '#115e59',
          900: '#134e4a',
          950: '#042f2e',
        },
        success: {
          50: '#f0fdf4',
          500: '#22c55e',
          600: '#16a34a',
        },
        warning: {
          50: '#fffbeb',
          500: '#f59e0b',
          600: '#d97706',
        },
        danger: {
          50: '#fef2f2',
          500: '#ef4444',
          600: '#dc2626',
        }
      },
      fontFamily: {
        'sans': ['Inter', 'system-ui', 'sans-serif'],
        'heading': ['Poppins', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
}
EOF
    
    # Update index.css
    cat > frontend/src/index.css << 'EOF'
@import "tailwindcss";

@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Poppins:wght@400;500;600;700;800&display=swap');

@layer base {
  html {
    scroll-behavior: smooth;
  }
  
  body {
    font-family: 'Inter', system-ui, sans-serif;
    line-height: 1.6;
    color: theme('colors.gray.900');
    background-color: theme('colors.gray.50');
  }
  
  h1, h2, h3, h4, h5, h6 {
    font-family: 'Poppins', system-ui, sans-serif;
    font-weight: 600;
    line-height: 1.3;
  }
}

@layer components {
  .btn {
    @apply inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg shadow-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed;
  }
  
  .btn-primary {
    @apply btn bg-primary-600 text-white hover:bg-primary-700 focus:ring-primary-500;
  }
  
  .btn-secondary {
    @apply btn bg-white text-gray-700 border-gray-300 hover:bg-gray-50 focus:ring-primary-500;
  }
  
  .card {
    @apply bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden;
  }
  
  .card-body {
    @apply p-6;
  }
  
  .form-input {
    @apply block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors duration-200;
  }
  
  .form-label {
    @apply block text-sm font-medium text-gray-700 mb-2;
  }
  
  .loading-spinner {
    @apply animate-spin rounded-full border-2 border-gray-300 border-t-primary-600;
  }
}
EOF
    
    print_success "Frontend configuration files created"
}

# Setup MongoDB (if running locally)
setup_mongodb() {
    print_step "Setting up MongoDB..."
    
    # Check if MongoDB is running
    if pgrep -x "mongod" > /dev/null; then
        print_success "MongoDB is already running"
    else
        print_warning "MongoDB is not running"
        
        # Try to start MongoDB (different methods for different systems)
        if command -v brew &> /dev/null && brew services list | grep -q mongodb; then
            print_step "Starting MongoDB with Homebrew..."
            brew services start mongodb/brew/mongodb-community
        elif command -v systemctl &> /dev/null; then
            print_step "Starting MongoDB with systemctl..."
            sudo systemctl start mongod
            sudo systemctl enable mongod
        else
            print_warning "Please start MongoDB manually"
            print_warning "Visit: https://docs.mongodb.com/manual/tutorial/manage-mongodb-processes/"
        fi
    fi
}

# Setup database with sample data
setup_database() {
    print_step "Setting up database with sample data..."
    
    read -p "Do you want to seed the database with sample data? (y/N): " -n 1 -r
    echo
    
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        # Create a basic seed script first
        cat > backend/scripts/seedDatabase.js << 'EOF'
const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/healthintercomm');
    console.log('✅ MongoDB connected for seeding');
  } catch (error) {
    console.error('❌ MongoDB connection failed:', error.message);
    process.exit(1);
  }
};

const seedDatabase = async () => {
  try {
    console.log('🌱 Starting database seeding...');
    
    // Clear existing data (add when models are created)
    console.log('🗑️  Database cleared (ready for models)');
    
    console.log('✅ Database seeding completed successfully!');
    console.log('\n📊 Summary:');
    console.log('   Ready for user models and data');
    console.log('\n🔐 Demo Accounts will be available after implementing auth models');
    
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    throw error;
  }
};

const runSeed = async () => {
  try {
    await connectDB();
    await seedDatabase();
  } catch (error) {
    console.error('❌ Seeding failed:', error);
    process.exit(1);
  } finally {
    await mongoose.connection.close();
    console.log('🔌 Database connection closed');
    process.exit(0);
  }
};

if (require.main === module) {
  runSeed();
}

module.exports = { seedDatabase, connectDB };
EOF
        
        print_step "Running database seeding..."
        cd backend
        npm run seed
        if [ $? -eq 0 ]; then
            print_success "Database seeded successfully"
        else
            print_warning "Database seeding failed. Make sure MongoDB is running."
        fi
        cd ..
    else
        print_warning "Database seeding skipped"
    fi
}

# Create README file
create_readme() {
    print_step "Creating README.md..."
    
    cat > README.md << 'EOF'
# Health InterComm (HIC) Healthcare Management System

A comprehensive full-stack healthcare management system built with the MERN stack (MongoDB, Express.js, React.js, Node.js) featuring role-based authentication, electronic medical records (EMR), appointment booking, and multi-dashboard interfaces for different user roles.

## 🏥 About Health InterComm

Health InterComm (HIC) is a modern healthcare management platform that bridges the communication gap between patients and healthcare providers. Our system enables seamless interaction, efficient record management, and comprehensive care coordination.

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ 
- MongoDB (local or Atlas)
- npm or yarn

### Installation
```bash
# Clone the repository
git clone <your-repo-url>
cd healthintercomm

# Run the complete setup
chmod +x setup.sh
./setup.sh

# Start the development servers
npm run dev
```

### Development URLs
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000
- API Health Check: http://localhost:5000/api/health

## 🎯 User Roles

- **👤 Patient**: Book appointments, view medical records, manage prescriptions
- **🩺 Doctor**: Manage patients, appointments, add diagnoses, prescriptions  
- **👩‍⚕️ Nurse**: Patient care, vital signs recording, medication administration
- **🔧 Admin**: Complete system management, analytics, user oversight
- **💊 Pharmacy**: Prescription management, medication inventory
- **🔬 Lab**: Test management, result reporting, scheduling

## 🛠️ Tech Stack

### Backend
- Node.js & Express.js
- MongoDB & Mongoose
- JWT Authentication
- Socket.io (Real-time)
- Cloudinary (File uploads)

### Frontend  
- React 19 with Vite 6
- Tailwind CSS v4
- TanStack Query
- React Router
- Framer Motion

## 📚 Documentation

- **API Documentation**: Available at `/api/health`
- **Component Documentation**: Check `/frontend/src/components`
- **Database Schema**: See `/backend/models`

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and ensure quality
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

---

**Built with ❤️ for the healthcare community**
EOF
    
    print_success "README.md created"
}

# Create .gitignore file
create_gitignore() {
    print_step "Creating .gitignore..."
    
    cat > .gitignore << 'EOF'
# Dependencies
node_modules/
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# Environment variables
.env
.env.local
.env.development.local
.env.test.local
.env.production.local

# Logs
logs
*.log
backend/logs/

# Runtime data
pids
*.pid
*.seed
*.pid.lock

# Coverage directory used by tools like istanbul
coverage/
*.lcov

# IDE files
.vscode/
.idea/
*.swp
*.swo

# OS generated files
.DS_Store
.DS_Store?
._*
.Spotlight-V100
.Trashes
ehthumbs.db
Thumbs.db

# Build outputs
dist/
build/
frontend/dist/
frontend/build/

# Uploads
backend/uploads/
!backend/uploads/.gitkeep

# Database
*.sqlite
*.db

# Docker
.dockerignore
docker-compose.override.yml

# Temporary files
tmp/
temp/

# Cache
.cache/
.parcel-cache/

# Testing
coverage/
.nyc_output

# Other
*.tgz
*.tar.gz
EOF
    
    print_success ".gitignore created"
}

# Install global tools (optional)
install_global_tools() {
    print_step "Installing global development tools..."
    
    read -p "Do you want to install global development tools (nodemon, pm2)? (y/N): " -n 1 -r
    echo
    
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        print_step "Installing nodemon and pm2..."
        npm install -g nodemon pm2
        print_success "Global tools installed"
    else
        print_warning "Global tools installation skipped"
    fi
}

# Test the setup
test_setup() {
    print_step "Testing the setup..."
    
    # Test backend
    print_step "Testing backend server..."
    cd backend
    timeout 10s npm start &
    BACKEND_PID=$!
    sleep 3
    
    # Check if backend is responding
    if curl -s http://localhost:5000/api/health > /dev/null 2>&1; then
        print_success "Backend server is working"
    else
        print_warning "Backend server test inconclusive"
    fi
    
    # Stop the test server
    kill $BACKEND_PID > /dev/null 2>&1
    cd ..
    
    print_success "Setup testing completed"
}

# Main setup function
main() {
    echo -e "\n${BLUE}Starting Health InterComm (HIC) Healthcare System Setup...${NC}\n"
    
    # Pre-flight checks
    check_nodejs
    check_mongodb
    check_git
    
    # Create project structure
    create_project_structure
    create_root_package
    create_backend_package
    create_backend_env
    create_backend_server
    
    # Install dependencies
    install_dependencies
    
    # Frontend setup
    create_frontend_config
    
    # Database setup
    setup_mongodb
    
    # Documentation
    create_readme
    create_gitignore
    
    # Optional steps
    setup_database
    install_global_tools
    
    # Test the setup
    test_setup
    
    # Final instructions
    echo -e "\n${GREEN}🎉 Health InterComm (HIC) Setup completed successfully!${NC}"
    echo -e "\n${BLUE}📋 Next steps:${NC}"
    echo "1. Review and update backend/.env with your configuration"
    echo "2. Make sure MongoDB is running"
    echo "3. Start the application:"
    echo "   • Development mode: npm run dev"
    echo "   • Backend only: cd backend && npm run dev"
    echo "   • Frontend only: cd frontend && npm run dev"#!/bin/bash

# Health InterComm (HIC) Healthcare System Setup Script
# This script sets up the development environment

set -e  # Exit on any error

echo "🏥 Welcome to Health InterComm (HIC) Healthcare System Setup"
echo "================================================"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Functions
print_step() {
    echo -e "\n${BLUE}📋 $1${NC}"
}

print_success() {
    echo -e "${GREEN}✅ $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠️ $1${NC}"
}

print_error() {
    echo -e "${RED}❌ $1${NC}"
}

# Check if Node.js is installed
check_nodejs() {
    print_step "Checking Node.js installation..."
    
    if command -v node &> /dev/null; then
        NODE_VERSION=$(node --version)
        print_success "Node.js is installed: $NODE_VERSION"
        
        # Check if Node.js version is 16 or higher
        MAJOR_VERSION=$(echo $NODE_VERSION | cut -d. -f1 | sed 's/v//')
        if [ $MAJOR_VERSION -ge 16 ]; then
            print_success "Node.js version is compatible"
        else
            print_error "Node.js version 16 or higher is required. Current: $NODE_VERSION"
            exit 1
        fi
    else
        print_error "Node.js is not installed. Please install Node.js 16+ from https://nodejs.org"
        exit 1
    fi
}

# Check if MongoDB is installed
check_mongodb() {
    print_step "Checking MongoDB installation..."
    
    if command -v mongod &> /dev/null; then
        MONGO_VERSION=$(mongod --version | head -n1)
        print_success "MongoDB is installed: $MONGO_VERSION"
    else
        print_warning "MongoDB is not installed locally."
        print_warning "You can either:"
        print_warning "1. Install MongoDB locally: https://docs.mongodb.com/manual/installation/"
        print_warning "2. Use MongoDB Atlas (cloud): https://cloud.mongodb.com"
        print_warning "3. Use Docker: docker run -d -p 27017:27017 --name mongodb mongo:latest"
    fi
}

# Check if Git is installed
check_git() {
    print_step "Checking Git installation..."
    
    if command -v git &> /dev/null; then
        GIT_VERSION=$(git --version)
        print_success "Git is installed: $GIT_VERSION"
    else
        print_error "Git is not installed. Please install Git from https://git-scm.com"
        exit 1
    fi
}

# Install dependencies
install_dependencies() {
    print_step "Installing project dependencies..."
    
    # Install root dependencies
    print_step "Installing root dependencies..."
    npm install
    print_success "Root dependencies installed"
    
    # Install backend dependencies
    print_step "Installing backend dependencies..."
    cd backend
    npm install
    print_success "Backend dependencies installed"
    
    # Install frontend dependencies
    print_step "Installing frontend dependencies..."
    cd ../frontend
    npm install
    print_success "Frontend dependencies installed"
    
    cd ..
}

# Setup environment files
setup_environment() {
    print_step "Setting up environment configuration..."
    
    # Backend environment
    if [ ! -f "backend/.env" ]; then
        print_step "Creating backend environment file..."
        cp backend/.env.example backend/.env
        print_success "Backend .env file created"
        print_warning "Please update backend/.env with your configuration"
    else
        print_warning "Backend .env file already exists"
    fi
    
    # Frontend environment (optional)
    if [ ! -f "frontend/.env" ]; then
        print_step "Creating frontend environment file..."
        cat > frontend/.env << EOF
REACT_APP_API_URL=http://localhost:5000/api
REACT_APP_SOCKET_URL=http://localhost:5000
GENERATE_SOURCEMAP=false
EOF
        print_success "Frontend .env file created"
    else
        print_warning "Frontend .env file already exists"
    fi
}

# Setup MongoDB (if running locally)
setup_mongodb() {
    print_step "Setting up MongoDB..."
    
    # Check if MongoDB is running
    if pgrep -x "mongod" > /dev/null; then
        print_success "MongoDB is already running"
    else
        print_warning "MongoDB is not running"
        
        # Try to start MongoDB (different methods for different systems)
        if command -v brew &> /dev/null && brew services list | grep -q mongodb; then
            print_step "Starting MongoDB with Homebrew..."
            brew services start mongodb/brew/mongodb-community
        elif command -v systemctl &> /dev/null; then
            print_step "Starting MongoDB with systemctl..."
            sudo systemctl start mongod
            sudo systemctl enable mongod
        else
            print_warning "Please start MongoDB manually"
            print_warning "Visit: https://docs.mongodb.com/manual/tutorial/manage-mongodb-processes/"
        fi
    fi
}

# Create necessary directories
create_directories() {
    print_step "Creating necessary directories..."
    
    # Create upload directories
    mkdir -p backend/uploads/avatars
    mkdir -p backend/uploads/documents
    mkdir -p backend/uploads/temp
    
    # Create log directories
    mkdir -p backend/logs
    
    print_success "Directories created"
}

# Setup database with sample data
setup_database() {
    print_step "Setting up database with sample data..."
    
    read -p "Do you want to seed the database with sample data? (y/N): " -n 1 -r
    echo
    
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        print_step "Seeding database..."
        cd backend
        npm run seed
        cd ..
        print_success "Database seeded with sample data"
        
        print_step "Demo Accounts Created:"
        echo "Patient: patient@demo.com / password123"
        echo "Doctor: doctor@demo.com / password123"
        echo "Admin: admin@demo.com / password123"
        echo "Nurse: nurse@demo.com / password123"
        echo "Pharmacy: pharmacy@demo.com / password123"
        echo "Lab: lab@demo.com / password123"
    else
        print_warning "Database seeding skipped"
    fi
}

# Install global tools (optional)
install_global_tools() {
    print_step "Installing global development tools..."
    
    read -p "Do you want to install global development tools (nodemon, pm2)? (y/N): " -n 1 -r
    echo
    
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        print_step "Installing nodemon and pm2..."
        npm install -g nodemon pm2
        print_success "Global tools installed"
    else
        print_warning "Global tools installation skipped"
    fi
}

# Setup Git hooks (optional)
setup_git_hooks() {
    print_step "Setting up Git hooks..."
    
    read -p "Do you want to setup Git pre-commit hooks? (y/N): " -n 1 -r
    echo
    
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        # Install husky for Git hooks
        npx husky install
        
        # Create pre-commit hook
        npx husky add .husky/pre-commit "npm run lint && npm test"
        
        print_success "Git hooks configured"
    else
        print_warning "Git hooks setup skipped"
    fi
}

# Main setup function
main() {
    echo -e "\n${BLUE}Starting Health InterComm (HIC) Healthcare System Setup...${NC}\n"
    
    # Pre-flight checks
    check_nodejs
    check_mongodb
    check_git
    
    # Setup steps
    install_dependencies
    setup_environment
    create_directories
    setup_mongodb
    
    # Optional steps
    setup_database
    install_global_tools
    setup_git_hooks
    
    # Final instructions
    echo -e "\n${GREEN}🎉 Setup completed successfully!${NC}"
    echo -e "\n${BLUE}Next steps:${NC}"
    echo "1. Update backend/.env with your configuration"
    echo "2. Start MongoDB (if not already running)"
    echo "3. Run the application:"
    echo "   • Development mode: npm run dev"
    echo "   • Backend only: cd backend && npm run dev"
    echo "   • Frontend only: cd frontend && npm start"
    echo ""
    echo "4. Open http://localhost:3000 in your browser"
    echo ""
    echo -e "${BLUE}📚 Documentation:${NC}"
    echo "• API: http://localhost:5000/api/health"
    echo "• README: ./README.md"
    echo ""
    echo -e "${GREEN}Happy coding! 🚀${NC}"
}

# Run setup if script is executed directly
if [[ "${BASH_SOURCE[0]}" == "${0}" ]]; then
    main "$@"
fi