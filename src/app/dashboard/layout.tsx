'use client';

import '../globals.css';
import { SideNav, Header } from '@/components/index';

export default function DashboardLayout({children}: {children: React.ReactNode}) {
    
    return (
        <div className="min-h-screen bg-gray-100">
            <div className="hidden md:fixed md:inset-y-0 md:flex md:w-64 md:flex-col">
                <SideNav />
            </div>
            <div className="flex flex-1 flex-col md:pl-64">
                <Header />
                <main className="min-h-[calc(100vh-64px)] py-6 px-4 bg-white">
                    {children}
                </main>
            </div>
        </div>
    );
}