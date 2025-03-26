import { render, screen } from '@testing-library/react'
import { TableHead } from '../components/table/table-head'
import '@testing-library/jest-dom'
import * as hooks from '../lib/hooks'
import { RolesEnum } from '../lib/interfaces/user'

jest.mock('../lib/hooks', () => ({
    useUser: jest.fn()
}))

describe('TableHead Component', () => {
    const mockColumns = ['Name', 'Email', 'Role']

    beforeEach(() => {
        jest.clearAllMocks()
    })

    it('renders all column headers', () => {
        ; (hooks.useUser as jest.Mock).mockReturnValue({ user: null })

        render(
            <table>
                <thead>
                    <TableHead columns={mockColumns} />
                </thead>
            </table>
        )

        mockColumns.forEach(column => {
            expect(screen.getByText(column)).toBeInTheDocument()
        })
    })

    it('shows Actions column when user is admin', () => {
        ; (hooks.useUser as jest.Mock).mockReturnValue({
            user: { role: RolesEnum.ADMIN }
        })

        render(
            <table>
                <thead>
                    <TableHead columns={mockColumns} />
                </thead>
            </table>
        )

        expect(screen.getByText('Actions')).toBeInTheDocument()
        expect(screen.getByText('Actions')).not.toHaveClass('hidden')
    })

    it('hides Actions column when user is not admin', () => {
        ; (hooks.useUser as jest.Mock).mockReturnValue({
            user: { role: RolesEnum.GUEST }
        })

        render(
            <table>
                <thead>
                    <TableHead columns={mockColumns} />
                </thead>
            </table>
        )

        expect(screen.getByText('Actions')).toHaveClass('hidden')
    })
})
