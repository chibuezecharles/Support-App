import React from 'react';
import { useSelector } from 'react-redux';
import { Button, Flex, Image, Text } from '@chakra-ui/react';
import bgImage  from '../../Assets/Images/bg-image-drawer.svg'
import DevProjectDrawerPanel from './DevProjectDrawerPanel';

const DevProjectDrawer = () => {
  
  const devProjectDataItem = useSelector((state) => state.projectSlice.devprojectData);
  

  return (
    <>
    
      <Text color={'#121212'} fontSize={'24px'} fontWeight={'500'} letterSpacing={'-0.96px'} lineHeight={'36px'}>Project Details</Text>
      <Text color={'#515151'} fontSize={'16px'} lineHeight={'25.6px'}>{devProjectDataItem.projectName}  &gt;&gt; Project Report</Text>
    
    <Flex my={4} bg={'#005E39'} color={'#FFFFFF'} justifyContent={'space-between'} alignItems={'center'} py={[3, null, null]} mx={-6} >
      <Flex flexDirection={'column'} pl={6} >
        <Flex gap={3} alignItems={'center'} >
          <Text fontSize={['20px', '30px', '40px']} fontWeight={'700'} maxW={'700px'} >{devProjectDataItem.projectName}</Text>
          <Button size={'xs'} bg={'#E1E9FF'} color={'#356EFF'} borderRadius={'4px'} fontSize={'16px'} lineHeight={'20px'}
          _hover={{backgroundColor:'#E1E9FF'}}
          >Active</Button>
        </Flex>
        <Text fontSize={'16px'} lineHeight={'20px'}  >{devProjectDataItem.projectRefCode}</Text>
      </Flex>
      <Image src={bgImage} alt='' w={'300px'} overflow={'hidden'} display={['none', 'none', 'none', 'flex']} />
    </Flex>

    <DevProjectDrawerPanel />
    
    </>
  )
}

export default DevProjectDrawer;