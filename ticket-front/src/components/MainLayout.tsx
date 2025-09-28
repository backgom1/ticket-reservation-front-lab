'use client';

import * as React from 'react';
import { Box } from '@mui/material';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function MainLayout({ children }: { children: React.ReactNode }) {
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: '#f9fafb' }}>
            <Header />
            <Box component="main" sx={{ flexGrow: 1 }}>
                {children}
            </Box>
            <Footer />
        </Box>
    );
}