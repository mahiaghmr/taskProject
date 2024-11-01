import React from 'react';
import { Modal, Box, Button, Typography, TextField, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { useEditTaskMutation } from '../../api/taskApi'; 
import * as Yup from 'yup';
import { Formik, Form, Field, ErrorMessage } from 'formik';

interface EditTaskDialogProps {
    open: boolean;
    handleClose: () => void;
    taskId: any;
    taskData: any; 
}

const validationSchema = Yup.object({
    title: Yup.string().required('Title is required'),
    priority: Yup.string().required('Priority is required'),
    estimate: Yup.number()
        .required('Estimate is required')
        .positive('Estimate must be a positive number')
        .integer('Estimate must be an integer'),
});

const EditTaskDialog: React.FC<EditTaskDialogProps> = ({ open, handleClose, taskId, taskData }) => {
    const [editTask] = useEditTaskMutation(); 

    const initialValues = {
        title: taskData?.title || '',
        priority: taskData?.priority || '',
        estimate: taskData?.estimate || '',
    };

    const handleSubmit = async (values: any) => {
        const updatedTask: Partial<typeof values> & { id: any } = { id: taskId };

        updatedTask.title = values.title || taskData.title;
        updatedTask.priority = values.priority || taskData.priority; 
        updatedTask.estimate = values.estimate || taskData.estimate;

        updatedTask.hash = taskData.hash; 
        updatedTask.status = taskData.status; 
        updatedTask.datetime = taskData.datetime;

        try {
            await editTask(updatedTask).unwrap();
            alert('Task updated successfully!');
            handleClose();
        } catch (error) {
            console.error('Failed to update task:', error);
        }
    };

    return (
        <Modal open={open} onClose={handleClose}>
            <Box sx={{ padding: 4, backgroundColor: 'white', borderRadius: '8px',margin:8 }}>
                <Typography variant="h6">Edit Task</Typography>
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
                                <Field as={Select} name="priority" label="Priority">
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
                                    Save
                                </Button>
                                <Button variant="outlined" color="secondary" onClick={handleClose}>
                                    Cancel
                                </Button>
                            </Box>
                        </Form>
                    )}
                </Formik>
            </Box>
        </Modal>
    );
};

export default EditTaskDialog;
