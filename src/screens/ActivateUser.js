import { useState } from "react";
import {
  Button,
  Flex,
  Image,
  Text,
  FormControl,
  Alert,
  AlertIcon,
  AlertTitle,
  Box,
  PinInput,
  PinInputField,
} from "@chakra-ui/react";
import React from "react";
import { BiArrowBack } from "react-icons/bi";
import LoginImage from "../components/LoginImage";
import { useNavigate } from "react-router-dom";

const ActivateUser = () => {
  const navigate = useNavigate();
  const [error] = useState(null);
  const [pin, setPin] = useState("");

  const handleChange = (value) => {
    setPin(value);
  };
  const handleSubmit = (value) => {
    console.log("handling submit");
  };

  return (
    <Flex w="full" h="100vh" overflow={"hidden"}>
      <Flex h={"full"} w="full" justify={"center"} position={"relative"}>
        <Flex w={["90%", "80%", "90%", "55%"]}>
          <Flex
            direction={"column"}
            bg={"white"}
            width={"full"}
            px={"1.5rem"}
            py="2rem"
          >
            <Box h="5rem" mb={10}>
              <Image src="/Vatebra-Logo.png" />
            </Box>

            <BiArrowBack
              size={"1.5rem"}
              style={{ marginBottom: "2rem", cursor: "pointer" }}
              onClick={() => navigate("/")}
            />

            <Flex justify={"space-between"} direction={"column"}>
              <Text fontWeight={"700"} fontSize={"1.8rem"}>
                Email Verification
              </Text>
              <Text fontSize={"sm"}>
                We sent a 6 digits code to johnd***@vatebra.com, please enter
                the code below, or click the verification link in your mail to
                complete verification
              </Text>
            </Flex>

            {error && (
              <Alert status="error" className="mt-3">
                <AlertIcon />
                <AlertTitle>{error}</AlertTitle>
              </Alert>
            )}

            <FormControl mb={5} color="black" my={"3rem"}>
              <Flex gap={2}>
                <PinInput
                  size={"lg"}
                  variant={"filled"}
                  mask
                  onChange={handleChange}
                  onComplete={handleSubmit}
                  value={pin}
                >
                  <PinInputField />
                  <PinInputField />
                  <PinInputField />
                  <PinInputField />
                  <PinInputField />
                  <PinInputField />
                </PinInput>
              </Flex>
            </FormControl>

            <Button
              color={"white"}
              bgColor={"#005E39"}
              borderRadius="8px"
              mb="1rem"
              w={"full"}
              onClick={handleSubmit}
              isDisabled={pin.length < 6}
            >
              Send
            </Button>
          </Flex>
        </Flex>
      </Flex>

      <LoginImage />
    </Flex>
  );
};

export default ActivateUser;
