'use client';

import * as React from 'react';
import {
    Container,
    Box,
    TextField,
    Button,
    Link,
    Stack,
    Typography,
} from '@mui/material';
import NextLink from 'next/link';

export default function SignupPage() {
    const primaryColor = '#0d80f2';
    const secondaryColor = '#49739c';

    return (
        <Container component="section" maxWidth="xs" sx={{ mt: 8, mb: 4 }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Typography component="h1" variant="h4" sx={{ fontWeight: 'bold' }}>
                    회원가입
                </Typography>
                <Typography component="p" sx={{ mt: 1, color: secondaryColor }}>
                    이미 계정이 있으신가요?
                    {/* 로그인 페이지로 이동하는 링크입니다. */}
                    <Link component={NextLink} href="/public" sx={{ color: primaryColor, fontWeight: 'medium', ml: 1 }}>
                        로그인
                    </Link>
                </Typography>
                <Box component="form" noValidate sx={{ mt: 3, width: '100%' }}>
                    <Stack spacing={2}>
                        <TextField
                            required
                            fullWidth
                            id="username"
                            label="사용자 이름"
                            name="username"
                            autoComplete="username"
                            autoFocus
                        />
                        <TextField
                            required
                            fullWidth
                            id="email"
                            label="이메일 주소"
                            name="email"
                            autoComplete="email"
                        />
                        <TextField
                            required
                            fullWidth
                            name="password"
                            label="비밀번호"
                            type="password"
                            id="password"
                            autoComplete="new-password"
                        />
                        <TextField
                            required
                            fullWidth
                            name="confirm-password"
                            label="비밀번호 확인"
                            type="password"
                            id="confirm-password"
                            autoComplete="new-password"
                        />
                    </Stack>

                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, py: 1.5, fontSize: '1rem', backgroundColor: primaryColor }}
                    >
                        회원가입
                    </Button>
                </Box>
            </Box>
        </Container>
    );
}