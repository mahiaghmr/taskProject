import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from '@mui/material';

interface HashInputDialogProps {
    open: boolean;
    handleClose: () => void;
    handleSubmit: (hash: string) => void;
}

const HashInputDialog: React.FC<HashInputDialogProps> = ({ open, handleClose, handleSubmit }) => {
    const [hash, setHash] = useState('');
    const [error, setError] = useState('');

    const handleConfirm = () => {
        if (hash.trim() === '') {
            setError('Hash is required');
            return;
        }

        handleSubmit(hash); 
        setHash('');
        handleClose();
    };

    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Enter Task Hash</DialogTitle>
            <DialogContent>
                <TextField
                    autoFocus
                    margin="dense"
                    label="Task Hash"
                    type="text"
                    fullWidth
                    variant="standard"
                    value={hash}
                    onChange={(e) => setHash(e.target.value)}
                    error={!!error}
                    helperText={error}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={handleConfirm} color="primary">Submit</Button>
            </DialogActions>
        </Dialog>
    );
};

export default HashInputDialog;
