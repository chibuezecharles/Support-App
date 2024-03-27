import { Box, Divider, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../../config/settings";
import { drawer2loader, drawerToggle } from "../../redux/slices/drawerSlice";
import httpRequest from "../../utils/httpRequest";
import CustomTable from "../CustomTable";
import { format } from "date-fns";

const ReportDeveloperUpdate = () => {
  const [sop, setSop] = useState([]);
  const dispatch = useDispatch();
  const reportId = useSelector(
    (state) => state.reportActions.reportData.projectId
  );
  useEffect(() => {
    async function getData() {
      const res = await httpRequest(`${BASE_URL}/sop/view-sop/${reportId}`);
      setSop(res?.data);
    }
    getData();
  }, [reportId]);

  const handleDevUpdate = (
    title,
    createdBy,
    dateCreated,
    updatedBy,
    dateModified,
    sopSteps
  ) => {
    dispatch(
      drawer2loader({
        title,
        createdBy,
        dateCreated,
        updatedBy,
        dateModified,
        sopSteps,
      })
    );
    dispatch(drawerToggle());
  };

  const tableProps1 = {
    data: [sop],
    title: {
      title: "Sop Title",
      dateCreated: " Date & Time",
      createdBy: "Name Of Developer",
      UpdateSummary: "Update Summary",
    },
    dataKeys: ["title", "dateCreated", "createdBy", "sopSteps"],
    variant: "true",
    sn: false,
    transformRow: (item) => {
      return {
        title: (
          <div
            style={{ cursor: "pointer" }}
            onClick={() =>
              handleDevUpdate(
                item?.title,
                item?.createdBy,
                item?.dateCreated,
                item?.updatedBy,
                item?.dateModified,
                item?.sopSteps
              )
            }
          >
            {item.title}
          </div>
        ),
        dateCreated: (
          <div
            style={{ cursor: "pointer" }}
            onClick={() =>
              handleDevUpdate(
                item?.title,
                item?.createdBy,
                item?.dateCreated,
                item?.updatedBy,
                item?.dateModified,
                item?.sopSteps
              )
            }
          >
            {format(new Date(item.dateCreated), "dd-MM-yyyy")}
          </div>
        ),
        createdBy: (
          <div
            style={{ cursor: "pointer" }}
            onClick={() =>
              handleDevUpdate(
                item?.title,
                item?.createdBy,
                item?.dateCreated,
                item?.updatedBy,
                item?.dateModified,
                item?.sopSteps
              )
            }
          >
            {item.createdBy}
          </div>
        ),
        UpdateSummary: (
          <div
            style={{ cursor: "pointer" }}
            onClick={() =>
              handleDevUpdate(
                item?.title,
                item?.createdBy,
                item?.dateCreated,
                item?.updatedBy,
                item?.dateModified,
                item?.sopSteps
              )
            }
          >
            {item.UpdateSummary}
          </div>
        ),
      };
    },
  };

  return (
    <Box mt={7}>
      <Text
        color={"#121212"}
        fontSize={"18px"}
        fontWeight={"500"}
        lineHeight={"20px"}
        py={3}
      >
        Recent and Previous Updates by Developers
      </Text>
      <Divider border={"1px solid #B4B1B1"} mb={4} />
      {sop?.["projectId"] ? <CustomTable {...tableProps1} /> : null}
    </Box>
  );
};

export default ReportDeveloperUpdate;
