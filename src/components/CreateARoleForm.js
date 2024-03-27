import {
  Box,
  Button,
  Flex,
  FormLabel,
  Input,
  Textarea,
} from "@chakra-ui/react";
import React from "react";
import { MdArrowForward } from "react-icons/md";

const CreateARoleForm = () => {
  return (
    <Flex direction="column" gap={4} h="95%">
      <Box>
        <FormLabel>Name of Role</FormLabel>
        <Input
          type="text"
          placeholder="Enter role name"
          bg={"#FAFAFA"}
          border={"0.5px solid #8A8C8E"}
          _placeholder={{ color: "#8A8C8E" }}
          focusBorderColor="0.5px solid #8A8C8E"
        />
      </Box>
      <Box>
        <FormLabel>Department Name</FormLabel>
        <Input
          type="text"
          placeholder="Select Department"
          bg={"#FAFAFA"}
          border={"0.5px solid #8A8C8E"}
          _placeholder={{ color: "#8A8C8E" }}
          focusBorderColor="0.5px solid #8A8C8E"
        />
      </Box>
      <Box>
        <FormLabel>Date Created</FormLabel>
        <Input
          type="date"
          bg={"#FAFAFA"}
          border={"0.5px solid #8A8C8E"}
          _placeholder={{ color: "#8A8C8E" }}
          focusBorderColor="0.5px solid #8A8C8E"
          color={"#8A8C8E"}
        />
      </Box>
      <Box>
        <FormLabel>Role Description</FormLabel>
        <Textarea
          type="text"
          rows="5"
          resize={"none"}
          placeholder="Enter description"
          bg={"#FAFAFA"}
          border={"0.5px solid #8A8C8E"}
          _placeholder={{ color: "#8A8C8E" }}
          focusBorderColor="0.5px solid #8A8C8E"
        />
      </Box>
      <Button
        alignSelf={"end"}
        marginTop={"auto"}
        borderRadius={"3px"}
        bg={"brand.primary"}
        color="white"
        rightIcon={<MdArrowForward />}
      >
        Proceed
      </Button>
    </Flex>
  );
};

export default CreateARoleForm;
