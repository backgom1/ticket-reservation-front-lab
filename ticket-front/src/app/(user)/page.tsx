'use client';

import * as React from 'react';
import {
    Container,
    Box,
    TextField,
    InputAdornment,
    Button,
    Tabs,
    Tab,
    Card,
    CardMedia,
    CardContent,
    Typography,
    Grid
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

// 임시 데이터
const recommendedEvents = [ { id: 1, title: '신나는 콘서트' }, { id: 2, title: '매혹적인 뮤지컬' } ];
const popularEvents = [ { id: 1, title: '여름 뮤직 페스티벌', category: '음악' }, { id: 2, title: '브로드웨이 히트 쇼', category: '뮤지컬' } ];

export default function HomePage() {
    const [tabValue, setTabValue] = React.useState(0);

    const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
        setTabValue(newValue);
    };

    return (
        <Container maxWidth="lg" sx={{ py: 4 }}>
            {/* [테스트용] 검색창을 단순한 형태로 변경했습니다. */}
            <Box sx={{ mb: 4 }}>
                <TextField
                    fullWidth
                    placeholder="관심있는 공연, 장소, 아티스트를 검색하세요"
                    variant="outlined"
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon />
                            </InputAdornment>
                        ),
                    }}
                />
            </Box>

            {/* 카테고리 탭 */}
            <Box sx={{ borderBottom: 1, borderColor: 'divider', my: 4 }}>
                <Tabs value={tabValue} onChange={handleTabChange}>
                    <Tab label="추천" />
                    <Tab label="콘서트" />
                    <Tab label="뮤지컬" />
                </Tabs>
            </Box>

            {/* 추천 이벤트 (가로 스크롤) */}
            <Box sx={{ display: 'flex', overflowX: 'auto', gap: 3, pb: 2, scrollbarWidth: 'none' }}>
                {recommendedEvents.map((event) => (
                    <Box key={event.id} sx={{ minWidth: 288 }}>
                        <Card>
                            <CardMedia sx={{ aspectRatio: '16/9', backgroundColor: 'grey.200' }} />
                            <CardContent>
                                <Typography gutterBottom variant="h6" component="div">{event.title}</Typography>
                            </CardContent>
                        </Card>
                    </Box>
                ))}
            </Box>

            {/* 인기 이벤트 (그리드) */}
            <Box sx={{ my: 6 }}>
                <Typography variant="h4" component="h2">인기 이벤트</Typography>
                <Grid container spacing={3} sx={{ mt: 1 }}>
                    {popularEvents.map((event) => (
                        <Grid item key={event.id} xs={6} sm={4} md={2.4}>
                            <Card>
                                <CardMedia sx={{ aspectRatio: '3/4', backgroundColor: 'grey.200' }} />
                                <CardContent>
                                    <Typography variant="body1">{event.title}</Typography>
                                    <Typography variant="body2" color="text.secondary">{event.category}</Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </Container>
    );
}