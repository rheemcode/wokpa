"use client";

import { archiveEpisode, getEpisodesArchive, getPodcastEpisodes, getPodcastsById, removeArchiveEpisode } from "@/app/api/publishers";
import Button from "@/components/button";
import Input from "@/components/input";
import Modal from "@/components/modal";
import { useAppSelector, useAppDispatch } from "@/hooks";
import { EpisodeModel } from "@/models/episode";
import { PodcastModel } from "@/models/podcast";
import { APICall } from "@/utils";
import { Listbox, Switch, Tab } from "@headlessui/react";
import moment from "moment";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useEffectOnce } from "react-use";
import ReactPaginate from "react-paginate";
import { refreshPodcasts } from "@/redux/podcast";


const PodcastView = ({ params }: { params: { podcastId: string } }) => {
    const user = useAppSelector(state => state.auth.user);
    const dispatch = useAppDispatch();

    const [currentPage, setCurrentPage] = useState(1);
    const [totalContent, setTotalContent] = useState(0);
    const [isArchive, setIsArchive] = useState(false);

    const [podcast, setPodcast] = useState<PodcastModel | null>(null);
    const [episodes, setEpidoes] = useState<EpisodeModel[]>([]);


    const filters = [
        { id: 1, name: 'Last 7 days' },
        { id: 2, name: 'By podcast title' },
        { id: 3, name: 'By listens' },
        { id: 4, name: 'Ascending' },
        { id: 5, name: 'Descending' },

    ]

    const [selectedFilter, setSelectedFilter] = useState(filters[0]);

    const handleGetEpisodes = async (page?: number) => {
        try {
            console.log(page)
            const response = await APICall(isArchive ? getEpisodesArchive : getPodcastEpisodes, [params.podcastId, page ? page : currentPage, 15]);
            setEpidoes(response.data.data.data);
            setTotalContent(response.data.data.total);

        } catch (error) {
            console.log(error)

        }
    }

    const handleGetPodcasts = async () => {
        try {
            const podcastResponse = await APICall(getPodcastsById, params.podcastId);
            setPodcast(podcastResponse.data.data);

        } catch (error) {
            console.log(error)
        }
    }

    const handlePageClick = (event: any) => {
        setCurrentPage(++event.selected + 1);
        handleGetEpisodes((event.selected + 1))
    };

    const handleRedorder = (v: any) => {
        try {

        } catch (error) {
            console.log(error)
        }
    }


    useEffect(() => {
        handleGetEpisodes(1)
    }, [isArchive]);

    useEffectOnce(() => {
        handleGetPodcasts();
    });

    return (
        <div id="dashboard">
            <div className="relative">
                <div className="flex gap-4 items-center">
                    <div className="text-sm font-medium">
                        <Link href="/dashboard">
                            All Podcasts
                        </Link>
                    </div>
                    <div>
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M6 12L10 8L6 4" stroke="#D0D5DD" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </div>
                    <div className="text-sm font-medium text-[#66C6BF]">
                        {podcast?.title}
                    </div>
                </div>


                <div className="border rounded-lg p-2 flex items-center gap-8 mt-6">
                    <div className="!w-[100px] !h-[100px]">
                        <img className="!w-[100px] !h-[100px] rounded-lg border-2 border-[#BEE7E4] object-cover" src={podcast?.picture_url} alt="" />
                    </div>
                    <div className="mt-2">
                        <div className="text-xl font-bold">
                            {podcast?.title}
                        </div>
                        <div className="text-sm font-medium mt-2">
                            By: {podcast?.title}
                        </div>
                        <div className="text-sm mt-2">
                            {podcast?.episode_count} Episodes
                        </div>
                    </div>
                </div>


                <div className="mt-8">
                    <Tab.Group>
                        <div className="flex gap-8">
                            <div className="flex-1">
                                <Tab.List className="flex border-b gap-2 border-[#98A2B3]">
                                    <div>
                                        <Tab className="outline-none">
                                            {({ selected }) => (
                                                <div className={`${selected ? "border-b-2 border-[#0D8478] text-[#0D8478]" : "text-[#98A2B3]"} font-semibold px-4 text-sm pb-2`}>
                                                    Overview
                                                </div>
                                            )}
                                        </Tab>
                                    </div>
                                    <div>
                                        <Tab className="outline-none">
                                            {({ selected }) => (
                                                <div className={`${selected ? "border-b-2 border-[#0D8478] text-[#0D8478]" : "text-[#98A2B3]"} font-semibold px-4 text-sm pb-2`}>
                                                    Trends
                                                </div>
                                            )}
                                        </Tab>
                                    </div>
                                    <div>
                                        <Tab className="outline-none">
                                            {({ selected }) => (
                                                <div className={`${selected ? "border-b-2 border-[#0D8478] text-[#0D8478]" : "text-[#98A2B3]"} font-semibold px-4 text-sm pb-2`}>
                                                    Episodes
                                                </div>
                                            )}
                                        </Tab>
                                    </div>
                                </Tab.List>
                            </div>
                            <Listbox value={selectedFilter} onChange={(v) => {
                                setSelectedFilter(v);
                                handleRedorder(v)
                            }} as={"div"} className="relative">
                                <Listbox.Button className="inline-flex justify-between text-xs font-medium gap-2 items-center border rounded-lg py-[10px] px-4 border-[#36FFE8] w-[244px]">
                                    {selectedFilter.name}
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                                    </svg>
                                </Listbox.Button>
                                <Listbox.Options className="absolute mt-1 w-[205px] overflow-auto bg-[#141414] rounded-lg text-xs font-medium z-20">
                                    <div className="p-2">
                                        {
                                            filters.slice(0, 3).map(filter => {
                                                return <Listbox.Option className={"cursor-pointer"} key={filter.name} value={filter}>
                                                    {({ active, selected }) => (
                                                        <div
                                                            className={`py-[0.63rem] px-2 rounded-lg hover:bg-[#1D2939] ${active || selected ? 'bg-[#1D2939]' : ""}`}
                                                        >
                                                            {filter.name}
                                                        </div>
                                                    )}
                                                </Listbox.Option>
                                            })
                                        }
                                    </div>
                                    <hr />
                                    <div className="p-2">
                                        <Listbox.Option className={"cursor-pointer"} value={filters[3]}>
                                            {({ active, selected }) => (
                                                <div
                                                    className={`py-[0.63rem] px-2 rounded-lg hover:bg-[#1D2939] ${active || selected ? 'bg-[#1D2939]' : ""}`}
                                                >
                                                    {filters[3].name}
                                                </div>
                                            )}
                                        </Listbox.Option>
                                        <Listbox.Option className={"cursor-pointer"} value={filters[4]}>
                                            {({ active, selected }) => (
                                                <div
                                                    className={`py-[0.63rem] px-2 rounded-lg hover:bg-[#1D2939] ${active || selected ? 'bg-[#1D2939]' : ""}`}
                                                >
                                                    {filters[4].name}

                                                </div>
                                            )}
                                        </Listbox.Option>
                                    </div>
                                </Listbox.Options>
                            </Listbox>
                            <button>
                                <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <rect width="40" height="40" rx="4" fill="#1D2939" />
                                    <path d="M29 23V24.2C29 25.8802 29 26.7202 28.673 27.362C28.3854 27.9265 27.9265 28.3854 27.362 28.673C26.7202 29 25.8802 29 24.2 29H15.8C14.1198 29 13.2798 29 12.638 28.673C12.0735 28.3854 11.6146 27.9265 11.327 27.362C11 26.7202 11 25.8802 11 24.2V23M25 18L20 23M20 23L15 18M20 23V11" stroke="#EAECF0" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                </svg>
                            </button>
                        </div>
                        <Tab.Panels>
                            <Tab.Panel>
                                <div className="mt-8">
                                    <div className="grid grid-cols-4 gap-8  ">

                                        {/* total income */}
                                        <div className="py-6 px-6 rounded-xl bg-grayTrue space-y-2">
                                            <div className="flex gap-6">
                                                <div>
                                                    <div className="text-sm font-medium">Tips & donations</div>
                                                </div>
                                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <g clip-path="url(#clip0_5552_61211)">
                                                        <path d="M9.99984 13.3346V10.0013M9.99984 6.66797H10.0082M18.3332 10.0013C18.3332 14.6037 14.6022 18.3346 9.99984 18.3346C5.39746 18.3346 1.6665 14.6037 1.6665 10.0013C1.6665 5.39893 5.39746 1.66797 9.99984 1.66797C14.6022 1.66797 18.3332 5.39893 18.3332 10.0013Z" stroke="#D0D5DD" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                                    </g>
                                                    <defs>
                                                        <clipPath id="clip0_5552_61211">
                                                            <rect width="20" height="20" fill="white" />
                                                        </clipPath>
                                                    </defs>
                                                </svg>
                                            </div>
                                            <div className="flex items-center">
                                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M7 20V5H7.5L16.5 19H17V4M4 10H20M4 14H20" stroke="#F9FAFB" stroke-width="2" />
                                                </svg>
                                                <div>
                                                    <span className="text-2xl font-raleway font-bold">
                                                        400k
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="mt-4 flex justify-between items-center">
                                                <div className="text-xs text-[#98A2B3]">All time</div>
                                                <span className="text-sm font-medium bg-[#ECFDF3] py-1 pl-[8px] pr-[10px] rounded-full inline-flex items-center gap-1 font-inter text-[#027A48]">
                                                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M6 9.5V2.5M6 2.5L2.5 6M6 2.5L9.5 6" stroke="#12B76A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                    </svg>
                                                    <span>7.2%</span>
                                                </span>

                                            </div>
                                        </div>

                                        {/* followers */}
                                        <div className="py-6 px-6 rounded-xl bg-grayTrue space-y-2">
                                            <div className="flex gap-6">
                                                <div>
                                                    <div className="text-sm font-medium">Wokpa ads</div>
                                                </div>
                                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <g clip-path="url(#clip0_5552_61211)">
                                                        <path d="M9.99984 13.3346V10.0013M9.99984 6.66797H10.0082M18.3332 10.0013C18.3332 14.6037 14.6022 18.3346 9.99984 18.3346C5.39746 18.3346 1.6665 14.6037 1.6665 10.0013C1.6665 5.39893 5.39746 1.66797 9.99984 1.66797C14.6022 1.66797 18.3332 5.39893 18.3332 10.0013Z" stroke="#D0D5DD" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                                    </g>
                                                    <defs>
                                                        <clipPath id="clip0_5552_61211">
                                                            <rect width="20" height="20" fill="white" />
                                                        </clipPath>
                                                    </defs>
                                                </svg>
                                            </div>
                                            <div className="flex items-center">
                                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M7 20V5H7.5L16.5 19H17V4M4 10H20M4 14H20" stroke="#F9FAFB" stroke-width="2" />
                                                </svg>
                                                <div>
                                                    <span className="text-2xl font-raleway font-bold">
                                                        2M
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="mt-4 flex justify-between items-center">
                                                <div className="text-xs text-[#98A2B3]">All time</div>
                                                <span className="text-sm font-medium bg-[#ECFDF3] py-1 pl-[8px] pr-[10px] rounded-full inline-flex items-center gap-1 font-inter text-[#027A48]">
                                                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M6 9.5V2.5M6 2.5L2.5 6M6 2.5L9.5 6" stroke="#12B76A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                    </svg>
                                                    <span>7.2%</span>
                                                </span>

                                            </div>
                                        </div>

                                        {/* listeners */}
                                        <div className="py-6 px-6 rounded-xl bg-grayTrue space-y-2">
                                            <div className="flex gap-6">
                                                <div>
                                                    <div className="text-sm font-medium">Listeners</div>
                                                </div>
                                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <g clip-path="url(#clip0_5552_61211)">
                                                        <path d="M9.99984 13.3346V10.0013M9.99984 6.66797H10.0082M18.3332 10.0013C18.3332 14.6037 14.6022 18.3346 9.99984 18.3346C5.39746 18.3346 1.6665 14.6037 1.6665 10.0013C1.6665 5.39893 5.39746 1.66797 9.99984 1.66797C14.6022 1.66797 18.3332 5.39893 18.3332 10.0013Z" stroke="#D0D5DD" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                                    </g>
                                                    <defs>
                                                        <clipPath id="clip0_5552_61211">
                                                            <rect width="20" height="20" fill="white" />
                                                        </clipPath>
                                                    </defs>
                                                </svg>
                                            </div>
                                            <div className="flex items-center">
                                                <div>
                                                    <span className="text-2xl font-raleway font-bold">
                                                        800
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="mt-4 flex justify-between items-center">
                                                <div className="text-xs text-[#98A2B3]">Last 30 days</div>
                                                <span className="text-sm font-medium bg-[#ECFDF3] py-1 pl-[8px] pr-[10px] rounded-full inline-flex items-center gap-1 font-inter text-[#027A48]">
                                                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M6 9.5V2.5M6 2.5L2.5 6M6 2.5L9.5 6" stroke="#12B76A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                    </svg>
                                                    <span>7.2%</span>
                                                </span>

                                            </div>
                                        </div>

                                        {/* listeners */}
                                        <div className="py-6 px-6 rounded-xl bg-grayTrue space-y-2">
                                            <div className="flex gap-6">
                                                <div>
                                                    <div className="text-sm font-medium">Plays</div>
                                                </div>
                                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <g clip-path="url(#clip0_5552_61211)">
                                                        <path d="M9.99984 13.3346V10.0013M9.99984 6.66797H10.0082M18.3332 10.0013C18.3332 14.6037 14.6022 18.3346 9.99984 18.3346C5.39746 18.3346 1.6665 14.6037 1.6665 10.0013C1.6665 5.39893 5.39746 1.66797 9.99984 1.66797C14.6022 1.66797 18.3332 5.39893 18.3332 10.0013Z" stroke="#D0D5DD" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                                    </g>
                                                    <defs>
                                                        <clipPath id="clip0_5552_61211">
                                                            <rect width="20" height="20" fill="white" />
                                                        </clipPath>
                                                    </defs>
                                                </svg>
                                            </div>
                                            <div className="flex items-center">
                                                <div>
                                                    <span className="text-2xl font-raleway font-bold">
                                                        100k
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="mt-4 flex justify-between items-center">
                                                <div className="text-xs text-[#98A2B3]">All time</div>
                                                <span className="text-sm font-medium bg-[#ECFDF3] py-1 pl-[8px] pr-[10px] rounded-full inline-flex items-center gap-1 font-inter text-[#027A48]">
                                                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M6 9.5V2.5M6 2.5L2.5 6M6 2.5L9.5 6" stroke="#12B76A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                    </svg>
                                                    <span>7.2%</span>
                                                </span>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Tab.Panel>
                            <Tab.Panel>
                                {/* <Episodes /> */}
                            </Tab.Panel>
                        </Tab.Panels>
                    </Tab.Group>

                </div>
            </div>

        </div>
    )
}

export default PodcastView