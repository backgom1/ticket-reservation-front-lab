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
        <Card sx={{ width: '100%', maxWidth: '28rem', p: 4, cursor: 'move', position: 'relative' }}>
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
    const nodeRef = useRef(null);
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!open || !isMounted) {
        return null;
    }

    return (
        <Box
            sx={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 1300,
            }}
        >
            <Draggable nodeRef={nodeRef}>
                <div
                    ref={nodeRef}
                    onClick={(e) => e.stopPropagation()}
                >
                    {/* [수정] WaitingCard에 onClose 함수 전달 */}
                    <WaitingCard
                        position={position}
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