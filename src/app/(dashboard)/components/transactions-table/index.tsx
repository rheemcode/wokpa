"use client";

import { useState } from "react";

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
                                    <th className="py-4 pl-10 font-medium text-xs">Purpose</th>
                                    <th className="py-4 pl-6 font-medium text-xs">Type</th>
                                    <th className="py-4 pl-6 font-medium text-xs">Date & Time</th>
                                    <th className="py-4 pl-6 font-medium text-xs">Payment ID</th>
                                    <th className="py-4 pl-6 font-medium text-xs">Amount</th>
                                    <th className="py-4 pl-6 font-medium text-xs">Status</th>
                                    <th className="py-4 pl-6 font-medium text-xs"></th>
                                </tr>
                            </thead>
                            <tbody className="bg-[#141414]">
                                {
                                    [].map(() => {
                                        return <tr>
                                            <td className="py-4 border-b pl-10 text-xs font-medium border-t border-[#667085]">
                                                <div className="">
                                                    <input className="rounded-md border-[#D0D5DD] bg-white" type="checkbox" name="" id="" />
                                                    <span className="ml-2">Package subscription</span>
                                                </div>
                                            </td>
                                            <td className="py-4 border-b pl-6 text-xs border-t border-[#667085] ">
                                                <div className="">
                                                    <span className="inline-flex gap-1 text-sm font-medium rounded-full py-1 px-3 border-2 text-red-500 border-red-500 items-center">
                                                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M6 9.5V2.5M6 2.5L2.5 6M6 2.5L9.5 6" stroke="#F04438" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                        </svg>
                                                        <span>
                                                            Debit
                                                        </span>
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="py-4 border-b pl-6 text-xs font-medium border-t border-[#667085] ">
                                                <div>June 10,2023 9:23AM</div>
                                            </td>
                                            <td className="py-4 border-b pl-6 text-xs font-medium border-t border-[#667085] ">
                                                <div className="">
                                                    #202310412
                                                </div>
                                            </td>
                                            <td className="py-4 border-b pl-6 text-xs border-t border-[#667085] ">
                                                <div className="text-sm font-bold ">
                                                    <span className="">
                                                        ₦
                                                    </span>
                                                    <span className="ml-1">10,000</span>
                                                </div>
                                            </td>
                                            <td className="py-4 border-b pl-6 text-xs border-t border-[#667085] ">
                                                <div className="">
                                                    <span className="bg-green-200 text-green-600 rounded-full py-2 px-4">
                                                        Completed
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="py-4 border-b pl-6 text-xs font-medium border-t border-[#667085] ">
                                                <div className="flex items-center gap-6">
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

export default TransactionsTable;