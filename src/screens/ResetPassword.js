import { useState } from "react";
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
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import React from "react";
import { Form, Formik } from "formik";
import * as yup from "yup";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import CustomNotification from "../components/CustomNotification";
import { FaCheckCircle } from "react-icons/fa";
import LoginImage from "../components/LoginImage";
import { BiArrowBack } from "react-icons/bi";
import { useNavigate, useParams } from "react-router-dom";
import httpRequest from "../utils/httpRequest";
import { BASE_URL } from "../config/settings";

export const Cont = ({
  message,
  buttonText,
  link,
  icon = <FaCheckCircle size={"4rem"} color="#5CBF14" />,
  showNotif,
}) => {
  const navigate = useNavigate();

  return (
    <Flex direction="column" alignItems={"center"} justify={"center"}>
      {icon}
      <Text fontWeight={"700"} mt={8}>
        {message}
      </Text>
      <Flex justify={"center"} mt={8}>
        <Button
          onClick={() => {
            showNotif && showNotif(false);
            link && navigate(link);
          }}
        >
          {buttonText}
        </Button>
      </Flex>
    </Flex>
  );
};

const NewPassword = () => {
  const navigate = useNavigate();
  const {userId} = useParams();
  console.log(userId);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showNotif, setShowNotif] = useState(false);

  const initialValues = {
    password: "",
    confirmPassword: "",
  };

  const newPasswordSchema = yup.object().shape({
    password: yup.string().required("You must enter current password"),
    confirmPassword: yup.string().required("You must enter new password password"),
    // confirmPassword: yup
    //   .string()
    //   .required("Please retype your password.")
    //   .oneOf([yup.ref("password")], "Your passwords do not match."),
  });


  const handleSubmit = async (values) => {
    const formData = {
      currentPassword: values.password,
      newPassword: values.confirmPassword,
    }
    setLoading(true);
    setError('');
    try {
      const response = await httpRequest(
        `${BASE_URL}/account/change-password/${userId}`,
        "post",
        formData
      );
        // console.log(response);
      if(response.isSuccessful === true){
        setError('');
        setLoading(false);
        setShowNotif(true);
      }else{
        setLoading(false);
        setError(response?.responseDescription || "Something went wrong" );
      }
      
    } catch (error) {
      setError(error.message || 'Something went wrong');
      
    }finally{
      setLoading(false);
    }
  };

  return (
    <Flex w="full" h="100vh" overflow={"hidden"}>
      {showNotif ? (
        <CustomNotification
          content={
            <Cont
              buttonText={"Go to Login"}
              link={"/"}
              message={"Password Successfully Changed"}
              showNotif={() => {
                setShowNotif(!showNotif);
              }}
            />
          }
        />
      ) : null}
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
                Create New Password
              </Text>
              <Text fontSize={"sm"}>
                Enter a unique password to secure your account
              </Text>
            </Flex>

            {error && (
              <Alert status="error" className="mt-3" mb={3}>
                <AlertIcon />
                <AlertTitle>{error}</AlertTitle>
              </Alert>
            )}

            <Formik
              enableReinitialize
              initialValues={initialValues}
              validationSchema={newPasswordSchema}
              onSubmit={(values) => handleSubmit(values)}
              validateOnChange={false}
              validateOnBlur={false}
            >
              {({ errors, touched, handleBlur, handleChange }) => (
                <Form mt={4}>
                  <FormControl
                    isInvalid={errors.password && touched.password}
                    mb={5}
                    color="black"
                  >
                    <FormLabel>Current Password</FormLabel>
                    <InputGroup size="lg">
                      <Input
                        pr="4.5rem"
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter current password"
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
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? (
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

                  <FormControl
                    isInvalid={
                      errors.confirmPassword && touched.confirmPassword
                    }
                    mb={5}
                    color="black"
                  >
                    <FormLabel>New Password</FormLabel>
                    <InputGroup size="lg">
                      <Input
                        pr="4.5rem"
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="Enter new password"
                        name="confirmPassword"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        bgColor={"#F3F3F3"}
                      />
                      <InputRightElement width="4.5rem">
                        <Button
                          h="1.75rem"
                          size="sm"
                          background={"none"}
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        >
                          {showConfirmPassword ? (
                            <BsEye w={5} h={5} color="GrayText" />
                          ) : (
                            <BsEyeSlash color={"GrayText"} w={5} h={5} />
                          )}
                        </Button>
                      </InputRightElement>
                    </InputGroup>
                    {touched.confirmPassword && errors.confirmPassword && (
                      <FormErrorMessage>
                        {errors.confirmPassword}
                      </FormErrorMessage>
                    )}
                  </FormControl>

                  <Button
                    mt={"2rem"}
                    color={"white"}
                    bgColor={"#005E39"}
                    borderRadius="8px"
                    mb="1rem"
                    w={"full"}
                    type="submit"
                    isLoading={loading}
                    loadingText="Loadind ..."
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

export default NewPassword;
