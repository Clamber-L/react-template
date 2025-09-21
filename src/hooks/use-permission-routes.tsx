import { useUserPermission } from '@/stores/userStore';

export const usePermissionRoutes = () => {
    const permissions = useUserPermission();
};
