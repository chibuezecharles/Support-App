import { Box, Text } from "@chakra-ui/react";
import React from "react";
import ReportNewProject from "../components/ReportNewProject";

const Reports = () => {
  return (
    <>
      <Box bg={"#FFFFFF"} py={"30px"}>
        <Box
          justifyContent={"flex-start"}
          alignItems={"center"}
          gap={"20px"}
          borderBottom={"1px solid #B4B1B1"}
          py={"20px"}
          px={"20px"}
        >
          <Text fontSize={"18px"} fontWeight={"400"}>
            Report
          </Text>
        </Box>
        <Box py={5} px={"20px"} minH={"80vh"}>
          <ReportNewProject />
        </Box>
      </Box>
    </>
  );
};

export default Reports;
