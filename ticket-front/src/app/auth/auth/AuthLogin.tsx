"use client";

import React, {useState} from "react";
import {Box, Button, Stack, Typography,} from "@mui/material";
import {useRouter} from "next/navigation"

import CustomTextField from "@/app/(DashboardLayout)/components/forms/theme-elements/CustomTextField";
import {api} from "@/utils/api/apiFetcher";

interface loginType {
    title?: string;
    subtitle?: React.ReactNode;
    subtext?: React.ReactNode;
}

interface LoginResponse {
    accessToken: string;
}

const AuthLogin = ({title, subtitle, subtext}: loginType) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        if (username.trim().length <= 0) {
            alert('아이디를 입력해주세요.');
            return;
        }

        try {
            const data = await api.post<LoginResponse>('/api/auth/login', {
                username: username,
                password: password,
            });

            localStorage.setItem('accessToken', data.accessToken);

            router.push('/');

        } catch (error) {
            console.error(error);
            alert('아이디 또는 비밀번호가 일치하지 않습니다.');
        }
    };

    return (
        <>
            {title ? (
                <Typography fontWeight="700" variant="h2" mb={1}>
                    {title}
                </Typography>
            ) : null}

            {subtext}

            {/* 8. Stack을 form 태그로 변경하고 handleSubmit을 연결합니다. */}
            <form onSubmit={handleSubmit}>
                <Stack>
                    <Box>
                        <Typography
                            variant="subtitle1"
                            fontWeight={600}
                            component="label"
                            htmlFor="username"
                            mb="5px"
                        >
                            아이디
                        </Typography>
                        {/* 9. state와 입력을 연결합니다. */}
                        <CustomTextField
                            variant="outlined"
                            fullWidth
                            value={username}
                            onChange={(e: {
                                target: { value: React.SetStateAction<string>; };
                            }) => setUsername(e.target.value)}
                        />
                    </Box>
                    <Box mt="25px">
                        <Typography
                            variant="subtitle1"
                            fontWeight={600}
                            component="label"
                            htmlFor="password"
                            mb="5px"
                        >
                            패스워드
                        </Typography>
                        <CustomTextField
                            type="password"
                            variant="outlined"
                            fullWidth
                            value={password}
                            onChange={(e: {
                                target: { value: React.SetStateAction<string>; };
                            }) => setPassword(e.target.value)}
                        />
                    </Box>
                </Stack>
                <Box mt={3}>
                    <Button
                        color="primary"
                        variant="contained"
                        size="large"
                        fullWidth
                        type="submit"
                    >
                        로그인
                    </Button>
                </Box>
            </form>
            {subtitle}
        </>
    );
}

export default AuthLogin;