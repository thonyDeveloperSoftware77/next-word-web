import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { verifyTokenAdmin } from '../CONTROLLER/verify.controller';

// Función de autenticación genérica
async function authenticate(request: NextRequest, noAuthURL: string, authorizedUID: string | null = null) {
    const tokenCookie = await request.cookies.get('auth-token')
    const token = String(tokenCookie?.value)
    const tokenVerify = await verifyTokenAdmin(token)
    verifyTokenAdmin(token).then(res => {
        console.log('res', res)
    })

    try {
        if (!token) {
            return NextResponse.redirect(new URL(noAuthURL, request.nextUrl));
        }
        else if (authorizedUID && tokenVerify !== process.env.NEXT_PUBLIC_ADMIN_UID) {
            console.log("TOKEN VERIFY")
            console.log(tokenVerify)
            console.log("NEXT_PUBLIC_ADMIN_UID")
            console.log(process.env.NEXT_PUBLIC_ADMIN_UID)
            console.log('No autorizado')
            //Redirect to login
            console.log('No xxautorizado')
            return NextResponse.redirect(new URL(noAuthURL, request.nextUrl));
        } else {
            console.log('Autorizado')
            return NextResponse.next();
        }
    } catch (error) {
        //Redirect to login
        return NextResponse.redirect(new URL(noAuthURL, request.nextUrl));
    }
}

export async function middleware(request: NextRequest) {
    if (request.nextUrl.pathname.startsWith('/admin/')) {
        return authenticate(request, '/admin', process.env.NEXT_PUBLIC_ADMIN_UID);
    } else if (request.nextUrl.pathname.startsWith('/teacher')) {
        return authenticate(request, '/');
    } else {
        // Para todas las demás rutas
        return NextResponse.next();
    }
}
