import { render, screen } from '@testing-library/react'
import { Button } from '../components/button'
import '@testing-library/jest-dom'

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  createElement: jest.fn((type, props, ...children) => {
    if (type === 'svg' && props?.className?.includes('animate-spin')) {
      return <div data-testid="loading-spinner" {...props}>{children}</div>
    }
    return jest.requireActual('react').createElement(type, props, ...children)
  })
}))

describe('Button Component', () => {
  it('renders button with stale text when not submitting', () => {
    render(<Button stale="Submit" />)
    expect(screen.getByRole('button')).toHaveTextContent('Submit')
  })

  it('disables button when submitting', () => {
    render(<Button submitting={true} in_action="Processing" />)
    expect(screen.getByRole('button')).toBeDisabled()
  })

  it('enables button when not submitting', () => {
    render(<Button stale="Click me" />)
    expect(screen.getByRole('button')).toBeEnabled()
  })

  it('has correct base styling classes', () => {
    render(<Button stale="Submit" />)
    expect(screen.getByRole('button')).toHaveClass(
      'group',
      'relative',
      'w-full',
      'flex',
      'justify-center',
      'py-3',
      'px-4',
      'border',
      'border-transparent',
      'text-sm',
      'font-medium',
      'rounded-lg',
      'text-white',
      'bg-primary'
    )
  })
})
