import React, { useEffect, useState } from 'react';
import { Typography, Box } from '@mui/material';
import { AccessAlarm } from "@mui/icons-material";

const CurrentTime: React.FC = () => {
    const [currentDate, setCurrentDate] = useState<Date>(new Date());

    useEffect(() => {
        const timer = setInterval(() => setCurrentDate(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    const formatDate = (date: Date): string => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        const seconds = String(date.getSeconds()).padStart(2, '0');
        return `${year}/${month}/${day} - ${hours}:${minutes}:${seconds}`;
    };

    return (
        <Box display="flex" alignItems="center">
            <Typography variant="h6" gutterBottom>
                {formatDate(currentDate)}
            </Typography>
            <AccessAlarm  style={{ fontSize: '60px',marginLeft: '16px' }} />
        </Box>
    );
};

export default CurrentTime;
