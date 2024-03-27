import { Box, Button, Flex, Text } from "@chakra-ui/react";
import { format } from "date-fns";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import DownloadBTN from "../components/DownloadBTN";
import { setloadDrawer } from "../redux/slices/drawerSlice";
import { reportDataLoader } from "../redux/slices/reportActions";
import CustomTable from "./CustomTable";
import ReportPanel from "./layout/ReportPanel";

const ReportNewProject = () => {
  const dispatch = useDispatch();
  const report = useSelector((state) => state.report?.data);

  const handleViewHistory = async (item) => {
    dispatch(setloadDrawer({ status: true, type: "projectHistory" }));
    dispatch(reportDataLoader(item));
  };

  const tableProps = {
    data: report,
    title: {
      projectName: "Project Name",
      startDate: "Start Date",
      endDate: "End Date",
      projectRefCode: "Project Reference Code",
      developers: "Developers Assigned",
      viewHistory: "History",
      status: "status",
    },
    dataKeys: [
      "projectName",
      "startDate",
      "endDate",
      "projectRefCode",
      "developers",
      "viewHistory",
      "status",
    ],
    variant: true,
    sn: false,
    transformRow: (item) => ({
      projectName: item.projectName,
      startDate: format(new Date(item.startDate), "yyyy-MM-dd"),
      endDate: format(new Date(item.endDate), "yyyy-MM-dd"),
      projectRefCode: item.projectRefCode,
      developers: item.developers.map((developer) => developer.fullname),
      viewHistory: (
        <Text
          color={"#5CBF14"}
          textDecoration={"underline"}
          cursor={"pointer"}
          onClick={() => handleViewHistory(item)}
        >
          View History
        </Text>
      ),
      status: (
        <Button
          bg={item.isActive ? "#E1E9FF" : "#FCF6DF"}
          color={item.isActive ? "#356EFF" : "#E9B500"}
          _hover={{ backgroundColor: "" }}
        >
          {item.isActive ? "Active" : "Inactive"}
        </Button>
      ),
    }),
  };

  return (
    <>
      <ReportPanel />

      <Box>
        <Flex justifyContent={"flex-end"} mt={10} mb={5}>
          <DownloadBTN btn_Text="Download Report" />
        </Flex>
        <CustomTable {...tableProps} />
      </Box>
    </>
  );
};

export default ReportNewProject;
