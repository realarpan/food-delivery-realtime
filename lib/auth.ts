import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import speakeasy from 'speakeasy';
import { cookies } from 'next/headers';
import { User } from './models/User';

const JWT_SECRET = process.env.JWT_SECRET as string;
const TOTP_SECRET = process.env.TOTP_SECRET as string;

export async function hashPassword(password: string): Promise<string> {
  const saltRounds = parseInt(process.env.SALT_ROUNDS || '12');
  return bcrypt.hash(password, saltRounds);
}

export async function comparePassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

export function generateTOTP(): { secret: string; otpauth_url: string } {
  const secret = speakeasy.generateSecret({ length: 20 });
  return {
    secret: secret.base32,
    otpauth_url: secret.otpauth_url || '',
  };
}

export function verifyTOTP(token: string, secret: string): boolean {
  return speakeasy.totp.verify({
    secret,
    encoding: 'base32',
    token,
    window: 1,
  });
}

export function generateJWT(userId: string, mfaEnabled: boolean): string {
  return jwt.sign(
    { sub: userId, mfaEnabled },
    JWT_SECRET,
    { expiresIn: '7d' }
  );
}

export function setAuthCookie(token: string): void {
  cookies().set('auth', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
  });
}

export function getAuthFromCookie() {
  const token = cookies().get('auth')?.value;
  if (!token) return null;
  try {
    return jwt.verify(token, JWT_SECRET) as { sub: string; mfaEnabled: boolean };
  } catch {
    return null;
  }
}

export async function login(email: string, password: string) {
  await connectDB();
  const user = await User.findOne({ email });
  if (!user) throw new Error('Invalid credentials');
  
  const isValid = await comparePassword(password, user.passwordHash);
  if (!isValid) throw new Error('Invalid credentials');
  
  return {
    user,
    token: generateJWT(user._id.toString(), user.mfaEnabled),
  };
}
