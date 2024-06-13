import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verifyToken } from '../CONTROLLER/verify.controller'; // Cambia el nombre de la función importada

// Función de autenticación genérica
async function authenticate(request: NextRequest, noAuthURL: string, requiredRole: 'admin' | 'teacher' | 'student' | null) {
    const tokenCookie = request.cookies.get('auth-token');
    if (!tokenCookie) {
        return NextResponse.redirect(new URL(noAuthURL, request.nextUrl));
    }

    const token = String(tokenCookie.value);
    let tokenData;

    try {
        tokenData = await verifyToken(token); 
        console.log('Token verification result:', tokenData);

        if (!tokenData) {
            return NextResponse.redirect(new URL(noAuthURL, request.nextUrl));
        }

        const userRole = tokenData.role as 'admin' | 'teacher' | 'student' | null;
        console.log('User role:', userRole);

        // Verificación especial para el admin usando variables de entorno
        if (requiredRole === 'admin' && tokenData.uid === process.env.NEXT_PUBLIC_ADMIN_UID) {
            return NextResponse.next();
        }

        if (requiredRole && userRole !== requiredRole) {
            console.log(`User role ${userRole} is not authorized for this route`);
            return NextResponse.redirect(new URL(noAuthURL, request.nextUrl));
        }

        console.log('Authorized');
        return NextResponse.next();
    } catch (error) {
        console.error('Authentication error:', error);
        return NextResponse.redirect(new URL(noAuthURL, request.nextUrl));
    }
}

export async function middleware(request: NextRequest) {
    if (request.nextUrl.pathname.startsWith('/admin/')) {
        return authenticate(request, '/admin', 'admin');
    } else if (request.nextUrl.pathname.startsWith('/teacher')) {
        return authenticate(request, '/', 'teacher');
    } else if (request.nextUrl.pathname.startsWith('/student')) {
        return authenticate(request, '/', 'student');
    } else {
        // Para todas las demás rutas
        return NextResponse.next();
    }
}
