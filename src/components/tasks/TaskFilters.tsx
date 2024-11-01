import React, { useState } from 'react';
import { TextField, MenuItem, FormControl, InputLabel, Select, Box, Button } from '@mui/material';

interface TaskFiltersProps {
    onFilterChange: (filters: {
        title: string;
        priority: string;
        status: string;
        estimateMin: number;
        estimateMax: number;
    }) => void;
}

const TaskFilters: React.FC<TaskFiltersProps> = ({ onFilterChange }) => {
    const [title, setTitle] = useState('');
    const [priority, setPriority] = useState('');
    const [status, setStatus] = useState('');
    const [estimateMin, setEstimateMin] = useState<number | ''>('');
    const [estimateMax, setEstimateMax] = useState<number | ''>('');

    const handleApplyFilters = () => {
        onFilterChange({
            title,
            priority,
            status,
            estimateMin: estimateMin || 0,
            estimateMax: estimateMax || Infinity,
        });
    };

    const handleResetFilters = () => {
        setTitle('');
        setPriority('');
        setStatus('');
        setEstimateMin('');
        setEstimateMax('');
        onFilterChange({
            title: '',
            priority: '',
            status: '',
            estimateMin: 0,
            estimateMax: Infinity,
        });
    };

    return (
        <Box display="flex" gap={2} mb={2} flexWrap="wrap">
            <TextField
                label="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                variant="outlined"
            />
            <FormControl variant="outlined">
                <InputLabel>Priority</InputLabel>
                <Select sx={{width : '100px'}} value={priority} onChange={(e) => setPriority(e.target.value)}>
                    <MenuItem value=""><em>All</em></MenuItem>
                    <MenuItem value="LOW">Low</MenuItem>
                    <MenuItem value="MEDIUM">Medium</MenuItem>
                    <MenuItem value="HIGH">High</MenuItem>
                </Select>
            </FormControl>
            <FormControl variant="outlined">
                <InputLabel>Status</InputLabel>
                <Select sx={{width : '100px'}} value={status} onChange={(e) => setStatus(e.target.value)}>
                    <MenuItem value=""><em>All</em></MenuItem>
                    <MenuItem value="TODO">TODO</MenuItem>
                    <MenuItem value="DOING">DOING</MenuItem>
                    <MenuItem value="DONE">DONE</MenuItem>
                    <MenuItem value="WARNING">WARNING</MenuItem>
                    <MenuItem value="PENDING">PENDING</MenuItem>
                    <MenuItem value="FAILED">FAILED</MenuItem>
                </Select>
            </FormControl>
            <TextField
                label="Estimate Min"
                type="number"
                value={estimateMin}
                onChange={(e) => setEstimateMin(Number(e.target.value) || '')}
                variant="outlined"
            />
            <TextField
                label="Estimate Max"
                type="number"
                value={estimateMax}
                onChange={(e) => setEstimateMax(Number(e.target.value) || '')}
                variant="outlined"
            />
            <Button variant="contained" color="primary" onClick={handleApplyFilters}>
                Apply Filters
            </Button>
            <Button variant="outlined" onClick={handleResetFilters}>
                Reset Filters
            </Button>
        </Box>
    );
};

export default TaskFilters;
