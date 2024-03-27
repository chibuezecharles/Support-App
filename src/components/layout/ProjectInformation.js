import React from 'react';
import { format } from 'date-fns';
import { Box, Text,Flex} from '@chakra-ui/react';
import CustomAvatar from '../CustomAvatar';
// import {avatars} from '../../data/mock';
import {AiOutlineClose} from "react-icons/ai";
import { useSelector } from 'react-redux';


const ProjectInformation = ({showClose, setShowProjectInfo}) => {

  const newProjectDataItem = useSelector((state) => state.projectSlice.newProjectData);
  
    
    const historyData = [
        {title:"Line of Business", discription:newProjectDataItem.lob},
        {title:"Product Manager", discription:newProjectDataItem.productManager},
        {title:"Business Manager", discription:newProjectDataItem.businessManager},
        {title:"Team Lead", discription:newProjectDataItem.teamLead},
        {title:"Start Date", discription: format(new Date(newProjectDataItem.startDate), 'yyyy-MM-dd')},
        {title:"End Date", discription: format(new Date(newProjectDataItem.endDate), 'yyyy-MM-dd')},
        {title:"Description", discription:newProjectDataItem.description},
    ]
    

    const clientData = [
        {title:"Client Data", discription:newProjectDataItem.client.nameOfClient},
        {title:"Contact Person", discription:newProjectDataItem.client.contactPerson},
        {title:"Contact Email Address", discription:newProjectDataItem.client.contactEmailAddress},
        {title:"Contact Phone Number Address", discription:newProjectDataItem.client.contactPhoneNumber},

    ]

    const avatarProps = {
        avatars:newProjectDataItem.developers,
        contributor: 'Assigned Developers'
      }

  return (
    <Box mt={8} mb={'200px'}>
      {showClose && <AiOutlineClose size="1.5rem" cursor={"pointer"} onClick={() => setShowProjectInfo(false)} />}
        {
          historyData?.map((data, index) =>(
          <Flex color={'#515151'} fontSize={'18px'} justifyContent={'flex-start'} alignItems={'center'} mb={4} key={index} gap={[6, 3, 3]}>
              <Text width={'40%'} >{data.title}</Text>
              <Text fontWeight={'500'} width={'60%'} >{data.discription}</Text>
          </Flex>
        ))
        }
        <Text color={'#121212'} fontSize={'18px'} fontWeight={'500'} py={6}>Client Information</Text>
        {
          clientData?.map((data, index) =>(
          <Flex color={'#515151'} fontSize={'18px'} justifyContent={'flex-start'} alignItems={'center'} mb={4} key={index} gap={[6, 3, 3]}>
              <Text width={'40%'} >{data.title}</Text>
              <Text fontWeight={'500'} width={'60%'} >{data.discription}</Text>
          </Flex>
        ))
        }

        <CustomAvatar {...avatarProps} />

    </Box>
  )
}

export default ProjectInformation;