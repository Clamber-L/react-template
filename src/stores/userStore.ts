import { create } from 'zustand';

import { UserInfo, UserToken } from '@/types/user';
import { getItem, removeItem, setItem } from '@/utils/storage';
import { StorageEnum } from '@/types/enum';

type UserStore = {
    userInfo: Partial<UserInfo>;
    userToken: UserToken;
    setUserInfo: (userInfo: UserInfo) => void;
    setUserToken: (token: UserToken) => void;
    cleanUserInfoAndUserToken: () => void;
};

export const useUserStore = create<UserStore>((set) => ({
    userInfo: getItem<UserInfo>(StorageEnum.User) || {},
    userToken: getItem<UserToken>(StorageEnum.Token) || {},
    setUserInfo: (userInfo) => {
        set({ userInfo });
        setItem(StorageEnum.User, userInfo);
    },
    setUserToken: (userToken) => {
        set({ userToken });
        setItem(StorageEnum.Token, userToken);
    },
    cleanUserInfoAndUserToken: () => {
        set({ userInfo: {}, userToken: {} });
        removeItem(StorageEnum.User);
        removeItem(StorageEnum.Token);
    },
}));

export const useUserInfo = () => useUserStore((state) => state.userInfo);
export const useSetUserInfo = () => useUserStore((state) => state.setUserInfo);
export const useUserPermission = () => useUserStore((state) => state.userInfo.permissions);
export const useUserToken = () => useUserStore((state) => state.userToken);
