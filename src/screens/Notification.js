import React from 'react';
import { Box, Flex, Image, Text } from '@chakra-ui/react';
import {GoArrowLeft} from 'react-icons/go';
import { useNavigate } from 'react-router-dom';
import docText from '../Assets/Images/document-text.svg';
import {notificationData} from '../data/mock';


const Notification = () => {
    const  navigate = useNavigate();

  return (
    <Box bg={'#FFFFFF'} py={'30px'} >
            <Flex  justifyContent={'flex-start'} alignItems={'center'} gap={'20px'} borderBottom={'1px solid #B4B1B1'} py={'20px'} px={'20px'}>
                <GoArrowLeft style={{width:'24px', height:'24px', cursor:'pointer'}} onClick={() =>  navigate(-1)} />
                <Text fontSize={'18px'} fontWeight={'400'}  >Notifications ({notificationData.length})</Text>
           </Flex>
           
            <Box bg={'#F8FFFC'} mt={'50px'} >
                <Box borderBottom={'1px solid #E3E3E3'}></Box>
                {
                notificationData?.map((data, index) => (
                <Flex p={'30px'} gap={'20px'} borderBottom={'1px solid #E3E3E3'} key={index}>
                    <Flex bg={'#005E39'} rounded={'full'} w={'43px'} h={'43px'} justify={'center'} align={'center'} >
                        <Image src={docText}  alt='Document Text'/>
                    </Flex>
                    <Flex justifyContent={'space-between'} alignItems={'center'} width={'full'}  >
                        <Flex flexDirection={'column'}>
                            <Text color={'#121212'} fontSize={'18px'} fontWeight={'500'}>{data.title}</Text>
                            <Text color={'#000'} lineHeight={'22px'}>Project type: <span style={{color:'#005E39', fontWeight:'500'}}>{data.projectType}</span></Text>
                            <Text color={'#847F7F'}>{data.time}</Text>
                        </Flex>
                        <Text color={'#005E39'} cursor={'pointer'}>Clear</Text>
                    </Flex>
                </Flex>
                ))
                }
            </Box>
    </Box>
  )
}

export default Notification;