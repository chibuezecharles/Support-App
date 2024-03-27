import React, { useState } from 'react';
import {Form, Formik } from 'formik';
import { Text, Button, Flex, FormLabel,FormErrorMessage,FormControl, Input, Textarea, Select, Alert, AlertIcon, AlertTitle } from '@chakra-ui/react';
import {Select as ChakraSelect} from 'chakra-react-select';
import { MdArrowForward } from "react-icons/md";
import { useDispatch, useSelector } from 'react-redux';
import { setloadDrawer } from "../../redux/slices/drawerSlice";
import {SupportProjectFormSchema} from '../../utils/formValidationSchema';
import {createSupportRequest, fetchsupportRequest} from '../../redux/slices/supportRequestSlice';
import {setloadTost} from "../../redux/slices/toastSlice";

const SupportProjectForm = () => {
  const dispatch = useDispatch();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const developersData= useSelector((state) => state.newProject.developers);
  const allProjectsData= useSelector((state) => state.newProject.projects);


  const initialValues = {
    ProjectName: '',
    IssueDescription: '',
    DateReported:'',
    StartDate:'',
    EndDate:'',
    AssignDevelopers:[],
}
    const handleProceed = async (values) =>{
        setLoading(true);
        setError('');
        try {
            // console.log("support values:", values);
        const supportRequestData = {
            "parentProjectId": parseInt(values.ProjectName, 10),
            "dateReported": values.DateReported,
            "startDate": values.StartDate,
            "endDate": values.EndDate,
            "projectType": "ProjectSupport",
            "issueDescription": values.IssueDescription,
            developerIds: values.AssignDevelopers.map((developer) => ({
                id: developer.value,
            })),
        };
        // console.log("supportRequestData: ", supportRequestData);
        const response = await dispatch(createSupportRequest(supportRequestData));

        if(!response.payload.isSuccessful === true){
            setLoading(false);
            setError(response?.payload?.responseDescription);
            return;
        }

        setError('');
        setLoading(false);
        await dispatch(fetchsupportRequest());
        dispatch(setloadDrawer({ status: false, data: null }));
        dispatch(setloadTost({ title: 'Project created', description: 'Support Project has been created successfully', status: 'success', duration: 5000, isClosable: true, position: 'top' }));
        } catch (error) {
            setError(error.message || 'Something went wrong');
        }finally {
            setLoading(false);
        }
    }

  return (
    <>
         {
        error &&(
        <Alert status="error" className="mt-3">
            <AlertIcon />
            <AlertTitle>{ error}</AlertTitle>
        </Alert>
        )
        }
        <Text color={'#121212'} fontSize={'24px'} fontWeight={'500'} lineHeight={'36px'} letterSpacing={'-0.96px'} >Create A Support Project</Text>
        <Text color={'#515151'} fontSize={'16px'} lineHeight={'25.6px'}>To create a support project, kindly fill in the information below.</Text>
        <Formik
            initialValues={initialValues}
            validationSchema={SupportProjectFormSchema}
            onSubmit={(values) => handleProceed(values)}
        >
            {
                 ({ errors, touched, values, handleBlur, handleChange}) => (
                    <Form >

                        <FormControl mt={5} isInvalid={errors.ProjectName && touched.ProjectName}>
                                <FormLabel htmlFor='ProjectName' color={'#121212'} fontSize={'16px'}>Name of Project</FormLabel>
                                <Select name='ProjectName' placeholder="Select Project" bg={"#FAFAFA"} border={"0.5px solid #8A8C8E"}
                                    _placeholder={{ color: "#8A8C8E" }} focusBorderColor="0.5px solid #8A8C8E" _hover={{border: ""}}
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values?.ProjectName}
                                >
                                   {
                                        allProjectsData?.map((item) => (
                                            <option key={item?.id} value={item?.id}>{item?.projectName}</option>
                                        ))
                                    }
                                </Select>
                                {touched.ProjectName && errors.ProjectName && (
                                    <FormErrorMessage >{errors.ProjectName}</FormErrorMessage>
                                )}
                        </FormControl>
                        <FormControl mt={5} isInvalid={errors.IssueDescription && touched.IssueDescription}>
                            <FormLabel htmlFor='IssueDescription'>Issue Description</FormLabel>
                            <Textarea
                            type="text"
                            name='IssueDescription'
                            rows="5"
                            resize={"none"}
                            placeholder="Enter project description"
                            bg={"#FAFAFA"}
                            border={"0.5px solid #8A8C8E"}
                            _placeholder={{ color: "#8A8C8E" }}
                            focusBorderColor="0.5px solid #8A8C8E" _hover={{border: ""}}
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values?.IssueDescription}
                            />
                            {touched.IssueDescription && errors.IssueDescription && (
                                <FormErrorMessage >{errors.IssueDescription}</FormErrorMessage>
                            )}
                        </FormControl>
                        <FormControl mt={5} isInvalid={errors.DateReported && touched.DateReported}>
                        <FormLabel htmlFor='DateReported'>Date Reported</FormLabel>
                        <Input
                        type="date"
                        name='DateReported'
                        bg={"#FAFAFA"}
                        border={"0.5px solid #8A8C8E"}
                        _placeholder={{ color: "#8A8C8E" }}
                        focusBorderColor="0.5px solid #8A8C8E"
                        color={"#8A8C8E"} _hover={{border: ""}}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values?.DateReported}
                        />
                        {touched.DateReported && errors.DateReported && (
                            <FormErrorMessage >{errors.DateReported}</FormErrorMessage>
                        )}
                        </FormControl>
                        <Flex mt={5} flexDirection={['column', 'row', 'row']} gap={5}>
                            <FormControl width={['100%', '50%', '50%']} isInvalid={errors.StartDate && touched.StartDate}>
                                <FormLabel htmlFor='StartDate'>Start Date</FormLabel>
                                <Input
                                type="date"
                                name='StartDate'
                                bg={"#FAFAFA"}
                                border={"0.5px solid #8A8C8E"}
                                _placeholder={{ color: "#8A8C8E" }}
                                focusBorderColor="0.5px solid #8A8C8E"
                                color={"#8A8C8E"} _hover={{border: ""}}
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values?.StartDate}
                                />
                                {touched.StartDate && errors.StartDate && (
                                    <FormErrorMessage >{errors.StartDate}</FormErrorMessage>
                                )}
                            </FormControl>
                            <FormControl width={['100%', '50%', '50%']} isInvalid={errors.EndDate && touched.EndDate}>
                                <FormLabel htmlFor='EndDate'>End Date</FormLabel>
                                <Input
                                type="date"
                                name='EndDate'
                                bg={"#FAFAFA"}
                                border={"0.5px solid #8A8C8E"}
                                _placeholder={{ color: "#8A8C8E" }}
                                focusBorderColor="0.5px solid #8A8C8E"
                                color={"#8A8C8E"} _hover={{border: ""}}
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values?.EndDate}
                                />
                                {touched.EndDate && errors.EndDate && (
                                    <FormErrorMessage >{errors.EndDate}</FormErrorMessage>
                                )}
                            </FormControl>
                        </Flex>
                        <FormControl mt={5} isInvalid={errors.AssignDevelopers && touched.AssignDevelopers}>
                        <FormLabel htmlFor='AssignDevelopers' color={'#121212'} fontSize={'16px'}>Assign Developers</FormLabel>
                        <ChakraSelect name='AssignDevelopers' placeholder="Select Developers" bg={"#FAFAFA"} border={"0.5px solid #8A8C8E"}
                            _placeholder={{ color: "#8A8C8E" }} focusBorderColor="0.5px solid #8A8C8E" _hover={{border: ""}}
                            onBlur={handleBlur}
                            onChange={(selectedOption) => {
                                handleChange({ target: { name:'AssignDevelopers', value: selectedOption }});
                            }}
                            value={values?.AssignDevelopers}
                            options={developersData.map((option) => ({
                                label: option.firstName + ' ' + option.lastName,
                                value: option.userId,
                            }))}
                            isMulti
                        >
                        </ChakraSelect>
                         {touched.AssignDevelopers && errors.AssignDevelopers && (
                                <FormErrorMessage >{errors.AssignDevelopers}</FormErrorMessage>
                        )}
                    </FormControl>
                        <Flex justifyContent={'flex-end'} my={8}>
                            <Button rightIcon={<MdArrowForward style={{width:'24px', height:'22px'}} />} bg={'brand.primary'} color={'#FFFFFF'} size={'lg'} _hover={{backgroundColor: ''}}
                            borderRadius={"3px"}
                            type="submit"
                            isLoading={loading}
                            loadingText="Loadind ..."
                            >Proceed</Button>
                        </Flex>
                    </Form>
                 )
            }
        </Formik>

    </>
  )
}

export default SupportProjectForm;