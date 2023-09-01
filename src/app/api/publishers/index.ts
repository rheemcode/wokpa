import { API_URL } from "@/utils";
import axios from "axios";

export const getPodcasts = async (page = 1, perPage = 10) => axios.get(`${API_URL}/publishers/podcasts?page=${page}&per_page=${perPage}`);
export const getPodcastsById = async (id: number | string) => axios.get(`${API_URL}/publishers/podcasts/${id}`);
export const getPodcastEpisodes = async (id: number | string, page = 1, perPage = 10) => axios.get(`${API_URL}/publishers/podcasts/${id}/episodes?page=${page}&per_page=${perPage}`);
export const getPodcastEpisode = async (podcastId: number | string, episodeId: number | string) => axios.get(`${API_URL}/publishers/podcasts/${podcastId}/episodes/${episodeId}`);
export const subscribeToPlan = async (id: number | string) => axios.post(`${API_URL}/publishers/plans/${id}/subscriptions`);
export const updateWebsiteSettings = async (data: any) => axios.post(`${API_URL}/publishers/settings/website-page`, data);
export const createCollaborators = async (data: any) => axios.post(`${API_URL}/publishers/collaborators`, data);
export const getCollaborators = async () => axios.get(`${API_URL}/publishers/collaborators`);
export const updateCollaborators = async (id: number, data: any) => axios.put(`${API_URL}/publishers/collaborators/${id}`, data);
export const deleteCollaborators = async (id: number) => axios.delete(`${API_URL}/publishers/collaborators/${id}`);

export const getVirtualAccount = async () => axios.get(`${API_URL}/publishers/virtual-accounts`);
export const getTransactions = async () => axios.get(`${API_URL}/publishers/virtual-accounts/transactions`);

export const getKYC = async () => axios.get(`${API_URL}/publishers/kyc`);
export const updateKYC = async () => axios.post(`${API_URL}/publishers/kyc`, {
    headers: {
        "Content-Type": "multipart/form-data",
    }
});
export const getBanks = async () => axios.get(`${API_URL}/publishers/banks`);
export const nameEnquiry = async (acct = "", bank_code = "") => axios.get(`${API_URL}/publishers/name-enquiry?account_number=${acct}&bank_code=${bank_code}`);


export const createPodcast = async (data: any) => axios.post(`${API_URL}/publishers/podcasts`, data, {
    headers: {
        "Content-Type": "multipart/form-data",
    }
});

export const updatePodcast = async (podcastId: string, data: any) => axios.post(`${API_URL}/publishers/podcasts/${podcastId}`, data, {
    headers: {
        "Content-Type": "multipart/form-data",
    }
});

export const uploadEpisode = async (podcastId: string, data: any) => axios.post(`${API_URL}/publishers/podcasts/${podcastId}/episodes`, data, {
    headers: {
        "Content-Type": "multipart/form-data",
    }
});
export const uploadEpisodeAudio = async (podcastId: string, episodeId: string, data: any) => axios.post(`${API_URL}/publishers/podcasts/${podcastId}/episodes/${episodeId}/audio`, data, {
    headers: {
        "Content-Type": "multipart/form-data",
    }
});
export const updateEpisode = async (podcastId: string, episodeId: string | number, data: any) => axios.post(`${API_URL}/publishers/podcasts/${podcastId}/episodes/${episodeId}`, data, {
    headers: {
        "Content-Type": "multipart/form-data",
    }
});
export const archiveEpisode = async (podcastId: string | number, episodeId: string | number) => axios.post(`${API_URL}/publishers/podcasts/${podcastId}/episodes/${episodeId}/archives`);
export const initiatePodcastImport = async (url: string) => axios.post(`${API_URL}/publishers/podcasts/import/verification`, { url });
export const importPodcast = async (url: string, otp: string) => axios.post(`${API_URL}/publishers/podcasts/import`, { url, otp });


export const updatePodcastGoals = async (data: any) => axios.put(`${API_URL}/publishers/profile/podcast-goals`, data);