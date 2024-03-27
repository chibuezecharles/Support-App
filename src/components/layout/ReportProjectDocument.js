import { Box, Divider, Flex, Text } from "@chakra-ui/react";
import React from "react";
import { useSelector } from "react-redux";

const ReportProjectDocument = () => {
  const documents = useSelector(
    (state) => state.reportActions.reportData.documents[0]
  );

  return (
    <Box mt={7}>
      <Text
        color={"#121212"}
        fontSize={"18px"}
        fontWeight={"500"}
        lineHeight={"20px"}
        py={3}
      >
        Documents
      </Text>
      <Divider border={"1px solid #B4B1B1"} mb={4} />
      <Flex direction={"column"} gap={4}>
        <Flex gap={2}>
          <Text>BRS Link:</Text>
          <a href={documents?.brsLink} target="_blank" rel="noreferrer">
            <Text>{documents?.brsLink}</Text>
          </a>
        </Flex>
        <Flex gap={2}>
          <Text>SRS Link:</Text>
          <a href={documents?.srsLink} target="_blank" rel="noreferrer">
            <Text>{documents?.srsLink}</Text>
          </a>
        </Flex>
        <Flex gap={2}>
          <Text>Manual:</Text>
          <a href={documents?.manual} target="_blank" rel="noreferrer">
            <Text>{documents?.manual}</Text>
          </a>
        </Flex>
      </Flex>
    </Box>
  );
};

export default ReportProjectDocument;
