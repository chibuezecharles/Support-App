import { Avatar, Box, Flex, List, ListItem, Text } from "@chakra-ui/react";
import React from "react";
import { AiFillCaretDown } from "react-icons/ai";

export const Favourites = () => {
  return (
    <Box
      bg="#F3F5F7"
      h={"100vh"}
      w={"20%"}
      flexShrink={0}
      position={"fixed"}
      left={0}
      top={0}
      bottom={0}
      display={["none", "none", "none", "block"]}
    >
      <Flex
        gap={2}
        h="5rem"
        bg="white"
        pl="5.5rem"
        pr=".7rem"
        alignItems={"center"}
        justify={"space-between"}
        position={"relative"}
        zIndex={5}
      >
        <Avatar size={"sm"} bg={"#D73439"} />
        <Text>Admin</Text>
      </Flex>

      <Flex pl="5.5rem" pr=".7rem" direction={"column"} py={2}>
        <Flex gap={2} alignItems={"center"}>
          <Text fontSize={"1rem"}>Favourites</Text>
          <Flex
            justify={"center"}
            alignItems={"center"}
            bgColor={"#D7343933"}
            px={2}
            borderRadius={"8px"}
          >
            5
          </Flex>
          <AiFillCaretDown size={".5rem"} color="#B4B1B1" />
        </Flex>
      </Flex>

      <List mt={2} spacing={2} pl="5.5rem" pr=".7rem" color={"#5C5C5C"}>
        <ListItem>
          <span>Dashboard</span>
        </ListItem>
        <ListItem>
          <span>Case Management</span>
        </ListItem>
        <ListItem>
          <span>Cause List</span>
        </ListItem>
        <ListItem>
          <span>Trainings</span>
        </ListItem>
        <ListItem>
          <span>User Management</span>
        </ListItem>
        <ListItem>
          <span>Set up</span>
        </ListItem>
      </List>
    </Box>
  );
};
