import { Box,Flex,} from "@chakra-ui/react";
import React from "react";
import CustomTable from "./CustomTable";
import { useDispatch, useSelector } from "react-redux";
import SearchAndFilter from "./SearchAndFilter";
import {setLobProjectTableDetail} from "../redux/slices/detailsSlice";
import StaffLOBProjectsTableDetail from "./StaffLOBProjectsTableDetail";
import {setToggleState} from "../redux/slices/lobSlice";


const StaffLOBProjectsTable = ({ setShowProjectInfo, showProjectInfo }) => {
  const dispatch = useDispatch();
  const lobDetails = useSelector((state) => state?.detailsSlice?.lobDetails);
  const projects = useSelector((state) => state?.newProject?.projects);
  const lobProjects = projects?.filter((item) => item?.lobId === lobDetails?.id);
  const toggleState = useSelector((state) => state?.lobSlice?.toggleState);
  // console.log("lobProjects", lobProjects);
  const handleAction = (item) => {
    dispatch(setLobProjectTableDetail(item));
    dispatch(setToggleState());
  }
  const tableProps = {
    data: lobProjects,
    title: {
      refCode: "Ref Code",
      projectName: "Project Name",
      projectType: "Project Type",
      status: "Status",
    },
    dataKeys: ["refCode", "projectName", "projectType"],
    variant: true,
    sn: false,
    transformRow: (item) => ({
      refCode: <Box cursor={'pointer'} onClick={() => handleAction(item)}>{item?.projectRefCode}</Box>,
      projectName:<Box cursor={'pointer'}  onClick={() => handleAction(item)}>{item?.projectName}</Box>,
      projectType: <Box cursor={'pointer'}  onClick={() => handleAction(item)}>{item?.projectType}</Box>,
    }),
  };
  return (
    <Box my={4}>
      <Flex justify={"end"} align={"center"} py={2} bg={"white"}>
        {
          toggleState  && 
          <Flex gap={2}>
            <SearchAndFilter />
          </Flex>
        }
      </Flex>
      <Box>
        {
          toggleState ? (
            <CustomTable {...tableProps}/>
            ) :(
              <StaffLOBProjectsTableDetail />
              )
        }
        
      </Box>
    </Box>
  );
};

export default StaffLOBProjectsTable;
