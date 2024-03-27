import React, { useState } from 'react';
import {Form, Formik } from 'formik';
import { Text, Button, Flex, FormLabel,FormErrorMessage,FormControl, Input, Textarea, Select,Alert,AlertIcon, AlertTitle, } from '@chakra-ui/react';
import {Select as ChakraSelect} from 'chakra-react-select';
import { MdArrowForward } from "react-icons/md";
import { useDispatch, useSelector } from 'react-redux';
import { setloadDrawer } from "../../redux/slices/drawerSlice";
import {createProjectFormSchema} from '../../utils/formValidationSchema';
import { fetchNewProject, createProject} from "../../redux/slices/newProjectSlice";
import {setloadTost} from "../../redux/slices/toastSlice";

const CreateProjectForm = () => {
    const dispatch = useDispatch();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const lobData = useSelector((state) => state.newProject.lob);
    const developersData= useSelector((state) => state.newProject.developers);
    const clients =  useSelector((state) => state.newProject.clients);
    const allUsers = useSelector((state) => state.newProject.allUsers);
    
    const initialValues = {
        NameofProject: '',
        LineofBusiness: '',
        ClientName: '',
        Description:'',
        BusinessManager:'',
        ProductManager:'',
        StartDate:'',
        EndDate:'',
        AssignDevelopers:[],
        ProjectTeamLead:'',
        BRS:'',
        SRS:'',
        URL:'',
    };


    const handleProceed = async (values) =>{
        setLoading(true);
        setError('');
        try {
            // console.log("normal values",values);
        const newProjectData= {
            "projectName": values.NameofProject,
            "description": values.Description,
            "projectType": "NewProject",
            "lobId": values.LineofBusiness,
            "startDate":values.StartDate,
            "endDate":values.EndDate,
            "brsLink": values.BRS,
            "srsLink": values.SRS,
            "fsdLink": "",
            "manual":values.URL,
            "clientId": parseInt(values.ClientName, 10) ,
            "businessManagerId": values.BusinessManager,
            "productManagerId": values.ProductManager,
            developerIds: values.AssignDevelopers.map((developer) => ({
                id: developer.value,
            })),
            "teamLeadId": values.ProjectTeamLead,
        }
        // console.log("newProjectData",newProjectData);
        const response = await dispatch(createProject(newProjectData ));

        if(!response.payload.isSuccessful === true){
            setLoading(false);
            setError(response?.payload?.responseDescription);
            return;
        }
        setError('');
        setLoading(false);
        await dispatch(fetchNewProject());
        dispatch(setloadDrawer({ status: false, data: null }));
        dispatch(setloadTost({ title: 'Project created', description: 'New Project has been created successfully', status: 'success', duration: 5000, isClosable: true, position: 'top' }));
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
        <Text color={'#121212'} fontSize={'24px'} fontWeight={'500'} lineHeight={'36px'} letterSpacing={'-0.96px'} >Create A Project</Text>
        <Text color={'#515151'} fontSize={'16px'} lineHeight={'25.6px'}>To create a project, kindly fill in the information below.</Text>
        
        <Formik
            initialValues={initialValues}
            validationSchema={createProjectFormSchema}
            enableReinitialize
            onSubmit={(values) => {
                handleProceed(values);
            }}
        >
            {
            ({ errors, touched, values, handleBlur, handleChange}) => (
                <Form >
                    <FormControl mt={7} isInvalid={errors.NameofProject && touched.NameofProject} >
                        <FormLabel htmlFor='NameofProject' color={'#121212'} fontSize={'16px'}>Name of Project</FormLabel>
                        <Input
                        type="text"
                        name='NameofProject'
                        placeholder="Enter Name of project"
                        bg={"#FAFAFA"}
                        border={"0.5px solid #8A8C8E"}
                        _placeholder={{ color: "#8A8C8E" }}
                        focusBorderColor="0.5px solid #8A8C8E" _hover={{border: ""}}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values?.NameofProject}
                        />
                        {touched.NameofProject && errors.NameofProject && (
                            <FormErrorMessage >{errors.NameofProject}</FormErrorMessage>
                        )}
                    </FormControl>
                    <FormControl mt={5} isInvalid={errors.LineofBusiness && touched.LineofBusiness}>
                        <FormLabel htmlFor='LineofBusiness'  color={'#121212'} fontSize={'16px'}>Line of Business</FormLabel>
                        <Select name='LineofBusiness' placeholder="Select Line of Business" bg={"#FAFAFA"} border={"0.5px solid #8A8C8E"}
                            _placeholder={{ color: "#8A8C8E" }} focusBorderColor="0.5px solid #8A8C8E" _hover={{border: ""}}
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values?.LineofBusiness}
                        >
                        {
                            lobData?.map((item) => (
                                <option key={item?.id} value={item?.id}>{item?.name}</option>
                            ))
                        }
                        </Select>
                        {touched.LineofBusiness && errors.LineofBusiness && (
                            <FormErrorMessage >{errors.LineofBusiness}</FormErrorMessage>
                        )}
                    </FormControl>
                    <FormControl mt={5} isInvalid={errors.ClientName && touched.ClientName}>
                        <FormLabel htmlFor='ClientName' color={'#121212'} fontSize={'16px'}>Client Name</FormLabel>
                        <Select name='ClientName' placeholder="Select Client Name" bg={"#FAFAFA"} border={"0.5px solid #8A8C8E"}
                            _placeholder={{ color: "#8A8C8E" }} focusBorderColor="0.5px solid #8A8C8E" _hover={{border: ""}}
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values?.ClientName}
                        >
                            {
                            clients?.map((item) => (
                                <option key={item?.id} value={item?.id}>{item?.nameOfClient}</option>
                            ))
                        }
                        </Select>
                        {touched.ClientName && errors.ClientName && (
                            <FormErrorMessage >{errors.ClientName}</FormErrorMessage>
                        )}
                    </FormControl>
                    <FormControl mt={5} isInvalid={errors.Description && touched.Description}>
                        <FormLabel htmlFor='Description' >Description</FormLabel>
                        <Textarea
                        type="text"
                        name='Description'
                        rows="5"
                        resize={"none"}
                        placeholder="Enter Project description"
                        bg={"#FAFAFA"}
                        border={"0.5px solid #8A8C8E"}
                        _placeholder={{ color: "#8A8C8E" }}
                        focusBorderColor="0.5px solid #8A8C8E" _hover={{border: ""}}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values?.Description}
                        />
                        {touched.Description && errors.Description && (
                            <FormErrorMessage >{errors.Description}</FormErrorMessage>
                        )}
                    </FormControl>
                    <FormControl mt={5} isInvalid={errors.BusinessManager && touched.BusinessManager}>
                        <FormLabel htmlFor='BusinessManager' color={'#121212'} fontSize={'16px'}>Business Manager</FormLabel>
                        <Select name='BusinessManager' placeholder="Select Business Manager" bg={"#FAFAFA"} border={"0.5px solid #8A8C8E"}
                            _placeholder={{ color: "#8A8C8E" }} focusBorderColor="0.5px solid #8A8C8E" _hover={{border: ""}}
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values?.BusinessManager}
                        >
                        {
                            allUsers?.map((item) => (
                                <option key={item?.userId} value={item?.userId}>{item?.firstName} {item?.lastName}</option>
                            ))
                        }
                        </Select>
                        {touched.BusinessManager && errors.BusinessManager && (
                            <FormErrorMessage >{errors.BusinessManager}</FormErrorMessage>
                        )}
                    </FormControl>
                    <FormControl mt={5} isInvalid={errors.ProductManager && touched.ProductManager} >
                        <FormLabel htmlFor='ProductManager' color={'#121212'} fontSize={'16px'}>Product Manager</FormLabel>
                        <Select name='ProductManager' placeholder="Select Product Manager" bg={"#FAFAFA"} border={"0.5px solid #8A8C8E"}
                            _placeholder={{ color: "#8A8C8E" }} focusBorderColor="0.5px solid #8A8C8E" _hover={{border: ""}}
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values?.ProductManager}
                        >
                        {
                            allUsers?.map((item) => (
                                <option key={item?.userId} value={item?.userId}>{item?.firstName} {item?.lastName}</option>
                            ))
                        }
                        </Select>
                        {touched.ProductManager && errors.ProductManager && (
                            <FormErrorMessage >{errors.ProductManager}</FormErrorMessage>
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
                    <FormControl mt={5} isInvalid={errors.ProjectTeamLead && touched.ProjectTeamLead}>
                        <FormLabel htmlFor='ProjectTeamLead' color={'#121212'} fontSize={'16px'}>Project Team Lead</FormLabel>
                        <Select name='ProjectTeamLead' placeholder="Select Project TeamLead" bg={"#FAFAFA"} border={"0.5px solid #8A8C8E"}
                            _placeholder={{ color: "#8A8C8E" }} focusBorderColor="0.5px solid #8A8C8E" _hover={{border: ""}}
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values?.ProjectTeamLead}
                        >
                        {
                            developersData?.map((item) => (
                                <option key={item?.userId} value={item?.userId}>{item?.firstName} {item?.lastName}</option>
                            ))
                        }
                        </Select>
                        {touched.ProjectTeamLead && errors.ProjectTeamLead && (
                            <FormErrorMessage >{errors.ProjectTeamLead}</FormErrorMessage>
                        )}
                    </FormControl>
                    <FormControl mt={5} isInvalid={errors.BRS && touched.BRS}>
                        <FormLabel htmlFor='BRS' color={'#121212'} fontSize={'16px'}>Share Point URl BRS</FormLabel>
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
                        <FormLabel htmlFor='SRS' color={'#121212'} fontSize={'16px'}>Share Point SRS</FormLabel>
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
                    <FormControl mt={5}>
                        <FormLabel htmlFor='URL' color={'#121212'} fontSize={'16px'}>Share Point URL Product Manual (Optional)</FormLabel>
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

export default CreateProjectForm;