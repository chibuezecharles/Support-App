// import React,{useEffect} from 'react';
import { Box,Tabs,TabList,Tab,TabPanels,TabPanel } from '@chakra-ui/react';
import ProjectInformation from './ProjectInformation';
import ProjectDocuments from './ProjectDocuments';
import ProjectComments from './ProjectComments';
import ProjectRevisionHistory from './ProjectRevisionHistory';
// import {useDispatch,useSelector} from 'react-redux';
// import {fetchProjectHistory} from "../../redux/slices/newProjectSlice";

const CreateProjectsDrawerPanel = () => {

//     const dispatch = useDispatch();

//   const newProjectDataItem = useSelector((state) => state.projectSlice.newProjectData);
//   const projectId= newProjectDataItem.id;
//   const projectType= newProjectDataItem.projectType;

//   useEffect(() =>{
//     dispatch(fetchProjectHistory({projectId, projectType}));
//   }, [dispatch, projectId, projectType]);

 

  return (
    <Box py={8} >
    <Tabs variant='unstyled'  >
        <TabList gap={'17px'} flexDirection={['column', 'row', 'row']} 
             justifyContent={['center', 'space-between', 'space-between']} alignItems={'center'} >
            <Tab _selected={{ color: 'white', bg: "#EAAD11", borderRadius:'4px',  fontWeight:'700', }}
            bg={'#E9E9E9'} w={['100%', '25%', '25%', '25%']} h={'70px'} borderRadius={'4px'} lineHeight={'-0.25px'} color={'#515151'}
            >
                Project Information
            </Tab>
            <Tab _selected={{ color: 'white', bg: "#EAAD11", borderRadius:'4px',  fontWeight:'700', }}
            bg={'#E9E9E9'} w={['100%', '25%', '25%', '25%']} h={'70px'} borderRadius={'4px'} lineHeight={'-0.25px'} color={'#515151'}
            >
               Project Documents
            </Tab>
            <Tab _selected={{ color: 'white', bg: "#EAAD11", borderRadius:'4px',  fontWeight:'700', }}
            bg={'#E9E9E9'} w={['100%', '25%', '25%', '25%']} h={'70px'} borderRadius={'4px'} lineHeight={'-0.25px'} color={'#515151'}
            >
                Comments
            </Tab>
            <Tab _selected={{ color: 'white', bg: "#EAAD11", borderRadius:'4px',  fontWeight:'700', }}
            bg={'#E9E9E9'} w={['100%', '25%', '25%', '25%']}  h={'70px'}borderRadius={'4px'} lineHeight={'-0.25px'} color={'#515151'}
            >
                Revision History
            </Tab>
        </TabList>
        <TabPanels>
            <TabPanel>
               <ProjectInformation />
            </TabPanel>
            <TabPanel>
                <ProjectDocuments />
            </TabPanel>
            <TabPanel>
                <ProjectComments />
            </TabPanel>
            <TabPanel>
                <ProjectRevisionHistory />
            </TabPanel>
        </TabPanels>
    </Tabs>
    </Box>
  )
}

export default CreateProjectsDrawerPanel;