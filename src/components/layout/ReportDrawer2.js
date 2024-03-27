import React from "react";
import { Box, Text, Flex } from "@chakra-ui/react";
import { GrClose } from "react-icons/gr";
import { useDispatch, useSelector } from "react-redux";
import { drawerToggle } from "../../redux/slices/drawerSlice";
import { format } from "date-fns";

const ReportDrawer2 = ({ showClose = true }) => {
  const dispatch = useDispatch();
  const sop = useSelector((state) => state.drawer.drawer2Data);

  const historyData = [
    { title: "Created By:", description: sop?.createdBy },
    { title: "Date Created:  ", description: sop?.dateCreated },
    { title: "Updated By: ", description: sop?.updatedBy },
    {
      title: "Last Modified Date:  ",
      description: format(new Date(sop?.dateModified), "dd-MM-yyyy") || "",
    },
  ];

  return (
    <>
      {showClose && (
        <GrClose
          style={{
            margin: "20px",
            width: "24px",
            height: "24px",
            color: "#292D32",
            cursor: "pointer",
          }}
          onClick={() => {
            dispatch(drawerToggle());
          }}
        />
      )}
      <Box textAlign={"center"} color={"#121212"}>
        <Text
          fontSize={"40px"}
          fontWeight={"700"}
          lineHeight={"60px"}
          letterSpacing={"-1.6px"}
        >
          {sop.title} Standard Operating Procedure (SOP)
        </Text>
        <Text fontSize={"24px"} fontWeight={"500"} pt={2}>
          Waec Nigeria
        </Text>
      </Box>

      <Box mt={12}>
        {historyData?.map((data, index) => (
          <Flex
            fontSize={"18px"}
            justifyContent={"flex-start"}
            alignItems={"center"}
            mb={4}
            key={index}
            gap={[6, 3, 3]}
          >
            <Text width={"30%"} color={"#121212"} fontWeight={"500"}>
              {data.title}
            </Text>
            <Text fontWeight={"400"} width={"60%"} color={"#515151"}>
              {data.description}
            </Text>
          </Flex>
        ))}
      </Box>

      <Box mt={9}>
        <Text color={"#121212"} fontSize={"24px"} textDecoration={"underline"}>
          SOP Title
        </Text>
        <Text color={"#515151"} fontWeight={"500"} fontSize={"20px"} pt={3}>
          {sop.title}
        </Text>
      </Box>

      <Box mt={9}>
        <Text color={"#121212"} fontSize={"24px"} textDecoration={"underline"}>
          Steps Taken
        </Text>
      </Box>

      <Box mt={9}>
        <Text color={"#121212"} fontSize={"24px"} textDecoration={"underline"}>
          Update by {sop.createdBy}
        </Text>
      </Box>
    </>
  );
};

export default ReportDrawer2;
