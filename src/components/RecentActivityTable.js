import {
  Box,
  Button,
  Flex,
  Input,
  InputGroup,
  InputRightElement,
  Text,
} from "@chakra-ui/react";
import React from "react";
import { recentActivityData } from "../data/mock";
import CustomTable from "./CustomTable";
import { BiChevronDown, BiSearch } from "react-icons/bi";

const RecentActivityTable = () => {
  const tableProps = {
    data: recentActivityData,
    title: {
      date: "Date",
      activityType: "Activity Type",
      activityDetails: "Activity Details",
      status: "Status",
    },
    dataKeys: ["date", "activityType", "activityDetails", "status"],
    variant: true,
    sn: false,
    transformRow: (item) => ({
      date: item.date,
      activityType: item.activityType,
      activityDetails: item.activityDetails,
      status: (
        <Button
          bg={
            item.status === "active"
              ? "#E1E9FF"
              : item.status === "inactive"
              ? "#FCF6DF"
              : item.status === "completed"
              ? "#E9F9F4"
              : ""
          }
          color={
            item.status === "active"
              ? "#356EFF"
              : item.status === "inactive"
              ? "#E9B500"
              : item.status === "completed"
              ? "#38B433"
              : ""
          }
          _hover={{ backgroundColor: "" }}
        >
          {item.status}
        </Button>
      ),
    }),
  };
  return (
    <Box my={4}>
      <Flex justify={"space-between"} align={"center"} p={4} bg={"white"}>
        <Text fontWeight={"bold"} fontSize={"24px"}>Recent Activity</Text>
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
            p={4} borderRadius={"3px"}
          >
            Filter by Date
          </Button>
        </Flex>
      </Flex>
      <Box>
        <CustomTable {...tableProps} />
      </Box>
    </Box>
  );
};

export default RecentActivityTable;
