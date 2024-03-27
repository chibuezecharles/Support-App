import React, {useState}  from 'react';
import { format } from 'date-fns';
import {Form, Formik } from 'formik';
import { Text, Button, Flex, FormLabel, FormControl, Input, Textarea, Select, Alert,AlertIcon, AlertTitle, } from '@chakra-ui/react';
import {Select as ChakraSelect} from 'chakra-react-select';
import { MdArrowForward } from "react-icons/md";
import { useDispatch,useSelector  } from 'react-redux';
import { setloadDrawer } from "../../redux/slices/drawerSlice";
import { fetchChangeRequest } from '../../redux/slices/changeRequestSlice';
import httpRequest from '../../utils/httpRequest';
import { BASE_URL } from "../../config/settings";
import {setloadTost} from "../../redux/slices/toastSlice";

const EditChangeRequestForm = () => {
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const editproject  = useSelector((state) => state.projectSlice.changeRequestEditData);
    const parentIdData = editproject.changeRequests.filter((item) => editproject.id === item.id);
    const parentId = parentIdData.map((item) => item.parentProjectId);
    // console.log("change request edit", editproject );
    // console.log(parentIdData, parentId[0]);
    
    const {brsLink, srsLink, manual} = editproject.documents[0];

    const dispatch = useDispatch();

    const allProjectsData= useSelector((state) => state.newProject.projects);
    const developersData= useSelector((state) => state.newProject.developers);
    
    const initialValues = {
        Project: parentId[0], 
        RequestDetails: editproject.requestDetail,
        StartDate: format(new Date(editproject.startDate), 'yyyy-MM-dd'),
        EndDate: format(new Date(editproject.endDate), 'yyyy-MM-dd'),
        RequestBy:editproject.requestedById,
        AssignDevelopers: editproject.developers.map(developer => ({
            label: developer.fullname,
            value: developer.id
        })),
        BRS:brsLink,
        SRS:srsLink,
        URL:manual,
    }
    
    const handleProceed = async (values) =>{
        setError('');
        setLoading(true);
        // console.log("edited values",values);
        try {
            const editChangeRequestData= {
                "id": parseInt(editproject.id, 10),
                "parentProjectId": parentId[0],
                "requestDetail": values.RequestDetails,
                "startDate": values.StartDate,
                "endDate": values.EndDate,
                "projectType": "ChangeRequest",
                "brsLink": values.BRS,
                "srsLink": values.SRS,
                // "manual": values.URL,
                // developerIds: values.AssignDevelopers.map((developer) => ({
                //     id: developer.value,
                // })),
                // "projectName":values.project,
                // "requestedBy":values.RequestBy,
                // "requestedBy":'Test Seven',
               
            }
            const response = await httpRequest(`${BASE_URL}/project/edit-project`, "post", editChangeRequestData);
            // console.log(' edit project response', response);
            if(!response.isSuccessful === true){
                setLoading(false);
                setError(response?.response?.data?.ResponseDescription || response?.message || 'Something went wrong');
                return;
            }
            setError('');
            setLoading(false);
            await dispatch(fetchChangeRequest ());
            dispatch(setloadDrawer({ status: false, data: null }));
            dispatch(setloadTost({ title: 'Project Edited', description: 'Change Request Project has been Edited successfully', status: 'success', duration: 5000, isClosable: true, position: 'top' }));
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
        <Text color={'#121212'} fontSize={'24px'} fontWeight={'500'} lineHeight={'36px'} letterSpacing={'-0.96px'} >Edit Request Project</Text>
        <Text color={'#515151'} fontSize={'16px'} lineHeight={'25.6px'}>To edit {editproject.ProjectName} request project, kindly fill in the information below.</Text>
        <Formik
            initialValues={initialValues}
            onSubmit={(values) => handleProceed(values) }
        >
            {
                ({ errors, touched, values, handleBlur, handleChange}) => (
                    <Form >

                        <FormControl mt={5}>
                            <FormLabel htmlFor='Project' color={'#121212'} fontSize={'16px'}>Project</FormLabel>
                            <Select name='Project' bg={"#FAFAFA"} border={"0.5px solid #8A8C8E"}
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
                        </FormControl>
                        <FormControl mt={5}>
                            <FormLabel htmlFor='RequestDetails'>Request Details</FormLabel>
                            <Textarea
                            type="text"
                            name='RequestDetails'
                            rows="5"
                            resize={"none"}
                            bg={"#FAFAFA"}
                            border={"0.5px solid #8A8C8E"}
                            _placeholder={{ color: "#8A8C8E" }}
                            focusBorderColor="0.5px solid #8A8C8E" _hover={{border: ""}}
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values?.RequestDetails}
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
                        <FormControl mt={5}>
                            <FormLabel htmlFor='RequestBy' color={'#121212'} fontSize={'16px'}>Request By</FormLabel>
                            <Select name='RequestBy'  bg={"#FAFAFA"} border={"0.5px solid #8A8C8E"}
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
                        </FormControl>
                        <FormControl mt={5}>
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
                        </FormControl>
                        <FormControl mt={5}>
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
                        </FormControl>
                        <FormControl mt={5}>
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

export default EditChangeRequestForm;
