import {
  Box,
  Flex,
  Image,
  List,
  ListIcon,
  ListItem,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import menu from "./sideBarLinks";
import { useSelector } from "react-redux";

const Sidebar = () => {
  const [isCollapsed] = useState(false);
  const userRole = useSelector((state) => state.auth?.user?.roleName);


  return (
    <Flex
      as={"nav"}
      pt={4}
      direction="column"
      w={isCollapsed ? "5rem" : "20%"}
      bgColor={"brand.primary"}
      h="100%"
      color={"white"}
      transition={"all 0.5s ease"}
      position={"fixed"}
      align={"center"}
      left={0}
      top={0}
      bottom={0}
      zIndex={100}
      display={["none", "none", "none", "flex"]}
    >
      {/* <Box h="3rem" mb={8}>
        <Image src="/Vatebra-Logo-White.png" />
      </Box> */}

      <List
        mt={10}
        spacing={5}
        alignSelf={"stretch"}
        sx={{
          "& svg": {
            width: "1.5rem",
            height: "1.5rem",
            "& + span": {
              display: isCollapsed ? "none" : "inline",
            },
          },
        }}
        overflowY={"auto"}
      >
        {menu[userRole]?.map(({ name, link, icon }) => {
          return (
            <ListItem
              key={name}
              as={NavLink}
              to={link}
              py={3}
              display={"flex"}
              justify={"center"}
              position="relative"
            >
              {({ isActive }) => (
                <Flex
                  alignItems={"center"}
                  color={isActive && "white"}
                  minW={"80%"}
                  mx="auto"
                  gap={1}
                >
                  <Box
                    position={"absolute"}
                    left={0}
                    width={"full"}
                    height={"full"}
                    zIndex={-1}
                    bg={isActive && "#5CBF14"}
                  />
                  <ListIcon
                    flexShrink={0}
                    flexGrow={0}
                    flexBasis={"3.5rem"}
                    as={icon}
                    m={0}
                    opacity={isCollapsed && !isActive && 0.5}
                  />
                  <Box as={"span"} flexGrow={1}>
                    {name}
                  </Box>
                </Flex>
              )}
            </ListItem>
          );
        })}
      </List>
    </Flex>
  );
};

export default Sidebar;
