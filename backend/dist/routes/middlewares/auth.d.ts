import { NextFunction } from "express";
export declare function parseJWT(req: any, res: any, next: any): Promise<any>;
export declare function validateJWT(req: any, res: any, next: any): Promise<NextFunction>;
