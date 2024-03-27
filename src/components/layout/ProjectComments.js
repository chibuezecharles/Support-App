import React, { useEffect, useState } from 'react';
import { parseISO, format } from 'date-fns';
import {Form, Formik } from 'formik';
import { Avatar, Box, Button, Flex, FormControl, FormLabel,FormErrorMessage, Text, Textarea } from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { projectCommentSchema} from "../../utils/formValidationSchema";
import {fetchProjectComment, createProjectComment} from "../../redux/slices/projectCommentSlice";

const ProjectComments = () => {
  const dispatch = useDispatch();
  const [displayedComments, setDisplayedComments] = useState(2);

  const newProjectDataItem = useSelector((state) => state.projectSlice.newProjectData);
  // console.log("newProjectDataItem for comments: ", newProjectDataItem);
  const projectId= newProjectDataItem.id;
  const projectType= "NewProject";
  const formData = {
    projectId,
    projectType
  }

  useEffect(() =>{
    dispatch(fetchProjectComment(formData));
  },[dispatch, projectId, projectType] );

  const allProjectComment = useSelector(( state) => state.projectComments.projectComments);
  // console.log("allProjectComment 333: ", allProjectComment);

  const handleLoadMore = () =>{
    setDisplayedComments(allProjectComment.length);
    dispatch(fetchProjectComment(formData));
  }

  const initialValues = {
    comment: '',
  }

  const handleCreateComment = async (values) =>{
    // console.log("comment create values: ", values);
    const comment = {
      "projectId": projectId,
      "projectType": projectType,
      "content": values.comment,
    }
    // console.log("comment create: ", comment);
    await dispatch(createProjectComment(comment));
    await dispatch(fetchProjectComment(formData));
  }

  
  
  return (
    <Box mt={8}>
        <Text color={'#121212'} fontSize={'18px'} fontWeight={'700'} lineHeight={'20px'} mb={5}>Comments</Text>
        {Array.isArray(allProjectComment) && allProjectComment.length > 0 ? (
        allProjectComment.slice(-displayedComments).map((data) => (
            <Box key={data?.commentId} borderRadius={'16px'} border={'1.5px solid #E0E0E0'}  px={5} pt={5} pb={[12, 12, 12, 5]} mb={5}>
              <React.Fragment >
                {data && (
                  <Flex justifyContent={'space-between'} alignItems={'center'} flexDirection={['column', 'row', 'row']} gap={[3, null, null]}>
                    <Flex alignItems={'center'} gap={3}>
                      <Avatar name={data?.createdBy} src='' bg={'#575DF3'} />
                      <Text color={'#121212'} fontSize={'16px'} lineHeight={'20px'} fontWeight={'400'}>
                        {data?.createdBy} <span style={{ color: '#515151', fontSize: '14px', lineHeight: '20px' }}>commented</span>
                      </Text>
                    </Flex>
                    <Text color={'#515151'} fontSize={'16px'} lineHeight={'20px'}>{format(parseISO(data?.dateCreated), 'dd-MM-yyyy')}  {format(parseISO(data?.dateCreated), 'hh:mm a')}</Text>
                  </Flex>
                )}
                {data && data.content ? (
                  <Text mt={5} color={'#515151'} fontSize={'16px'}>
                    {data.content}
                  </Text>
                ) : (
                  <Text mt={5} color={'#515151'} fontSize={'16px'}>
                    No comment available
                  </Text>
                )}
              </React.Fragment>
            </Box>
            ))
          ) : (
          <Text color={'#515151'} fontSize={'16px'} lineHeight={'20px'}>
            No comment yet
          </Text>
          )}

        <Button w={'100%'} size={'lg'} my={8} bg={'#CECECE'} borderRadius={'8px'} color={'#515151'} fontSize={'16px'} fontWeight={'700'} lineHeight={'16px'} _hover={{backgroundColor:''}}
          onClick={handleLoadMore}
        >Load More</Button>
      <Formik
        initialValues={initialValues}
         validationSchema={projectCommentSchema }
         enableReinitialize
         onSubmit={(values) => handleCreateComment(values) }
      >
        {
          ({ errors, touched, values, handleBlur, handleChange}) => (
            <Form>
              <FormControl isInvalid={errors.comment && touched.comment}>
                <FormLabel htmlFor='comment' color={'#121212'} fontSize={'18px'} fontWeight={'700'} lineHeight={'20px'} mb={5} mt={3}>Add Comments</FormLabel>
                <Textarea name='comment' type="text" rows="5" resize={"none"} bg={"#E8E8E8"} borderRadius={'0'}
                borderBottom={"2px solid #005E39"} placeholder="Type your message here"
                _placeholder={{ color: "#8A8C8E", fontSize:'16px', fontWeight:'500', lineHeight:'25.824px' }}
                focusBorderColor="0.5px solid #8A8C8E" _hover={{border: ""}}
                value={values?.comment}
                onBlur={handleBlur}
                onChange={handleChange}
                
              />
              {touched.comment && errors.comment && (
                <FormErrorMessage >{errors.comment}</FormErrorMessage>
              )}
              </FormControl>
              <Flex justifyContent={'flex-end'} my={4}>
                <Button size={'lg'} width={'132px'} bg={'brand.primary'} color={'#FFFFFF'} letterSpacing={'-0.25px'} 
                  fontSize={'16px'} borderRadius={'3px'} _hover={{backgroundColor:''}}
                  type="submit"
                >Send</Button>
              </Flex>
            </Form>
          )
        }
      </Formik>

      
    </Box>
  )
}

export default ProjectComments;