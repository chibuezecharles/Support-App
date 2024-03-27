import {
  Alert,
  AlertIcon,
  AlertTitle,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Select,
  Textarea,
} from "@chakra-ui/react";
import { Form, Formik } from "formik";
import React, { useState } from "react";
import { MdArrowForward } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import * as yup from "yup";
import { BASE_URL } from "../config/settings";
import { setloadDrawer } from "../redux/slices/drawerSlice";
import { fetchLOB } from "../redux/slices/lobSlice";
import httpRequest from "../utils/httpRequest";

const EditLOBForm = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();

  const users = useSelector((state) => state.lobSlice.allUsers);
  const editLob = useSelector((state) => state.detailsSlice.editLob);

  const initialValues = {
    name: editLob.name,
    creator: editLob.creator,
    lobBusinessManager: editLob.lobBusinessManager,
    lobLocation: editLob.lobLocation,
    description: editLob.description,
    id: editLob.id,
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
    setLoading(true);
    try {
      await httpRequest(`${BASE_URL}/lob/edit-lob`, "POST", {
        ...values,
        id: editLob.id,
      });
      dispatch(fetchLOB());
      dispatch(setloadDrawer({ status: false, data: null }));
    } catch (error) {
      setError(error);
      console.log({ error });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {error && (
        <Alert status="error" className="mt-3">
          <AlertIcon />
          <AlertTitle>{error}</AlertTitle>
        </Alert>
      )}
      <Formik
        initialValues={initialValues}
        validationSchema={schema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched, values, handleBlur, handleChange }) => (
          <Form>
            <Flex direction="column" gap={4} h="95%">
              <FormControl isInvalid={touched.name && errors.name}>
                <FormLabel>Name of Line of Business</FormLabel>
                <Input
                  type="text"
                  name="name"
                  value={values?.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
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
                  // placeholder={editproject.LOB}
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
                  {users.map((user) => (
                    <option key={user.userId} value={user.userId}>
                      {`${user.firstName} ${user.lastName}`}
                    </option>
                  ))}
                </Select>
                {/* <FormLabel>Name of LOB Manager</FormLabel>
              <Input
                type="text"
                name="lobBusinessManager"
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Enter Name"
                bg={"#FAFAFA"}
                border={"0.5px solid #8A8C8E"}
                _placeholder={{ color: "#8A8C8E" }}
                focusBorderColor="0.5px solid #8A8C8E"
              /> */}
                <FormErrorMessage>{errors.lobBusinessManager}</FormErrorMessage>
              </FormControl>

              <FormControl
                isInvalid={touched.lobLocation && errors.lobLocation}
              >
                <FormLabel>LOB Location</FormLabel>
                <Input
                  type="text"
                  name="lobLocation"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values?.lobLocation}
                  bg={"#FAFAFA"}
                  border={"0.5px solid #8A8C8E"}
                  _placeholder={{ color: "#8A8C8E" }}
                  focusBorderColor="0.5px solid #8A8C8E"
                />
                <FormErrorMessage>{errors.lobLocation}</FormErrorMessage>
              </FormControl>

              <FormControl
                isInvalid={touched.description && errors.description}
              >
                <FormLabel>Description</FormLabel>
                <Textarea
                  type="text"
                  name="description"
                  rows="5"
                  resize={"none"}
                  value={values?.description}
                  onChange={handleChange}
                  onBlur={handleBlur}
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
    </>
  );
};

export default EditLOBForm;
