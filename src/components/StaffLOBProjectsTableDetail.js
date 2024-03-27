import React from 'react';
import { format } from 'date-fns';
import { Box, Text,Flex} from '@chakra-ui/react';
import CustomAvatar from '../components/CustomAvatar';
import {AiOutlineClose} from "react-icons/ai";
import { useDispatch, useSelector } from 'react-redux';
import {setToggleState} from "../redux/slices/lobSlice";

const StaffLOBProjectsTableDetail = () => {
    const dispatch = useDispatch();
    const newProjectDataItem = useSelector((state) => state.detailsSlice.LobProjectTableDetail);
    
    const historyData = [
        {title:"Line of Business", discription:newProjectDataItem.lob},
        {title:"Product Manager", discription:newProjectDataItem.productManager},
        {title:"Business Manager", discription:newProjectDataItem.businessManager},
        {title:"Team Lead", discription:newProjectDataItem.teamLead},
        {title:"Start Date", discription:newProjectDataItem.startDate && format(new Date(newProjectDataItem.startDate), 'yyyy-MM-dd')},
        {title:"End Date", discription:newProjectDataItem.endDate && format(new Date(newProjectDataItem.endDate), 'yyyy-MM-dd')},
        {title:"Description", discription:newProjectDataItem.description},
    ]
    

    const avatarProps = {
        avatars:newProjectDataItem.developers,
        contributor: 'Assigned Developers'
      }
  return (
    <Box  mb={'200px'}>
        <Flex justifyContent={'flex-end'} mb={6}>
            <AiOutlineClose size="1.5rem" cursor={"pointer"} onClick={() => dispatch(setToggleState())} />
        </Flex>
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

export default StaffLOBProjectsTableDetail;