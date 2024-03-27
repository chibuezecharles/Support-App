import { Checkbox, CheckboxGroup, Flex, Text } from "@chakra-ui/react";
import React from "react";
import StatusBadge from "./StatusBadge";

const RoleDetails = () => {
  return (
    <>
      <StatusBadge title={"Head of Department"} badge={true} status={"active"}/>
      <Flex direction={"column"} gap={6} ml={6}>
        <Flex>
          <Text flexBasis={"10rem"} flexGrow={0} flexShrink={0}>
            Date Created
          </Text>
          <Text>23-08-2023</Text>
        </Flex>
        <Flex>
          <Text flexBasis={"10rem"} flexGrow={0} flexShrink={0}>
            Department
          </Text>
          <Text>Technology</Text>
        </Flex>
        <Flex>
          <Text flexBasis={"10rem"} flexGrow={0} flexShrink={0}>
            Role Description
          </Text>
          <Text>
            Support projects related to education technology implementations in
            the classroom
          </Text>
        </Flex>
      </Flex>
      <Text fontSize={"1.125rem"} my={4}>
        Privileges
      </Text>
      <Flex
        direction="column"
        gap={4}
        sx={{
          "& > label.chakra-checkbox": {
            py: 4,
            gap: 4,
            ml: 4,
            borderBottom: ".5px solid #8080804d",
          },
          "& .chakra-checkbox__label": {
            fontSize: "1rem",
          },
        }}
      >
        <CheckboxGroup sizxe={"lg"} colorScheme="green">
          <Checkbox value="dashboard">Can View Dashboard</Checkbox>
          <Checkbox value="developers">Can assign & remove developers</Checkbox>
          <Checkbox value="project">Can create a project</Checkbox>
          <Checkbox value="report">Can view report</Checkbox>
        </CheckboxGroup>
      </Flex>
    </>
  );
};

export default RoleDetails;
