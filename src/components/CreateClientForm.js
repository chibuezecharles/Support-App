import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  Alert,
  AlertIcon,
  AlertTitle,
} from "@chakra-ui/react";
import { Formik, Form } from "formik";
import React, { useState } from "react";
import { MdArrowForward } from "react-icons/md";
import { useDispatch, 
  // useSelector
 } from "react-redux";
import * as yup from "yup";
import { createClient } from "../redux/slices/clientSlice";
import { setloadDrawer } from "../redux/slices/drawerSlice";
import {fetchClient} from "../redux/slices/clientSlice";
import {setloadTost} from "../redux/slices/toastSlice";

const CreateClientForm = () => {
  // const clients = useSelector((state) => state.clientSlice);

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const initialValues = {
    nameOfClient: "",
    contactPerson: "",
    contactEmailAddress: "",
    contactPhoneNumber: "",
  };

  const phoneRegExp = /^(?:\+?234|0)?[789][0-9]{9}$/;

  const schema = yup.object().shape({
    nameOfClient: yup.string().required("Client Name is Required"),
    contactPerson: yup.string().required("Contact Person is required"),
    contactEmailAddress: yup
      .string()
      .email("Input Valid Email")
      .required("Email Address is required"),
    contactPhoneNumber: yup
      .string()
      .matches(phoneRegExp, "Phone number is not valid")
      .required("Phone Number is Required"),
  });

  const handleSubmit = async (values) => {
    setError('');
    setLoading(true);
    try {
      const response = await dispatch(createClient(values));
      console.log(response);
      if (!response.payload.isSuccessful === true) {
        setLoading(false);
        setError(response?.payload?.response?.data?.ResponseDescription || 'Failed to create client');
        return;
      }
      setError('');
      setLoading(false);
      await dispatch(fetchClient());
      dispatch(setloadDrawer({ status: false, data: null }));
      dispatch(setloadTost({ title: 'Manage Client Created', description: 'Client has been Created successfully', status: 'success', duration: 5000, isClosable: true, position: 'top' }));
    } catch (error) {
      setError(error.message);
    }finally{
      setLoading(false);
    }
  };

  return (
    <>
     {
        error &&(
        <Alert status="error" className="mt-3 ">
            <AlertIcon />
            <AlertTitle>{ error}</AlertTitle>
        </Alert>
        )
        }
      <Formik
      initialValues={initialValues}
      validationSchema={schema}
      onSubmit={handleSubmit}
    >
      {({ errors, touched, values, handleBlur, handleChange }) => (
        <Form>
          <Flex direction="column" gap={4} h="95%">
            <FormControl
              isInvalid={touched.nameOfClient && errors.nameOfClient}
            >
              <FormLabel>Name of Client</FormLabel>
              <Input
                type="text"
                name="nameOfClient"
                value={values?.nameOfClient}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Enter Name of Client"
                bg={"#FAFAFA"}
                border={"0.5px solid #8A8C8E"}
                _placeholder={{ color: "#8A8C8E" }}
                focusBorderColor="0.5px solid #8A8C8E"
              />
              <FormErrorMessage>{errors.nameOfClient}</FormErrorMessage>
            </FormControl>

            <FormControl
              isInvalid={touched.contactPerson && errors.contactPerson}
            >
              <FormLabel>Contact Person</FormLabel>
              <Input
                type="text"
                name="contactPerson"
                value={values?.contactPerson}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Enter Name"
                bg={"#FAFAFA"}
                border={"0.5px solid #8A8C8E"}
                _placeholder={{ color: "#8A8C8E" }}
                focusBorderColor="0.5px solid #8A8C8E"
              />
              <FormErrorMessage>{errors.contactPerson}</FormErrorMessage>
            </FormControl>
            <FormControl
              isInvalid={
                touched.contactEmailAddress && errors.contactEmailAddress
              }
            >
              <FormLabel>Contact Email Address</FormLabel>
              <Input
                type="text"
                name="contactEmailAddress"
                value={values?.contactEmailAddress}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Enter Email Address"
                bg={"#FAFAFA"}
                border={"0.5px solid #8A8C8E"}
                _placeholder={{ color: "#8A8C8E" }}
                focusBorderColor="0.5px solid #8A8C8E"
              />
              <FormErrorMessage>{errors.contactEmailAddress}</FormErrorMessage>
            </FormControl>
            <FormControl
              isInvalid={
                touched.contactPhoneNumber && errors.contactPhoneNumber
              }
            >
              <FormLabel>Phone Number</FormLabel>
              <Input
                name="contactPhoneNumber"
                value={values?.contactPhoneNumber}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Enter Phone Number"
                bg={"#FAFAFA"}
                border={"0.5px solid #8A8C8E"}
                _placeholder={{ color: "#8A8C8E" }}
                focusBorderColor="0.5px solid #8A8C8E"
              />
              <FormErrorMessage>{errors.contactPhoneNumber}</FormErrorMessage>
            </FormControl>

            <Button
              type="submit"
              alignSelf={"end"}
              marginTop={"auto"}
              borderRadius={"3px"}
              bg={"brand.primary"}
              color="white"
              rightIcon={<MdArrowForward />}
              isLoading={loading}
              loadingText="Proceeding ..."
            >
              Proceed
            </Button>
          </Flex>
        </Form>
      )}
    </Formik>
    </>
  );
};

export default CreateClientForm;
