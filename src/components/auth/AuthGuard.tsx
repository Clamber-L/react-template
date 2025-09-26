import React, { useCallback, useEffect } from 'react';

import { useRouter } from '@/hooks/use-router';
import { useAuth } from '@/stores/authStore';

type Props = {
    children: React.ReactNode;
};

const AuthGuard = ({ children }: Props) => {
    const router = useRouter();
    const { accessToken } = useAuth();

    const check = useCallback(() => {
        if (!accessToken) {
            router.replace('/login');
        }
    }, [router, accessToken]);

    useEffect(() => {
        check();
    }, [check]);

    return children;
};

export default AuthGuard;
