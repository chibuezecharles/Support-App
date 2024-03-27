import React from 'react';
import { format } from 'date-fns';
import { Box, Text,Flex} from '@chakra-ui/react';
import CustomAvatar from '../CustomAvatar';
import { useSelector } from 'react-redux';

const SupportProjectInformation = () => {
  const supportProjectDataItem = useSelector((state) => state.projectSlice.supportProjectData);

    const historyData = [
        {title:"Support Date", discription:format(new Date(supportProjectDataItem.dateReported), 'yyyy-MM-dd')},
        {title:"Start Date", discription:format(new Date(supportProjectDataItem.startDate), 'yyyy-MM-dd')},
        {title:"End Date", discription:format(new Date(supportProjectDataItem.endDate), 'yyyy-MM-dd')},
        {title:"Issue Description", discription:supportProjectDataItem.issueDescription},
       
    ]


    const avatarProps = {
        avatars:supportProjectDataItem.developers,
        contributor: 'Assigned Developers'
      }

  return (
    <Box mt={8} mb={'200px'}>
        {
          historyData?.map((data, index) =>(
          <Flex color={'#515151'} fontSize={'18px'} justifyContent={'flex-start'} alignItems={'center'} mb={4} key={index} gap={[6, 3, 3]}>
              <Text width={'30%'} >{data.title}</Text>
              <Text fontWeight={'500'} width={'70%'} >{data.discription}</Text>
          </Flex>
        ))
        }
        

        <CustomAvatar {...avatarProps} />

    </Box>
  )
}

export default SupportProjectInformation;