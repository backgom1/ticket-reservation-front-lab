'use client';

import * as React from 'react';
import {Container, Box, Tabs, Tab, Typography, Paper, Button, Avatar, Stack} from '@mui/material';
import {DraggableCarousel} from "@/components/sports/Carousel";
import {useState} from "react";
import WaitingRoomPage from "@/app/(user)/waiting/page";

enum QueueStatus {
    DIRECT_ENTER = 'DIRECT_ENTER', // 즉시 입장
    JOINED = 'JOINED', // 대기열 진입
}

// 백엔드 API 응답 타입 정의
interface QueueResult {
    status: QueueStatus;
    position?: number;
    userId?: number;
    eventId?: number;
    concertId?: string; // 예시로 추가 (실제 응답에 맞춰 수정)
}

// 동적 생성을 위한 경기 데이터 (나중에 API로 대체)
const games = [
    {
        id: 1,
        date: '11 (화)',
        homeTeam: 'SSG',
        awayTeam: 'KIA',
        homeLogo: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCDFxi7oaE8wNQ1D_P_tV__kCLveNao4jjdHKPBtQqPdM5nioK9DfSFSld2gRcIboTcKRARO4qq-ey_nOYIi7lMyfG_30-gEnKQ9_pSgw7r-cRtB1wb_biKjm2J4SshlsDRmJZ3QKZELz9UckmEO06Lsm96xe40e4sK8ur4Fo4ZqJ9L0pLqu-_24lDHkgpd35M292H_GfSKsh_wLlR2SGPRVe7LwvX2MmfjCM8AbY1Dy31LnWFIq7sYSpzP_gf7ibKdD-lsTA-kv_U',
        awayLogo: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCUK8KPBGaOjVwoh-x19Yw2ISF1fz2vEos1hurQYYlBmQFSTs4tmMdzMv_VSPMWOOZ8mIXuOFXibRlqupCifV77_XljnIdYVQJ85g0-viTyW_zl_VLIugT1N4FfwP57zToCq8j7RS6R8GYXxfh9wXwF5rDcmFhNTAh_DLSPrlLl90-HWsLdedvoOuNuxD39LyWHxYyHRVA3yXQnH5zp3rov8BRPnkz756cMZ-gZXOIyHmjz4b5Q4p0E9Ilndvi724D0KPWfzVZBfyI',
        time: '18:30',
        location: '인천SSG랜더스필드',
        status: 'available',
    },
    {
        id: 2,
        date: '12 (수)',
        homeTeam: 'SSG',
        awayTeam: 'KIA',
        homeLogo: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCXY4xTMzbX0uufwsrRxbze8FY2Uo8GICnWCxugp74zuiFuN_4nhFQVQoCIQU-Di9afijlBqyscsMpoYxJR_H9WYkmSFf38z6-N2yg55CfyfYPGJj6pz0pc97CgGHlegGijp8sySBzE1WQyr5BVtQSP8DkFCl1XvnDZ6ybJyxBt53OoH3kiZQxPoRCs_QRc1kLR4u4sqebDd0liNQkY1Hyf9CEyfTTjkqos_Z5MCeCi1ZY2WczuXVs9iPZQ__pceSsNvapiErF866w',
        awayLogo: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCtVl2CNT_loAdf3dbXqdVse7pkMrhSmcdNXoTl8GJ05UDxUWHuDG-_HJyr0iqfcomrJzrbiFIpje2STmTGFu09UK5HdbNs5zWW67AT6lOGOuMaeE2njmwzoO8Z_vlR6bA3t_JxlVXnK1oU6YuC2M5Un--aUblnzqgesJ-JjAGolBSB53xh-rhohhyPDi1pZlguwli2cn5gKBxlReMwJk6TejkAdZ4hBdcu97UcLL7d9Swly1C3jiOAnMMf7dwY9t1PyCb5mFiVlVc',
        time: '18:30',
        location: '인천SSG랜더스필드',
        status: 'available',
    },
    {
        id: 3,
        date: '13 (목)',
        homeTeam: 'SSG',
        awayTeam: 'KIA',
        homeLogo: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDjJdlgIkTNuBWbseztdol1s895r1A7dsIL69K3pGZLAJRgs-PlxIMp1RJ6qAJRERnepvlAuNhx-RoQt1hWEm6eN-OlvPo6Rw-ouPPqOklX_52H5eLeSP-lhiA4Isx73-Bdll_04tuCBgudc4KN9uHdv1CTmH3QU0d3fUFo5q58ZzgC9MbvwrLnOg1OypoUmoJe9EleVBPtkfw1FLQ1hglpr_G_th8JoBxQZrq8OsvKdWsfw3Olq4ibfk2op1a01WtHnPFVwo9RATI',
        awayLogo: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD5Lx_JQZaNgZlV4ab7iyGzA8CKmFTHbQXPB5Zz4qjAaj9FnJU3BcFG0ZKccg07HTy7NP8T614lxmZSCZL3YhH8KRQ4aMp1NytaTnvE72S4MbXBLWOEBw3A5H4mzN6rvBi2efLymz_9TwvyyCrCKiC3AAHssXft-DMGAPOyjGv0zdpv2mXosqBzh7fzoQRzHSNAy9vkc4fM5KvA1qaYNkzbWx3hIMJIds1-MroQIzRAm-VrVYWdZRDwCT2_Ed1h9TsElMWj872yGrE',
        time: '18:30',
        location: '인천SSG랜더스필드',
        status: 'closed',
    },
    {
        id: 4,
        date: '14 (금)',
        homeTeam: 'SSG',
        awayTeam: '롯데',
        homeLogo: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDS6Zp2EZ0G2Ch9VIQ_W31cmnzjkeUehtM_x1enWkwlK3lsv-Gld7PMDOIsMaS5Cd-etqFVs3tRPxMpsLXX1ppd3XGLgnobFW3X-o_8iveZHGTO4opqyF_dqefqUF01EasVxsX3WeM34sKH2cw-M1aNobNcFQiggd5Sx-WRTusNYH-cbzRgirB92upNscILa11RtfMsGTUTisfzpXr3ZfippBoUihCSKuY1Y9HpvGgulGsIqpJNiwKOUVumG3Wk4enh2naiI5pffa4',
        awayLogo: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAnRP4mkWB5cPG3XZWnIdvHHbmW9ebqUmZRRhhE08dPmkHcBcS57Ymq4mt81qz4l_9lAwqELw6VRNX6ZVsaYuiMKQq2a2wjdw_Z3YSYI0x1XUZbot1pu9ahb7WCvfiZbVIm7drPwT225Qk2jSHLaZcKZrv0xWH5MxAaT3OnoHAw2V3yiR12TSkcgP7sjBbreElq148NvWoOxduzA1lXqSLZVhwpv4PFwT-GDUNESU31Hw4VMlVKCcgKrQXK4MN5m_NJw77PsHRuaDc',
        time: '18:30',
        location: '인천SSG랜더스필드',
        status: 'available',
    },
];

export default function BaseballPage() {
    const [tabValue, setTabValue] = React.useState(0);
    const [isWaitingModalOpen, setWaitingModalOpen] = useState(false);
    const [initialPosition, setInitialPosition] = useState(0);

    const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
        setTabValue(newValue);
    };

    // 3. 예매하기 버튼 클릭 이벤트 핸들러 작성
    const handleReservationClick = async (eventId: number) => {
        // 실제로는 로그인 정보 등에서 userId를 가져와야 합니다.
        const userId = 123; // 테스트용 사용자 ID

        try {
            const response = await fetch('http://localhost:8080/api/v1/waiting/queue', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({eventId, userId}),
            });

            if (!response.ok) {
                throw new Error('API 요청에 실패했습니다.');
            }

            const result: QueueResult = await response.json();

            // 4. API 응답 결과에 따른 분기 처리
            if (result.status === QueueStatus.DIRECT_ENTER) {
                // 즉시 입장: 예매 페이지로 이동
                console.log("즉시 입장 가능. 예매 페이지로 이동합니다.");
                const url = `/reservation`; // 팝업으로 띄울 페이지의 URL
                const windowName = "TicketingPopup";
                const windowFeatures = "width=900,height=700,scrollbars=yes,resizable=yes";

                // window.open(URL, 창 이름, 창 속성)
                window.open(url, windowName, windowFeatures);
                // concertId 같은 추가 정보를 백엔드에서 받아 이동할 수 있습니다.
            } else if (result.status === QueueStatus.JOINED) {
                // 대기열 진입: 대기열 페이지로 이동 + 초기 순위 정보 전달
                setInitialPosition(result.position);
                // 2. 모달을 열도록 상태 변경
                setWaitingModalOpen(true);
            }

        } catch (error) {
            console.error('예매 처리 중 오류:', error);
            // 사용자에게 오류 알림 (예: alert, snackbar 등)
            alert('오류가 발생했습니다. 잠시 후 다시 시도해주세요.');
        }
    };


    return (
        <Container maxWidth="md" sx={{py: 4}}>

            <DraggableCarousel/>

            {/* 주의사항 알림 */}

            {/* 탭 메뉴 */}
            <Box sx={{borderBottom: 1, borderColor: 'divider', mb: 4}}>
                <Tabs value={tabValue} onChange={handleTabChange} textColor="inherit" indicatorColor="primary">
                    <Tab label="야구" sx={{fontWeight: 'bold'}}/>
                    <Tab label="농구"/>
                    <Tab label="축구"/>
                    <Tab label="이스포츠"/>
                </Tabs>
            </Box>

            {/* 경기 목록 */}
            <Stack spacing={2}>
                {games.map((game) => (
                    <Paper
                        key={game.id}
                        elevation={1}
                        sx={{
                            p: 2,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            opacity: game.status === 'closed' ? 0.6 : 1, // 마감 시 불투명 처리
                            bgcolor: game.status === 'closed' ? 'grey.100' : 'white',
                        }}
                    >
                        {/* 날짜, 팀 정보 */}
                        <Stack direction="row" alignItems="center" spacing={3} sx={{flex: 1}}>
                            <Typography variant="subtitle1"
                                        sx={{fontWeight: 'bold', width: '60px', textAlign: 'center'}}>
                                {game.date}
                            </Typography>
                            <Avatar src={game.homeLogo}/>
                            <Typography variant="h6" sx={{fontWeight: 'bold'}}>{game.homeTeam}</Typography>
                            <Typography>vs</Typography>
                            <Typography variant="h6" sx={{fontWeight: 'bold'}}>{game.awayTeam}</Typography>
                            <Avatar src={game.awayLogo}/>
                        </Stack>

                        {/* 시간, 장소 */}
                        <Stack direction="row" alignItems="center" spacing={2} sx={{flex: 1, justifyContent: 'center'}}>
                            <Typography sx={{fontWeight: 'medium'}}>{game.time}</Typography>
                            <Typography color="text.secondary">{game.location}</Typography>
                        </Stack>

                        {/* 예매 버튼 */}
                        <Box sx={{flex: 1, display: 'flex', justifyContent: 'flex-end', width: 120}}>
                            {/* 5. 버튼 상태 및 onClick 핸들러 수정 */}
                            {game.status === 'available' ? (
                                <Button
                                    variant="contained"
                                    color="error"
                                    size="large"
                                    onClick={() => handleReservationClick(game.id)}
                                    sx={{minWidth: 120}}
                                >
                                    예매하기
                                </Button>
                            ) : (
                                <Button variant="contained" disabled size="large" sx={{minWidth: 120}}>
                                    예매마감
                                </Button>
                            )}
                        </Box>
                    </Paper>
                ))}
            </Stack>
            <WaitingRoomPage
                open={isWaitingModalOpen}
                onClose={() => setWaitingModalOpen(false)}
                position={initialPosition}
                userId={123} // SSE 연결에 필요한 정보 전달
                eventId={456} // SSE 연결에 필요한 정보 전달 (실제 eventId로 변경 필요)
            />
        </Container>
    );
}