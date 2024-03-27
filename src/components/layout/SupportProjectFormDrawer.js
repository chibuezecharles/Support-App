import React from 'react';
import { Box, Button, Flex, Image, Text } from '@chakra-ui/react';
import bgImage  from '../../Assets/Images/bg-image-drawer.svg'
import { useSelector } from 'react-redux';
import SupportProjectDrawerpanel from './SupportProjectDrawerpanel';

const SupportProjectFormDrawer = () => {
    const supportProjectDataItem = useSelector((state) => state.projectSlice.supportProjectData);

  return (
    <>
    <Box>
      <Text color={'#121212'} fontSize={'24px'} fontWeight={'500'} letterSpacing={'-0.96px'} lineHeight={'36px'}>Support Project Details</Text>
      <Text color={'#515151'} fontSize={'16px'} lineHeight={'25.6px'}>{supportProjectDataItem.projectName}  &gt;&gt; Project Report</Text>
    </Box>
    <Flex my={4} bg={'#005E39'} color={'#FFFFFF'} justifyContent={'space-between'} alignItems={'center'} py={[3, null, null]} mx={-6} >
      <Flex flexDirection={'column'} pl={6}  >
        <Flex gap={3} alignItems={'center'} >
          <Text fontSize={['20px', '30px', '40px']} fontWeight={'700'} maxW={'700px'} >{supportProjectDataItem.projectName} </Text>
          <Button size={'xs'} bg={'#E1E9FF'} color={'#356EFF'} borderRadius={'4px'} fontSize={'16px'} lineHeight={'20px'}
          _hover={{backgroundColor:'#E1E9FF'}}
          >Active</Button>
        </Flex>
        <Text fontSize={'16px'} lineHeight={'20px'}  >{supportProjectDataItem.projectRefCode}</Text>
      </Flex>
      <Image src={bgImage} alt='' w={'300px'} overflow={'hidden'} display={['none', 'none', 'none', 'flex']} />
    </Flex>

    
    <SupportProjectDrawerpanel />
    
    </>
  )
}

export default SupportProjectFormDrawer;