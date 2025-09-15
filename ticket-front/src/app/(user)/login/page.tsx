'use client';

import * as React from 'react';
import {
    Container,
    Box,
    TextField,
    FormControlLabel,
    Checkbox,
    Button,
    Link,
    Divider,
    Stack,
    Typography,
} from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';

export default function LoginPage() {
    const primaryColor = '#0d80f2';
    const secondaryColor = '#49739c';

    return (
        // 메인 콘텐츠
        <Container component="section" maxWidth="xs" sx={{ mt: 8, mb: 4 }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Typography component="h1" variant="h4" sx={{ fontWeight: 'bold' }}>
                    로그인
                </Typography>
                <Typography component="p" sx={{ mt: 1, color: secondaryColor }}>
                    티켓링크 회원이 아니신가요?
                    <Link href="#" sx={{ color: primaryColor, fontWeight: 'medium', ml: 1 }}>
                        회원가입
                    </Link>
                </Typography>
                <Box component="form" noValidate sx={{ mt: 3, width: '100%' }}>
                    <Stack spacing={2}>
                        <TextField required fullWidth id="email" label="아이디" name="email" autoComplete="email" autoFocus />
                        <TextField required fullWidth name="password" label="비밀번호" type="password" id="password" autoComplete="current-password" />
                    </Stack>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', my: 2 }}>
                        <FormControlLabel control={<Checkbox value="remember" color="primary" />} label="아이디 저장" />
                        <Link href="#" variant="body2" sx={{ color: secondaryColor }}>
                            비밀번호를 잊으셨나요?
                        </Link>
                    </Box>
                    <Button type="submit" fullWidth variant="contained" sx={{ py: 1.5, fontSize: '1rem', backgroundColor: primaryColor }}>
                        로그인
                    </Button>
                    <Divider sx={{ my: 3 }}>또는</Divider>
                    <Button fullWidth variant="outlined" startIcon={<GoogleIcon />} sx={{ color: 'text.secondary', borderColor: 'grey.400' }}>
                        Google 계정으로 로그인
                    </Button>
                </Box>
            </Box>
        </Container>
    );
}