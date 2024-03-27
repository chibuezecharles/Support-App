import {
  Button,
  Divider,
  Flex,
  // Input,InputGroup,InputRightElement,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { BiDownload, BiPlus, 
  // BiSearch
 } from "react-icons/bi";
import ManageClientTable from "../components/ManageClientTable";
import { useDispatch } from "react-redux";
import { setloadDrawer } from "../redux/slices/drawerSlice";
import AdminLineOfBusinessTable from "../components/AdminLineOfBusinessTable";
import SearchAndFilter from "../components/SearchAndFilter";
import {clearsearchFilter} from "../redux/slices/searchFilterSlice";

const AdminLineOfBusiness = () => {
  const [tabIndex, setTabIndex] = useState(0);
  const dispatch = useDispatch();

  const createClientHandler = () => {
    dispatch(
      setloadDrawer({
        status: true,
        type: "createClient",
        title: "Create A New Client",
      })
    );
  };

  const createLOBHandler = () => {
    dispatch(
      setloadDrawer({
        status: true,
        type: "createLOB",
        title: "Create A New Line of Business",
      })
    );
  };

  return (
    <Tabs bg={"white"} p={4} onChange={(index) => setTabIndex(index)}>
      <Flex justify={"space-between"} alignItems={"center"}>
        <Text>Line of Business</Text>
        <Flex gap={4}>
          {tabIndex === 0 ? (
            <Button
              bg={"brand.primary"}
              leftIcon={<BiPlus />}
              color={"white"}
              minW={"150px"}
              p={4}
              borderRadius={"3px"}
              onClick={createLOBHandler}
            >
              Create Line of Business
            </Button>
          ) : (
            <Button
              bg={"brand.primary"}
              leftIcon={<BiPlus />}
              color={"white"}
              minW={"150px"}
              p={4}
              borderRadius={"3px"}
              onClick={createClientHandler}
            >
              Create New Client
            </Button>
          )}
          <Button
            bg={"#EAAD11"}
            leftIcon={<BiDownload />}
            color={"white"}
            minW={"150px"}
            p={4}
            borderRadius={"3px"}
          >
            Download
          </Button>
        </Flex>
      </Flex>
      <Divider />

      <Flex justify={"space-between"} alignItems={"center"} mt={6}>
        <TabList
          gap={4}
          borderBottom={"0"}
          sx={{
            "& button": {
              fontWeight: "normal",
              flexBasis: "12rem",
              bg: "#E9E9E9",
              color: "#515151",
              minW: "150px",
              _selected: { bg: "brand.primary", color: "white" },
            },
          }}
        >
          <Tab borderRadius={"3px"} onClick={() => dispatch(clearsearchFilter())}>Line of Business</Tab>
          <Tab borderRadius={"3px"} onClick={() => dispatch(clearsearchFilter())}>Manage Client</Tab>
        </TabList>
        {/* <InputGroup width={"auto"}>
          <InputRightElement pointerEvents="none">
            <BiSearch color="gray" />
          </InputRightElement>
          <Input placeholder="Search" />
        </InputGroup> */}
        <SearchAndFilter />
      </Flex>

      <Divider my={2} />

      <TabPanels>
        <TabPanel>
          <AdminLineOfBusinessTable />
        </TabPanel>
        <TabPanel>
          <ManageClientTable />
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
};

export default AdminLineOfBusiness;
