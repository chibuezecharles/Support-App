import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  FormErrorMessage,
  Select,
  Alert,
  AlertIcon,
  AlertTitle,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { MdArrowForward } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { createLOB, fetchLOB } from "../redux/slices/lobSlice";
import { Formik, Form } from "formik";
import * as yup from "yup";
import { setloadDrawer } from "../redux/slices/drawerSlice";
import { successNotifier } from "./Notification";

const CreateLOBForm = () => {
  const [loading] = useState(false);
  const dispatch = useDispatch();

  const lob = useSelector((state) => state.lobSlice);

  const initialValues = {
    name: "",
    lobBusinessManager: "",
    lobLocation: "",
    description: "",
  };

  const schema = yup.object().shape({
    name: yup.string().required("LOB Name is Required"),
    lobBusinessManager: yup
      .string()
      .required("LOB Business Manager is required"),
    lobLocation: yup.string().required("LOB Location is required"),
    description: yup.string().required("LOB Description is required"),
  });

  const handleSubmit = async (values) => {
    try {
      const data = await dispatch(createLOB(values));
      if (data.payload.isSuccessful) {
        successNotifier("LOB Created Successfully");
        dispatch(setloadDrawer({ status: false, data: null }));
        dispatch(fetchLOB());
      }
    } catch (error) {
      console.log({ error });
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={schema}
      onSubmit={handleSubmit}
    >
      {({ errors, touched, values, handleBlur, handleChange }) => (
        <Form>
          <Flex direction="column" gap={4} h="95%">
            {lob?.error ? (
              <Alert status="error" className="mt-3">
                <AlertIcon />
                <AlertTitle>{lob.error}</AlertTitle>
              </Alert>
            ) : null} 
            <FormControl isInvalid={touched.name && errors.name}>
              <FormLabel>Name of Line of Business</FormLabel>
              <Input
                type="text"
                name="name"
                value={values.name}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Enter Line of Business"
                bg={"#FAFAFA"}
                border={"0.5px solid #8A8C8E"}
                _placeholder={{ color: "#8A8C8E" }}
                focusBorderColor="0.5px solid #8A8C8E"
              />
              <FormErrorMessage>{errors.name}</FormErrorMessage>
            </FormControl>

            <FormControl
              isInvalid={
                touched.lobBusinessManager && errors.lobBusinessManager
              }
            >
              <FormLabel color={"#121212"} fontSize={"16px"}>
                Name of LOB Manager
              </FormLabel>
              <Select
                placeholder="Select LOB Manager"
                name="lobBusinessManager"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.lobBusinessManager}
                bg={"#FAFAFA"}
                border={"0.5px solid #8A8C8E"}
                _placeholder={{ color: "#8A8C8E" }}
                focusBorderColor="0.5px solid #8A8C8E"
                _hover={{ border: "" }}
              >
                {lob.allUsers.map((user) => (
                  <option key={user.userId} value={user.userId}>
                    {`${user.firstName} ${user.lastName}`}
                  </option>
                ))}
              </Select>
              <FormErrorMessage>{errors.lobBusinessManager}</FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={touched.lobLocation && errors.lobLocation}>
              <FormLabel>LOB Location</FormLabel>
              <Input
                type="text"
                name="lobLocation"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.lobLocation}
                placeholder="Enter Location"
                bg={"#FAFAFA"}
                border={"0.5px solid #8A8C8E"}
                _placeholder={{ color: "#8A8C8E" }}
                focusBorderColor="0.5px solid #8A8C8E"
              />
              <FormErrorMessage>{errors.lobLocation}</FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={touched.description && errors.description}>
              <FormLabel>Description</FormLabel>
              <Textarea
                type="text"
                name="description"
                rows="5"
                resize={"none"}
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.description}
                placeholder="Enter Line of Business Description"
                bg={"#FAFAFA"}
                border={"0.5px solid #8A8C8E"}
                _placeholder={{ color: "#8A8C8E" }}
                focusBorderColor="0.5px solid #8A8C8E"
              />
              <FormErrorMessage>{errors.description}</FormErrorMessage>
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
  );
};

export default CreateLOBForm;
