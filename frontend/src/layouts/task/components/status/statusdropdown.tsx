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

  

const updateTaskStatus = async (taskId, statusn) => {
  try {
    const response = await  axiosInstance.post(`tasks/stat/${taskId}`, statusn );
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
        <FormControl>
          <Select
            value={status}
            onChange={handleStatusChange}
            displayEmpty
            inputProps={{ 'aria-label': 'Without label' }}
            disabled={!editing}
          >
            <MenuItem value="3">To Do</MenuItem>
            <MenuItem value="1">In Progress</MenuItem>
            <MenuItem value="0">Done</MenuItem>
          </Select>
          <IconButton onClick={() => setEditing(!editing)}>
            <MdEdit />
          </IconButton>
        </FormControl>
      ) : (
        <SoftTypography variant="h4" fontWeight="medium">
          <VscCircleFilled />
          &nbsp;&nbsp;&nbsp;
          {getStatusText(Number(status))}
        </SoftTypography>
      )}
    </>
  );
}

export default StatusDropdown;
