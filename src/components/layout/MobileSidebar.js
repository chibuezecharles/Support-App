import {
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  List,
  ListItem,
  Box,
  Flex,
  ListIcon,
  Avatar,
  Text,
} from "@chakra-ui/react";

import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import menu from "./sideBarLinks";
import { useSelector } from "react-redux";

const MobileSidebar = ({ isOpen, btnRef, onClose }) => {
  const navigate = useNavigate();
  const role = useSelector((state) => state.auth?.user?.role);
  return (
    <>
      <Drawer
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent bg={"brand.primary"} color={"white"}>
          <DrawerHeader>
            <Flex
              alignItems={"center"}
              gap={4}
              onClick={() => {
                onClose();
                navigate("profile");
              }}
              cursor={"pointer"}
            >
              <Avatar
                name="Aderibigbe O."
                color={"brand.primary"}
                bg={"white"}
              />

              <Flex direction={"column"} lineHeight={1} gap={2}>
                <Text fontWeight={"500"}>Aderibigbe O.A</Text>
                <Text fontSize={"sm"}>Admin</Text>
              </Flex>
            </Flex>
          </DrawerHeader>

          <DrawerBody px={0}>
            <List
              mt={5}
              spacing={5}
              alignSelf={"stretch"}
              sx={{
                "& svg": {
                  width: "1.5rem",
                  height: "1.5rem",
                },
              }}
            >
              {menu[role]?.map(({ name, link, icon }) => {
                return (
                  <ListItem
                    key={name}
                    onClick={onClose}
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
                          opacity={1}
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
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default MobileSidebar;
