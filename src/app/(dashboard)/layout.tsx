
"use client";

import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { FooterDark } from "@/partials/footer";
import Navbar, { HomeNavbar } from "@/partials/navbar";
import Sidebar from "@/partials/sidebar";
import { PropsWithChildren, useEffect, useState } from "react";
import ReduxProvider from '../redux-provider';
import { useParams, usePathname, useRouter } from 'next/navigation';
import { useAppSelector } from '@/hooks';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AuthValidator = () => {
    const navigate = useRouter();
    const auth = useAppSelector(state => state.auth);
    const pathName = usePathname();

    useEffect(() => {
        console.log(auth)
        if (!auth.token || !auth.user) {
            navigate.push("/");
        }
    }, [pathName, auth])
    return <>
    </>
}

export default function RootLayout({ children }: PropsWithChildren) {
    const [showSidebar, setShowSidebar] = useState(true);

    return (
        <ReduxProvider>
            <AuthValidator />
            <div className='bg-dark tracking-normal'>
                <ToastContainer position='top-right' theme='dark' hideProgressBar />
                <div className='content'>
                    {showSidebar &&
                        <Sidebar />
                    }
                    <div className={`sm:ml-[20rem] h-screen overflow-y-auto`}>
                        <Navbar />
                        <div className="p-4 md:p-8">
                            {children}
                        </div>
                    </div>
                </div>
            </div>
        </ReduxProvider>
    )
}