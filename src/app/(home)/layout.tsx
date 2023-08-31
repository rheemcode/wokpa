'use client';
import { addPhoneMethod } from "@/utils/yup-phone";
import { HomeNavbar } from "@/partials/navbar";
import { FooterDark } from "@/partials/footer";
import { PropsWithChildren } from "react";


export default function RootLayout({ children }: PropsWithChildren) {
    return (
        <div className='bg-dark tracking-normal relative'>
            <HomeNavbar />
            {children}
            <FooterDark />
        </div>

    )
}