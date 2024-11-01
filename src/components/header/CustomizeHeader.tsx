import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, IconButton } from '@mui/material';
import { AddCircle } from "@mui/icons-material";
import CurrentTime from "../helper/CurrentTime";
import AddModal from '../tasks/AddModal';

const CustomizeHeader: React.FC = () => {

    const [open, setOpen] = useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <AppBar position="static" sx={{ backgroundColor: 'transparent', boxShadow: 'none', color: 'black' }}>
            <Toolbar sx={{ justifyContent: "space-between" }}>

                <IconButton color="inherit" onClick={handleOpen} >
                    <AddCircle style={{ fontSize: '60px', color: '#00BFAE', border: '2px solid black', borderRadius: '50%' }} />
                </IconButton>

                <Typography variant="h6">
                    <CurrentTime />
                </Typography>

                <AddModal open={open} handleClose={handleClose}/>
            </Toolbar>
        </AppBar>
    );
}

export default CustomizeHeader;
