import { IAttorney } from '../interfaces';

export const attorneyData: IAttorney[] = [
    {
        id: 1,
        initials: 'JA',
        name: 'J. Anderson',
        specialty: 'Corporate Law',
        status: 'Available',
        avatarColor: {
            bg: 'bg-blue-100',
            text: 'text-blue-600'
        },
        statusColor: {
            bg: 'bg-green-100',
            text: 'text-green-800'
        }
    },
    {
        id: 2,
        initials: 'MW',
        name: 'M. Wilson', 
        specialty: 'Family Law',
        status: 'In Court',
        avatarColor: {
            bg: 'bg-purple-100',
            text: 'text-purple-600'
        },
        statusColor: {
            bg: 'bg-red-100',
            text: 'text-red-800'
        }
    },
    {
        id: 3,
        initials: 'ST',
        name: 'S. Thompson',
        specialty: 'Criminal Law', 
        status: 'Meeting',
        avatarColor: {
            bg: 'bg-amber-100',
            text: 'text-amber-600'
        },
        statusColor: {
            bg: 'bg-blue-100',
            text: 'text-blue-800'
        }
    },
    {
        id: 4,
        initials: 'RJ',
        name: 'R. Johnson',
        specialty: 'Real Estate',
        status: 'Available',
        avatarColor: {
            bg: 'bg-green-100',
            text: 'text-green-600'
        },
        statusColor: {
            bg: 'bg-green-100',
            text: 'text-green-800'
        }
    }
];