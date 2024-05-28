import { useState, useEffect } from 'react';
import { MenuItem, Select, FormControl, InputLabel, IconButton, Box } from '@mui/material';
import { MdEdit } from 'react-icons/md';
import SoftBox from 'components/SoftBox';
import SoftTypography from 'components/SoftTypography';
import { getUserIdFromToken } from 'utils/getuserid';
import { getStatusText } from 'utils/taskStatusMapping';
import { axiosInstance, handleError } from 'utils';
import axios from 'axios';
import { VscCircleFilled } from 'react-icons/vsc';
import { fetchTask } from 'layouts/task/data/TaskListData';
import { c, s } from 'vite/dist/node/types.d-aGj9QkWt';
import { Task } from 'interfaces/Task';
import { GoCheck } from "react-icons/go";
import { TaskStatus } from 'interfaces/TaskStatus';

function StatusDropdown({ task }) {
  const [status, setStatus] = useState(task.status || 'To Do');
  const [editing, setEditing] = useState(false);
  const [isAssignedUserOrPM, setIsAssignedUserOrPM] = useState(false);
  const userId = getUserIdFromToken();
  

  useEffect(() => {
    if (task.assignedTo && (task.assignedTo.id === userId)) {
      setIsAssignedUserOrPM(true);
    }
  }, [task, userId]);

  

  useEffect(() => {
    setStatus(task.status);
  }, [task.status]);

  const handleStatusSelectChange = (event) => {
    setStatus(event.target.value);
    handleStatusChange(event);
  };


const updateTaskStatus = async (taskId, statusn) => {
  try {
    const newTask: Partial<Task> = {
        status: statusn ,
      };
    const response = await  axiosInstance.patch(`tasks/${taskId}`, newTask );
    console.log(response.data);
    return response.data;   
  } catch (error) {
    throw new Error('Error updating task status');
  }
};

  const handleStatusChange = async (event) => {
    const newStatus = event.target.value;
    setStatus(newStatus);
    try {
      await updateTaskStatus(task.id, Number(newStatus));
      fetchTask(task.id); // Re-fetch the task to update the UI
    } catch (error) {
    }
  };

  return (
    <>
      <SoftTypography variant="h5" fontWeight="medium">
        State &nbsp;&nbsp;&nbsp;&nbsp;
      </SoftTypography>
      {isAssignedUserOrPM ? (
        <Box display="flex" alignItems="center">
          {!editing ? (
            <Box display="flex" alignItems="center">
              <SoftTypography variant="h4" fontWeight="medium">
                <VscCircleFilled />
                &nbsp;&nbsp;&nbsp;
                {getStatusText(Number(status))}
              </SoftTypography>
              <IconButton onClick={() => setEditing(true)}>
                <MdEdit />
              </IconButton>
            </Box>
          ) : (
            <FormControl variant="outlined" size="small">
              <Select
                value={status}
                onChange={handleStatusSelectChange}
                displayEmpty
                inputProps={{ 'aria-label': 'Without label' }}
              >
                <MenuItem value="3">To Do</MenuItem>
                <MenuItem value="1">In Progress</MenuItem>
                <MenuItem value="0">Done</MenuItem>
              </Select>
              <IconButton onClick={() => setEditing(false)}>
              <GoCheck />
              </IconButton>
            </FormControl>
          )}
        </Box>
      ) : (
        <SoftTypography variant="h4" fontWeight="medium">
          <VscCircleFilled />
          &nbsp;&nbsp;&nbsp;
          {getStatusText(Number(task.status))}
        </SoftTypography>
      )}
    </>
  );
}

export default StatusDropdown;
