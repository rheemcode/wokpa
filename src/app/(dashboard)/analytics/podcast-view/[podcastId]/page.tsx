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
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
    {
        name: 'Page A',
        uv: 4000,
        pv: 2400,
        amt: 2400,
    },
    {
        name: 'Page B',
        uv: 3000,
        pv: 1398,
        amt: 2210,
    },
    {
        name: 'Page C',
        uv: 2000,
        pv: 9800,
        amt: 2290,
    },
    {
        name: 'Page D',
        uv: 2780,
        pv: 3908,
        amt: 2000,
    },
    {
        name: 'Page E',
        uv: 1890,
        pv: 4800,
        amt: 2181,
    },
    {
        name: 'Page F',
        uv: 2390,
        pv: 3800,
        amt: 2500,
    },
    {
        name: 'Page G',
        uv: 3490,
        pv: 4300,
        amt: 2100,
    },
];


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
                                <div className="mt-8 space-y-8">
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

                                    <div className="grid grid-cols-2 gap-8 ">

                                        <div className="">
                                            <div className="text-sm">
                                                New followers
                                            </div>
                                            {/* total income */}
                                            <div className="py-6 px-6 rounded-xl mt-3 bg-white space-y-10">
                                                <div className="flex gap-4 py-1">
                                                    <div className="flex-1">
                                                        <div className="text-3xl font-raleway font-medium text-[#101828]">2k</div>
                                                    </div>
                                                    <div className="flex items-center">
                                                        <div className="flex gap-1 items-center">
                                                            <svg width="51" height="20" viewBox="0 0 51 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                <path d="M18.3332 5.83203L11.776 12.3892C11.446 12.7192 11.281 12.8842 11.0907 12.9461C10.9233 13.0004 10.743 13.0004 10.5757 12.9461C10.3854 12.8842 10.2204 12.7192 9.89036 12.3892L7.60931 10.1082C7.2793 9.77816 7.11429 9.61315 6.92402 9.55133C6.75665 9.49695 6.57636 9.49695 6.40899 9.55133C6.21872 9.61315 6.05371 9.77816 5.72369 10.1082L1.6665 14.1654M18.3332 5.83203H12.4998M18.3332 5.83203V11.6654" stroke="#17B26A" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                                                <path d="M24.378 7.006V4.78H28.256V15H25.764V7.006H24.378ZM37.0897 6.866H32.7217V8.798C32.9083 8.59267 33.1697 8.42467 33.5057 8.294C33.8417 8.16333 34.2057 8.098 34.5977 8.098C35.2977 8.098 35.8763 8.25667 36.3337 8.574C36.8003 8.89133 37.141 9.302 37.3557 9.806C37.5703 10.31 37.6777 10.856 37.6777 11.444C37.6777 12.536 37.3697 13.404 36.7537 14.048C36.1377 14.6827 35.2697 15 34.1497 15C33.403 15 32.7543 14.874 32.2037 14.622C31.653 14.3607 31.2283 14.0013 30.9297 13.544C30.631 13.0867 30.4677 12.5593 30.4397 11.962H32.7777C32.8337 12.2513 32.969 12.494 33.1837 12.69C33.3983 12.8767 33.6923 12.97 34.0657 12.97C34.5043 12.97 34.831 12.83 35.0457 12.55C35.2603 12.27 35.3677 11.8967 35.3677 11.43C35.3677 10.9727 35.2557 10.6227 35.0317 10.38C34.8077 10.1373 34.481 10.016 34.0517 10.016C33.7343 10.016 33.473 10.0953 33.2677 10.254C33.0623 10.4033 32.927 10.604 32.8617 10.856H30.5517V4.766H37.0897V6.866ZM38.8031 7.356C38.8031 6.6 39.0178 6.01667 39.4471 5.606C39.8858 5.19533 40.4505 4.99 41.1411 4.99C41.8318 4.99 42.3918 5.19533 42.8211 5.606C43.2505 6.01667 43.4651 6.6 43.4651 7.356C43.4651 8.112 43.2505 8.69533 42.8211 9.106C42.3918 9.51667 41.8318 9.722 41.1411 9.722C40.4505 9.722 39.8858 9.51667 39.4471 9.106C39.0178 8.69533 38.8031 8.112 38.8031 7.356ZM48.3091 5.144L42.9191 15H40.6091L45.9991 5.144H48.3091ZM41.1271 6.39C40.6791 6.39 40.4551 6.712 40.4551 7.356C40.4551 7.99067 40.6791 8.308 41.1271 8.308C41.3418 8.308 41.5098 8.22867 41.6311 8.07C41.7525 7.91133 41.8131 7.67333 41.8131 7.356C41.8131 6.712 41.5845 6.39 41.1271 6.39ZM45.4671 12.788C45.4671 12.032 45.6818 11.4487 46.1111 11.038C46.5405 10.6273 47.1005 10.422 47.7911 10.422C48.4818 10.422 49.0418 10.6273 49.4711 11.038C49.9005 11.4487 50.1151 12.032 50.1151 12.788C50.1151 13.544 49.9005 14.1273 49.4711 14.538C49.0418 14.9487 48.4818 15.154 47.7911 15.154C47.1005 15.154 46.5405 14.9487 46.1111 14.538C45.6818 14.1273 45.4671 13.544 45.4671 12.788ZM47.7771 11.822C47.5625 11.822 47.3945 11.9013 47.2731 12.06C47.1611 12.2187 47.1051 12.4613 47.1051 12.788C47.1051 13.4227 47.3291 13.74 47.7771 13.74C47.9918 13.74 48.1598 13.6607 48.2811 13.502C48.4025 13.3433 48.4631 13.1053 48.4631 12.788C48.4631 12.4707 48.4025 12.2327 48.2811 12.074C48.1598 11.906 47.9918 11.822 47.7771 11.822Z" fill="#067647" />
                                                            </svg>
                                                            <span className="text-sm font-bold text-[#067647]">15%</span>
                                                        </div>
                                                        <span className="text-sm font-[#1D2939]">
                                                            vs last month
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className="w-full">
                                                    <ResponsiveContainer width="100%" height="100%">
                                                        <LineChart width={300} height={100} data={data}>
                                                            <Line type="monotone" dataKey="pv" stroke="#8884d8" strokeWidth={2} />
                                                        </LineChart>
                                                    </ResponsiveContainer>
                                                </div>
                                            </div>
                                        </div>
                                        {/* followers */}
                                        <div className="py-6 px-6 rounded-xl bg-white space-y-2">
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