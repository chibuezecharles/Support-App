import { Divider, Flex, Text } from "@chakra-ui/react";
import React from "react";

const CardTitle = ({ title }) => {
  return (
    <Flex direction={"column"} w="full">
      <Text color={"#5C5C5C"} fontWeight={"bold"} px={3}>
        {title}
      </Text>
      <Divider my={2} borderBottomWidth={"1.5px"} />
    </Flex>
  );
};

export default CardTitle;
