import { API_URL } from "@/utils";
import axios from "axios";

export const getCountries = async () => axios.get(`${API_URL}/countries`);
export const getPublisherCategories = async () => axios.get(`${API_URL}/publisher-categories`);
export const getPodcastGoals = async () => axios.get(`${API_URL}/podcast-goals`);
export const getPodcastCategories = async () => axios.get(`${API_URL}/podcast-categories`);
export const getTags = async () => axios.get(`${API_URL}/tags`);
export const getShares = async () => axios.get(`${API_URL}/shares`);
export const getPlans = async () => axios.get(`${API_URL}/plans`);
export const getPlan = async (id: string | number) => axios.get(`${API_URL}/plans/${id}`);

export const getCoupons = async () => axios.get(`${API_URL}/coupons`);
export const getWalletTransactionHistory = async (data: any) => axios.get(`${API_URL}/transactions`,
    {
        params: {
            page: data.page,
            per_page: data.per_page,
            start_date: data.start_date,
            end_date: data.end_date,
            type: data.type,
            currency: data.currency,
        }
    });

export const verifyIdentity = async (data: any) => axios.post(`${API_URL}/identity-verification`, data,
    {
        headers: {
            "Content-Type": "multipart/form-data",
        }
    });