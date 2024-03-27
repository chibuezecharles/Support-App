import React from 'react';
import { format } from 'date-fns';
import { Box, Text,Flex} from '@chakra-ui/react';
import CustomAvatar from '../CustomAvatar';
// import {avatars} from '../../data/mock';
import { useSelector } from 'react-redux';

const DevProjectInformation = ({ProjectRefCode,ProjectName,LOB,productManager,StartDate,EndDate}) => {

  const devProjectDataItem = useSelector((state) => state.projectSlice.devprojectData);
    const historyData = [
        {title:"Line of Business", discription:devProjectDataItem.lob},
        {title:"Product Manager", discription:devProjectDataItem.productManager},
        {title:"Business Manager", discription:devProjectDataItem.businessManager},
        {title:"Start Date", discription:format(new Date(devProjectDataItem.startDate), 'yyyy-MM-dd')},
        {title:"End Date", discription:format(new Date(devProjectDataItem.endDate), 'yyyy-MM-dd')},
        {title:"Description", discription:devProjectDataItem.description},
    ]


    const avatarProps = {
        avatars:devProjectDataItem.developers,
        contributor: 'Assigned Developers'
     }
    // const avatarProps1 = {
    //     avatars:avatars,
    //     contributor: 'Project Contributors'
    // }

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
    {/* <CustomAvatar {...avatarProps1} /> */}

</Box>
  )
}

export default DevProjectInformation;