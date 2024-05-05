// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";

// Events
import events from "./exampleEvents";

const rows = events.map((event) => ({
  description: event.description,
  by: (
    <SoftBox display="flex" py={1}>
    {event.by}
    </SoftBox>
  ),
  at: (
    <SoftTypography variant="caption" color="text" fontWeight="medium">
    {event.at}
    </SoftTypography>
  ),
}));

export default function data() {

  return {
    columns: [
      { name: "description", align: "left" },
      { name: "by", align: "center" },
      { name: "at", align: "center" },
    ],

    rows: rows
  };
}
