'use client';

import ChildNav from '@/components/child.nav';

export default function SettingsLayout({children}: {children: React.ReactNode}) {
    return (
        <div className="container mx-auto">
            <div className="bg-white">
                <div className="flex flex-col md:flex-row">
                    <div className="w-full md:w-64">
                        <ChildNav  />
                    </div>
                    <div className="flex-1 border-l px-6 border-primary/10">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
}