import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

import AppError from '@shared/errors/AppError';

import auth from '@config/auth';

interface ITokenPayload {
  iat: number;
  exp: number;
  sub: string;
}

export default function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction,
): void {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new AppError('Token is missing', 401);
  }

  const [, token] = authHeader.split(' ');

  try {
    const decoded = verify(token, `${auth.jwt.secret}`);

    const { sub } = decoded as ITokenPayload;

    request.user = {
      id: sub,
    };

    // console.log(decoded);

    return next();
  } catch (err) {
    throw new AppError('Invalid JWT token.', 401);
  }
}
