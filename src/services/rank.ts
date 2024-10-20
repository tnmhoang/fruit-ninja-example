import axiosInstance from '@/lib/axios-instance';
import { LeaderboardLevel, UserRank } from '@/types';

export const fetchLeaderboard = async (leagueName: string): Promise<UserRank> => {
  return axiosInstance.get(`/leaderboard?league=${leagueName}`).then((response) => response.data);
};

export const fetchListLeaderboard = async (): Promise<LeaderboardLevel[]> => {
  return axiosInstance.get(`/leaderboard/level`).then((response) => response.data);
};
