import jwt from 'jsonwebtoken';
import asyncHandler from '../middleware/asyncHandler.js';
import express from 'express';
import User from '../models/userModel.js';

//create protected route middleware
 const protect = asyncHandler(async (req, res, next) => {
    let token;
    // read the jwt from the cookie or authorization header
    // check if the token is present in the cookie or authorization header

    token = req.cookies.jwt;
    if (token) {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = await User.findById(decoded.userId).select('-password');
            next();

        }
        catch (err) {
            console.error(err);
        }
    }
    else {
        res.status(401);
        throw new Error('Not authorized, no token');
    }

});

//create admin middleware
 const admin = (req, res, next) => {
    if (req.user && req.user.isAdmin) {
        next();
    }
    else {
        res.status(401);
        throw new Error('Not authorized as an admin');
    }
}
export  { protect, admin };