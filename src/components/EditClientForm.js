import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  Alert,AlertIcon, AlertTitle,
} from "@chakra-ui/react";
import { Formik, Form } from "formik";
import React, { useState } from "react";
import { MdArrowForward } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import {setloadTost} from "../redux/slices/toastSlice";
import { setloadDrawer } from "../redux/slices/drawerSlice";
import {fetchClient } from "../redux/slices/clientSlice";
import httpRequest from '../utils/httpRequest';
import { BASE_URL } from "../config/settings";

const EditClientForm = () => {
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  // const lobs = useSelector((state) => state.lobSlice.lobs);
  const editClientData = useSelector((state) => state.detailsSlice.editClient);
  // console.log("editClientData", editClientData);
  const initialValues = {
    nameOfClient: editClientData?.nameOfClient,
    lineOfBusiness: editClientData?.lineOfBusiness,
    contactPerson: editClientData?.contactPerson,
    contactEmailAddress: editClientData?.contactEmailAddress,
    contactPhoneNumber: editClientData?.contactPhoneNumber,
  };

  const handleSubmit = async(values) => {
    // console.log("Editing client:", values);
    setError('');
    setLoading(true);
    try {
      const formData ={
        "id": editClientData?.id,
        "nameOfClient": values?.nameOfClient,
        "contactPerson": values?.contactPerson,
        "contactEmailAddress": values?.contactEmailAddress,
        "contactPhoneNumber": values?.contactPhoneNumber,
      } 
        
      const response = await httpRequest(
        `${BASE_URL}/manageclient/update-client`,
        "post",
        formData
      );
      // console.log(response);
      if (!response.isSuccessful === true) {
        setLoading(false);
        setError(response?.response?.data?.ResponseDescription || 'Failed to Edit client');
        return;
      }
      setError('');
      setLoading(false);
      await dispatch(fetchClient());
      dispatch(setloadDrawer({ status: false, data: null }));
      dispatch(setloadTost({ title: 'Manage Client Edited', description: 'Client has been Edited successfully', status: 'success', duration: 5000, isClosable: true, position: 'top' }));
    }catch (error) {
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
                // placeholder="Enter Name of Client"
                bg={"#FAFAFA"}
                border={"0.5px solid #8A8C8E"}
                _placeholder={{ color: "#8A8C8E" }}
                focusBorderColor="0.5px solid #8A8C8E"
              />
              <FormErrorMessage>{errors.nameOfClient}</FormErrorMessage>
            </FormControl>
            {/* <FormControl
              isInvalid={touched.lineOfBusiness && errors.lineOfBusiness}
            >
              <FormLabel>Line of Business</FormLabel>
              <Input
                type="text"
                name="lineOfBusiness"
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Enter Line of Business"
                bg={"#FAFAFA"}
                border={"0.5px solid #8A8C8E"}
                _placeholder={{ color: "#8A8C8E" }}
                focusBorderColor="0.5px solid #8A8C8E"
              />
              <FormErrorMessage>{errors.lineOfBusiness}</FormErrorMessage>
            </FormControl> */}
            {/* <FormControl
              isInvalid={touched.lineOfBusiness && errors.lineOfBusiness}
            >
              <FormLabel color={"#121212"} fontSize={"16px"}>
                Line of Business
              </FormLabel>
              <Select
                // placeholder={editproject.LOB}
                name="lineOfBusiness"
                onChange={handleChange}
                onBlur={handleBlur}
                // placeholder="Enter Line of Business"
                bg={"#FAFAFA"}
                border={"0.5px solid #8A8C8E"}
                _placeholder={{ color: "#8A8C8E" }}
                focusBorderColor="0.5px solid #8A8C8E"
                _hover={{ border: "" }}
              >
                {lobs.map((lob) => (
                  <option key={lob.id} value={lob.id}>
                    {lob.name}
                  </option>
                ))}
              </Select>

              <FormErrorMessage>{errors.lineOfBusiness}</FormErrorMessage>
            </FormControl> */}
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
                // placeholder="Enter Name"
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
                // placeholder="Enter Email Address"
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
                type="text"
                name="contactPhoneNumber"
                value={values?.contactPhoneNumber}
                onChange={handleChange}
                onBlur={handleBlur}
                // placeholder="Enter Phone Number"
                bg={"#FAFAFA"}
                border={"0.5px solid #8A8C8E"}
                _placeholder={{ color: "#8A8C8E" }}
                focusBorderColor="0.5px solid #8A8C8E"
              />
              <FormErrorMessage>{errors.contactPhoneNumber}</FormErrorMessage>
            </FormControl>

            <Button
              alignSelf={"end"}
              marginTop={"auto"}
              borderRadius={"3px"}
              bg={"brand.primary"}
              color="white"
              rightIcon={<MdArrowForward />}
              type="submit"
              isLoading={loading}
              loadingText="Loadind ..."
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

export default EditClientForm;
