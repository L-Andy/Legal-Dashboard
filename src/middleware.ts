import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { RolesEnum } from '@/lib/interfaces/user';

const routePermissions: Record<string, string[]> = {
    '/dashboard': [RolesEnum.ADMIN, RolesEnum.GUEST],
    '/dashboard/cases': [RolesEnum.ADMIN, RolesEnum.GUEST],
    '/dashboard/documents': [RolesEnum.ADMIN, RolesEnum.GUEST],
    '/dashboard/time-tracking': [RolesEnum.ADMIN, RolesEnum.GUEST],
    '/dashboard/reports': [RolesEnum.ADMIN],
    '/dashboard/settings': [RolesEnum.ADMIN],
};

export function middleware(request: NextRequest) {
    const path = request.nextUrl.pathname;

    if ( path.startsWith('/_next') || path.includes('/favicon.ico') || path.includes('/assets/') || path === '/api/login') {
        return NextResponse.next();
    }

    const token = request.cookies.get('token')?.value;

    if (path === '/auth') {
        if (token) {
            return NextResponse.redirect(new URL('/dashboard', request.url));
        }
        return NextResponse.next();
    }

    if (!token) {
        return redirectToAuth(request);
    }

    try {
        const userRole = getUserRoleFromToken(token);

        if (!hasPermission(path, userRole)) {
            return NextResponse.redirect(new URL('/dashboard', request.url));
        }
        return NextResponse.next();
    } catch (error) {
        return redirectToAuth(request);
    }
}

function redirectToAuth(request: NextRequest) {
    return NextResponse.redirect(new URL('/auth', request.url));
}

function getUserRoleFromToken(token: string): string {
    try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        if (!payload.role) {
            throw new Error('No role in token');
        }
        return payload.role as keyof typeof RolesEnum;
    } catch (error) {
        throw new Error('Invalid token');
    }
}

function hasPermission(path: string, role: string): boolean {
    if (path.startsWith('/api/')) {
        const resource = path.split('/')[2];
        path = `/dashboard/${resource}`;
    }

    if (!routePermissions[path]?.includes(role)) {
        return false;
    }

    return true;
}

export const config = {
    matcher: [
        '/((?!api/login|_next/static|_next/image|favicon.ico).*)',
    ]
};