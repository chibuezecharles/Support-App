import { Box, Button } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import CustomTable from "./CustomTable";
import { useDispatch, useSelector } from "react-redux";
import { setloadDrawer } from "../redux/slices/drawerSlice";
import { fetchLOB, fetchUsers } from "../redux/slices/lobSlice";
import { setLobDetails } from "../redux/slices/detailsSlice";

const StaffLineOfBusinessTable = () => {
  const dispatch = useDispatch();
  const [isLoading] = useState(false);
  const lobs = useSelector((state) => state?.lobSlice?.lobs);

  useEffect(() => {
    dispatch(fetchLOB());
    dispatch(fetchUsers());
  }, [dispatch, isLoading]);

  const viewLOBDetails = (item) => {
    dispatch(setLobDetails(item));
    dispatch(
      setloadDrawer({
        status: true,
        type: "staffLOBDetails",
        title: "Line Of Business Details",
        data: { item },
      })
    );
  };
  const tableProps = {
    data: lobs,
    title: {
      date: "Date",
      lineOfBusiness: "Line Of Business",
      description: "Description",
      // creator: "Creator",
      // projects: "Projects",
      // sop: "SOP",
      action: "ACTION",
    },
    dataKeys: [
      "date",
      "lineOfBusiness",
      "description",
      // "creator",
      // "projects",
      // "sop",
      "action",
    ],
    variant: true,
    sn: true,
    transformRow: (item) => ({
      date:item.dateCreated && new Date(item.dateCreated).toLocaleDateString("en-US", {
        year: "numeric",
        month: "numeric",
        day: "numeric",
      }),
      lineOfBusiness: item.name,
      description: item.description,
      // creator: item.creator,
      // projects: item.projects,
      // sop: item.sop,
      action: (
        <Button
          color={"#515151"}
          bg={"#F5F5F5"}
          onClick={() => viewLOBDetails(item)}
        >
          View Details
        </Button>
      ),
    }),
  };
  return (
    <Box my={4}>
      <CustomTable {...tableProps} sn={false} />
    </Box>
  );
};

export default StaffLineOfBusinessTable;
