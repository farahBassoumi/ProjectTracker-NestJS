/* eslint-disable react/prop-types */

// Soft UI Dashboard React components
import SoftTypography from "components/SoftTypography";

// Assuming you have components for Icon, SoftBox, SoftTypography, SoftProgress

const taskData = [
  {
    ID: "2003",
    Description: "hedhy description",
    Status: "TO DO", // Adjust completion values as needed
    AssignedTo: "Saber",
  },
  {
    ID: "1003",
    Description: "hedhy mahich description",
    Status: "DONE", // Adjust completion values as needed
    AssignedTo: "Mohamed",
  },
];

const getColorByStatus = (status) => {
  if (status === "DONE"){
    return "green"
  }
  else if (status === "TO DO"){
    return "yellow"
  }
}

const trimDescription = (description) => {
  if (description.length > 35){
    return description
  }
}

const tasksTableData = {
  columns: [
    { name: "ID", align: "left" },
    { name: "Description", align: "left" },
    { name: "AssignedTo", align: "center" },
    { name: "Status", align: "center" },
  ],
  rows: taskData.map((task) => ({
    ID:(
      <SoftTypography variant="caption" color="text" fontWeight="bold" fontSize={15}>
          {task.ID}
      </SoftTypography>
      ),
    Description: (
      <SoftTypography variant="caption" color="text" fontWeight="bold">
        {task.Description}
      </SoftTypography>
    ),
    AssignedTo: task.AssignedTo,
    Status: (
      <SoftTypography variant="caption" color="text" fontWeight="bold" sx={{color: getColorByStatus(task.Status)}}>
        {task.Status}
      </SoftTypography>
    ),
  })),
};

export default tasksTableData;

