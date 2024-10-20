import axiosInstance from '@/lib/axios-instance';
import { TaskUser, UserCheckInInformation } from '@/types';
import { ISocialTask } from '@/types/task';

export const fetchDailyTask = async (): Promise<UserCheckInInformation> => {
  return axiosInstance.get(`/task/daily`).then((response) => response.data);
};

export const updateCheckIn = async (): Promise<UserCheckInInformation> => {
  return axiosInstance.get(`/task/checkin`).then((response) => response.data);
};

export const fetchTasksProgress = async (): Promise<UserCheckInInformation> => {
  return axiosInstance.get(`/task/user`).then((response) => response.data);
};

export const doTask = async (taskId: number): Promise<UserCheckInInformation> => {
  return axiosInstance.get(`/task/do-task/${taskId}`).then((response) => response.data);
};
export const fetchUserSocialTask = async (): Promise<ISocialTask[]> => {
  return axiosInstance.get(`/task`).then((response) => response.data);
};
export const fetchCheckSocialTask = async (taskId: number, keyword?: string): Promise<TaskUser> => {
  return axiosInstance.put(`/task/${taskId}`, { keyword }).then((response) => response.data);
};
