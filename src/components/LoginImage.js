import { Box, Flex, Image, Text } from "@chakra-ui/react";
import React from "react";

const LoginImage = () => {
  return (
    <Box
      flexBasis={[0, 0, "40%", "50%"]}
      display={["none", "none", "block", "block"]}
      h="full"
      flexShrink={"0"}
      p={5}
    >
      <Flex
        bgColor="#005E39"
        borderRadius={10}
        p={8}
        direction={"column"}
        h="full"
        justify={"space-between"}
        alignItems={"center"}
      >
        <Text
          fontSize={"4rem"}
          fontWeight={"bold"}
          color={"white"}
          lineHeight={"normal"}
        >
          Welcome to a Seamless Support Experience
        </Text>
        <Box h={"70%"} overflow={"hidden"}>
          <Image src="/Login.png" maxH={"100%"} />
        </Box>
      </Flex>
    </Box>
  );
};

export default LoginImage;
