import React, { useState } from 'react';
import { useGetTasksQuery, useDeleteTaskMutation } from '../../api/taskApi';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import ChangeStatusDialog from './ChangeStatusDialog';
import EditTaskDialog from './EditTaskDialog';
import ConfirmDeleteDialog from './ConfirmDeleteDialog';
import HashInputDialog from './HashInputDialog';
import TaskFilters from './TaskFilters';
import { Delete, Edit } from '@mui/icons-material';

const TaskTable: React.FC = () => {
    const { data: tasks, error, isLoading } = useGetTasksQuery();
    const [deleteTask] = useDeleteTaskMutation();
    const [filters, setFilters] = useState({
        title: '',
        priority: '',
        status: '',
        estimateMin: 0,
        estimateMax: Infinity,
    });

    const [openChangeStatusDialog, setOpenChangeStatusDialog] = useState(false);
    const [openEditDialog, setOpenEditDialog] = useState(false);
    const [openConfirmDeleteDialog, setOpenConfirmDeleteDialog] = useState(false);
    const [openHashInputDialog, setOpenHashInputDialog] = useState(false);
    const [selectedTaskId, setSelectedTaskId] = useState<any>(null);
    const [selectedTaskData, setSelectedTaskData] = useState<any>(null);

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error loading tasks.</div>;

    const handleFilterChange = (newFilters: typeof filters) => {
        setFilters(newFilters);
    };

    const filteredTasks = tasks?.filter((task) => {
        return (
            task.title.toLowerCase().includes(filters.title.toLowerCase()) &&
            (filters.priority === '' || task.priority === filters.priority) &&
            (filters.status === '' || task.status === filters.status) &&
            (task.estimate >= filters.estimateMin) &&
            (task.estimate <= filters.estimateMax)
        );
    });

    const handleEditClick = (task: any) => {
        setSelectedTaskId(task.id);
        setSelectedTaskData(task);
        setOpenEditDialog(true);
    };

    const handleDeleteClick = (task: any) => {
        setSelectedTaskId(task.id);
        setSelectedTaskData(task);
        setOpenConfirmDeleteDialog(true);
    };

    const handleHashSubmit = async (hash: string) => {
        if (hash === selectedTaskData.hash) {
            try {
                await deleteTask(selectedTaskId).unwrap();
                alert('Task successfully deleted!');
            } catch (error) {
                console.error('Failed to delete the task:', error);
                alert('Failed to delete the task.');
            }
        } else {
            alert('Hash is incorrect. Please try again.');
        }
    };

    const handleRowClick = (task: any) => {
        setSelectedTaskId(task.id);
        setSelectedTaskData(task);
        setOpenChangeStatusDialog(true);
    };

    return (
        <>
            <TaskFilters onFilterChange={handleFilterChange} />
            <TableContainer component={Paper} sx={{ backgroundColor: "black" }}>
                <Table>
                    <TableHead>
                        <TableRow sx={{ color: 'white' }}>
                            <TableCell sx={{ color: 'white' }}>Title</TableCell>
                            <TableCell sx={{ color: 'white' }}>Priority</TableCell>
                            <TableCell sx={{ color: 'white' }}>Date Time</TableCell>
                            <TableCell sx={{ color: 'white' }}>Estimate</TableCell>
                            <TableCell sx={{ color: 'white' }}>Status</TableCell>
                            <TableCell sx={{ color: 'white' }}>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredTasks?.map((task) => (
                            <TableRow key={task.id} onClick={() => handleRowClick(task)} sx={{ cursor: 'pointer' }}>
                                <TableCell sx={{ color: 'white' }}>{task.title}</TableCell>
                                <TableCell sx={{ color: 'white' }}>{task.priority}</TableCell>
                                <TableCell sx={{ color: 'white' }}>
                                    {new Intl.DateTimeFormat('en-GB', {
                                        year: 'numeric',
                                        month: '2-digit',
                                        day: '2-digit',
                                        hour: '2-digit',
                                        minute: '2-digit',
                                        second: '2-digit',
                                        hour12: false,
                                    }).format(new Date(task.datetime))}
                                </TableCell>
                                <TableCell sx={{ color: 'white' }}>{task.estimate}</TableCell>
                                <TableCell sx={{ color: 'white' }}>{task.status}</TableCell>
                                <TableCell>
                                    <Delete sx={{ color: 'red', ":hover": { cursor: 'pointer' } }}
                                        onClick={(e) => { e.stopPropagation(); handleDeleteClick(task); }} />
                                    <Edit sx={{ color: 'blue', ":hover": { cursor: 'pointer' } }}
                                        onClick={(e) => { e.stopPropagation(); handleEditClick(task); }} />
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <ChangeStatusDialog open={openChangeStatusDialog} handleClose={() => setOpenChangeStatusDialog(false)} taskId={selectedTaskId} />
            <EditTaskDialog open={openEditDialog} handleClose={() => setOpenEditDialog(false)} taskId={selectedTaskId} taskData={selectedTaskData} />
            <HashInputDialog
                open={openHashInputDialog}
                handleClose={() => setOpenHashInputDialog(false)}
                handleSubmit={handleHashSubmit}
            />
            <ConfirmDeleteDialog
                open={openConfirmDeleteDialog}
                handleClose={() => setOpenConfirmDeleteDialog(false)}
                handleConfirm={() => setOpenHashInputDialog(true)}
            />
        </>
    );
};

export default TaskTable;
