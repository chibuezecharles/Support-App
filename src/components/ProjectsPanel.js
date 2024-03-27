import React from 'react';
import { Box,Tabs,TabList,Tab,TabPanels,TabPanel, Divider,} from '@chakra-ui/react';
import ProjectCreate from './layout/ProjectCreate';
import ProjectChangeRequest from './layout/ProjectChangeRequest';
import ProjectSupport from './layout/ProjectSupport';
import {useDispatch, useSelector } from "react-redux";
import SearchAndFilter from './SearchAndFilter';
import {clearsearchFilter} from "../redux/slices/searchFilterSlice";

const ProjectsPanel = ({ selectedTab, setSelectedTab }) => {
    const dispatch = useDispatch();
    const newProjects = useSelector((state) => state.newProject.projects) || [];
    const isEmpty = newProjects.length <= 0;
    // console.log(newProjects, 'newProjects')

    const changeRequestProjects = useSelector((state) => state.changeRequest.changeRequest)|| [];
    const changeEmpty = changeRequestProjects.length <= 0;

    const supportProjects = useSelector((state) => state.supportRequest.supportRequest)|| [];
    const supportEmpty = supportProjects.length <= 0;
    const handleProjectTab = () =>{
        setSelectedTab('project');
        dispatch(clearsearchFilter());
    }
    const handleChangeRequestTab = () =>{
        setSelectedTab('changeRequest');
        dispatch(clearsearchFilter());
    }

    const handleSupportRequestTab = () =>{
        setSelectedTab('support');
        dispatch(clearsearchFilter());
    }
    

  return (
    <Box py={8} >
    <Tabs variant='unstyled'   >
        <TabList  gap={'30px'} flexDirection={['column', 'row', 'row']}  pb={5}  px={'20px'} 
             justifyContent={['center', 'flex-start', 'flex-start']} alignItems={'center'} >
            <Tab _selected={{ color: 'white', bg: "brand.primary", borderRadius:'4px',  fontWeight:'600', }}
            bg={'#E9E9E9'} w={['100%', '15%', '15%', '15%']}  borderRadius={'4px'} lineHeight={'-0.25px'} color={'#515151'}
            h={'60px'} onClick={handleProjectTab}
            >
                Project
            </Tab>
            <Tab _selected={{ color: 'white', bg: "brand.primary", borderRadius:'4px',  fontWeight:'600', }}
            bg={'#E9E9E9'} w={['100%', '15%', '15%', '15%']}  borderRadius={'4px'} lineHeight={'-0.25px'} color={'#515151'}
            h={'60px'} onClick={handleChangeRequestTab}
            >
                Change Request
            </Tab>
            <Tab _selected={{ color: 'white', bg: "brand.primary", borderRadius:'4px',  fontWeight:'600', }}
            bg={'#E9E9E9'} w={['100%', '15%', '15%', '15%']}  borderRadius={'4px'} lineHeight={'-0.25px'} color={'#515151'}
            h={'60px'} onClick={handleSupportRequestTab}
            >
                Support
            </Tab>
            {
                (() =>{
                    switch (selectedTab) {
                        case 'project':
                            return !isEmpty && ( 
                                <SearchAndFilter showFilter={true} />
                            );

                        case 'changeRequest':
                            return !changeEmpty && (
                                <SearchAndFilter showFilter={true} />
                            );

                        case 'support':
                            return !supportEmpty &&(
                                <SearchAndFilter showFilter={true} />
                            );

                        default:
                            return null;
                    }
                }) 
                ()
            }
        </TabList>
        <Divider borderBottom={'1px solid #B4B1B1'} />
        <TabPanels>
            <TabPanel>
                <ProjectCreate />
            </TabPanel>
            <TabPanel>
                <ProjectChangeRequest />
            </TabPanel>
            <TabPanel>
                <ProjectSupport /> 
            </TabPanel>
        </TabPanels>
    </Tabs>
</Box>
  )
}

export default ProjectsPanel