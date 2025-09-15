import type { Metadata } from "next";
import { Noto_Sans_KR } from "next/font/google";
import { Box } from "@mui/material";
import Header from "@/components/Header"; // '@/'는 프로젝트 루트를 가리킵니다.
import Footer from "@/components/Footer";
const notoSansKr = Noto_Sans_KR({
    subsets: ["latin"],
    weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
    title: "티켓링크", // 공통 타이틀
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
            {/* 페이지의 메인 콘텐츠가 이 부분에 렌더링됩니다 */}
            <Box component="main" sx={{ flexGrow: 1 }}>
                {children}
            </Box>
            <Footer />
        </Box>
        </body>
        </html>
    );
}