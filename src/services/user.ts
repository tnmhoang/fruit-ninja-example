import axiosInstance from '@/lib/axios-instance';
import {
  APIResponseWithPaging,
  ComPleteOrderParams,
  CompleteOrderResponse,
  User,
  UserUpgraded,
} from '@/types';
import { IOrder } from '@/types/order';

export const fetchProfile = async (refBy = ''): Promise<User> => {
  return axiosInstance.get(`/user/profile?refBy=${refBy}`).then((response) => response.data);
};

export const fetchFriends = async (page?: number): Promise<APIResponseWithPaging<User>> => {
  return axiosInstance.get(`/user/friends?page=${page}`).then((response) => response.data);
};

export const claimMiningSubmit = async (): Promise<User> => {
  return axiosInstance.post('/user/claim').then((response) => response.data);
};

export const fetchUpgraded = async (): Promise<UserUpgraded[]> => {
  return axiosInstance.get('/user/upgrade').then((response) => response.data);
};

export const updateWallet = async (walletAddress: string): Promise<UserUpgraded[]> => {
  return axiosInstance
    .post('/user/wallet', { wallet_address: walletAddress })
    .then((response) => response.data);
};

export const fetchNewOrder = async (): Promise<IOrder> => {
  return axiosInstance.get('/game-play/new-order').then((response) => response.data);
};

export const updateCompleteOrder = async (
  body: ComPleteOrderParams,
): Promise<CompleteOrderResponse> => {
  return axiosInstance.put('/game-play/complete-order', body).then((response) => response.data);
};
