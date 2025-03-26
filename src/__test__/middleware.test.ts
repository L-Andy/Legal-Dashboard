import { NextResponse } from 'next/server'
import { middleware } from '../middleware'
import { RolesEnum } from '@/lib/interfaces/user'
import '@testing-library/jest-dom'

jest.mock('next/server', () => ({
  NextResponse: {
    next: jest.fn(),
    redirect: jest.fn()
  }
}))

describe('Middleware', () => {
  let mockRequest: any

  beforeEach(() => {
    jest.clearAllMocks()
    mockRequest = {
      nextUrl: {
        pathname: '/dashboard',
        href: 'http://localhost:3000/dashboard'
      },
      url: 'http://localhost:3000',
      cookies: {
        get: jest.fn()
      }
    }
  })

  it('allows access to static assets and login API', () => {
    const paths = ['/_next/test', '/favicon.ico', '/assets/image.png', '/api/login']
    
    paths.forEach(path => {
      mockRequest.nextUrl.pathname = path
      middleware(mockRequest)
      expect(NextResponse.next).toHaveBeenCalled()
    })
  })

  it('redirects to auth when no token is present', () => {
    mockRequest.cookies.get.mockReturnValue(undefined)
    
    middleware(mockRequest)
    
    expect(NextResponse.redirect).toHaveBeenCalledWith(
      expect.any(URL)
    )
  })

  it('redirects to dashboard if authenticated user visits auth page', () => {
    mockRequest.nextUrl.pathname = '/auth'
    mockRequest.cookies.get.mockReturnValue({ value: 'valid.token.here' })
    
    middleware(mockRequest)
    
    expect(NextResponse.redirect).toHaveBeenCalledWith(
      expect.any(URL)
    )
  })

  it('allows access to permitted routes based on user role', () => {
    const token = generateMockToken(RolesEnum.ADMIN)
    mockRequest.cookies.get.mockReturnValue({ value: token })
    
    middleware(mockRequest)
    
    expect(NextResponse.next).toHaveBeenCalled()
  })

  it('redirects to dashboard for unauthorized access', () => {
    const token = generateMockToken(RolesEnum.GUEST)
    mockRequest.cookies.get.mockReturnValue({ value: token })
    mockRequest.nextUrl.pathname = '/dashboard/reports'
    
    middleware(mockRequest)
    
    expect(NextResponse.redirect).toHaveBeenCalledWith(
      expect.any(URL)
    )
  })

  it('redirects to auth for invalid token', () => {
    mockRequest.cookies.get.mockReturnValue({ value: 'invalid.token' })
    
    middleware(mockRequest)
    
    expect(NextResponse.redirect).toHaveBeenCalledWith(
      expect.any(URL)
    )
  })
})

function generateMockToken(role: string): string {
  const payload = { role }
  const encodedPayload = Buffer.from(JSON.stringify(payload)).toString('base64')
  return `header.${encodedPayload}.signature`
}
