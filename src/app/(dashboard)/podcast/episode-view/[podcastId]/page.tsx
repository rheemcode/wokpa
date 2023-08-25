"use client";

import { archiveEpisode, getPodcastEpisodes, getPodcastsById } from "@/app/api/publishers";
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


const EpisodeItem: React.FC<{ mode: "list" | "card", episode: EpisodeModel }> = ({ mode, episode }) => {
    const [selectedEpisode, setSelectedEpisode] = useState<EpisodeModel | null>(null);
    const [showArchiveModal, setShowArchiveModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate = useRouter();

    const handleArchive = async () => {
        try {
            setLoading(true);
            const response = await APICall(archiveEpisode, [selectedEpisode?.podcast_id, selectedEpisode?.id], true);
            setShowArchiveModal(false);
            setLoading(false);
        } catch (error) {
            setShowArchiveModal(false);
            setLoading(false);
        }
    }

    return (
        <>
            <Modal size="sm" open={showArchiveModal} onClose={(val) => setShowArchiveModal(val)}>
                <div className="text-center text-2xl font-raleway font-bold py-5">
                    Archive this episode
                </div>
                <div className="py-4 text-center">
                    <div className="">
                        <Button onClick={handleArchive} className="!text-sm !py-[0.63rem] text-center">
                            {loading ? <svg className="w-5 h-5 inline" version="1.1" id="L9" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                                viewBox="0 0 100 100" enableBackground="new 0 0 0 0" xmlSpace="preserve">
                                <path fill="#fff" d="M73,50c0-12.7-10.3-23-23-23S27,37.3,27,50 M30.9,50c0-10.5,8.5-19.1,19.1-19.1S69.1,39.5,69.1,50">
                                    <animateTransform
                                        attributeName="transform"
                                        attributeType="XML"
                                        type="rotate"
                                        dur="1s"
                                        from="0 50 50"
                                        to="360 50 50"
                                        repeatCount="indefinite" />
                                </path>
                            </svg> :
                                "Continue"}
                        </Button>
                    </div>
                </div>
            </Modal>
            {
                mode == "list" ?
                    <div className="w-full flex justify-between items-center py-6">
                        <div className="flex gap-4">
                            <div className="h-full">
                                <div className="flex justify-between flex-col gap-2">
                                    <div>
                                        <div className="text-sm font-medium">
                                            Published:  {moment(episode.created_at).format("DD MMM, YYYY")}
                                        </div>
                                    </div>
                                    <div>
                                        <div className="font-semibold text-lg">
                                            {
                                                episode.title
                                            }
                                        </div>
                                    </div>
                                    <div className="flex gap-2 items-center text-[#D0D5DD]">
                                        <div className="flex gap-1 items-center">
                                            <svg width="18" height="19" viewBox="0 0 18 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M9 13.6195L13.635 16.417L12.405 11.1445L16.5 7.59699L11.1075 7.13949L9 2.16699L6.8925 7.13949L1.5 7.59699L5.595 11.1445L4.365 16.417L9 13.6195Z" fill="#D0D5DD" />
                                            </svg>
                                            <div className="text-sm font-semibold">
                                                {
                                                    Number(episode.average_rating)
                                                }
                                                <span className="font-normal ml-1">
                                                    ({Number(episode.rating_count)})
                                                </span>
                                            </div>
                                        </div>
                                        <svg width="4" height="5" viewBox="0 0 4 5" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <circle cx="2" cy="2.66699" r="2" fill="#D0D5DD" />
                                        </svg>

                                        <div className="text-sm">
                                            Society & Culture

                                        </div>

                                        <svg width="4" height="5" viewBox="0 0 4 5" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <circle cx="2" cy="2.66699" r="2" fill="#D0D5DD" />
                                        </svg>

                                        <div className="text-sm">
                                            Weekly
                                        </div>

                                    </div>
                                    <div className="flex gap-4 items-center">
                                        {/* <div className="">
                                            <div className="text-[8px] text-[#0D0D0D] font-semibold bg-white rounded-full py-2 px-4">
                                                20 Episodes
                                            </div>
                                        </div> */}
                                        <div className="flex items-center gap-1 text-sm">
                                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M6.66675 13.3337H9.33341V2.66699H6.66675V13.3337ZM2.66675 13.3337H5.33341V8.00033H2.66675V13.3337ZM10.6667 6.00033V13.3337H13.3334V6.00033H10.6667Z" fill="#E5F5F4" />
                                            </svg>

                                            <div>
                                                {episode.play_count} Plays
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-1 text-sm">
                                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M15.1333 7.66667L13.8004 9L12.4666 7.66667M13.9634 8.66667C13.9876 8.44778 14 8.22534 14 8C14 4.68629 11.3137 2 8 2C4.68629 2 2 4.68629 2 8C2 11.3137 4.68629 14 8 14C9.88484 14 11.5667 13.1309 12.6667 11.7716M8 4.66667V8L10 9.33333" stroke="#E5F5F4" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                            <div>

                                                4h 30min
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
                                </div>
                            </div>

                        </div>

                        {/* action buttons */}
                        <div className="flex gap-4">
                            <div className="text-center">
                                <a className="inline-block" onClick={() => navigate.push(`/podcast/edit-episode/${episode.podcast_id}/${episode.id}`)}>
                                    <div>
                                        <svg className="inline" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M11 4.00023H6.8C5.11984 4.00023 4.27976 4.00023 3.63803 4.32721C3.07354 4.61483 2.6146 5.07377 2.32698 5.63826C2 6.27999 2 7.12007 2 8.80023V17.2002C2 18.8804 2 19.7205 2.32698 20.3622C2.6146 20.9267 3.07354 21.3856 3.63803 21.6732C4.27976 22.0002 5.11984 22.0002 6.8 22.0002H15.2C16.8802 22.0002 17.7202 22.0002 18.362 21.6732C18.9265 21.3856 19.3854 20.9267 19.673 20.3622C20 19.7205 20 18.8804 20 17.2002V13.0002M7.99997 16.0002H9.67452C10.1637 16.0002 10.4083 16.0002 10.6385 15.945C10.8425 15.896 11.0376 15.8152 11.2166 15.7055C11.4184 15.5818 11.5914 15.4089 11.9373 15.063L21.5 5.50023C22.3284 4.6718 22.3284 3.32865 21.5 2.50023C20.6716 1.6718 19.3284 1.6718 18.5 2.50022L8.93723 12.063C8.59133 12.4089 8.41838 12.5818 8.29469 12.7837C8.18504 12.9626 8.10423 13.1577 8.05523 13.3618C7.99997 13.5919 7.99997 13.8365 7.99997 14.3257V16.0002Z" stroke="#EAECF0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </div>
                                    <div className="text-xs mt-1">
                                        Edit
                                    </div>
                                </a>
                            </div>
                            <div className="text-center">
                                <button>
                                    <div>
                                        <svg className="inline" width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M21.5 9.00001L21.5 3.00001M21.5 3.00001H15.5M21.5 3.00001L12.5 12M10.5 3H8.3C6.61984 3 5.77976 3 5.13803 3.32698C4.57354 3.6146 4.1146 4.07354 3.82698 4.63803C3.5 5.27976 3.5 6.11984 3.5 7.8V16.2C3.5 17.8802 3.5 18.7202 3.82698 19.362C4.1146 19.9265 4.57354 20.3854 5.13803 20.673C5.77976 21 6.61984 21 8.3 21H16.7C18.3802 21 19.2202 21 19.862 20.673C20.4265 20.3854 20.8854 19.9265 21.173 19.362C21.5 18.7202 21.5 17.8802 21.5 16.2V14" stroke="#EAECF0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </div>
                                    <div className="text-xs mt-1">
                                        Share
                                    </div>
                                </button>
                            </div>
                            <div>
                                <button onClick={() => {
                                    setSelectedEpisode(episode);
                                    setShowArchiveModal(true);
                                }}>
                                    <div>
                                        <svg className="inline" width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M4.5 7.9966C4.33599 7.99236 4.2169 7.98287 4.10982 7.96157C3.31644 7.80376 2.69624 7.18356 2.53843 6.39018C2.5 6.19698 2.5 5.96466 2.5 5.5C2.5 5.03534 2.5 4.80302 2.53843 4.60982C2.69624 3.81644 3.31644 3.19624 4.10982 3.03843C4.30302 3 4.53534 3 5 3H20C20.4647 3 20.697 3 20.8902 3.03843C21.6836 3.19624 22.3038 3.81644 22.4616 4.60982C22.5 4.80302 22.5 5.03534 22.5 5.5C22.5 5.96466 22.5 6.19698 22.4616 6.39018C22.3038 7.18356 21.6836 7.80376 20.8902 7.96157C20.7831 7.98287 20.664 7.99236 20.5 7.9966M10.5 13H14.5M4.5 8H20.5V16.2C20.5 17.8802 20.5 18.7202 20.173 19.362C19.8854 19.9265 19.4265 20.3854 18.862 20.673C18.2202 21 17.3802 21 15.7 21H9.3C7.61984 21 6.77976 21 6.13803 20.673C5.57354 20.3854 5.1146 19.9265 4.82698 19.362C4.5 18.7202 4.5 17.8802 4.5 16.2V8Z" stroke="#EAECF0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </div>
                                    <div className="text-xs mt-1">
                                        Archive
                                    </div>
                                </button>
                            </div>

                        </div>
                    </div>
                    :
                    <></>
            }
        </>
    )
}

const EpisodeView: React.FC<{ episodes: EpisodeModel[] }> = ({ episodes }) => {
    const [viewMode, setViewMode] = useState<"list" | "card">("list");
    return (
        <div className="mt-4">
            <div className="flex justify-between">
                <div className="flex gap-4">
                    <Listbox as={"div"} className="relative">
                        <Listbox.Button className="inline-flex w-full justify-center text-sm font-medium gap-2 items-center">
                            Active
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                            </svg>
                        </Listbox.Button>
                        <Listbox.Options className="absolute mt-1 w-[205px] overflow-auto bg-[#141414] p-2 rounded-lg text-sm font-medium">
                            <Listbox.Option value={"1"}>
                                {({ active }) => (
                                    <div
                                        className={`py-[0.63rem] px-2 rounded-lg hover:bg-[#1D2939] ${active ? 'bg-[#1D2939]' : ""}`}
                                    >
                                        All
                                    </div>
                                )}
                            </Listbox.Option>
                            <Listbox.Option value={"1"}>
                                {({ active }) => (
                                    <div
                                        className={`py-[0.63rem] px-2 rounded-lg hover:bg-[#1D2939] ${active ? 'bg-[#1D2939]' : ""}`}
                                    >
                                        Active
                                    </div>
                                )}
                            </Listbox.Option>
                            <Listbox.Option value={"1"}>
                                {({ active }) => (
                                    <div
                                        className={`py-[0.63rem] px-2 rounded-lg hover:bg-[#1D2939] ${active ? 'bg-[#1D2939]' : ""}`}
                                    >
                                        Archive
                                    </div>
                                )}
                            </Listbox.Option>

                        </Listbox.Options>
                    </Listbox>
                    <Listbox as={"div"} className="relative">
                        <Listbox.Button className="inline-flex w-full justify-center text-sm font-medium gap-2 items-center">
                            By date published
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                            </svg>
                        </Listbox.Button>
                        <Listbox.Options className="absolute mt-1 w-[205px] overflow-auto bg-[#141414] rounded-lg text-sm font-medium">
                            <div className="p-2">
                                <Listbox.Option value={"1"}>
                                    {({ active }) => (
                                        <div
                                            className={`py-[0.63rem] px-2 rounded-lg hover:bg-[#1D2939] ${active ? 'bg-[#1D2939]' : ""}`}
                                        >
                                            By podccast title
                                        </div>
                                    )}
                                </Listbox.Option>
                                <Listbox.Option value={"1"}>
                                    {({ active }) => (
                                        <div
                                            className={`py-[0.63rem] px-2 rounded-lg hover:bg-[#1D2939] ${active ? 'bg-[#1D2939]' : ""}`}
                                        >
                                            By date published
                                        </div>
                                    )}
                                </Listbox.Option>
                                <Listbox.Option value={"1"}>
                                    {({ active }) => (
                                        <div
                                            className={`py-[0.63rem] px-2 rounded-lg hover:bg-[#1D2939] ${active ? 'bg-[#1D2939]' : ""}`}
                                        >
                                            By listens
                                        </div>
                                    )}
                                </Listbox.Option>
                            </div>
                            <hr />
                            <div className="p-2">
                                <Listbox.Option value={"1"}>
                                    {({ active }) => (
                                        <div
                                            className={`py-[0.63rem] px-2 rounded-lg hover:bg-[#1D2939] ${active ? 'bg-[#1D2939]' : ""}`}
                                        >
                                            Ascending
                                        </div>
                                    )}
                                </Listbox.Option>
                                <Listbox.Option value={"1"}>
                                    {({ active }) => (
                                        <div
                                            className={`py-[0.63rem] px-2 rounded-lg hover:bg-[#1D2939] ${active ? 'bg-[#1D2939]' : ""}`}
                                        >
                                            Descending
                                        </div>
                                    )}
                                </Listbox.Option>
                            </div>
                        </Listbox.Options>
                    </Listbox>
                </div>
                <div>
                    <div className="flex items-center gap-4">
                        <div>
                            <button onClick={() => setViewMode("list")} className={`outline-none rounded ${viewMode == "list" && "bg-[#475467]"}`}>
                                <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M25 16L13 16M25 10L13 10M25 22L13 22M9 16C9 16.5523 8.55228 17 8 17C7.44772 17 7 16.5523 7 16C7 15.4477 7.44772 15 8 15C8.55228 15 9 15.4477 9 16ZM9 10C9 10.5523 8.55228 11 8 11C7.44772 11 7 10.5523 7 10C7 9.44772 7.44772 9 8 9C8.55228 9 9 9.44772 9 10ZM9 22C9 22.5523 8.55228 23 8 23C7.44772 23 7 22.5523 7 22C7 21.4477 7.44772 21 8 21C8.55228 21 9 21.4477 9 22Z" stroke="#D0D5DD" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </button>
                        </div>
                        <div>
                            <button onClick={() => setViewMode("card")} className={`outline-none rounded ${viewMode != "list" && "bg-[#475467]"}`}>
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M8.4 3H4.6C4.03995 3 3.75992 3 3.54601 3.10899C3.35785 3.20487 3.20487 3.35785 3.10899 3.54601C3 3.75992 3 4.03995 3 4.6V8.4C3 8.96005 3 9.24008 3.10899 9.45399C3.20487 9.64215 3.35785 9.79513 3.54601 9.89101C3.75992 10 4.03995 10 4.6 10H8.4C8.96005 10 9.24008 10 9.45399 9.89101C9.64215 9.79513 9.79513 9.64215 9.89101 9.45399C10 9.24008 10 8.96005 10 8.4V4.6C10 4.03995 10 3.75992 9.89101 3.54601C9.79513 3.35785 9.64215 3.20487 9.45399 3.10899C9.24008 3 8.96005 3 8.4 3Z" stroke="#D0D5DD" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M19.4 3H15.6C15.0399 3 14.7599 3 14.546 3.10899C14.3578 3.20487 14.2049 3.35785 14.109 3.54601C14 3.75992 14 4.03995 14 4.6V8.4C14 8.96005 14 9.24008 14.109 9.45399C14.2049 9.64215 14.3578 9.79513 14.546 9.89101C14.7599 10 15.0399 10 15.6 10H19.4C19.9601 10 20.2401 10 20.454 9.89101C20.6422 9.79513 20.7951 9.64215 20.891 9.45399C21 9.24008 21 8.96005 21 8.4V4.6C21 4.03995 21 3.75992 20.891 3.54601C20.7951 3.35785 20.6422 3.20487 20.454 3.10899C20.2401 3 19.9601 3 19.4 3Z" stroke="#D0D5DD" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M19.4 14H15.6C15.0399 14 14.7599 14 14.546 14.109C14.3578 14.2049 14.2049 14.3578 14.109 14.546C14 14.7599 14 15.0399 14 15.6V19.4C14 19.9601 14 20.2401 14.109 20.454C14.2049 20.6422 14.3578 20.7951 14.546 20.891C14.7599 21 15.0399 21 15.6 21H19.4C19.9601 21 20.2401 21 20.454 20.891C20.6422 20.7951 20.7951 20.6422 20.891 20.454C21 20.2401 21 19.9601 21 19.4V15.6C21 15.0399 21 14.7599 20.891 14.546C20.7951 14.3578 20.6422 14.2049 20.454 14.109C20.2401 14 19.9601 14 19.4 14Z" stroke="#D0D5DD" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M8.4 14H4.6C4.03995 14 3.75992 14 3.54601 14.109C3.35785 14.2049 3.20487 14.3578 3.10899 14.546C3 14.7599 3 15.0399 3 15.6V19.4C3 19.9601 3 20.2401 3.10899 20.454C3.20487 20.6422 3.35785 20.7951 3.54601 20.891C3.75992 21 4.03995 21 4.6 21H8.4C8.96005 21 9.24008 21 9.45399 20.891C9.64215 20.7951 9.79513 20.6422 9.89101 20.454C10 20.2401 10 19.9601 10 19.4V15.6C10 15.0399 10 14.7599 9.89101 14.546C9.79513 14.3578 9.64215 14.2049 9.45399 14.109C9.24008 14 8.96005 14 8.4 14Z" stroke="#D0D5DD" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </button>
                        </div>
                        <div className="">
                            <div className="relative">
                                <div className="absolute pl-3 flex items-center h-full justify-center">
                                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M17.5 17.5L14.5834 14.5833M16.6667 9.58333C16.6667 13.4954 13.4954 16.6667 9.58333 16.6667C5.67132 16.6667 2.5 13.4954 2.5 9.58333C2.5 5.67132 5.67132 2.5 9.58333 2.5C13.4954 2.5 16.6667 5.67132 16.6667 9.58333Z" stroke="#98A2B3" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </div>
                                <input type="text" placeholder="Search" className="text-lg w-[292px] placeholder:text-[#98A2B3] pl-10 pr-3 py-2 rounded-lg border border-gray-300 bg-transparent" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="mt-8">
                {
                    viewMode == "list" ? <div className={`${viewMode == "list" ? "divide-y pr-12" : "grid grid-cols-4 gap-y-8"}`}>
                        {
                            episodes.map((episode) => {
                                return <EpisodeItem key={episode.id + "ep"} episode={episode} mode={viewMode} />

                            })
                        }
                    </div> :
                        <EpisodeTableView episodes={episodes} />
                }
            </div>
        </div >
    )
}

const EpisodeTableView: React.FC<{ episodes: EpisodeModel[] }> = ({ episodes }) => {
    const [viewMode, setViewMode] = useState<"list" | "card">("list");
    const [selectedEpisode, setSelectedEpisode] = useState<EpisodeModel | null>(null);
    const [showArchiveModal, setShowArchiveModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate = useRouter();

    const handleArchive = async () => {
        try {
            setLoading(true);
            const response = await APICall(archiveEpisode, [selectedEpisode?.podcast_id, selectedEpisode?.id], true);
            setShowArchiveModal(false);
            setLoading(false);
        } catch (error) {
            setShowArchiveModal(false);
            setLoading(false);
        }
    }

    return (
        <div className="mt-4">
            <Modal size="sm" open={showArchiveModal} onClose={(val) => setShowArchiveModal(val)}>
                <div className="text-center text-2xl font-raleway font-bold py-5">
                    Archive this episode
                </div>
                <div className="py-4 text-center">
                    <div className="">
                        <Button onClick={handleArchive} className="!text-sm !py-[0.63rem] text-center">
                            {loading ? <svg className="w-5 h-5 inline" version="1.1" id="L9" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                                viewBox="0 0 100 100" enableBackground="new 0 0 0 0" xmlSpace="preserve">
                                <path fill="#fff" d="M73,50c0-12.7-10.3-23-23-23S27,37.3,27,50 M30.9,50c0-10.5,8.5-19.1,19.1-19.1S69.1,39.5,69.1,50">
                                    <animateTransform
                                        attributeName="transform"
                                        attributeType="XML"
                                        type="rotate"
                                        dur="1s"
                                        from="0 50 50"
                                        to="360 50 50"
                                        repeatCount="indefinite" />
                                </path>
                            </svg> :
                                "Continue"}
                        </Button>
                    </div>
                </div>
            </Modal>
            <div className="mt-8">
                <div>
                    <div className="overflow-x-auto mt-8 md:h-auto h-96 rounded-lg">
                        <table className="border-collapse table-auto w-full whitespace-nowrap">
                            <thead className="bg-[#101828] rounded-t-lg text-base  text-white text-left border-none">
                                <tr>
                                    <th className="py-4 pl-10 font-medium text-xs">Title</th>
                                    <th className="py-4 pl-6 font-medium text-xs">Likes</th>
                                    <th className="py-4 pl-6 font-medium text-xs">Status</th>
                                    <th className="py-4 pl-6 font-medium text-xs">Visibility</th>
                                    <th className="py-4 pl-6 font-medium text-xs">Date published</th>
                                    <th className="py-4 pl-6 font-medium text-xs">Rating</th>
                                    <th className="py-4 pl-6 font-medium text-xs"></th>
                                </tr>
                            </thead>
                            <tbody className="bg-[#141414]">
                                {
                                    episodes.map((episode) => {
                                        return <tr>
                                            <td className="py-4 border-b pl-10 text-xs font-medium border-t border-[#667085]">
                                                <div className="">
                                                    <input className="rounded-md border-[#D0D5DD] bg-white" type="checkbox" name="" id="" />
                                                    <span className="ml-2">{episode.title}</span>
                                                </div>
                                            </td>
                                            <td className="py-4 border-b pl-6 text-xs font-medium border-t border-[#667085] ">
                                                <div>{episode.like_count}</div>
                                            </td>
                                            <td className="py-4 border-b pl-6 text-xs border-t border-[#667085] ">
                                                <div className="">
                                                    <span className="inline-flex gap-1 text-sm font-medium rounded-full py-1 px-3  text-green-500 bg-green-100 items-center">
                                                        <span>
                                                            {episode.status}
                                                        </span>
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="py-4 border-b pl-6 text-xs font-medium border-t border-[#667085] ">
                                                <span className="inline-flex gap-1 text-sm font-medium rounded-full py-1 px-3 text-red-500 bg-red-100 items-center">
                                                    <span>
                                                        {episode.visibility}
                                                    </span>
                                                </span>
                                            </td>
                                            <td className="py-4 border-b pl-6 text-xs font-medium border-t border-[#667085] ">
                                                <div className="">
                                                    {moment(episode.created_at).format("MMM, DD YYYY")}
                                                </div>
                                            </td>
                                            <td className="py-4 border-b pl-6 text-xs border-t border-[#667085] ">
                                                <div className="text-sm font-bold ">
                                                    {episode.average_rating}
                                                </div>
                                            </td>


                                            <td className="py-4 border-b pl-6 text-xs font-medium border-t border-[#667085] ">
                                                <div className="flex gap-4">
                                                    <div className="text-center">
                                                        <button onClick={() => navigate.push(`/podcast/edit-episode/${episode.podcast_id}/${episode.id}`)}>
                                                            <div>
                                                                <svg className="inline" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                    <path d="M11 4.00023H6.8C5.11984 4.00023 4.27976 4.00023 3.63803 4.32721C3.07354 4.61483 2.6146 5.07377 2.32698 5.63826C2 6.27999 2 7.12007 2 8.80023V17.2002C2 18.8804 2 19.7205 2.32698 20.3622C2.6146 20.9267 3.07354 21.3856 3.63803 21.6732C4.27976 22.0002 5.11984 22.0002 6.8 22.0002H15.2C16.8802 22.0002 17.7202 22.0002 18.362 21.6732C18.9265 21.3856 19.3854 20.9267 19.673 20.3622C20 19.7205 20 18.8804 20 17.2002V13.0002M7.99997 16.0002H9.67452C10.1637 16.0002 10.4083 16.0002 10.6385 15.945C10.8425 15.896 11.0376 15.8152 11.2166 15.7055C11.4184 15.5818 11.5914 15.4089 11.9373 15.063L21.5 5.50023C22.3284 4.6718 22.3284 3.32865 21.5 2.50023C20.6716 1.6718 19.3284 1.6718 18.5 2.50022L8.93723 12.063C8.59133 12.4089 8.41838 12.5818 8.29469 12.7837C8.18504 12.9626 8.10423 13.1577 8.05523 13.3618C7.99997 13.5919 7.99997 13.8365 7.99997 14.3257V16.0002Z" stroke="#EAECF0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                                </svg>
                                                            </div>
                                                            <div className="text-xs mt-1">
                                                                Edit
                                                            </div>
                                                        </button>
                                                    </div>
                                                    <div className="text-center">
                                                        <button>
                                                            <div>
                                                                <svg className="inline" width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                    <path d="M21.5 9.00001L21.5 3.00001M21.5 3.00001H15.5M21.5 3.00001L12.5 12M10.5 3H8.3C6.61984 3 5.77976 3 5.13803 3.32698C4.57354 3.6146 4.1146 4.07354 3.82698 4.63803C3.5 5.27976 3.5 6.11984 3.5 7.8V16.2C3.5 17.8802 3.5 18.7202 3.82698 19.362C4.1146 19.9265 4.57354 20.3854 5.13803 20.673C5.77976 21 6.61984 21 8.3 21H16.7C18.3802 21 19.2202 21 19.862 20.673C20.4265 20.3854 20.8854 19.9265 21.173 19.362C21.5 18.7202 21.5 17.8802 21.5 16.2V14" stroke="#EAECF0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                                </svg>
                                                            </div>
                                                            <div className="text-xs mt-1">
                                                                Share
                                                            </div>
                                                        </button>
                                                    </div>
                                                    <div>
                                                        <button onClick={() => {
                                                            setSelectedEpisode(episode);
                                                            setShowArchiveModal(true);
                                                        }}>
                                                            <div>
                                                                <svg className="inline" width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                    <path d="M4.5 7.9966C4.33599 7.99236 4.2169 7.98287 4.10982 7.96157C3.31644 7.80376 2.69624 7.18356 2.53843 6.39018C2.5 6.19698 2.5 5.96466 2.5 5.5C2.5 5.03534 2.5 4.80302 2.53843 4.60982C2.69624 3.81644 3.31644 3.19624 4.10982 3.03843C4.30302 3 4.53534 3 5 3H20C20.4647 3 20.697 3 20.8902 3.03843C21.6836 3.19624 22.3038 3.81644 22.4616 4.60982C22.5 4.80302 22.5 5.03534 22.5 5.5C22.5 5.96466 22.5 6.19698 22.4616 6.39018C22.3038 7.18356 21.6836 7.80376 20.8902 7.96157C20.7831 7.98287 20.664 7.99236 20.5 7.9966M10.5 13H14.5M4.5 8H20.5V16.2C20.5 17.8802 20.5 18.7202 20.173 19.362C19.8854 19.9265 19.4265 20.3854 18.862 20.673C18.2202 21 17.3802 21 15.7 21H9.3C7.61984 21 6.77976 21 6.13803 20.673C5.57354 20.3854 5.1146 19.9265 4.82698 19.362C4.5 18.7202 4.5 17.8802 4.5 16.2V8Z" stroke="#EAECF0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                                </svg>
                                                            </div>
                                                            <div className="text-xs mt-1">
                                                                Archive
                                                            </div>
                                                        </button>
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                    })
                                }

                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div >
    )
}

const EpisodeViewPage = ({ params }: { params: { podcastId: string } }) => {
    const user = useAppSelector(state => state.auth.user);
    const dispatch = useAppDispatch();

    const [podcast, setPodcast] = useState<PodcastModel | null>(null);
    const [episodes, setEpidoes] = useState<EpisodeModel[]>([]);

    useEffect(() => {
        (async () => {
            try {
                const podcastResponse = await getPodcastsById(params.podcastId);
                setPodcast(podcastResponse.data.data);

                const episodesResponse = await getPodcastEpisodes(params.podcastId);
                setEpidoes(episodesResponse.data.data.data);


            } catch (error) {

            }
        })()
    }, [])

    return (
        <div id="dashboard">
            <div className="relative">
                <div>
                    <img className="rounded-t-3xl h-[160px] w-full o object-cover" src={("/images/gradient.jpeg")} alt="" />

                </div>
                <div className="pl-12 flex-1 py-6">
                    <div className="flex gap-4">

                        <div className="relative -top-16">
                            <img className="w-[206px] h-[206px] rounded-lg border-2 border-[#BEE7E4] object-cover" src={podcast?.picture_url} alt="" />
                        </div>
                        <div className="flex-1">
                            <div className="flex gap-4 items-center">
                                <div className="text-sm font-medium">
                                    All Podcasts
                                </div>
                                <div>
                                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M6 12L10 8L6 4" stroke="#D0D5DD" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </div>
                                <div className="text-sm font-medium text-[#66C6BF]">
                                    The midnight
                                </div>
                            </div>
                            <div className="flex justify-between flex-col gap-3 mt-5">

                                <div>
                                    <div className="font-medium font-raleway text-3xl">
                                        {podcast?.title}
                                    </div>
                                </div>
                                <div className="text-sm text-[#D0D5DD]">
                                    {podcast?.description}
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
                                                4h 30min
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-1 text-sm">
                                            <div>
                                                ₦
                                            </div>
                                            <div>
                                                100k
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex gap-4">
                                        <Button className="!from-transparent !to-transparent text-sm !text-white border !border-[#042946] !py-2">Edit podcast</Button>
                                        <Button className="!from-white !to-white text-sm !text-[#042946] !py-2 font-semibold">Copy tipping link</Button>
                                        <Button className="text-sm !border-[#042946] !py-2">View live</Button>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                    <div className="flex justify-end gap-4">
                        <Button className=" !from-transparent !to-transparent text-sm !text-white border !border-[#042946] !py-2">Record new episode</Button>
                        <Link href="/podcast/create-episode" className="rounded-[40px] px-5 inline-block bg-white text-sm !text-[#042946] !py-2 font-semibold">Upload new episode</Link>
                    </div>
                </div>
            </div>
            <div className="mt-8">
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
                            <EpisodeView episodes={episodes} />
                        </Tab.Panel>
                    </Tab.Panels>
                </Tab.Group>
            </div>
        </div>
    )
}

export default EpisodeViewPage