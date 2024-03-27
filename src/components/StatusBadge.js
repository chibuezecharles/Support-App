import { Badge, Flex, Text } from "@chakra-ui/react";
import React from "react";

const StatusBadge = ({ title, badge, status }) => {
  return (
    <Flex
      h={"7rem"}
      align={"center"}
      bgColor={"#005E39"}
      bgImage={"/RoleStatus.png"}
      backgroundRepeat={"no-repeat"}
      backgroundPosition={"22rem"}
      mb={6}
      mx={-6}
      p={6}
      gap={3}
    >
      <Text color={"white"} fontSize={"1.5rem"} fontWeight={"bold"}>
        {title}
      </Text>
      {badge ? (
        <Badge bg={"#E1E9FF"} color={"#356EFF"} textTransform={"none"}>
          {status}
        </Badge>
      ) : null}
    </Flex>
  );
};

export default StatusBadge;
