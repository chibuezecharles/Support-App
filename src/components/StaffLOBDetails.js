import {
  Flex,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from "@chakra-ui/react";
import React, { useEffect } from "react";
import StatusBadge from "./StatusBadge";
import { useDispatch, useSelector } from "react-redux";
import StaffLOBProjectsTable from "./StaffLOBProjectsTable";
import { fetchNewProject } from "../redux/slices/newProjectSlice";
// import LobSOPContainer from "../screens/LobSOPContainer";
import LobSOPDrawer1 from "../screens/LobSOPDrawer1";
import {clearsearchFilter} from "../redux/slices/searchFilterSlice";

const StaffLOBDetails = () => {
  const dispatch = useDispatch();
  const lobDetails = useSelector((state) => state.detailsSlice.lobDetails);

  useEffect(() => {
    dispatch(fetchNewProject());
  }, [dispatch]);

  const projects = useSelector((state) => state?.newProject?.projects);
  const lobProjects = projects?.filter((item) => item?.lobId === lobDetails?.id);
  // console.log(lobProjects);

  return (
    <>
      <StatusBadge title={lobDetails.name} />
      <Tabs>
        <TabList
          gap={4}
          borderBottom={"0"}
          // overflowX={"scroll"}
          pb={5}
          sx={{
            "& button": {
              fontWeight: "normal",
              flexBasis: "1 1 12rem",
              bg: "#E9E9E9",
              color: "#515151",
              minW: "150px",
              borderRadius: "3px",
              _selected: { bg: "#EAAD11", color: "white" },
            },
          }}
        >
          <Tab>L.O.B Details</Tab>
          <Tab onClick={() => dispatch(clearsearchFilter())}>Projects</Tab>
          <Tab>Project Document</Tab>
          <Tab onClick={() => dispatch(clearsearchFilter())}>SOPs</Tab>
        </TabList>
        <TabPanels padding={0}>
          <TabPanel px={0}>
            <Flex direction={"column"} gap={6}>
              <Flex>
                <Text flexBasis={"10rem"} flexGrow={0} flexShrink={0}>
                  Created By
                </Text>
                <Text>{lobDetails.creator}</Text>
              </Flex>
              <Flex>
                <Text flexBasis={"10rem"} flexGrow={0} flexShrink={0}>
                  Date Created
                </Text>
                <Text>
                  {new Date(lobDetails.dateCreated).toLocaleDateString(
                    "en-US",
                    {
                      year: "numeric",
                      month: "numeric",
                      day: "numeric",
                    }
                  )}
                </Text>
              </Flex>
              <Flex>
                <Text flexBasis={"10rem"} flexGrow={0} flexShrink={0}>
                  L.O.B Location
                </Text>
                <Text>{lobDetails.lobLocation}</Text>
              </Flex>
              <Flex>
                <Text flexBasis={"10rem"} flexGrow={0} flexShrink={0}>
                  Description
                </Text>
                <Text>{lobDetails.description}</Text>
              </Flex>
            </Flex>
          </TabPanel>
          <TabPanel>
            <StaffLOBProjectsTable />
          </TabPanel>
          <TabPanel>
          {
            lobProjects.length > 0 ?
            (<Text color={'#121212'} fontSize={'18px'} mb={4}>Project Documents</Text>) :
            (<Text color={'red'} fontSize={'18px'} mb={4} textAlign={'center'}>No Project Document Available</Text>)
          }
          <Flex flexDirection={'column'}>
          {
            lobProjects?.map((data, index) => (
              <>
                <Text key={index} color={'#005E39'} fontSize={'16px'} textDecoration={'underline'} pb={4} cursor={'pointer'}>{data?.documents[0]?.brsLink}</Text>
              <Text key={index} color={'#005E39'} fontSize={'16px'} textDecoration={'underline'} pb={4} cursor={'pointer'}>{data?.documents[0]?.srsLink}</Text>
              <Text key={index} color={'#005E39'} fontSize={'16px'} textDecoration={'underline'} pb={4} cursor={'pointer'}>{data?.documents[0]?.manual}</Text>
              </>
            ))
          }
              
          </Flex>
          </TabPanel>
          <TabPanel>
            {/* <LobSOPContainer /> */}
            <LobSOPDrawer1 />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </>
  );
};

export default StaffLOBDetails;
