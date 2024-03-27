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
import { useDispatch } from "react-redux";
import { setloadDrawer } from "../redux/slices/drawerSlice";
import RoleManagementTable from "../components/RoleManagementTable";
import UserManagementTable from "../components/UserManagementTable";
import SearchAndFilter from "../components/SearchAndFilter";
import {clearsearchFilter} from "../redux/slices/searchFilterSlice";

const UserRoleManagement = () => {
  const [tabIndex, setTabIndex] = useState(0);
  const dispatch = useDispatch();

  const createUserHandler = () => {
    dispatch(
      setloadDrawer({
        status: true,
        type: "createNewUser",
        title: "Create A User",
      })
    );
  };

  return (
    <Tabs bg={"white"} p={4} onChange={(index) => setTabIndex(index)}>
      <Flex justify={"space-between"} alignItems={"center"}>
        <Text>{tabIndex === 0 ? "User" : "Role"} Management</Text>
        <Flex gap={4}>
          {tabIndex === 0 ? (
            <Button
              bg={"brand.primary"}
              leftIcon={<BiPlus />}
              color={"white"}
              minW={"150px"}
              p={4}
              borderRadius={"3px"}
              onClick={createUserHandler}
            >
              Create User
            </Button>
          ) : null}
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
              minW: "250px",
              _selected: { bg: "brand.primary", color: "white" },
            },
          }}
        >
          <Tab borderRadius={"3px"} onClick={() => dispatch(clearsearchFilter())}>Users Management</Tab>
          <Tab borderRadius={"3px"} onClick={() => dispatch(clearsearchFilter())}>Roles Management</Tab>
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
          <UserManagementTable />
        </TabPanel>
        <TabPanel>
          <RoleManagementTable />
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
};

export default UserRoleManagement;
