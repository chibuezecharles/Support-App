import { Button, Flex, Image, Text } from "@chakra-ui/react";
import React from "react";
import { PiPlusBold } from "react-icons/pi";
import { useDispatch } from "react-redux";
import { setloadDrawer } from "../redux/slices/drawerSlice";

const EmptyRoleManagement = () => {
  const dispatch = useDispatch();
  const onClick = () => {
    dispatch(setloadDrawer({ status: true, title: "Create A Role", type: "createRole" }));
  };
  return (
    <Flex direction="column" minH={"80vh"} align={"center"} gap={4}>
      <Image
        width={"12.5rem"}
        src="EmptyStateRoleManagement.png"
        position={"relative"}
        bottom={"-10"}
      />
      <Text fontSize={"1.75rem"} fontWeight={"500"}>
        Role Management
      </Text>
      <Text textAlign={"center"}>
        You are yet to create any role , Kindly create a role by clicking on the
        “ Create “ new role” Button below.
      </Text>
      <Button
        borderRadius={"3px"}
        bg={"brand.primary"}
        leftIcon={<PiPlusBold />}
        color="white"
        onClick={onClick}
      >
        Create New Role
      </Button>
    </Flex>
  );
};

export default EmptyRoleManagement;
