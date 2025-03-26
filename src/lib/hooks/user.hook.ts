'use client';

import { useState, useMemo, useEffect } from 'react';
import { IUser } from '@/lib/interfaces';

export const useUser = () => {
    const [user, _setUser] = useState<IUser | null>(null);

    useEffect(() => {
        try {
            const storedUser = localStorage.getItem('user');
            if (storedUser) {
                _setUser(JSON.parse(storedUser));
            }
        } catch {
            localStorage.removeItem('user');
        }
    }, []);

    const setUser = useMemo(() => (newUser: IUser | null) => {
        _setUser(newUser);
        if (newUser) {
            localStorage.setItem('user', JSON.stringify(newUser));
        } else {
            localStorage.removeItem('user');
        }
    }, []);

    return { user, setUser };
};
