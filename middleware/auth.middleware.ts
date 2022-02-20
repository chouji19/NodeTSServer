import jwt from 'jsonwebtoken';
import express, { Request, Response, NextFunction } from 'express';

export const authorize = (req:Request, res:Response, next:NextFunction) => { 
	const token = req.header('Authorization')

    //Revisar si no hay token
    if(!token)
        return res.status(401).json({msg: 'Token not found'})

    //Validar el token
    try {
        const crypted = jwt.verify(token!, process.env.SECRET_JWTKEY!)
        next()
    } catch (error) {
        return res.status(401).json({msg: 'Invalid token'})
    }
 }

 export default authorize;