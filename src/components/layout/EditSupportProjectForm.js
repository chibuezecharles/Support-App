import React, {useState} from 'react';
import { format } from 'date-fns';
import {Form, Formik } from 'formik';
import { Text, Button, Flex, FormLabel, FormControl, Input, Textarea, Select,  Alert,AlertIcon, AlertTitle, } from '@chakra-ui/react';
import {Select as ChakraSelect} from 'chakra-react-select';
import { MdArrowForward } from "react-icons/md";
import { useDispatch, useSelector } from 'react-redux';
import { setloadDrawer } from "../../redux/slices/drawerSlice";
import { fetchsupportRequest} from '../../redux/slices/supportRequestSlice';
import httpRequest from '../../utils/httpRequest';
import { BASE_URL } from "../../config/settings";
import {setloadTost} from "../../redux/slices/toastSlice";

const EditSupportProjectForm = () => {
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
  const supportEditData = useSelector((state) => state.projectSlice.supportEditData);
  const parentIdData = supportEditData.projectSupports.filter((item) => supportEditData.id === item.id);
  const parentId = parentIdData.map((item) => item.parentProjectId);
  const dispatch = useDispatch();
  const developersData= useSelector((state) => state.newProject.developers);
  const allProjectsData= useSelector((state) => state.newProject.projects);

  const initialValues = {
    ProjectName: parentId[0],
    IssueDescription: supportEditData.issueDescription,
    DateReported:supportEditData.dateReported && format(new Date(supportEditData.dateReported), 'yyyy-MM-dd'),
    StartDate: supportEditData.startDate && format(new Date(supportEditData.startDate), 'yyyy-MM-dd'),
    EndDate: supportEditData.endDate && format(new Date(supportEditData.endDate), 'yyyy-MM-dd'),
    AssignDevelopers: supportEditData.developers.map(developer => ({
        label: developer.fullname,
        value: developer.id
    })),
}
    const handleProceed = async (values) =>{
        setError('');
        setLoading(true);
        // console.log("support edit values:", values);
        try {
            const editSupportRequestData = {
                "id": parseInt(supportEditData.id, 10),
                "parentProjectId": parentId[0],
                "dateReported": values.DateReported,
                "startDate": values.StartDate,
                "endDate": values.EndDate,
                "projectType": "ProjectSupport",
                "issueDescription": values.IssueDescription,
                // developerIds: values.AssignDevelopers.map((developer) => ({
                //     id: developer.value,
                // })),
                // "ProjectName": values.ProjectName, 
            };
            // console.log("editSupportRequestData: ", editSupportRequestData);
            const response = await httpRequest(`${BASE_URL}/project/edit-project`, "post", editSupportRequestData);
            // console.log(' edit project response', response);
            if(!response.isSuccessful === true){
                setLoading(false);
                setError(response?.response?.data?.ResponseDescription || response?.message || 'Something went wrong');
                return;
            }
            setError('');
            setLoading(false);
            await dispatch(fetchsupportRequest());
            dispatch(setloadDrawer({ status: false, data: null }));
            dispatch(setloadTost({ title: 'Project Edited', description: 'Support Project has been edited successfully', status: 'success', duration: 5000, isClosable: true, position: 'top' }));
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
        <Alert status="error" className="mt-3 ">
            <AlertIcon />
            <AlertTitle>{ error}</AlertTitle>
        </Alert>
        )
        }
        <Text color={'#121212'} fontSize={'24px'} fontWeight={'500'} lineHeight={'36px'} letterSpacing={'-0.96px'} >Edit Support Project</Text>
        <Text color={'#515151'} fontSize={'16px'} lineHeight={'25.6px'}>To create a support project, kindly fill in the information below.</Text>
        <Formik
            initialValues={initialValues}
            onSubmit={(values) => handleProceed(values)}   
        >
            {
                ({ errors, touched, values, handleBlur, handleChange}) => (
                    <Form >
                        <FormControl mt={5}>
                            <FormLabel htmlFor='ProjectName' color={'#121212'} fontSize={'16px'}>Name of Project</FormLabel>
                            <Select name='ProjectName' bg={"#FAFAFA"} border={"0.5px solid #8A8C8E"}
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
                        </FormControl>
                        <FormControl mt={5}>
                            <FormLabel htmlFor='IssueDescription'>Issue Description</FormLabel>
                            <Textarea
                            type="text"
                            name='IssueDescription'
                            rows="5"
                            resize={"none"}
                            bg={"#FAFAFA"}
                            border={"0.5px solid #8A8C8E"}
                            _placeholder={{ color: "#8A8C8E" }}
                            focusBorderColor="0.5px solid #8A8C8E" _hover={{border: ""}}
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values?.IssueDescription}
                            />
                        </FormControl>
                        <FormControl mt={5}>
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
                        </FormControl>
                        <Flex mt={5} flexDirection={['column', 'row', 'row']} gap={5}>
                            <FormControl width={['100%', '50%', '50%']}>
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
                            </FormControl>
                            <FormControl width={['100%', '50%', '50%']}>
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
                            </FormControl>
                        </Flex>
                        <FormControl mt={5} >
                        <FormLabel htmlFor='AssignDevelopers' color={'#121212'} fontSize={'16px'}>Assign Developers</FormLabel>
                        <ChakraSelect name='AssignDevelopers' placeholder="Select Developers" bg={"#FAFAFA"} border={"0.5px solid #8A8C8E"}
                            _placeholder={{ color: "#8A8C8E" }} focusBorderColor="0.5px solid #8A8C8E" _hover={{border: ""}}
                            onBlur={handleBlur}
                            onChange={(selectedOption) => {
                                handleChange({ target: { name: 'AssignDevelopers', value: selectedOption } });
                            }}
                            value={values?.AssignDevelopers}
                            options={developersData.map((option) => ({
                                label: option.firstName + ' ' + option.lastName,
                                value: option.userId,
                            }))}
                            isMulti
                        >
                        </ChakraSelect>
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

export default EditSupportProjectForm;