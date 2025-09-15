'use client';

import * as React from 'react';
import { AppBar, Toolbar, Typography, Container, Box, Button, Link, IconButton, Avatar } from '@mui/material';
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';
import SearchIcon from '@mui/icons-material/Search';
import LanguageIcon from '@mui/icons-material/Language';
import NextLink from 'next/link';

export default function Header() {
    const primaryColor = '#3b82f6';

    return (
        <AppBar position="static" color="default" elevation={1} sx={{ backgroundColor: 'white' }}>
            <Container maxWidth="lg">
                <Toolbar disableGutters>
                    {/* 로고 */}
                    <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: { xs: 1, md: 0 } }}>
                        <ConfirmationNumberIcon sx={{ color: primaryColor, mr: 1, fontSize: '2rem' }} />
                        <Typography variant="h5" component="a" href="/" sx={{ fontWeight: 800, color: primaryColor, textDecoration: 'none', letterSpacing: '-1.5px' }}>
                            티켓링크
                        </Typography>
                    </Box>

                    {/* 네비게이션 링크 */}
                    <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 3, ml: 4 }}>
                        <Link href="#" color="text.secondary" sx={{ textDecoration: 'none', '&:hover': { color: primaryColor } }}>콘서트</Link>
                        <Link href="#" color="text.secondary" sx={{ textDecoration: 'none', '&:hover': { color: primaryColor } }}>뮤지컬</Link>
                        <Link href="#" color="text.secondary" sx={{ textDecoration: 'none', '&:hover': { color: primaryColor } }}>연극</Link>
                        <Link href="#" color="text.secondary" sx={{ textDecoration: 'none', '&:hover': { color: primaryColor } }}>스포츠</Link>
                    </Box>

                    <Box sx={{ flexGrow: 1 }} />

                    {/* 오른쪽 버튼 및 아바타 */}
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                        <Box sx={{ display: { xs: 'none', lg: 'flex' } }}>
                            <IconButton color="inherit"><SearchIcon /></IconButton>
                            <IconButton color="inherit"><LanguageIcon /></IconButton>
                        </Box>
                        <Button component={NextLink} href="/login" variant="text" sx={{ display: { xs: 'none', md: 'inline-flex' }, color: 'grey.700', fontWeight: 'bold' }}>
                            로그인
                        </Button>
                        <Button component={NextLink} href="/signup" variant="contained" sx={{ backgroundColor: primaryColor, fontWeight: 'bold' }}>
                            회원가입
                        </Button>
                        <Avatar src="https://lh3.googleusercontent.com/aida-public/AB6AXuBNMNAfMpvoXUPX4xKINSls3hGggmZ6IApJ6vWHjrOQCVqHhRitVZJXGhxuBCznI2GVXI8AkoiI-su_zPeke9zJZTQyKsz8J8XChWg7J5h-q2FfCXOMdpgPwhHY80Qy5GGqkrfMmP9fGr_8PRJT1UhVVwInv7yhdXZBNcg5E-sblSNGxBwuRPj3iwoIspPAJ71EuTIUyk-EerMyb0OecmLi7flp75frrN4B0BH3yIgMRoziRwmw3vJDZSoe8aLDiF8TN_tmODXNDzU" sx={{ width: 40, height: 40, border: '2px solid #e5e7eb' }} />
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
}