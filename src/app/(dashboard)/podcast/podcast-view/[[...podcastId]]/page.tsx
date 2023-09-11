"use client";

import { archiveEpisode, getArchivePodcastsById, getEpisodesArchive, getPodcastEpisodes, getPodcastsById, removeArchiveEpisode } from "@/app/api/publishers";
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
import { EpisodeView } from "@/app/(dashboard)/components/Episode";
import { formatTimeW } from "@/utils/audio-player";

const PodcastView = ({ params }: { params: { podcastId: string } }) => {
    const user = useAppSelector(state => state.auth.user);
    const refresh = useAppSelector(state => state.podcasts.refresh)
    const dispatch = useAppDispatch();

    const [currentPage, setCurrentPage] = useState(1);
    const [totalContent, setTotalContent] = useState(0);
    const [isArchive, setIsArchive] = useState(params.podcastId[1] ? true : false);

    const [podcast, setPodcast] = useState<PodcastModel | null>(null);
    const [episodes, setEpidoes] = useState<EpisodeModel[]>([]);

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
            const podcastResponse = await APICall(isArchive ? getArchivePodcastsById : getPodcastsById, params.podcastId);
            setPodcast(podcastResponse.data.data);

        } catch (error) {
            console.log(error)
        }
    }

    const handlePageClick = (event: any) => {
        setCurrentPage(++event.selected + 1);
        handleGetEpisodes((event.selected + 1))
    };


    useEffect(() => {
        handleGetEpisodes(1)
    }, [isArchive, refresh]);

    useEffectOnce(() => {
        handleGetPodcasts();
    });

    return (
        <div id="dashboard">
            <div className="relative">
                <div>
                    <img className="rounded-t-3xl h-[160px] w-full o object-cover" src={("/images/gradient.jpeg")} alt="" />

                </div>
                <div className="pl-12 flex-1 py-6">
                    <div className="flex gap-4">

                        <div className="">
                            <div className="!w-[206px] !h-[206px] relative -top-16">
                                <img className="!w-[206px] !h-[206px] rounded-lg border-2 border-[#BEE7E4] object-cover" src={podcast?.picture_url} alt="" />
                            </div>
                        </div>
                        <div className="flex-1">
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
                            <div className="flex justify-between flex-col gap-3 mt-5">

                                <div>
                                    <div className="font-medium font-raleway text-3xl">
                                        {podcast?.title}
                                    </div>
                                </div>
                                <div className="text-sm text-[#D0D5DD]">
                                    <p dangerouslySetInnerHTML={{ __html: podcast?.description as string }} />

                                </div>
                                <div className="flex gap-2 items-center text-[#D0D5DD]">
                                    <div className="flex gap-1 items-center">
                                        <svg width="18" height="19" viewBox="0 0 18 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M9 13.6195L13.635 16.417L12.405 11.1445L16.5 7.59699L11.1075 7.13949L9 2.16699L6.8925 7.13949L1.5 7.59699L5.595 11.1445L4.365 16.417L9 13.6195Z" fill="#D0D5DD" />
                                        </svg>
                                        <div className="text-sm font-semibold">
                                            {podcast?.average_rating ? podcast.average_rating : "1.0"}
                                            <span className="font-normal ml-1">
                                                ({Number(podcast?.rating_count ? podcast.rating_count : "0")})
                                            </span>
                                        </div>
                                    </div>
                                    <svg width="4" height="5" viewBox="0 0 4 5" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <circle cx="2" cy="2.66699" r="2" fill="#D0D5DD" />
                                    </svg>

                                    <div className="text-sm">
                                        {podcast?.category_name}
                                    </div>

                                    <svg width="4" height="5" viewBox="0 0 4 5" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <circle cx="2" cy="2.66699" r="2" fill="#D0D5DD" />
                                    </svg>

                                    <div className="text-sm">
                                        Weekly
                                    </div>

                                </div>
                                <div className="space-y-5">
                                    <div className="flex gap-5 items-center">
                                        <div className="">
                                            <div className="text-xs text-[#0D0D0D] font-semibold bg-white rounded-full py-2 px-4">
                                                {Number(podcast?.episode_count)} Episodes
                                            </div>
                                        </div>
                                        <div>
                                            <div className="text-sm font-medium">
                                                Published:  {moment(podcast?.created_at).format("DD MMM, YYYY")}
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-1 text-sm">
                                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M6.66675 13.3337H9.33341V2.66699H6.66675V13.3337ZM2.66675 13.3337H5.33341V8.00033H2.66675V13.3337ZM10.6667 6.00033V13.3337H13.3334V6.00033H10.6667Z" fill="#E5F5F4" />
                                            </svg>

                                            <div>
                                                {podcast?.play_count} Plays
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-1 text-sm">
                                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M15.1333 7.66667L13.8004 9L12.4666 7.66667M13.9634 8.66667C13.9876 8.44778 14 8.22534 14 8C14 4.68629 11.3137 2 8 2C4.68629 2 2 4.68629 2 8C2 11.3137 4.68629 14 8 14C9.88484 14 11.5667 13.1309 12.6667 11.7716M8 4.66667V8L10 9.33333" stroke="#E5F5F4" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                            <div>
                                                {formatTimeW(podcast?.total_duration)}
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-1 text-sm">
                                            <div>
                                                ₦
                                            </div>
                                            <div>
                                                0
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex gap-4">
                                        <Link href={`/podcast/edit-podcast/${podcast?.id}`} className="rounded-[40px] px-5 font-medium inline-block bg-transparent text-sm !text-white border !border-[#042946] !py-2">Edit podcast</Link>
                                        <Button className="!from-white !to-white text-sm !text-[#042946] !py-2 font-semibold">Copy tipping link</Button>
                                        <Button className="text-sm !border-[#042946] !py-2">View live</Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
            <div className="mt-8">
                <div className="flex justify-end gap-4">
                    <Button className=" !from-transparent !to-transparent text-sm !text-white border !border-[#042946] !py-2">Record new episode</Button>
                    <Link href="/podcast/create-episode" className="rounded-[40px] px-5 inline-block bg-white text-sm !text-[#042946] !py-2 font-semibold">Upload new episode</Link>
                </div>
                <Tab.Group>
                    <Tab.List className="flex border-b gap-2 border-[#98A2B3]">
                        <Tab className="outline-none">
                            {({ selected }) => (
                                <div className={`${selected ? "border-b-2 border-[#0D8478]" : "text-[#98A2B3]"} font-semibold px-4 text-xl pb-2`}>
                                    All Episodes
                                </div>
                            )}
                        </Tab>
                    </Tab.List>
                    <Tab.Panels>
                        <Tab.Panel>
                            <EpisodeView
                                episodes={episodes}
                                isArchive={isArchive}
                                setIsArchive={(value) => setIsArchive(value)}
                                setEpisodes={(episodes: EpisodeModel[], page?: number) => {
                                    setEpidoes(episodes);
                                    page && setCurrentPage(page)
                                }} />
                            <div>
                                <div className="py-5 px-4 mt-6">
                                    <ReactPaginate
                                        breakLabel="..."
                                        containerClassName='flex items-center justify-between'
                                        nextClassName='flex-1 flex justify-end'
                                        pageClassName='flex items-center justify-center w-[40px] h-[40px]'
                                        pageLinkClassName='font-inter text-sm font-medium'
                                        activeClassName='bg-white text-dark rounded-full'
                                        previousClassName='flex-1 '
                                        previousLabel={
                                            <div className='flex items-center gap-2'>
                                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M15.8332 10.0003H4.1665M4.1665 10.0003L9.99984 15.8337M4.1665 10.0003L9.99984 4.16699" stroke="#EAECF0" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round" />
                                                </svg>
                                                <span className="text-sm font-semibold">
                                                    Previous
                                                </span>
                                            </div>
                                        }
                                        onPageChange={handlePageClick}
                                        pageRangeDisplayed={5}
                                        pageCount={Math.ceil(totalContent / 15)}
                                        nextLabel={
                                            <div className='flex items-center gap-2'>

                                                <span className="text-sm font-semibold">
                                                    Next
                                                </span>
                                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M4.1665 10.0003H15.8332M15.8332 10.0003L9.99984 4.16699M15.8332 10.0003L9.99984 15.8337" stroke="#EAECF0" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round" />
                                                </svg>


                                            </div>
                                        }
                                        renderOnZeroPageCount={null}
                                    />
                                </div>
                            </div>
                        </Tab.Panel>
                    </Tab.Panels>
                </Tab.Group>
            </div>
        </div>
    )
}

export default PodcastView