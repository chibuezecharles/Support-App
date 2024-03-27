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
} from "@chakra-ui/react";
import { MdArrowForward } from "react-icons/md";
import { Select as ChakraSelect } from "chakra-react-select";
import { Form, Formik } from "formik";
import { addUserSchema } from "../utils/formValidationSchema";
import { useDispatch, useSelector } from "react-redux";
import {
  createUser,
  editUser,
  fetchUsers,
  removeCurrentUser,
  removeError,
} from "../redux/slices/usersSlice";
import { useEffect, useState } from "react";
import httpRequest from "../utils/httpRequest";
import { BASE_URL } from "../config/settings";
import { setloadDrawer } from "../redux/slices/drawerSlice";
import { successNotifier } from "./Notification";

const CreateUserForm = () => {
  const dispatch = useDispatch();
  const [roles, setRoles] = useState([]);
  const users = useSelector((state) => state.users);
  const { currentUser } = users;

  useEffect(() => {
    httpRequest(`${BASE_URL}/roles/view-role`).then((response) =>
      setRoles(response.data)
    );

    return () => {
      dispatch(removeCurrentUser());
      dispatch(removeError());
    };
  }, [dispatch]);

  const initialValues = {
    firstName: currentUser.firstName,
    lastName: currentUser.lastName,
    role: currentUser?.role || [],
    email: currentUser.email,
  };

  const handleSubmit = async (values) => {
    const { firstName, lastName, role, email } = values;
    const formData = currentUser.firstName
      ? {
          firstName,
          lastName,
          roleNames: role.map((role) => role.roleName),
          email,
        }
      : {
          firstName,
          lastName,
          role: role.map((role) => ({ roleName: role.value })),
          email,
        };

    try {
      if (!currentUser?.firstName) {
        const data = await dispatch(createUser(formData));

        if (data.payload.isSuccessful) {
          successNotifier("User created successfully");
          dispatch(setloadDrawer({ status: false, data: null }));
          dispatch(fetchUsers());
        }
      } else {
        const data = await dispatch(editUser(formData));
        if (data.payload.isSuccessful) {
          successNotifier("User updated successfully");
          dispatch(setloadDrawer({ status: false, data: null }));
          dispatch(fetchUsers());
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Flex direction="column" gap={4} h="95%">
      {users?.error ? (
        <Alert status="error" className="mt-3">
          <AlertIcon />
          <AlertTitle>{users.error}</AlertTitle>
        </Alert>
      ) : null}
      <Formik
        initialValues={initialValues}
        validationSchema={addUserSchema}
        validateOnChange={false}
        validateOnBlur={false}
        onSubmit={(values) => handleSubmit(values)}
        enableReinitialize
        key={currentUser}
      >
        {({ errors, touched, handleBlur, handleChange, values }) => {
          return (
            <Form mt={4}>
              <Flex mx={-2}>
                <FormControl
                  isInvalid={errors.firstName && touched.firstName}
                  flexBasis={"50%"}
                  p={2}
                >
                  <FormLabel>First Name</FormLabel>
                  <Input
                    name="firstName"
                    type="text"
                    placeholder="Enter First Name"
                    bg={"#FAFAFA"}
                    border={"0.5px solid #8A8C8E"}
                    _placeholder={{ color: "#8A8C8E" }}
                    focusBorderColor="0.5px solid #8A8C8E"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.firstName}
                  />
                  {touched.firstName && errors.firstName && (
                    <FormErrorMessage>{errors.firstName}</FormErrorMessage>
                  )}
                </FormControl>
                <FormControl
                  isInvalid={errors.lastName && touched.lastName}
                  flexBasis={"50%"}
                  p={2}
                >
                  <FormLabel>Last Name</FormLabel>
                  <Input
                    name="lastName"
                    type="text"
                    placeholder="Enter Last Name"
                    bg={"#FAFAFA"}
                    border={"0.5px solid #8A8C8E"}
                    _placeholder={{ color: "#8A8C8E" }}
                    focusBorderColor="0.5px solid #8A8C8E"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.lastName}
                  />
                  {touched.lastName && errors.lastName && (
                    <FormErrorMessage>{errors.lastName}</FormErrorMessage>
                  )}
                </FormControl>
              </Flex>
              <FormControl isInvalid={errors.role && touched.role}>
                <FormLabel>Role</FormLabel>
                <ChakraSelect
                  name="role"
                  placeholder="Select Developers"
                  bg={"#FAFAFA"}
                  border={"0.5px solid #8A8C8E"}
                  _placeholder={{ color: "#8A8C8E" }}
                  focusBorderColor="0.5px solid #8A8C8E"
                  _hover={{ border: "" }}
                  getOptionLabel={(option) => {
                    return option.label;
                  }}
                  onBlur={handleBlur}
                  onChange={(selectedOption) => {
                    handleChange({
                      target: {
                        name: "role",
                        value: selectedOption,
                      },
                    });
                  }}
                  value={values?.role?.map((role) => {
                    return {
                      label: role.roleName || role.value,
                      value: role.roleId || role.value,
                    };
                  })}
                  options={roles.map((option) => {
                    return {
                      label: option.name,
                      value: option.name,
                    };
                  })}
                  isMulti
                />
                {touched.role && errors.role && (
                  <FormErrorMessage>{errors.role}</FormErrorMessage>
                )}
              </FormControl>
              <FormControl isInvalid={errors.email && touched.email} my={2}>
                <FormLabel>Email Address</FormLabel>
                <Input
                  name="email"
                  type="text"
                  placeholder="Enter Email Address"
                  bg={"#FAFAFA"}
                  border={"0.5px solid #8A8C8E"}
                  _placeholder={{ color: "#8A8C8E" }}
                  focusBorderColor="0.5px solid #8A8C8E"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.email}
                />
                {touched.email && errors.email && (
                  <FormErrorMessage>{errors.email}</FormErrorMessage>
                )}
              </FormControl>
              <Flex justify={"end"} mt={20}>
                <Button
                  type="submit"
                  alignSelf={"end"}
                  marginTop={"auto"}
                  borderRadius={"3px"}
                  bg={"brand.primary"}
                  color="white"
                  rightIcon={<MdArrowForward />}
                  isLoading={users.loading}
                >
                  Proceed
                </Button>
              </Flex>
            </Form>
          );
        }}
      </Formik>
    </Flex>
  );
};

export default CreateUserForm;
