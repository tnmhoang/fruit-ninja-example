import axiosInstance from '@/lib/axios-instance';
import { GameConfig } from '@/types';

export const fetchGameConfigs = async (): Promise<GameConfig[]> => {
  return axiosInstance.get(`/game-config/getAll`).then((response) => response.data);
};

export const fetchCheckGameConfigsTask = async (id: number): Promise<GameConfig[]> => {
  return axiosInstance.get(`/game-config/user/${id}`).then((response) => response.data);
};
