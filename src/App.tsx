import React from 'react';
import './App.css';
import CustomizeHeader from './components/header/CustomizeHeader';
import TasksTable from './components/tasks/TasksTable';
import { Box } from '@mui/material';
import TaskSemiCircleChart from './components/tasks/TaskSemiCircleChart';

function App() {
  return (
    <Box sx={{ padding: '10px' }}>
      <CustomizeHeader /> 
      <TaskSemiCircleChart />
      <TasksTable />
    </Box>
  );
}

export default App;
