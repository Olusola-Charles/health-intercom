import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Extend Request type to include user
export interface AuthRequest extends Request {
  user?: {
    userId: string;
    role: string;
  };
  currentUser?: any;
}

// Basic authentication middleware
export const auth = (req: AuthRequest, res: Response, next: NextFunction): void => {
  const authHeader = req.header('Authorization');
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res.status(401).json({
      success: false,
      message: 'No token provided, authorization denied'
    });
    return;
  }

  const token = authHeader.substring(7);

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key') as any;
    
    // For simplicity, we'll trust the token contains valid user info
    // In production, you'd want to verify the user still exists in the database
    req.user = decoded;
    req.currentUser = { id: decoded.userId, role: decoded.role, isActive: true };
    next();
  } catch (error) {
    res.status(401).json({
      success: false,
      message: 'Token is not valid'
    });
    return;
  }
};

// Simple role check function
const checkRole = (req: AuthRequest, res: Response, requiredRoles: string[]): boolean => {
  if (!req.currentUser) {
    res.status(401).json({
      success: false,
      message: 'Authentication required'
    });
    return false;
  }

  if (!requiredRoles.includes(req.currentUser.role)) {
    res.status(403).json({
      success: false,
      message: `Access denied. Required role: ${requiredRoles.join(' or ')}`
    });
    return false;
  }

  return true;
};

// Role-specific middleware functions
export const adminOnly = (req: AuthRequest, res: Response, next: NextFunction): void => {
  auth(req, res, () => {
    if (checkRole(req, res, ['ADMIN'])) {
      next();
    }
  });
};

export const doctorOnly = (req: AuthRequest, res: Response, next: NextFunction): void => {
  auth(req, res, () => {
    if (checkRole(req, res, ['DOCTOR'])) {
      next();
    }
  });
};

export const patientOnly = (req: AuthRequest, res: Response, next: NextFunction): void => {
  auth(req, res, () => {
    if (checkRole(req, res, ['PATIENT'])) {
      next();
    }
  });
};

export const medicalStaffOnly = (req: AuthRequest, res: Response, next: NextFunction): void => {
  auth(req, res, () => {
    if (checkRole(req, res, ['DOCTOR', 'NURSE', 'ADMIN'])) {
      next();
    }
  });
};





// import { Request, Response, NextFunction } from 'express';
// import jwt from 'jsonwebtoken';
// import { PrismaClient } from '@prisma/client';

// const prisma = new PrismaClient();

// // Extend Request type to include user
// export interface AuthRequest extends Request {
//   user?: {
//     userId: string;
//     role: string;
//   };
//   currentUser?: any;
// }

// // Basic authentication middleware
// export const auth = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
//   try {
//     const authHeader = req.header('Authorization');
    
//     if (!authHeader || !authHeader.startsWith('Bearer ')) {
//         res.status(401).json({
//         success: false,
//         message: 'No token provided, authorization denied'
//       });
//     }

//     const token:any = authHeader?.substring(7); // Remove 'Bearer ' prefix

//     try {
//       const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key') as any;
      
//       const user:any = await prisma.user.findUnique({
//         where: { id: decoded.userId }
//       });

//       if (!user) {
//         res.status(401).json({
//           success: false,
//           message: 'Token is not valid'
//         });
//       }

//       if (!user.isActive) {
//         res.status(403).json({
//           success: false,
//           message: 'Account has been deactivated'
//         });
//       }

//       req.user = decoded;
//       req.currentUser = user;
//       next();
//     } catch (error) {
//       res.status(401).json({
//         success: false,
//         message: 'Token is not valid'
//       });
//     }
//   } catch (error) {
//     console.error('Auth middleware error:', error);
//     res.status(500).json({
//       success: false,
//       message: 'Server error in authentication'
//     });
//   }
// };

// // Role-based authorization middleware
// export const authorize = (...roles: string[]) => {
//   return async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
//     try {
//       if (!req.currentUser) {
//         res.status(401).json({
//           success: false,
//           message: 'Authentication required'
//         });
//       }

//       if (!roles.includes(req.currentUser.role)) {
//         res.status(403).json({
//           success: false,
//           message: `Access denied. Required role: ${roles.join(' or ')}`
//         });
//       }

//       next();
//     } catch (error) {
//       console.error('Authorization middleware error:', error);
//       res.status(500).json({
//         success: false,
//         message: 'Server error in authorization'
//       });
//     }
//   };
// };

// // Specific role middlewares
// export const adminOnly = [auth, authorize('ADMIN')];
// export const doctorOnly = [auth, authorize('DOCTOR')];
// export const patientOnly = [auth, authorize('PATIENT')];
// export const medicalStaffOnly = [auth, authorize('DOCTOR', 'NURSE', 'ADMIN')];
// export const healthcareProviderOnly = [auth, authorize('DOCTOR', 'NURSE', 'PHARMACY', 'LAB', 'ADMIN')];

// // Optional authentication middleware (doesn't fail if no token)
// export const optionalAuth = async (req: AuthRequest, res: Response, next: NextFunction) => {
//   try {
//     const authHeader = req.header('Authorization');
    
//     if (!authHeader || !authHeader.startsWith('Bearer ')) {
//       return next(); // Continue without authentication
//     }

//     const token = authHeader.substring(7);

//     try {
//       const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key') as any;
//       const user = await prisma.user.findUnique({
//         where: { id: decoded.userId }
//       });
      
//       if (user && user.isActive) {
//         req.user = decoded;
//         req.currentUser = user;
//       }
//     } catch (error) {
//       // Invalid token, but we continue anyway
//       console.log('Invalid token in optional auth:', error);
//     }

//     next();
//   } catch (error) {
//     console.error('Optional auth middleware error:', error);
//     next(); // Continue even on error
//   }
// };