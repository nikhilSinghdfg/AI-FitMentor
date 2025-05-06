import { NextResponse } from 'next/server'

export function middleware(request) {
  const path = request.nextUrl.pathname

  // Define public paths where authentication is not required
  const isPublicPath = path === '/authentications/Login' || path === '/authentications/Signup' || path === '/authentications/verifyemail'

  // Get the token from cookies
  const token = request.cookies.get('token')?.value || ''

  // If the user is already logged in (token exists) and tries to access public paths, redirect them to the homepage
  if (isPublicPath && token) {
    return NextResponse.redirect(new URL('/pages/Dashboard', request.nextUrl))
  }

  // If the user is not logged in and tries to access non-public paths, redirect them to the login page
  if (!isPublicPath && !token) {
    return NextResponse.redirect(new URL('/authentications/Signup', request.nextUrl))
  }
}

// Configure the paths to match with the middleware
export const config = {
  matcher: [
    '/pages/Dashboard',          
    '/authentications/Login',
    '/authentications/Profile',
    '/authentications/Signup',         
    '/authentications/verifyemail' 
  ]
}
