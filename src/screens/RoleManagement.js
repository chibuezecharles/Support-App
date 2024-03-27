import {
  Box,
  Button,
  Flex,
  Input,
  InputGroup,
  InputRightElement,
  Text,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { BiChevronDown, BiSearch } from "react-icons/bi";
import RoleManagementTable from "../components/RoleManagementTable";
import EmptyRoleManagement from "../components/EmptyRoleManagement";

const RoleManagement = () => {
  const [isEmpty, setIsEmpty] = useState(false);
  return (
    <Box bg={"white"}>
      <Flex
        direction={["column", "column", "row", "row"]}
        justify={"space-between"}
        align={"center"}
        p={4}
        bg={"white"}
      >
        <Text fontWeight={"400"} fontSize={"24px"}>
          Role Management
        </Text>
        <Flex gap={2}>
          <InputGroup>
            <InputRightElement pointerEvents="none">
              <BiSearch color="gray" />
            </InputRightElement>
            <Input placeholder="Search" />
          </InputGroup>

          <Button
            bg={"brand.primary"}
            rightIcon={<BiChevronDown />}
            color={"white"}
            minW={"150px"}
            p={4}
            borderRadius={"3px"}
          >
            Filter by Date
          </Button>
        </Flex>
      </Flex>
      {isEmpty ? (
        <EmptyRoleManagement setIsEmpty={setIsEmpty} />
      ) : (
        <RoleManagementTable />
      )}
    </Box>
  );
};

export default RoleManagement;
