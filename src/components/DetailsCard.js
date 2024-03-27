import { Circle, Flex, Text } from "@chakra-ui/react";
import React from "react";

const DetailsCard = ({ name, number, borderColor, icon }) => {
  return (
    <Flex
      flexBasis={["100%", "calc(100% / 2)", "calc(100% / 3)", "calc(100% / 3)"]}
      px={2}
      pt={2}
    >
      <Flex
        borderLeft={`5px solid ${borderColor}`}
        bgColor={"white"}
        px={4}
        py={2}
        grow={1}
        justify={"space-between"}
      >
        <Flex direction={"column"}>
          <Flex textTransform={"uppercase"} color={"#5C5C5C"}>
            {name}
          </Flex>
          <Flex>
            <Text fontWeight={"700"} fontSize={"3rem"}>
              {number}
            </Text>
          </Flex>
        </Flex>
        <Circle p={1} bg={"#EAFFF7"} size={"3rem"} mt={4} mr={2}>
          {icon}
        </Circle>
      </Flex>
    </Flex>
  );
};

export default DetailsCard;
