import { useEffect, useState } from "react";
import {
  Button,
  Flex,
  FormLabel,
  // Image, Box,
  Input,
  Text,
  FormControl,
  FormErrorMessage,
  Alert,
  AlertIcon,
  AlertTitle,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import React from "react";
import { useNavigate } from "react-router-dom";
import { Form, Formik } from "formik";
import { signInSchema } from "../utils/formValidationSchema";
import { useDispatch, useSelector } from "react-redux";
import { addLoginUser } from "../redux/slices/authSlice";
import { signIn } from "../services/authService";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import LoginImage from "../components/LoginImage";

const Login = () => {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const initialValues = {
    email: "",
    password: "",
  };

  useEffect(() => {
    if (auth?.user) {
      return navigate("/dashboard");
    }
  }, [auth?.user, navigate]);

  const handleSubmit = async (values) => {
    setIsLoading(true);
    try {
      const response = await signIn(values);
      if (response?.isSuccessful) {
        dispatch(addLoginUser(response?.data));
        return navigate("/dashboard");
      } else {
        throw new Error(
          response?.data?.responseDescription || "Something went wrong"
        );
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
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
            {/* <Box h="5rem" mb={10}>
              <Image src="/Vatebra-Logo.png" />
            </Box> */}

            <Flex justify={"space-between"} direction={"column"} mb="1.5rem">
              <Text fontWeight={"700"} fontSize={"1.8rem"}>
                Login
              </Text>
              <Text fontSize={"1.25rem"}>
                Kindly fill in your Microsoft login details below to login into
                your Account
              </Text>
            </Flex>

            {error && (
              <Alert status="error" className="mt-3">
                <AlertIcon />
                <AlertTitle>{error}</AlertTitle>
              </Alert>
            )}

            <Formik
              enableReinitialize
              initialValues={initialValues}
              validationSchema={signInSchema}
              onSubmit={(values) => handleSubmit(values)}
            >
              {({ errors, touched, handleBlur, handleChange }) => (
                <Form mt={4}>
                  <FormControl
                    isInvalid={errors.email && touched.email}
                    mb={5}
                    color="black"
                  >
                    <FormLabel>Email</FormLabel>
                    <Input
                      placeholder="Enter email address"
                      bgColor={"#F3F3F3"}
                      borderRadius={0}
                      borderColor={"transparent"}
                      mb="1rem"
                      name="email"
                      onBlur={handleBlur}
                      onChange={handleChange}
                    />
                    {touched.email && errors.email && (
                      <FormErrorMessage>{errors.email}</FormErrorMessage>
                    )}
                  </FormControl>

                  <FormControl
                    isInvalid={errors.password && touched.password}
                    // mb={5}
                    color="black"
                  >
                    <FormLabel>Password</FormLabel>
                    <InputGroup>
                      <Input
                        pr="4.5rem"
                        type={show ? "text" : "password"}
                        placeholder="Enter password"
                        name="password"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        bgColor={"#F3F3F3"}
                      />
                      <InputRightElement width="4.5rem">
                        <Button
                          h="1.75rem"
                          size="sm"
                          background={"none"}
                          onClick={() => setShow(!show)}
                        >
                          {show ? (
                            <BsEye w={5} h={5} color="GrayText" />
                          ) : (
                            <BsEyeSlash color={"GrayText"} w={5} h={5} />
                          )}
                        </Button>
                      </InputRightElement>
                    </InputGroup>

                    {touched.password && errors.password && (
                      <FormErrorMessage>{errors.password}</FormErrorMessage>
                    )}
                  </FormControl>
                  <Flex justify={"flex-end"}>
                    <Button
                      color={"#5CBF14"}
                      variant={"ghost"}
                      alignItems={"center"}
                      fontSize={"sm"}
                      fontWeight={"normal"}
                      alignSelf={"start"}
                      p={0}
                      _hover={{ bg: "transparent" }}
                      onClick={() => navigate("/forgot-password")}
                    >
                      <Text>Forgot password</Text>
                    </Button>
                  </Flex>

                  <Button
                    isLoading={isLoading}
                    color={"white"}
                    bgColor={"#005E39"}
                    borderRadius="8px"
                    mt={"4rem"}
                    mb="1rem"
                    w={"full"}
                    type="submit"
                  >
                    Login
                  </Button>
                </Form>
              )}
            </Formik>
          </Flex>
        </Flex>
      </Flex>

      <LoginImage />
    </Flex>
  );
};

export default Login;
