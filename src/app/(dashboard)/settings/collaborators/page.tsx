"use client";

import { getProfile } from "@/app/api/auth";
import Button from "@/components/button";
import { useAppSelector, useAppDispatch } from "@/hooks";
import { updateUser } from "@/redux/auth";
import { useState, useEffect } from "react";


const TransactionsTable = () => {
    const [viewMode, setViewMode] = useState<"list" | "card">("list");
    return (
        <div className="mt-4">
            <div className="mt-8">
                <div>
                    <div className="overflow-x-auto mt-8 md:h-auto h-96 rounded-lg">
                        <table className="border-collapse table-auto w-full whitespace-nowrap">
                            <thead className="bg-[#101828] rounded-t-lg text-base  text-white text-left border-none">
                                <tr>
                                    <th className="py-4 pl-10 font-medium text-xs">Name</th>
                                    <th className="py-4 pl-6 font-medium text-xs">Role</th>
                                    <th className="py-4 pl-6 font-medium text-xs">Email address</th>
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
                                                    <div className="inline-flex items-center gap-2 ml-2">
                                                        <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center">
                                                            <div className="font-semibold text-[#475467]">JE</div>
                                                        </div>
                                                        <span className="ml-2">Joseph Emmanuel</span>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="py-4 border-b pl-6 text-xs border-t border-[#667085] ">
                                                <div className="">
                                                    Owner
                                                </div>
                                            </td>
                                            <td className="py-4 border-b pl-6 text-xs font-medium border-t border-[#667085] ">
                                                <div>Joliufia@gmnau,.com</div>
                                            </td>

                                            <td className="py-4 border-b pl-6 text-xs font-medium border-t border-[#667085] ">
                                                <div className="flex items-center gap-6">
                                                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M13.3333 4.99935V4.33268C13.3333 3.39926 13.3333 2.93255 13.1517 2.57603C12.9919 2.26243 12.7369 2.00746 12.4233 1.84767C12.0668 1.66602 11.6001 1.66602 10.6667 1.66602H9.33333C8.39991 1.66602 7.9332 1.66602 7.57668 1.84767C7.26308 2.00746 7.00811 2.26243 6.84832 2.57603C6.66667 2.93255 6.66667 3.39926 6.66667 4.33268V4.99935M8.33333 9.58268V13.7493M11.6667 9.58268V13.7493M2.5 4.99935H17.5M15.8333 4.99935V14.3327C15.8333 15.7328 15.8333 16.4329 15.5608 16.9677C15.3212 17.4381 14.9387 17.8205 14.4683 18.0602C13.9335 18.3327 13.2335 18.3327 11.8333 18.3327H8.16667C6.76654 18.3327 6.06647 18.3327 5.53169 18.0602C5.06129 17.8205 4.67883 17.4381 4.43915 16.9677C4.16667 16.4329 4.16667 15.7328 4.16667 14.3327V4.99935" stroke="#F2F4F7" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round" />
                                                    </svg>
                                                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M2.39686 15.0973C2.43515 14.7527 2.45429 14.5804 2.50642 14.4194C2.55268 14.2765 2.61802 14.1405 2.70069 14.0152C2.79388 13.8739 2.91645 13.7513 3.1616 13.5061L14.1669 2.5009C15.0873 1.58043 16.5797 1.58043 17.5002 2.5009C18.4207 3.42138 18.4207 4.91376 17.5002 5.83424L6.49493 16.8395C6.24978 17.0846 6.12721 17.2072 5.9859 17.3004C5.86054 17.383 5.72457 17.4484 5.5817 17.4946C5.42067 17.5468 5.24838 17.5659 4.9038 17.6042L2.0835 17.9176L2.39686 15.0973Z" stroke="#F2F4F7" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round" />
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

const CollaboratorsPage = () => {
    const user = useAppSelector(state => state.auth.user);
    const dispatch = useAppDispatch();


    return (
        <div id="dashboard">
            <div className="relative">
                <div className="flex gap-3 items-center">
                    <div className="text-sm font-medium">
                        Emax podcast
                    </div>
                    <div>
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M6 12L10 8L6 4" stroke="#D0D5DD" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </div>
                    <div className="text-sm font-medium">
                        Settings
                    </div>
                    <div>
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M6 12L10 8L6 4" stroke="#D0D5DD" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </div>
                    <div className="text-sm font-medium text-[#66C6BF]">
                        Collaborators settings
                    </div>
                </div>
                <div className="pr-5 mt-5">
                    <div className={`font-semibold text-xl pb-2`}>
                        Collaborators:Emax Podcast
                    </div>
                    <div>
                        <p className="text-sm">
                            Collaborators listed here are granted full editorial control over the podcast.
                        </p>
                    </div>
                </div>

            </div>

            <div className="mt-8">
                <div className="flex justify-between">
                    <div>
                        <div className="font-semibold text-lg">
                            Collaborators
                        </div>
                        <div>
                            <p className="text-xs text-[#F2F4F7]">Detailed list of collaborators on this podcast</p>
                        </div>
                    </div>
                    <Button className="text-sm">
                        Add new collaborators
                    </Button>
                </div>
                <TransactionsTable />

            </div>
        </div>
    )
}

export default CollaboratorsPage