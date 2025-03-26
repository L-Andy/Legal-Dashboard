'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import {
    HomeIcon,
    WrenchIcon,
    ClipboardDocumentListIcon,
    DocumentTextIcon,
    BookOpenIcon,
    Cog6ToothIcon,
} from '@heroicons/react/24/outline';
import { INavigation } from '@/lib/interfaces';
import { useUser } from '@/lib/hooks';

const navigation = {
    admin: [
        { name: 'Dashboard', href: '/dashboard', icon: HomeIcon },
        { name: 'Cases', href: '/dashboard/cases', icon: WrenchIcon },
        { name: 'Documents', href: '/dashboard/documents', icon: DocumentTextIcon },
        { name: 'Time tracking', href: '/dashboard/time-tracking', icon: ClipboardDocumentListIcon },
        { name: 'Reports', href: '/dashboard/reports', icon: BookOpenIcon },
        { name: 'Settings', href: '/dashboard/settings', icon: Cog6ToothIcon }
    ],
    guest: [
        { name: 'Dashboard', href: '/dashboard', icon: HomeIcon },
        { name: 'Cases', href: '/dashboard/cases', icon: WrenchIcon },
        { name: 'Documents', href: '/dashboard/documents', icon: DocumentTextIcon },
        { name: 'Time tracking', href: '/dashboard/time-tracking', icon: ClipboardDocumentListIcon }
    ]
} as INavigation;

export function SideNav() {
    const { user } = useUser();
    const pathname = usePathname();
    const userRole = user?.role;
    const userNavigation = navigation[userRole as keyof typeof navigation] || [];

    return (
        <div className="flex min-h-0 flex-1 flex-col bg-white shadow-md border border-primary/10">
            <div className="flex flex-1 flex-col overflow-y-auto pt-5 pb-4">
                <div className="flex justify-center items-center px-4 ">
                    <img src={'/assets/logo.png'} alt='Legal tracker' className='h-auto w-auto scale-75' />
                </div>
                <nav className="px-4">
                    <div className='mt-5 flex-1 space-y-4 border-t border-primary/20 py-4'>
                        {userNavigation.map((item) => {
                            const isActive = pathname.includes(item.href.split('/')[2]) || (item.name === 'Dashboard' && pathname === '/dashboard');
                            return (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    className={`group flex items-center font-normal px-2 py-2 text-sm rounded-md ${isActive
                                        ? 'text-primary bg-primary/10'
                                        : 'text-gray-500 hover:bg-gray-100'
                                        }`}
                                >
                                    <item.icon
                                        className={`mr-3 h-6 w-6 flex-shrink-0 ${isActive ? 'text-primary' : 'text-gray-500'
                                            }`}
                                        aria-hidden="true"
                                    />
                                    {item.name}
                                </Link>
                            );
                        })}
                    </div>
                </nav>
            </div>
        </div>
    );
}