import { NextResponse } from 'next/server';
import { IUser, RolesEnum } from '@/lib/interfaces';

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    await new Promise(resolve => setTimeout(resolve, 500));

    if (email === 'admin@legaltech.com' && password === 'admin123') {
      return NextResponse.json({
        id: '1',
        email: 'admin@legaltech.com',
        firstName: 'Admin',
        lastName: 'User',
        role: RolesEnum.ADMIN,
        avatar: '/avatars/admin.png',
      } as IUser);
    }

    if (email === 'user@legaltech.com' && password === 'user123') {
      return NextResponse.json({
        id: '2',
        email: 'user@legaltech.com',
        firstName: 'Standard',
        lastName: 'User',
        role: RolesEnum.GUEST,
        avatar: '/avatars/user.png',
      } as IUser);
    }

    return NextResponse.json(
      { error: 'Invalid credentials' },
      { status: 401 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 