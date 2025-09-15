import * as React from 'react';
import { Box, Container, Typography } from '@mui/material';

export default function Footer() {
    return (
        <Box component="footer" sx={{ py: 3, px: 2, backgroundColor: 'white', borderTop: '1px solid #e0e0e0' }}>
            <Container maxWidth="sm">
                <Typography variant="body2" color="text.secondary" align="center">
                    © 2024 TicketLink. All rights reserved.
                </Typography>
            </Container>
        </Box>
    );
}