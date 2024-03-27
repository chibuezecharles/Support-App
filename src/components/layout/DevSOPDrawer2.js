import React from 'react';
import { format } from 'date-fns';
import { Box, Text, Flex  } from '@chakra-ui/react';
import {GrClose} from "react-icons/gr";
import { useDispatch,useSelector } from 'react-redux';
import { drawerToggle} from '../../redux/slices/drawerSlice';

const DevSOPDrawer2 = () => {
  const dispatch = useDispatch();
  const projectSlice = useSelector((state) => state.projectSlice.devProjectSOPData);
  // console.log("DevSOPDrawer 2: ", projectSlice);
  const sopDrawerData = useSelector((state) => state.projectSlice.devprojectData);

  const historyData = [
    {title:"Created By:", discription: projectSlice.createdBy},
    {title:"Date Created:  ", discription:format(new Date(projectSlice.dateCreated), 'yyyy-MM-dd')},
    {title:"Updated By: ", discription:projectSlice.updatedBy},
    {title:"Last Modified Date:  ", discription:format(new Date(projectSlice.dateModified), 'yyyy-MM-dd') 
  },
]


  return (
    <>
        <GrClose
            style={{
             margin: "20px",
             width: "24px",
             height: "24px",
             color: "#292D32",
             cursor: "pointer",
           }}
           onClick={() =>{dispatch(drawerToggle())}}
          />
        <Box textAlign={'center'}  color={'#121212'}>
          <Text fontSize={'40px'} fontWeight={'700'} lineHeight={'60px'} letterSpacing={'-1.6px'}
          >{projectSlice.title} Standard Operating Procedure (SOP)</Text>
          <Text fontSize={'24px'} fontWeight={'500'} pt={2}>{sopDrawerData.projectName}</Text>
        </Box>

        <Box mt={12}>
        {
          historyData?.map((data, index) =>(
          <Flex fontSize={'18px'} justifyContent={'flex-start'} alignItems={'center'} mb={4} key={index} gap={[6, 3, 3]}>
              <Text width={'30%'} color={'#121212'} fontWeight={'500'} >{data.title}</Text>
              <Text fontWeight={'400'} width={'60%'} color={'#515151'} >{data.discription}</Text>
          </Flex>
        ))
        }
      </Box>

      <Box mt={9}>
        <Text color={'#121212'} fontSize={'24px'} textDecoration={'underline'}>SOP Title</Text>
        <Text color={'#515151'} fontWeight={'500'} fontSize={'20px'} pt={3}>{projectSlice.title}</Text>
      </Box>

      <Box mt={9}>
        <Text color={'#121212'} fontSize={'24px'} textDecoration={'underline'}>Steps Taken</Text>
        <Text color={'#515151'} fontWeight={'400'} fontSize={'16px'} pt={3} >
        {projectSlice.sopSteps}
        </Text>
      </Box>

      <Box mt={9}>
        <Text color={'#121212'} fontSize={'24px'} textDecoration={'underline'}>Update by {projectSlice.updatedBy}</Text>
          
        <Text color={'#515151'} fontWeight={'400'} fontSize={'16px'} pt={3} >
        {projectSlice.sopSteps}
        </Text>
      </Box>
    </>
  )
}

export default DevSOPDrawer2;