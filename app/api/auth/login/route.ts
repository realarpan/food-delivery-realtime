import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import { login, setAuthCookie } from '@/lib/auth';

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const { email, password } = await req.json();

    const { user, token } = await login(email, password);
    setAuthCookie(token);

    return NextResponse.json({
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
        role: user.role,
        mfaEnabled: user.mfaEnabled,
      },
      token,
    });
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
  }
}
