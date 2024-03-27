import React from 'react';
import { Button, Flex, Image, Text } from "@chakra-ui/react";
import { PiPlusBold } from "react-icons/pi";
import { useDispatch } from "react-redux";
import { setloadDrawer } from "../../redux/slices/drawerSlice";
import emptyState from '../../Assets/Images/Project-EmptyState.svg';

const EmptyProject = ({createProject=false, changeRequest=false, support=false}) => {
    const dispatch = useDispatch();
    const onClick = () => {
      dispatch(setloadDrawer({ status: true, type: "createProject" }));
    };
    const onChangeRequest = () => {
      dispatch(setloadDrawer({ status: true, type: "changeRequest" }));
    };
    const onSupport = () => {
      dispatch(setloadDrawer({ status: true, type: "supportRequest" }));
    };

  return (
    <Flex direction="column" minH={"80vh"} align={"center"} gap={4}>
      <Image
        width={"12.5rem"}
        src={emptyState}
        position={"relative"}
        bottom={"-10"}
      />
      <Text fontSize={"1.75rem"} fontWeight={"500"}>
        Project
      </Text>
      <Text textAlign={"center"} maxW={'530px'}>
        You are yet to create any project, Kindly create a project by clicking on the “ Create Project” Button below.
      </Text>
      {createProject &&
      <Button
        borderRadius={"3px"}
        bg={"brand.primary"}
        leftIcon={<PiPlusBold />}
        color="white"
        onClick={onClick}
        px={9}
        mt={3}
        _hover={{backgroundColor: ''}}
      >
        Create Project
      </Button>
      }
      {changeRequest && 
        <Button
        borderRadius={"3px"}
        bg={"brand.primary"}
        leftIcon={<PiPlusBold />}
        color="white"
        onClick={onChangeRequest}
        px={9}
        mt={3}
        _hover={{backgroundColor: ''}}
      >
        Create Request Project
        </Button>
      }
      {support && 
        <Button
        borderRadius={"3px"}
        bg={"brand.primary"}
        leftIcon={<PiPlusBold />}
        color="white"
        onClick={onSupport}
        px={9}
        mt={3}
        _hover={{backgroundColor: ''}}
      >
        Create Support Project
        </Button>
      }
    </Flex>
  )
}

export default EmptyProject;