'use client'

import { UserIcon, BellIcon, LockClosedIcon, GlobeAltIcon } from '@heroicons/react/24/outline'
import { usePathname, useRouter } from 'next/navigation';

const nav = [
    { name: 'Profile', href: '/dashboard/settings', icon: UserIcon },
    { name: 'Notifications', href: '/dashboard/settings/notifications', icon: BellIcon },
    { name: 'Security', href: '/dashboard/settings/security', icon: LockClosedIcon },
    { name: 'Preferences', href: '/dashboard/settings/preferences', icon: GlobeAltIcon }
]

const ChildNav = () => {
    const pathname = usePathname();
    const router = useRouter();
    return (
        <nav className="px-4 space-y-4">
            {nav.map((item) => {
                const isActive = pathname === item.href || 
                    (pathname === '/dashboard/settings' && item.name === 'Profile');
                return (
                    <button
                        key={item.name}
                        className={`group flex items-center font-normal px-2 py-2 text-sm rounded-md w-full ${isActive
                            ? 'text-primary bg-primary/10'
                            : 'text-gray-500 hover:bg-gray-100'
                            }`}
                        onClick={() => router.push(item.href)}>
                        <item.icon
                            className={`mr-3 h-6 w-6 flex-shrink-0 ${isActive ? 'text-primary' : 'text-gray-500'
                                }`}
                            aria-hidden="true"/>
                        {item.name}
                    </button>
                );
            })}
        </nav>
    );
}

export default ChildNav;
