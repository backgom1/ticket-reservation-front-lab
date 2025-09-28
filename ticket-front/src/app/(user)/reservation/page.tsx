'use client';

import * as React from 'react';
import {
    createTheme,
    ThemeProvider,
    CssBaseline,
    Box,
    Container,
    Grid,
    Card,
    CardContent,
    Typography,
    Stack,
    Button,
    IconButton,
} from '@mui/material';
import ZoomInIcon from '@mui/icons-material/ZoomIn';
import ZoomOutIcon from '@mui/icons-material/ZoomOut';

// --- 데이터 타입 정의 ---
interface SeatTier {
    name: string;
    seatsLeft: number;
    iconBgColor: string;
    iconColor: string;
}

// --- 좌석 등급 데이터 ---
const seatTiers: SeatTier[] = [
    { name: 'W석', seatsLeft: 2465, iconBgColor: '#E3F2FD', iconColor: '#42A5F5' },
    { name: 'E석', seatsLeft: 1823, iconBgColor: '#E8F5E9', iconColor: '#66BB6A' },
    { name: 'N석', seatsLeft: 1234, iconBgColor: '#FFF3E0', iconColor: '#FFA726' },
    { name: 'S석', seatsLeft: 876, iconBgColor: '#FBE9E7', iconColor: '#FF8A65' },
];

// --- 테마 설정 ---
const theme = createTheme({
    palette: {
        primary: {
            main: '#0d7ff2',
        },
        // [수정] 불필요한 괄호와 spread(...) 연산자 제거
        mode: 'light',
        background: {
            default: '#f5f7f8',
            paper: '#ffffff',
        },
    },
    typography: {
        fontFamily: '"Plus Jakarta Sans", "Noto Sans", sans-serif',
    },
    components: {
        MuiCard: {
            styleOverrides: {
                root: {
                    borderRadius: '0.75rem',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.05)', // 부드러운 그림자 효과 추가
                },
            },
        },
    },
});

// --- 개별 좌석 등급 아이템 컴포넌트 ---
const SeatTierItem: React.FC<{ tier: SeatTier }> = ({ tier }) => (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <Box
            sx={{
                width: 40,
                height: 40,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 1,
                bgcolor: tier.iconBgColor,
                flexShrink: 0,
            }}
        >
            <Box sx={{ width: 16, height: 16, borderRadius: '2px', bgcolor: tier.iconColor }} />
        </Box>
        <Box>
            <Typography fontWeight="medium">{tier.name}</Typography>
            <Typography variant="body2" color="text.secondary">
                {tier.seatsLeft.toLocaleString()}석 남음
            </Typography>
        </Box>
    </Box>
);

// --- 메인 좌석 선택 페이지 컴포넌트 ---
const SeatSelectionPage: React.FC = () => {
    return (
        <Container sx={{ py: 4 }}>
            <Grid container spacing={4}>
                {/* 왼쪽 컬럼 */}
                <Grid item xs={12} lg={12}>
                    <Stack spacing={3}>
                        <Typography variant="h4" component="h2" fontWeight="bold">
                            2024 프로 야구 리그
                        </Typography>
                        <Card sx={{
                            width: '100%', // 부모 영역보다 1.2배 크게
                            minWidth: '600px', // 최소 너비를 600px로 고정
                            height: '100%',
                            minHeight: '566px',
                        }}>
                            <CardContent sx={{ p: 3 }}>
                                {/* [수정] 비어있던 제목 추가 */}
                                <Typography variant="h6" component="h3" fontWeight="bold" mb={2}>
                                    좌석 배치도
                                </Typography>
                                <Box sx={{ position: 'relative' }}>
                                    <Box
                                        sx={{
                                            width: '100%',
                                            aspectRatio: '4 / 3',
                                            borderRadius: 2,
                                            bgcolor: 'grey.300',
                                            backgroundSize: 'cover',
                                            backgroundPosition: 'center',
                                            backgroundImage: 'url("https://images.unsplash.com/photo-1588574347893-27a421454563?q=80&w=2070&auto-format&fit=crop")',
                                        }}
                                    />
                                    <Stack direction="row" spacing={1} sx={{ position: 'absolute', bottom: 16, right: 16 }}>
                                        <IconButton sx={{ bgcolor: 'rgba(0, 0, 0, 0.4)', '&:hover': { bgcolor: 'rgba(0, 0, 0, 0.6)' } }}>
                                            <ZoomInIcon sx={{ color: 'white' }} />
                                        </IconButton>
                                        <IconButton sx={{ bgcolor: 'rgba(0, 0, 0, 0.4)', '&:hover': { bgcolor: 'rgba(0, 0, 0, 0.6)' } }}>
                                            <ZoomOutIcon sx={{ color: 'white' }} />
                                        </IconButton>
                                    </Stack>
                                </Box>
                            </CardContent>
                        </Card>
                    </Stack>
                </Grid>

                {/* 오른쪽 컬럼 */}
                <Grid item xs={12} lg={4}>
                    <Stack spacing={3}>
                        <Card>
                            <CardContent sx={{ p: 3 }}>
                                {/* [수정] 비어있던 제목 추가 */}
                                <Typography variant="h6" component="h3" fontWeight="bold" mb={2}>
                                    전체 좌석 보기
                                </Typography>
                                <Box
                                    sx={{
                                        width: '100%',
                                        aspectRatio: '3 / 2',
                                        borderRadius: 2,
                                        bgcolor: 'grey.300',
                                        backgroundSize: 'cover',
                                        backgroundPosition: 'center',
                                        backgroundImage: 'url("https://images.unsplash.com/photo-1542444537-88590e3b3d55?q=80&w=1974&auto=format&fit=crop")',
                                    }}
                                />
                            </CardContent>
                        </Card>
                        <Card>
                            <CardContent sx={{ p: 3 }}>
                                <Typography variant="h6" component="h3" fontWeight="bold" mb={2}>
                                    등급 선택
                                </Typography>
                                <Stack spacing={2}>
                                    {seatTiers.map((tier) => (
                                        <SeatTierItem key={tier.name} tier={tier} />
                                    ))}
                                </Stack>
                                <Stack direction="row" spacing={2} sx={{ mt: 3 }}>
                                    <Button variant="contained" color="inherit" fullWidth sx={{ py: 1.5, boxShadow: 'none' }}>
                                        이전 단계
                                    </Button>
                                    <Button variant="contained" color="primary" fullWidth sx={{ py: 1.5, boxShadow: 'none' }}>
                                        다음 단계
                                    </Button>
                                </Stack>
                            </CardContent>
                        </Card>
                    </Stack>
                </Grid>
            </Grid>
        </Container>
    );
};

export default function ReservationPage() {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <SeatSelectionPage />
        </ThemeProvider>
    );
}