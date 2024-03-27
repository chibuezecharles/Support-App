import React, {useState} from 'react';
import { format } from 'date-fns';
import {Form, Formik } from 'formik';
import { Text, Button, Flex, FormLabel,FormControl, Input, Textarea, Select , Alert,AlertIcon, AlertTitle,} from '@chakra-ui/react';
import {Select as ChakraSelect} from 'chakra-react-select';
import { MdArrowForward } from "react-icons/md";
import { useDispatch, useSelector } from 'react-redux';
import { setloadDrawer } from "../redux/slices/drawerSlice";
import { fetchNewProject,} from "../redux/slices/newProjectSlice";
import httpRequest from '../utils/httpRequest';
import { BASE_URL } from "../config/settings";
import {setloadTost} from "../redux/slices/toastSlice";

const EditProjectForm = () => {
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const editproject  = useSelector((state) => state.projectSlice.editData);
    const {brsLink, srsLink, manual} = editproject.documents[0];
    // console.log("editproject", editproject);
    
    const lobData = useSelector((state) => state.newProject.lob);
    const developersData= useSelector((state) => state.newProject.developers);
    // console.log("editproject form", editproject);
    const clients = useSelector((state) => state.newProject.clients);
    // console.log("editproject form clients", clients);
    const dispatch = useDispatch();

    const initialValues = {
        NameofProject: editproject?.projectName,
        LineofBusiness: editproject?.lobId,
        ClientName: editproject?.client?.nameOfClient,
        Description: editproject.description,
        BusinessManager: editproject.businessManagerId,
        ProductManager:editproject.productManagerId,
        StartDate: format(new Date(editproject.startDate), 'yyyy-MM-dd'),
        EndDate: format(new Date(editproject.endDate), 'yyyy-MM-dd'),
        AssignDevelopers: editproject.developers.map(developer => ({
            label: developer.fullname,
            value: developer.id
        })),
        ProjectTeamLead: editproject.teamLeadId,
        BRS:brsLink,
        SRS:srsLink,
        URL:manual,
    }

    const handleProceed = async (values) =>{
        setError('');
        setLoading(true);
        // console.log("edit values", values);
        try {
            const editNewProjectData= {
                "id": parseInt(editproject.id, 10), 
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
                "clientName": values.ClientName,
                "businessManagerId": values.BusinessManager,
                "productManagerId": values.ProductManager,
                developerIds: values.AssignDevelopers.map((developer) => ({
                    id: developer.value,
                })),
                "teamLeadId": values.ProjectTeamLead,
                "parentProjectId": 0,
            }
            // console.log("editNewProjectData",editNewProjectData);

            const response = await httpRequest(`${BASE_URL}/project/edit-project`, "post", editNewProjectData);
            // console.log(' edit project response', response);
            
        if(!response.isSuccessful === true){
            setLoading(false);
            setError(response?.response?.data?.ResponseDescription || 'Something went wrong');
            return;
        }
            setError('');
            setLoading(false);
            await dispatch(fetchNewProject());
            dispatch(setloadDrawer({ status: false, data: null }));
            dispatch(setloadTost({ title: 'Project Edited', description: 'New Project has been edited successfully', status: 'success', duration: 5000, isClosable: true, position: 'top' }));
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
        <Text color={'#121212'} fontSize={'24px'} fontWeight={'500'} lineHeight={'36px'} letterSpacing={'-0.96px'} >Edit New Project</Text>
        <Text color={'#515151'} fontSize={'16px'} lineHeight={'25.6px'}>To edit {editproject.ProjectName}  project, kindly fill in the information below.</Text>
        <Formik
            initialValues={initialValues}
            onSubmit={(values) => handleProceed(values) }
        >
            {
                ({ errors, touched, values, handleBlur, handleChange}) => (
                <Form>

                    <FormControl mt={7}>
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
                    </FormControl>
                    <FormControl mt={5}>
                            <FormLabel htmlFor='LineofBusiness' color={'#121212'} fontSize={'16px'}>Line of Business</FormLabel>
                            <Select name='LineofBusiness'  bg={"#FAFAFA"} border={"0.5px solid #8A8C8E"}
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
                    </FormControl>
                    <FormControl mt={5}>
                            <FormLabel htmlFor='ClientName' color={'#121212'} fontSize={'16px'}>Client Name</FormLabel>
                            <Select name='ClientName'  bg={"#FAFAFA"} border={"0.5px solid #8A8C8E"}
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
                    </FormControl>
                    <FormControl mt={5}>
                        <FormLabel htmlFor='Description'>Description</FormLabel>
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
                    </FormControl>
                    <FormControl mt={5}>
                        <FormLabel htmlFor='BusinessManager' color={'#121212'} fontSize={'16px'}>Business Manager</FormLabel>
                        <Select name='BusinessManager' placeholder={editproject.businessManager} bg={"#FAFAFA"} border={"0.5px solid #8A8C8E"}
                            _placeholder={{ color: "#8A8C8E" }} focusBorderColor="0.5px solid #8A8C8E" _hover={{border: ""}}
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.BusinessManager}
                        >
                        {
                            developersData?.map((item) => (
                                <option key={item?.userId} value={item?.userId}>{item?.firstName} {item?.lastName}</option>
                            ))
                        }
                        </Select>
                    </FormControl>
                    <FormControl mt={5}>
                        <FormLabel htmlFor='ProductManager' color={'#121212'} fontSize={'16px'}>Product Manager</FormLabel>
                        <Select name='ProductManager' bg={"#FAFAFA"} border={"0.5px solid #8A8C8E"}
                            _placeholder={{ color: "#8A8C8E" }} focusBorderColor="0.5px solid #8A8C8E" _hover={{border: ""}}
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.ProductManager}
                        >
                        {
                            developersData?.map((item) => (
                                <option key={item?.userId} value={item?.userId}>{item?.firstName} {item?.lastName}</option>
                            ))
                        }
                        </Select>
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
                            value={values?.EndDate}
                            bg={"#FAFAFA"}
                            border={"0.5px solid #8A8C8E"}
                            _placeholder={{ color: "#8A8C8E" }}
                            focusBorderColor="0.5px solid #8A8C8E"
                            color={"#8A8C8E"} _hover={{border: ""}}
                            onBlur={handleBlur}
                            onChange={handleChange}
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
                    <FormControl mt={5}>
                        <FormLabel htmlFor='ProjectTeamLead' color={'#121212'} fontSize={'16px'}>Project Team Lead</FormLabel>
                        <Select name='ProjectTeamLead'  bg={"#FAFAFA"} border={"0.5px solid #8A8C8E"}
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
                    </FormControl>
                    <FormControl mt={5}>
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
                    </FormControl>
                    <FormControl mt={5}>
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

export default EditProjectForm;