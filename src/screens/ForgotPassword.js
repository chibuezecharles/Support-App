import { useEffect, useState } from "react";
import {
  Button,
  Flex,
  FormLabel,
  Image,
  Input,
  Text,
  FormControl,
  FormErrorMessage,
  Alert,
  AlertIcon,
  AlertTitle,
  Box,
} from "@chakra-ui/react";
import React from "react";
import { useNavigate } from "react-router-dom";
import { Form, Formik } from "formik";
import { signInSchema } from "../utils/formValidationSchema";
import { useDispatch, useSelector } from "react-redux";
import { addLoginUser } from "../redux/slices/authSlice";
import { signIn } from "../services/authService";
import LoginImage from "../components/LoginImage";
import { BiArrowBack } from "react-icons/bi";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const initialValues = {
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
            <Box h="5rem" mb={10}>
              <Image src="/Vatebra-Logo.png" />
            </Box>

            <BiArrowBack
              size={"1.5rem"}
              style={{ marginBottom: "2rem", cursor: "pointer" }}
              onClick={() => navigate("/")}
            />

            <Flex justify={"space-between"} direction={"column"} mb="1.5rem">
              <Text fontWeight={"700"} fontSize={"1.8rem"}>
                Forget Password?
              </Text>
              <Text fontSize={"1.25rem"}>
                Enter your email address to reset password
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
                    Send
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

export default ForgotPassword;
