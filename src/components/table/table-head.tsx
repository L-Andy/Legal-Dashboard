'use client';
import { RolesEnum } from '../../lib/interfaces';
import { useUser } from '../../lib/hooks';

export function TableHead({ columns }: { columns: string[] }) {
    const { user } = useUser();
    return (
        <tr>
            {columns.map((column) => (
                <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-primary uppercase tracking-wider">{column}</th>
            ))}
            <th scope="col" className={`px-6 py-3 text-right text-xs font-semibold text-primary uppercase tracking-wider ${user?.role !== RolesEnum.ADMIN ? 'hidden' : ''}`}>Actions</th>
        </tr>
    )
}