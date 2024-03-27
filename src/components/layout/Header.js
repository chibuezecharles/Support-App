import {
  Avatar,
  Box,
  Center,
  Circle,
  Divider,
  Flex,
  Text,
} from "@chakra-ui/react";
import React from "react";
import { AiOutlinePoweroff } from "react-icons/ai";
// import { MdSettings } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { removeUser } from "../../redux/slices/authSlice";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const signOut = () => {
    dispatch(removeUser());
    navigate("/");
  };
  const auth = useSelector((state) => state.auth?.user);
  return (
    <Flex
      gap={2}
      h="5rem"
      bg="white"
      px={4}
      pr="5rem"
      alignItems={"center"}
      position={"sticky"}
      top={0}
      zIndex={90}
      boxShadow={"0px 2px 10px 0px rgba(198, 198, 198, 0.25)"}
      justifyContent={"flex-end"}
      display={["none", "none", "none", "flex"]}
    >
      <Flex
        minW={"18rem"}
        justify={"space-between"}
        alignItems={"center"}
        h="full"
      >
        <Box position={"relative"} cursor={"pointer"}>
          <Circle
            position={"absolute"}
            top={".2rem"}
            right={".3rem"}
            bg={"red"}
            size={".3rem"}
          />
          <AiOutlinePoweroff
            size={"1.5rem"}
            cursor={"pointer"}
            onClick={signOut}
          />
        </Box>

        <Center h="70%">
          <Divider orientation="vertical" />
        </Center>

        <Flex
          alignItems={"center"}
          gap={4}
          onClick={() => navigate("profile")}
          cursor={"pointer"}
        >
          <Flex direction={"column"} lineHeight={1}>
            <Text fontWeight={"500"}>{auth?.fullName}</Text>
            <Text fontSize={"sm"} color="#847F7F">
              {auth?.type}
            </Text>
          </Flex>
          <Avatar
            name={auth?.fullName}
            src={`/${auth?.profileImg}`}
            border={"1.5px solid #D73439"}
            color={"#D73439"}
          />
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Header;
