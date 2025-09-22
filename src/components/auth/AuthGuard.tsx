import React, { useCallback, useEffect } from 'react';

import { useRouter } from '@/hooks/use-router';
import { useUserToken } from '@/stores/userStore';

type Props = {
    children: React.ReactNode;
};

const AuthGuard = ({ children }: Props) => {
    const router = useRouter();
    const { accessToken } = useUserToken();

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
