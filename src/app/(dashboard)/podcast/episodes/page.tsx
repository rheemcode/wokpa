"use client";

import Button from "@/components/button";
import Input from "@/components/input";
import { useAppSelector, useAppDispatch } from "@/hooks";
import { Switch, Listbox, Tab } from "@headlessui/react";
import { useRouter } from "next/navigation";
import { useState } from "react";



const GetPaidCard = () => {
    return (
        <div className="relative flex-1 rounded-3xl px-6 py-10" style={{ background: "linear-gradient(45deg, #083F62 0%, #25AEA4 100%)" }}>
            <div className="absolute top-0 right-0 flex justify-end">
                <div className=" p-4">
                    <button>
                        <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect width="36" height="36" rx="18" fill="white" fill-opacity="0.2" />
                            <path d="M23 13L13 23M13 13L23 23" stroke="white" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </button>
                </div>
            </div>
            <div className="flex items-center gap-4 justify-center">
                <div className="">
                    <img className="w-[7.5rem] h-[7.5rem]" src={("/images/cash.png")} alt="" />
                </div>
                <div className="flex-1">
                    <div>
                        <span className="font-bold text-2xl font-raleway text-[#F9FAFB]">
                            Get paid to podcast
                        </span>
                    </div>
                    <div>
                        <span className="">
                            Welcome to Wokpa. Do well to enjoy all our awesome features and start creating!!
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )
}

const AnalyticsCard = () => {
    return (
        <div className="relative flex-1 rounded-3xl px-6 py-10" style={{ background: "linear-gradient(27deg, #383C9E 0%, #6941C6 100%)" }}>
            <div className="absolute top-0 right-0 flex justify-end">
                <div className=" p-4">
                    <button>
                        <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect width="36" height="36" rx="18" fill="white" fill-opacity="0.2" />
                            <path d="M23 13L13 23M13 13L23 23" stroke="white" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </button>
                </div>
            </div>
            <div className="flex items-center gap-1 justify-center">
                <div className="">
                    <img className="w-48" src={("/images/finance.png")} alt="" />
                </div>
                <div className="flex-1">
                    <div>
                        <span className="font-bold text-2xl font-raleway text-[#F9FAFB]">
                            Real time analytics
                        </span>
                    </div>
                    <div>
                        <span className="">
                            Unlock podcast analytics with Wokpa's powerful cards and elevate your content.
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )
}

const EpisodeItem: React.FC<{ mode: "list" | "card" }> = ({ mode }) => {
    return (
        <>
            {
                mode == "list" ?
                    <div className="w-full flex justify-between items-center py-6">
                        <div className="flex gap-4">
                            <div className="h-full">
                                <div className="flex justify-between flex-col gap-2">
                                    <div>
                                        <div className="text-sm font-medium">
                                            Published:  17 May , 2023
                                        </div>
                                    </div>
                                    <div>
                                        <div className="font-semibold text-lg">
                                            The midnight miracle of the gospel of Jesus  -
                                        </div>
                                    </div>
                                    <div className="flex gap-2 items-center text-[#D0D5DD]">
                                        <div className="flex gap-1 items-center">
                                            <svg width="18" height="19" viewBox="0 0 18 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M9 13.6195L13.635 16.417L12.405 11.1445L16.5 7.59699L11.1075 7.13949L9 2.16699L6.8925 7.13949L1.5 7.59699L5.595 11.1445L4.365 16.417L9 13.6195Z" fill="#D0D5DD" />
                                            </svg>
                                            <div className="text-sm font-semibold">
                                                4.6
                                                <span className="font-normal ml-1">
                                                    (20)
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
                                        <div className="">
                                            <div className="text-[8px] text-[#0D0D0D] font-semibold bg-white rounded-full py-2 px-4">
                                                20 Episodes
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-1 text-sm">
                                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M6.66675 13.3337H9.33341V2.66699H6.66675V13.3337ZM2.66675 13.3337H5.33341V8.00033H2.66675V13.3337ZM10.6667 6.00033V13.3337H13.3334V6.00033H10.6667Z" fill="#E5F5F4" />
                                            </svg>

                                            <div>
                                                500 Plays
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
                                <button>
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
                                <button>
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
                    <div className="">
                        <div className="relative">
                            <img className="w-[240px] h-[240px] rounded-xl" src={("/images/product.jpeg")} alt="" />
                            <div className="absolute top-0 p-2">
                                <div className="text-[8px] text-[#0D0D0D] font-semibold bg-white rounded-full py-2 px-4">
                                    20 Episodes
                                </div>
                            </div>
                        </div>
                        <div className="mt-2">
                            <div className="font-semibold text-lg">
                                The midnight miracle ...
                            </div>
                        </div>
                        <div className="">
                            <div className="text-sm font-medium text-[#EAECF0]">
                                Published:  17 May , 2023
                            </div>
                        </div>
                        <div className="flex gap-4 items-center mt-1">
                            <div className="flex items-center gap-1 text-sm">
                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M6.66675 13.3337H9.33341V2.66699H6.66675V13.3337ZM2.66675 13.3337H5.33341V8.00033H2.66675V13.3337ZM10.6667 6.00033V13.3337H13.3334V6.00033H10.6667Z" fill="#E5F5F4" />
                                </svg>

                                <div>
                                    500 Plays
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
                        </div>
                    </div>
            }
        </>
    )
}

const EpisodesTable = () => {
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
                        <div className="">
                            <div className="relative">
                                <div className="absolute pl-3 flex items-center h-full justify-center">
                                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M17.5 17.5L14.5834 14.5833M16.6667 9.58333C16.6667 13.4954 13.4954 16.6667 9.58333 16.6667C5.67132 16.6667 2.5 13.4954 2.5 9.58333C2.5 5.67132 5.67132 2.5 9.58333 2.5C13.4954 2.5 16.6667 5.67132 16.6667 9.58333Z" stroke="#98A2B3" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </div>
                                <input type="text" placeholder="Search episodes" className="text-lg w-[292px] placeholder:text-[#98A2B3] pl-10 pr-3 py-2 rounded-lg border border-gray-300 bg-transparent" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="mt-8">
                <div>
                    <div className="overflow-x-auto mt-8 md:h-auto h-96 rounded-lg">
                        <table className="border-collapse table-auto w-full whitespace-nowrap">
                            <thead className="bg-[#101828] rounded-t-lg text-base  text-white text-left border-none">
                                <tr>
                                    <th className="py-4 pl-10 font-medium text-xs">Title</th>
                                    <th className="py-4 pl-6 font-medium text-xs">Author</th>
                                    <th className="py-4 pl-6 font-medium text-xs">Status</th>
                                    <th className="py-4 pl-6 font-medium text-xs">Visibility</th>
                                    <th className="py-4 pl-6 font-medium text-xs">Date published</th>
                                    <th className="py-4 pl-6 font-medium text-xs">Duration</th>
                                    <th className="py-4 pl-6 font-medium text-xs"></th>
                                </tr>
                            </thead>
                            <tbody className="bg-[#141414]">
                                {
                                    [1, 2, 3, 4, 5,].map(() => {
                                        return <tr>
                                            <td className="py-4 border-b pl-10 text-xs font-medium border-t border-[#667085]">
                                                <div className="">
                                                    <input className="rounded-md border-[#D0D5DD] bg-white" type="checkbox" name="" id="" />
                                                    <span className="ml-2">Episode sample 1</span>
                                                </div>
                                            </td>
                                            <td className="py-4 border-b pl-6 text-xs border-t border-[#667085] ">
                                                <div className="">
                                                    <span className="ml-2">Joseph Emmanuel</span>
                                                </div>
                                            </td>
                                            <td className="py-4 border-b pl-6 text-xs font-medium border-t border-[#667085] ">
                                                <div className="">
                                                    <span className="bg-green-200 text-green-600 rounded-full py-2 px-4">
                                                        Published
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="py-4 border-b pl-6 text-xs font-medium border-t border-[#667085] ">
                                                <div className="">
                                                    <span className="bg-[#CEEAB0] text-[#2B4212] rounded-full py-2 px-4">
                                                        Public
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="py-4 border-b pl-6 text-xs border-t border-[#667085] ">
                                                <div className="">
                                                    <span className="">
                                                        May, 16 2 023
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="py-4 border-b pl-6 text-xs border-t border-[#667085] ">
                                                <div className="">
                                                    <span className="">
                                                        10:12
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="py-4 border-b pl-6 text-xs font-medium border-t border-[#667085] ">
                                                <div className="flex items-center gap-6">
                                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M20.7914 12.6072C21.0355 12.398 21.1575 12.2933 21.2023 12.1688C21.2415 12.0596 21.2415 11.94 21.2023 11.8308C21.1575 11.7063 21.0355 11.6016 20.7914 11.3924L12.3206 4.13178C11.9004 3.77158 11.6903 3.59148 11.5124 3.58707C11.3578 3.58323 11.2101 3.65115 11.1124 3.77103C11 3.90897 11 4.18571 11 4.73918V9.03444C8.86532 9.40789 6.91159 10.4896 5.45971 12.1137C3.87682 13.8843 3.00123 16.1757 3 18.5508V19.1628C4.04934 17.8987 5.35951 16.8763 6.84076 16.1657C8.1467 15.5392 9.55842 15.1681 11 15.0703V19.2604C11 19.8139 11 20.0906 11.1124 20.2286C11.2101 20.3485 11.3578 20.4164 11.5124 20.4125C11.6903 20.4081 11.9004 20.228 12.3206 19.8678L20.7914 12.6072Z" stroke="#F9FAFB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                    </svg>
                                                    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M16.0002 10.6663C17.4668 10.6663 18.6668 9.46634 18.6668 7.99967C18.6668 6.53301 17.4668 5.33301 16.0002 5.33301C14.5335 5.33301 13.3335 6.53301 13.3335 7.99967C13.3335 9.46634 14.5335 10.6663 16.0002 10.6663ZM16.0002 13.333C14.5335 13.333 13.3335 14.533 13.3335 15.9997C13.3335 17.4663 14.5335 18.6663 16.0002 18.6663C17.4668 18.6663 18.6668 17.4663 18.6668 15.9997C18.6668 14.533 17.4668 13.333 16.0002 13.333ZM16.0002 21.333C14.5335 21.333 13.3335 22.533 13.3335 23.9997C13.3335 25.4663 14.5335 26.6663 16.0002 26.6663C17.4668 26.6663 18.6668 25.4663 18.6668 23.9997C18.6668 22.533 17.4668 21.333 16.0002 21.333Z" fill="#F2F4F7" />
                                                    </svg>

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

const EpisodesPage = () => {
    const user = useAppSelector(state => state.auth.user);
    const dispatch = useAppDispatch();
    const router = useRouter();


    return (
        <div id="dashboard">
            <div className="relative">
                <div className="flex gap-3 items-center">
                    <div className="text-sm font-medium">
                        All Podcasts
                    </div>
                    <div>
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M6 12L10 8L6 4" stroke="#D0D5DD" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </div>
                    <div className="text-sm font-medium">
                        Emax podcast
                    </div>
                    <div>
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M6 12L10 8L6 4" stroke="#D0D5DD" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </div>
                    <div className="text-sm font-medium text-[#66C6BF]">
                        Episodes
                    </div>
                </div>
                <div className="flex justify-end gap-2 mt-4">
                    <div>
                        <Button onClick={() => { router.push("/podcast/record-audio") }} className="!from-white !to-white !text-[#063150] text-sm font-semibold">
                            Record new episode
                        </Button>
                    </div>
                    <div>
                        <Button className="font-semibold text-sm">
                            Upload new episode
                        </Button>
                    </div>
                </div>

            </div>
            <div className="mt-8">
                <Tab.Group>
                    <Tab.List className="flex border-b gap-2 border-[#98A2B3]">

                        <Tab className="outline-none">
                            {({ selected }) => (
                                <div className={`${selected ? "border-b-2 border-[#0D8478]" : "text-[#98A2B3]"} font-semibold px-4 text-xl pb-2`}>
                                    Episode List
                                </div>
                            )}
                        </Tab>
                    </Tab.List>
                    <Tab.Panels>
                        <Tab.Panel>
                            <EpisodesTable />
                        </Tab.Panel>
                    </Tab.Panels>
                </Tab.Group>
            </div>
        </div>
    )
}

export default EpisodesPage