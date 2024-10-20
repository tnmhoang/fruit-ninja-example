import axiosInstance from '@/lib/axios-instance';
import { IUpgrade, UpgradeItem, UpgradePayload, User } from '@/types';

export const fetchUpgraded = async (): Promise<IUpgrade> => {
  return axiosInstance.get('/user/upgrade/next-level').then((response) => response.data);
};

export const upgradeItem = async (type: keyof IUpgrade): Promise<{ user: User }> => {
  return axiosInstance.patch(`/user/upgrade/${type}`).then((response) => response.data);
};
