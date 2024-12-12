import * as express from 'express';

// Extend the Express Request interface to include the user property
declare global {
  namespace Express {
    interface Request {
      user?: any; // Or define a more specific type for the user object
    }
  }
}
