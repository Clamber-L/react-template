export interface UserToken {
    accessToken?: string;
    refreshToken?: string;
}

export interface UserInfo {
    id: string;
    username: string;
    email: string;
    account: string;
    password: string;
    avatar: string;
    roles: string[];
    permissions?: Permission[];
}

export interface Permission {
    id: string;
    parentId: string;
    name: string;
    label: string;
    path: string;
    resourceType: string;
    icon?: string;
    component?: string;
    hide?: boolean;
    children?: Permission[];
}
