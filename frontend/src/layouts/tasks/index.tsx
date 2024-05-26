// @mui material components
import Card from '@mui/material/Card';

// Soft UI Dashboard React components
import SoftBox from 'components/SoftBox';
import SoftTypography from 'components/SoftTypography';

// Soft UI Dashboard React examples
import DashboardLayout from 'examples/LayoutContainers/DashboardLayout';
import DashboardNavbar from 'examples/Navbars/DashboardNavbar';
import Footer from 'examples/Footer';
import Table from 'examples/Tables/Table';
import SoftInput from 'components/SoftInput';
import { fetchProjects } from 'layouts/projects/data/projectsTableData';

// Data a22
import tasksTableData from 'layouts/tasks/data/tasksTableData';
import { Grid } from '@mui/material';
import { useEffect } from 'react';

function Tasks() {
  const { columns: prCols, rows: prRows } = tasksTableData;

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SoftBox py={3}>
        <SoftBox mb={3}></SoftBox>
        <Card>
          <Grid
            container
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <SoftBox
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              p={3}
            >
              <SoftTypography variant="h6">Tasks</SoftTypography>
            </SoftBox>
            <SoftBox pr={1}>
              <SoftInput
                placeholder="Task ID"
                icon={{ component: 'search', direction: 'left' }}
              />
            </SoftBox>
          </Grid>
          <SoftBox
            sx={{
              '& .MuiTableRow-root:not(:last-child)': {
                '& td': {
                  borderBottom: ({ borders: { borderWidth, borderColor } }) =>
                    `${borderWidth[1]} solid ${borderColor}`,
                },
              },
            }}
          >
            <Table columns={prCols} rows={prRows} />
          </SoftBox>
        </Card>
      </SoftBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Tasks;
