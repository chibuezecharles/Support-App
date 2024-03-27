import React from 'react';
import { Box,Tabs,TabList,Tab,TabPanels,TabPanel } from '@chakra-ui/react';
import DevProjectInformation from './DevProjectInformation';
import DevProjectDocuments from './DevProjectDocuments';
import DevProjectComments from './DevProjectComments';
import DevProjectRevisionHistory from './DevProjectRevisionHistory';

const DevProjectDrawerPanel = () => {

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
               <DevProjectInformation  />
            </TabPanel>
            <TabPanel>
                <DevProjectDocuments />
            </TabPanel>
            <TabPanel>
                <DevProjectComments />
            </TabPanel>
            <TabPanel>
                <DevProjectRevisionHistory />
            </TabPanel>
        </TabPanels>
    </Tabs>
    </Box>
  )
}

export default DevProjectDrawerPanel;