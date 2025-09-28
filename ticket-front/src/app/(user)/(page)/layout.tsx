import type {Metadata} from "next";
import {Noto_Sans_KR} from "next/font/google";
import MainLayout from "@/components/MainLayout";
import React from "react";

const notoSansKr = Noto_Sans_KR({
    subsets: ["latin"],
    weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
    title: "티켓링크",
    description: "MUI로 구현된 티켓링크",
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="ko" suppressHydrationWarning>
        <body>
        <MainLayout>{children}</MainLayout>
        </body>
        </html>
    );
}