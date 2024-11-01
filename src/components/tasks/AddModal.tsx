import React from 'react';
import {
    Modal, Box, Button, Typography, TextField,
    Select, MenuItem, FormControl, InputLabel
} from '@mui/material';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useAddTaskMutation } from '../../api/taskApi';

interface IProps {
    open: boolean;
    handleClose: () => void;
}

const validationSchema = Yup.object({
    title: Yup.string().required('Title is required'),
    priority: Yup.string().required('Priority is required'),
    estimate: Yup.number()
        .required('Estimate is required')
        .positive('Estimate must be a positive number')
        .integer('Estimate must be an integer'),
});

const generateHash = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let hash = '';
    for (let i = 0; i < 5; i++) {
        const randomIndex = Math.floor(Math.random() * chars.length);
        hash += chars[randomIndex];
    }
    return hash;
};

const AddModal: React.FC<IProps> = ({ open, handleClose }) => {

    const [addTask] = useAddTaskMutation();
    const initialValues = { title: '', priority: '', estimate: '' };

    const modalStyle = {
        position: 'absolute' as 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        boxShadow: 24,
        p: 4,
        borderRadius: '10px',
    };

    const handleSubmit = async (values: any, { resetForm }: any) => {
        try {
            await addTask({
                ...values,
                status: 'TODO',
                hash: generateHash(),
                datetime: new Date().toISOString(),
            }).unwrap();
            alert('Task added successfully!');
            resetForm();
            handleClose();
        } catch (error) {
            console.error('Failed to add task:', error);
        }
    };

    return (
        <Modal open={open} onClose={handleClose}>
            <Box sx={modalStyle}>
                <Typography variant="h6" component="h2" sx={{ mb: 2 }}>
                    New Task
                </Typography>

                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    {({ errors, touched }) => (
                        <Form>

                            <Field
                                as={TextField}
                                label="Title"
                                name="title"
                                variant="outlined"
                                fullWidth
                                margin="normal"
                                error={touched.title && Boolean(errors.title)}
                                helperText={<ErrorMessage name="title" />}
                            />

                            <FormControl fullWidth margin="normal" error={touched.priority && Boolean(errors.priority)}>
                                <InputLabel>Priority</InputLabel>
                                <Field
                                    as={Select}
                                    name="priority"
                                    label="Priority"
                                >
                                    <MenuItem value="LOW">Low</MenuItem>
                                    <MenuItem value="MEDIUM">Medium</MenuItem>
                                    <MenuItem value="HIGH">High</MenuItem>
                                </Field>
                                <Typography color="error" variant="caption">
                                    <ErrorMessage name="priority" />
                                </Typography>
                            </FormControl>

                            <Field
                                as={TextField}
                                label="Estimate (hours)"
                                name="estimate"
                                variant="outlined"
                                fullWidth
                                margin="normal"
                                type="number"
                                error={touched.estimate && Boolean(errors.estimate)}
                                helperText={<ErrorMessage name="estimate" />}
                            />

                            <Box sx={{ mt: 3, display: 'flex', justifyContent: 'space-between' }}>
                                <Button type="submit" variant="contained" color="primary">
                                    Submit
                                </Button>
                                <Button variant="outlined" color="secondary" onClick={handleClose}>
                                    Close
                                </Button>
                            </Box>
                        </Form>
                    )}
                </Formik>
            </Box>
        </Modal>
    );
};

export default AddModal;
