import React, {useState} from 'react';
import {Form, Formik } from 'formik';
import { Box, Text, FormLabel, FormErrorMessage, FormControl ,Input, Textarea, Flex ,Button, Alert,AlertIcon, AlertTitle,} from '@chakra-ui/react';
import {MdArrowForward} from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { setloadDrawer } from "../../redux/slices/drawerSlice";
import {devProjectSOPSchema} from "../../utils/formValidationSchema";
import {createSop, fetchsop} from "../../redux/slices/sopSlice";
import {setloadTost} from "../../redux/slices/toastSlice";

const DevAddNewSOP = () => {
    const dispatch = useDispatch();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const sopDrawerData = useSelector((state) => state.projectSlice.devprojectData);
    // console.log("sopDrawerData 44: ", sopDrawerData);

    const initialValues = {
        title: '',
        steps: '',
    }

    const handleProceed = async (values) =>{
        // console.log("Submitting with values:", values);
        setError('');
        setLoading(true);
        try {
            const sopFormData = {
                "title": values.title,
                "sopSteps": values.steps,
                "projectId": sopDrawerData.id,
            }
            const response =  await dispatch(createSop(sopFormData));
            console.log(response);
            if(!response?.payload?.isSuccessful === true){
                setLoading(false);
                setError(response?.payload?.data?.ResponseDescription || response?.payload?.message || 'Something went wrong');
                return;
            }
            setError('');
            setLoading(false);
            dispatch(setloadDrawer({ status: false, data: null }));
            await dispatch(fetchsop());
            dispatch(setloadTost({ title: 'SOP Created', description: 'SOP has been created successfully', status: 'success', duration: 5000, isClosable: true, position: 'top' }));
        } catch (error) {
            setError(error.message || 'Something went wrong');
        }finally {
            setLoading(false);
            
        }
        
    }
   

  return (
    <Box>
        {
        error &&(
        <Alert status="error" className="mt-3 ">
            <AlertIcon />
            <AlertTitle>{ error}</AlertTitle>
        </Alert>
        )
        }
        <Text color={'#121212'} fontSize={'24px'} fontWeight={'500'} lineHeight={'36px'} letterSpacing={'-0.96px'} >Create New SOP</Text>
        <Text color={'#515151'} fontSize={'16px'} lineHeight={'25.6px'}>To create an SOP, kindly fill in the information below.</Text>


        <Formik
        initialValues={initialValues}
        validationSchema={devProjectSOPSchema}
        onSubmit={(values) => {
            handleProceed(values);
        }}
        >
            {
                ({ errors, touched, values, handleBlur, handleChange}) => (
                    <Form >
                        <FormControl mt={7} isInvalid={errors.title && touched.title}>
                            <FormLabel htmlFor='title' color={'#121212'} fontSize={'16px'}>SOP Title </FormLabel>
                            <Input
                            type="text"
                            name='title'
                            placeholder="Enter SOP Title"
                            bg={"#FAFAFA"}
                            border={"0.5px solid #8A8C8E"}
                            _placeholder={{ color: "#8A8C8E" }}
                            borderRadius={"8px"}
                            focusBorderColor="0.5px solid #8A8C8E" _hover={{border: ""}}
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values?.title}
                            />
                            {touched.title && errors.title && (
                                <FormErrorMessage >{errors.title}</FormErrorMessage>
                            )}
                        </FormControl>
                        <FormControl mt={5} isInvalid={errors.steps && touched.steps}>
                            <FormLabel htmlFor='steps'>SOP Steps</FormLabel>
                            <Textarea
                            h={'533px'}
                            type="text"
                            name='steps'
                            rows="5"
                            resize={"none"}
                            placeholder="Enter Steps to Carrryout this Activity"
                            borderRadius={"8px"}
                            bg={"#FAFAFA"}
                            border={"0.5px solid #8A8C8E"}
                            _placeholder={{ color: "#8A8C8E" }}
                            focusBorderColor="0.5px solid #8A8C8E" _hover={{border: ""}}
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values?.steps}
                            />
                            {touched.steps && errors.steps && (
                                <FormErrorMessage >{errors.steps}</FormErrorMessage>
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
       
        
    </Box>
  )
}

export default DevAddNewSOP;