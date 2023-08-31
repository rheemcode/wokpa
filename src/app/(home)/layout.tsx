'use client';
import { FooterDark } from "@/partials/Footer";
import { HomeNavbar } from "@/partials/Navbar";
import { addPhoneMethod } from "@/utils/yup-phone";
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