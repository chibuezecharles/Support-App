import React, { useEffect, useState } from 'react';
import { Box,Flex,Text, 
  // Alert,AlertIcon, AlertTitle,
 } from '@chakra-ui/react';
import ProjectsPanel from '../components/ProjectsPanel';
import { useDispatch, useSelector } from "react-redux";
import { setloadDrawer } from "../redux/slices/drawerSlice";
import {fetchNewProject , fetchAllUsers, fetchUsersByRole, fetchLOB,fetchClients } from '../redux/slices/newProjectSlice';
import {fetchChangeRequest,} from '../redux/slices/changeRequestSlice';
import {fetchsupportRequest} from '../redux/slices/supportRequestSlice';
import CreateAndDownLoad from '../components/CreateAndDownLoad';
import {clearsearchFilter} from "../redux/slices/searchFilterSlice";


const Projects = () => {
    const dispatch = useDispatch();
    const Developer = 'developer';
    
    const [selectedTab, setSelectedTab] = useState('project');

    useEffect(() =>{
      dispatch(fetchChangeRequest());
      dispatch(fetchNewProject ());
      dispatch(fetchAllUsers()); 
      dispatch(fetchClients());
      dispatch(fetchUsersByRole(Developer));
      dispatch(fetchLOB());
      dispatch(fetchsupportRequest());
      dispatch(clearsearchFilter());
    },[dispatch]);
    
    const newProjects = useSelector((state) => state.newProject.projects) || [];
    const isEmpty = !newProjects || newProjects.length === 0;
  
    const changeRequestProjects = useSelector((state) => state.changeRequest.changeRequest) || [];
    const changeEmpty = !changeRequestProjects || changeRequestProjects.length === 0;
  
    const supportProjects = useSelector((state) => state.supportRequest.supportRequest) || [];
    const supportEmpty = !supportProjects || supportProjects.length === 0;
    
    const onClick = () => {
      dispatch(setloadDrawer({ status: true, type: "createProject" }));
    };
    const onChangeRequest = () => {
      dispatch(setloadDrawer({ status: true, type: "changeRequest" }));
    };
    const onSupportProject = () => {
      dispatch(setloadDrawer({ status: true, type: "supportRequest" }));
    };
    
    const project ={
      onClick:onClick,
      createText:'Create Project',
      btn_Text:'Download',
      btn_Text_color:"#5CBF14",
    }

    const changeRequest ={
      onClick:onChangeRequest,
      createText:'Create Request Project',
      btn_Text:'Download',
      btn_Text_color:"#5CBF14",
    }

    const support ={
      onClick:onSupportProject,
      createText:'Create Support Project',
      btn_Text:'Download',
      btn_Text_color:"#5CBF14",
    }

  return (
    <>
      <Box bg={'#FFFFFF'} py={'30px'}>
        <Flex flexDirection={['column', 'row', 'row']} justifyContent={'space-between'} alignItems={'center'} gap={'20px'} borderBottom={'1px solid #B4B1B1'} py={'20px'} px={'20px'}>
          <Text fontSize={'18px'} fontWeight={'400'}>Project</Text>
          {(() => {
            switch (selectedTab) {
              case 'project':
                return !isEmpty && (
                  <CreateAndDownLoad {...project} />
                );

              case 'changeRequest':
                return !changeEmpty && (
                  <CreateAndDownLoad {...changeRequest} />
                );

              case 'support':
                return !supportEmpty && (
                  <CreateAndDownLoad {...support} />
                );

              default:
                return null;
            }
          })()}
        </Flex>
        <Box py={5}>
          <ProjectsPanel setSelectedTab={setSelectedTab} selectedTab={selectedTab} />
        </Box>
      </Box>

    </>
  )
}

export default Projects;