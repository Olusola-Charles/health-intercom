const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Basic authentication middleware
const auth = async (req, res, next) => {
  try {
    const authHeader = req.header('Authorization');
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        success: false,
        message: 'No token provided, authorization denied'
      });
    }

    const token = authHeader.substring(7); // Remove 'Bearer ' prefix

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');
      
      const user = await User.findById(decoded.userId);
      if (!user) {
        return res.status(401).json({
          success: false,
          message: 'Token is not valid'
        });
      }

      if (!user.isActive) {
        return res.status(403).json({
          success: false,
          message: 'Account has been deactivated'
        });
      }

      req.user = decoded;
      req.currentUser = user;
      next();
    } catch (error) {
      return res.status(401).json({
        success: false,
        message: 'Token is not valid'
      });
    }
  } catch (error) {
    console.error('Auth middleware error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error in authentication'
    });
  }
};

// Role-based authorization middleware
const authorize = (...roles) => {
  return async (req, res, next) => {
    try {
      if (!req.currentUser) {
        return res.status(401).json({
          success: false,
          message: 'Authentication required'
        });
      }

      if (!roles.includes(req.currentUser.role)) {
        return res.status(403).json({
          success: false,
          message: `Access denied. Required role: ${roles.join(' or ')}`
        });
      }

      next();
    } catch (error) {
      console.error('Authorization middleware error:', error);
      res.status(500).json({
        success: false,
        message: 'Server error in authorization'
      });
    }
  };
};

// Admin only middleware
const adminOnly = authorize('admin');

// Medical staff middleware (doctors, nurses, admin)
const medicalStaffOnly = authorize('doctor', 'nurse', 'admin');

// Doctor only middleware
const doctorOnly = authorize('doctor');

// Patient only middleware
const patientOnly = authorize('patient');

// Healthcare provider middleware (doctor, nurse, pharmacy, lab, admin)
const healthcareProviderOnly = authorize('doctor', 'nurse', 'pharmacy', 'lab', 'admin');

// Optional authentication middleware (doesn't fail if no token)
const optionalAuth = async (req, res, next) => {
  try {
    const authHeader = req.header('Authorization');
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return next(); // Continue without authentication
    }

    const token = authHeader.substring(7);

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');
      const user = await User.findById(decoded.userId);
      
      if (user && user.isActive) {
        req.user = decoded;
        req.currentUser = user;
      }
    } catch (error) {
      // Invalid token, but we continue anyway
      console.log('Invalid token in optional auth:', error.message);
    }

    next();
  } catch (error) {
    console.error('Optional auth middleware error:', error);
    next(); // Continue even on error
  }
};

// Check if user owns resource or is authorized to access it
const checkResourceAccess = (resourceField = 'patient') => {
  return async (req, res, next) => {
    try {
      const userId = req.currentUser._id.toString();
      const role = req.currentUser.role;

      // Admins have access to everything
      if (role === 'admin') {
        return next();
      }

      // For patients, they can only access their own resources
      if (role === 'patient') {
        const resourceId = req.params.id || req.params.patientId || req.body[resourceField];
        if (resourceId && resourceId.toString() !== userId) {
          return res.status(403).json({
            success: false,
            message: 'Access denied to this resource'
          });
        }
      }

      // For medical staff, additional checks might be needed based on assignments
      // This can be extended based on specific business rules

      next();
    } catch (error) {
      console.error('Resource access middleware error:', error);
      res.status(500).json({
        success: false,
        message: 'Server error in resource access check'
      });
    }
  };
};

// Check if user is verified
const verifiedOnly = async (req, res, next) => {
  try {
    if (!req.currentUser.isVerified) {
      return res.status(403).json({
        success: false,
        message: 'Email verification required'
      });
    }
    next();
  } catch (error) {
    console.error('Verification middleware error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error in verification check'
    });
  }
};

module.exports = {
  auth,
  authorize,
  adminOnly,
  medicalStaffOnly,
  doctorOnly,
  patientOnly,
  healthcareProviderOnly,
  optionalAuth,
  checkResourceAccess,
  verifiedOnly
};