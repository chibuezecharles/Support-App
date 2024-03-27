import React from 'react';
import { format } from 'date-fns';
import { Box, Text,Flex} from '@chakra-ui/react';
import CustomAvatar from '../CustomAvatar';
import { useSelector } from 'react-redux';

const ChangeProjectInformation = () => {

  const changerequestDataItem = useSelector((state) => state.projectSlice.changeRequestData);

    const historyData = [
        {title:"Line of Business", discription:changerequestDataItem.lob},
        {title:"Business Manager", discription:changerequestDataItem.businessManager},
        {title:"Start Date", discription:format(new Date(changerequestDataItem.startDate), 'yyyy-MM-dd')},
        {title:"End Date", discription:format(new Date(changerequestDataItem.endDate), 'yyyy-MM-dd')},
        {title:"Request Details", discription:changerequestDataItem.requestDetail},
    ]


    const avatarProps = {
        avatars:changerequestDataItem.developers,
        contributor: 'Assigned Developers'
      }

  return (
    <Box mt={8} mb={'200px'}>
        {
          historyData?.map((data, index) =>(
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

export default ChangeProjectInformation;