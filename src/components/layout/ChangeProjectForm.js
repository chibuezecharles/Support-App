import React, { useState } from 'react';
import {Form, Formik } from 'formik';
import { Text, Button, Flex, FormLabel,FormErrorMessage,FormControl, Input, Textarea, Select,Alert,AlertIcon, AlertTitle, } from '@chakra-ui/react';
import {Select as ChakraSelect} from 'chakra-react-select';
import { MdArrowForward } from "react-icons/md";
import { useDispatch, useSelector } from 'react-redux';
import { setloadDrawer } from "../../redux/slices/drawerSlice";
import {changeProjectFormSchema} from '../../utils/formValidationSchema';
import {createChangeRequest, fetchChangeRequest } from '../../redux/slices/changeRequestSlice';
import {setloadTost} from "../../redux/slices/toastSlice";

const ChangeProjectForm = () => {
  const dispatch = useDispatch();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const developersData= useSelector((state) => state.newProject.developers);
  const allProjectsData= useSelector((state) => state.newProject.projects);

  const initialValues = {
    Project: '',
    RequestDetails: '',
    StartDate:'',
    EndDate:'',
    RequestBy:'',
    AssignDevelopers:[],
    BRS:'',
    SRS:'',
    URL:'',
}
    const handleProceed = async (values) =>{
        setLoading(true);
        setError('');
      try {

        // console.log("normal values",values);
        const changeRequestData= {
            "parentProjectId": parseInt(values.Project, 10),
            "requestDetail": values.RequestDetails,
            "startDate": values.StartDate,
            "endDate": values.EndDate,
            "requestedBy":values.RequestBy,
            "projectType": "ChangeRequest",
            "brsLink": values.BRS,
            "srsLink": values.SRS,
            "manual": values.URL,
            developerIds: values.AssignDevelopers.map((developer) => ({
                id: developer.value,
            })),
           
          }
        //   console.log("changeRequestData:", changeRequestData);
        const response = await dispatch(createChangeRequest(changeRequestData ));

        if(!response.payload.isSuccessful === true){
            setLoading(false);
            setError(response?.payload?.responseDescription);
            return;
        }

        setError('');
        setLoading(false);
        await dispatch(fetchChangeRequest ());
        dispatch(setloadDrawer({ status: false, data: null }));
        dispatch(setloadTost({ title: 'Project created', description: 'Change Request Project has been created successfully', status: 'success', duration: 5000, isClosable: true, position: 'top' }));
        
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
        <Text color={'#121212'} fontSize={'24px'} fontWeight={'500'} lineHeight={'36px'} letterSpacing={'-0.96px'} >Create A Request Project</Text>
        <Text color={'#515151'} fontSize={'16px'} lineHeight={'25.6px'}>To create a request project, kindly fill in the information below.</Text>
        <Formik
             initialValues={initialValues}
             validationSchema={changeProjectFormSchema }
             onSubmit={(values) => handleProceed(values) }
        >
            {
               ({ errors, touched, values, handleBlur, handleChange}) => (
                <Form >
                    <FormControl mt={5} isInvalid={errors.Project && touched.Project}>
                        <FormLabel htmlFor='Project' color={'#121212'} fontSize={'16px'}>Project</FormLabel>
                        <Select name='Project' placeholder="Select Project" bg={"#FAFAFA"} border={"0.5px solid #8A8C8E"}
                            _placeholder={{ color: "#8A8C8E" }} focusBorderColor="0.5px solid #8A8C8E" _hover={{border: ""}}
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values?.Project}
                        >
                        {
                            allProjectsData?.map((item) => (
                                <option key={item?.id} value={item?.id}>{item?.projectName}</option>
                            ))
                        }
                        </Select>
                        {touched.Project && errors.Project && (
                            <FormErrorMessage >{errors.Project}</FormErrorMessage>
                        )}
                    </FormControl>
                    <FormControl mt={5} isInvalid={errors.RequestDetails && touched.RequestDetails}>
                        <FormLabel htmlFor='RequestDetails'>Request Details</FormLabel>
                        <Textarea
                        type="text"
                        name='RequestDetails'
                        rows="5"
                        resize={"none"}
                        placeholder="Enter Project Request Details"
                        bg={"#FAFAFA"}
                        border={"0.5px solid #8A8C8E"}
                        _placeholder={{ color: "#8A8C8E" }}
                        focusBorderColor="0.5px solid #8A8C8E" _hover={{border: ""}}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values?.RequestDetails}
                        />
                        {touched.RequestDetails && errors.RequestDetails && (
                            <FormErrorMessage >{errors.RequestDetails}</FormErrorMessage>
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
                    <FormControl mt={5} isInvalid={errors.RequestBy && touched.RequestBy}>
                        <FormLabel htmlFor='RequestBy' color={'#121212'} fontSize={'16px'}>Request By</FormLabel>
                        <Select name='RequestBy' placeholder="Select Request By" bg={"#FAFAFA"} border={"0.5px solid #8A8C8E"}
                            _placeholder={{ color: "#8A8C8E" }} focusBorderColor="0.5px solid #8A8C8E" _hover={{border: ""}}
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values?.RequestBy}
                        >
                        {
                            developersData?.map((item) => (
                                <option key={item?.userId} value={item?.userId}>{item?.firstName} {item?.lastName}</option>
                            ))
                        }
                        </Select>
                        {touched.RequestBy && errors.RequestBy && (
                            <FormErrorMessage >{errors.RequestBy}</FormErrorMessage>
                         )}
                    </FormControl>
                    <FormControl mt={5} isInvalid={errors.AssignDevelopers && touched.AssignDevelopers}>
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
                         {touched.AssignDevelopers && errors.AssignDevelopers && (
                                <FormErrorMessage >{errors.AssignDevelopers}</FormErrorMessage>
                        )}
                    </FormControl>
                    <FormControl mt={5} isInvalid={errors.BRS && touched.BRS}>
                        <FormLabel htmlFor='BRS' color={'#121212'} fontSize={'16px'}>Share Point Request Document</FormLabel>
                        <Input
                        type="text"
                        name='BRS'
                        placeholder="Enter BRS Sharepoint URL Link"
                        bg={"#FAFAFA"}
                        border={"0.5px solid #8A8C8E"}
                        _placeholder={{ color: "#8A8C8E" }}
                        focusBorderColor="0.5px solid #8A8C8E" _hover={{border: ""}}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values?.BRS}
                        />
                        {touched.BRS && errors.BRS && (
                            <FormErrorMessage >{errors.BRS}</FormErrorMessage>
                        )}
                    </FormControl>
                    <FormControl mt={5} isInvalid={errors.SRS && touched.SRS}>
                        <FormLabel htmlFor='SRS' color={'#121212'} fontSize={'16px'}>Share Point URL SRS</FormLabel>
                        <Input
                        type="text"
                        name='SRS'
                        placeholder="Enter SRS Sharepoint URL Link"
                        bg={"#FAFAFA"}
                        border={"0.5px solid #8A8C8E"}
                        _placeholder={{ color: "#8A8C8E" }}
                        focusBorderColor="0.5px solid #8A8C8E" _hover={{border: ""}}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values?.SRS}
                        />
                         {touched.SRS && errors.SRS && (
                            <FormErrorMessage >{errors.SRS}</FormErrorMessage>
                        )}
                    </FormControl>
                    <FormControl mt={5} isInvalid={errors.URL && touched.URL}>
                        <FormLabel htmlFor='URL' color={'#121212'} fontSize={'16px'}>Share Point Product Manual</FormLabel>
                        <Input
                        type="text"
                        name='URL'
                        placeholder="Enter Product Manual Sharepoint URL Link"
                        bg={"#FAFAFA"}
                        border={"0.5px solid #8A8C8E"}
                        _placeholder={{ color: "#8A8C8E" }}
                        focusBorderColor="0.5px solid #8A8C8E" _hover={{border: ""}}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values?.URL}
                        />
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

export default ChangeProjectForm;