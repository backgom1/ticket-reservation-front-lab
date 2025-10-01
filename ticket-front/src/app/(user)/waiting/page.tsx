'use client';

import * as React from 'react';
import { useState, useEffect, useRef } from 'react';
import {
    Box,
    Card,
    createTheme,
    LinearProgress,
    Stack,
    Theme,
    Typography,
    IconButton, // [수정] IconButton 추가
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close'; // [수정] 닫기 아이콘 추가
import Draggable from 'react-draggable';

// 1. 테마 설정
export const theme: Theme = createTheme({
    /* ... 기존 테마 설정 ... */
});

// [수정] WaitingCardProps 인터페이스에 onClose 추가
interface WaitingCardProps {
    position: number;
    eventId: number;
    userId: number;
    onClose: () => void; // 닫기 함수를 받을 수 있도록 추가
}

// 2. 대기 화면 카드 컴포넌트 (닫기 버튼 추가)
export const WaitingCard: React.FC<WaitingCardProps> = ({ position, eventId, userId, onClose }) => {
    return (
        // [수정] 닫기 버튼의 기준점이 되도록 position: 'relative' 추가
        <Card sx={{ width: '400px',height: '550px' ,maxWidth: '58rem', p: 4, cursor: 'move', position: 'relative'  ,display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',}}>
            {/* [수정] 닫기 버튼 추가 */}
            <IconButton
                aria-label="close"
                onClick={onClose}
                sx={{
                    position: 'absolute',
                    right: 8,
                    top: 8,
                    color: (theme) => theme.palette.grey[500],
                }}
            >
                <CloseIcon />
            </IconButton>

            <Stack spacing={3}>
                <Box textAlign="center">
                    <Typography variant="h4" component="h2" fontWeight="bold">
                        서비스 접속 대기 중입니다.
                    </Typography>
                    <Typography sx={{ mt: 1, color: 'text.secondary' }}>
                        현재 대기 인원:{' '}
                        <Box component="span" sx={{ color: 'primary.main', fontWeight: 'bold' }}>
                            {position.toLocaleString()}
                        </Box>
                        명
                    </Typography>
                </Box>
                <Box>
                    <LinearProgress variant="indeterminate" sx={{ height: 10, borderRadius: '9999px' }} />
                </Box>
                <Box>
                    새로고침을 하거나 페이지를 종료하면 새로 대기열을 등록해야합니다.
                </Box>
            </Stack>
        </Card>
    );
};

// 3. WaitingPopup 컴포넌트 Props 인터페이스
interface WaitingPopupProps {
    open: boolean;
    onClose: () => void;
    position: number;
    userId: number;
    eventId: number;
}

// 4. WaitingPopup 컴포넌트
const WaitingPopup: React.FC<WaitingPopupProps> = ({ open, onClose, position, userId, eventId }) => {
    const [currentPosition, setCurrentPosition] = useState(position);
    const nodeRef = React.useRef(null);
    useEffect(() => {
        if (!open || !userId || !eventId) {
            return;
        }

        // SSE 연결 객체 생성 (URL은 실제 API 엔드포인트에 맞게 조정해야 합니다)
        const eventSource = new EventSource(
            `http://localhost:8080/api/v1/sse/connect?userId=${userId}&eventId=${eventId}`
        );

        // 서버에서 메시지(대기 순위)가 올 때마다 호출될 이벤트 리스너
        eventSource.onmessage = (event) => {
            const newPosition = parseInt(event.data, 10);
            setCurrentPosition(newPosition);
            if (newPosition <= 0) {
                const url = `/reservation`; // 팝업으로 띄울 페이지의 URL
                const windowName = "TicketingPopup";
                const windowFeatures = "width=900,height=700,scrollbars=yes,resizable=yes";
                window.open(url, windowName, windowFeatures);
                onClose(); // 팝업 닫기
                eventSource.close(); // SSE 연결 종료
            }
        };

        // SSE 연결 중 에러 발생 시 처리
        eventSource.onerror = (error) => {
            console.error('EventSource failed:', error);
            // 필요하다면 여기서 연결을 닫을 수도 있습니다.
            eventSource.close();
        };

        // 컴포넌트가 사라지거나, open 상태가 바뀔 때 SSE 연결을 반드시 끊어줘야 합니다. (메모리 누수 방지)
        return () => {
            eventSource.close();
        };

    }, [open, userId, eventId, onClose]); // 의존성 배열: 이 값들이 바뀔 때마다 useEffect가 다시 실행됨


    if (!open) {
        return null;
    }

    return (
        <Box
            sx={{
                position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
                display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1300,
            }}
        >
            <Draggable nodeRef={nodeRef}>
                <div ref={nodeRef} onClick={(e) => e.stopPropagation()}>
                    <WaitingCard
                        // 초기 position 대신 실시간 currentPosition을 넘겨줍니다.
                        position={currentPosition}
                        eventId={eventId}
                        userId={userId}
                        onClose={onClose}
                    />
                </div>
            </Draggable>
        </Box>
    );
};

export default WaitingPopup;