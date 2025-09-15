import type { Metadata } from "next";
import { Noto_Sans_KR } from "next/font/google";
import { Box } from "@mui/material";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
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
        <html lang="ko">
        <body className={notoSansKr.className}>
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: '#f9fafb' }}>
            <Header />
            <Box component="main" sx={{ flexGrow: 1 }}>
                {children}
            </Box>
            <Footer />
        </Box>
        </body>
        </html>
    );
}