import { Request } from 'express';

export interface JwtUserPayload {
  id: string;
  _id?: string;
  username?: string;
  role?: string;
  weddingSlug?: string;
}

export interface AuthenticatedRequest extends Request {
  user?: JwtUserPayload;
}
