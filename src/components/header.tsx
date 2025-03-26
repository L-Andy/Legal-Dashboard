'use client';

import { usePathname, useRouter } from 'next/navigation';
import { Cog6ToothIcon, ArrowRightOnRectangleIcon } from '@heroicons/react/24/outline';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '@/store/slices/auth.slice';
import { useUser } from '@/lib/hooks';

export function Header() {
    const { user } = useUser();
    const dispatch = useDispatch();

    const router = useRouter();

    const pathname = usePathname();
    const pathSegments = pathname.split('/').filter(Boolean).length > 0 &&
        pathname.split('/').filter(Boolean)[pathname.split('/').filter(Boolean).length - 1] === 'edit' ?
        pathname.split('/').filter(Boolean).slice(0, -2) :
        pathname.split('/').filter(Boolean);
    const [showUserMenu, setShowUserMenu] = useState(false);

    const handleLogout = () => {
        dispatch(logout());
        router.push('/auth');
    }

    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                setShowUserMenu(false);
            }
        };

        const handleClickOutside = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            if (!target.closest('.user-menu-container')) {
                setShowUserMenu(false);
            }
        };

        document.addEventListener('keydown', handleEscape);
        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('keydown', handleEscape);
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div className="sticky top-0 z-10 flex h-16 flex-shrink-0 bg-white shadow">
            <div className="flex flex-1 justify-between px-4">
                <div className="flex flex-1">
                    <div className="flex items-center">
                        {pathSegments.length > 1 ? (
                            pathSegments.slice(1).map((segment, index) => (
                                <div key={index} className="flex items-center">
                                    {index > 0 && (
                                        <span className="mx-2 text-gray-400">/</span>
                                    )}
                                    <span className="text-lg font-medium text-gray-900 capitalize">
                                        {segment}
                                    </span>
                                </div>
                            ))
                        ) : (
                            <span className="text-lg font-medium text-gray-900">Dashboard</span>
                        )}
                    </div>
                </div>
                <div className="ml-4 flex items-center space-x-4 md:ml-6">
                    <div className="relative user-menu-container">
                        <div
                            onClick={(e) => {
                                e.stopPropagation();
                                setShowUserMenu(!showUserMenu);
                            }}
                            className="flex items-center cursor-pointer"
                        >
                            <img
                                className="h-10 w-10 rounded-full cursor-pointer border-2 border-gray-200 hover:border-primary transition-colors"
                                src={'/assets/passport.jpeg'}
                                alt={'Profile picture'}
                            />
                        </div>
                        {showUserMenu && (
                            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 ring-1 ring-black ring-opacity-5">
                                <div className="px-4 py-2 border-b border-gray-100">
                                    <p className="text-sm font-medium text-gray-900 truncate">{`${user?.firstName} ${user?.lastName}`}</p>
                                    <p className="text-sm text-gray-500 truncate">{user?.email}</p>
                                </div>
                                <button onClick={() => window.location.href = '/dashboard/settings'} className="flex w-full items-center px-4 py-2 text-sm text-gray-700 cursor-pointer">
                                    <Cog6ToothIcon className="mr-3 h-5 w-5 text-gray-400" />
                                    Settings
                                </button>
                                <button onClick={() => handleLogout()} className="flex w-full items-center px-4 py-2 text-sm text-gray-700 cursor-pointer">
                                    <ArrowRightOnRectangleIcon className="mr-3 h-5 w-5 text-gray-400" />
                                    Logout
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}