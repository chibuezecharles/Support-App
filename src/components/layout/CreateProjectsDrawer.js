import React from 'react';
import { Box, Button, Flex, Image, Text } from '@chakra-ui/react';
import bgImage  from '../../Assets/Images/bg-image-drawer.svg'
import CreateProjectsDrawerPanel from './CreateProjectsDrawerPanel';
import { useSelector } from 'react-redux';

const CreateProjectsDrawer = () => {

    const newProjectDataItem = useSelector((state) => state.projectSlice.newProjectData);
    console.log("newProjectDataItem:", newProjectDataItem);
    
  return (
    <>
    <Box>
      <Text color={'#121212'} fontSize={'24px'} fontWeight={'500'} letterSpacing={'-0.96px'} lineHeight={'36px'}>Project Details</Text>
      <Text color={'#515151'} fontSize={'16px'} lineHeight={'25.6px'}>{newProjectDataItem.projectName}  &gt;&gt; Project Report</Text>
      
    </Box>
    <Flex my={4} bg={'#005E39'} color={'#FFFFFF'} justifyContent={'space-between'} alignItems={'center'} py={[3, null, null]} mx={-6} >
      <Flex flexDirection={'column'} pl={6} >
        <Flex gap={3} alignItems={'center'}  >
          <Text fontSize={['20px', '30px', '40px']} fontWeight={'700'} maxW={'700px'} >{newProjectDataItem.projectName}</Text>
          <Button size={'xs'} bg={'#E1E9FF'} color={'#356EFF'} borderRadius={'4px'} fontSize={'16px'} lineHeight={'20px'}
          _hover={{backgroundColor:'#E1E9FF'}}
          >Active</Button>
        </Flex>
        <Text fontSize={'16px'} lineHeight={'20px'} >{newProjectDataItem.projectRefCode}</Text>
      </Flex>
      <Image src={bgImage} alt='' w={'300px'} overflow={'hidden'} display={['none', 'none', 'none', 'flex']}  />
    </Flex>

    {/* <CreateProjectsDrawerPanel {...projectInfo} /> */}
    <CreateProjectsDrawerPanel  />
    
    </>
  )
}

export default CreateProjectsDrawer;