import React, { useState } from 'react';
import { Modal, Box, Button, Typography, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { useUpdateTaskStatusMutation } from '../../api/taskApi';

interface ChangeStatusDialogProps {
    open: boolean;
    handleClose: () => void;
    taskId: any; 
}

const ChangeStatusDialog: React.FC<ChangeStatusDialogProps> = ({ open, handleClose, taskId }) => {
    
    const [newStatus, setNewStatus] = useState<'TODO' | 'DOING' | 'DONE' | 'WARNING' | 'PENDING' | 'FAILED'>('TODO');
    const [updateTaskStatus] = useUpdateTaskStatusMutation();

    const handleSubmit = async () => {
        try {
            await updateTaskStatus({ id: taskId, status: newStatus}).unwrap();
            alert('Task status updated successfully!');
            handleClose();
        } catch (error) {
            console.error('Failed to update task status:', error);
        }
    };

    return (
        <Modal open={open} onClose={handleClose}>
            <Box sx={{ width: 300, margin: 'auto', padding: 2, bgcolor: 'white', borderRadius: 1 }}>
                <Typography variant="h6" component="h2" sx={{ mb: 2 }}>
                    Change Task Status
                </Typography>
                <FormControl fullWidth margin="normal">
                    <InputLabel>Status</InputLabel>
                    <Select
                        value={newStatus}
                        onChange={(e) => setNewStatus(e.target.value as 'TODO' | 'DOING' | 'DONE' | 'WARNING' | 'PENDING' | 'FAILED')}
                    >
                        <MenuItem value="TODO">TODO</MenuItem>
                        <MenuItem value="DOING">DOING</MenuItem>
                        <MenuItem value="DONE">DONE</MenuItem>
                        <MenuItem value="WARNING">WARNING</MenuItem>
                        <MenuItem value="PENDING">PENDING</MenuItem>
                        <MenuItem value="FAILED">FAILED</MenuItem>
                    </Select>
                </FormControl>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
                    <Button variant="contained" color="primary" onClick={handleSubmit}>
                        Update Status
                    </Button>
                    <Button variant="outlined" color="secondary" onClick={handleClose}>
                        Cancel
                    </Button>
                </Box>
            </Box>
        </Modal>
    );
};

export default ChangeStatusDialog;
