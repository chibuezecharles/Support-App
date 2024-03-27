import React from 'react';
import { Box,Tabs,TabList,Tab,TabPanels,TabPanel } from '@chakra-ui/react';
import SupportProjectInformation from './SupportProjectInformation';
// import SupportProjectDocuments from './SupportProjectDocuments';
import SupportProjectComments from './SupportProjectComments';
import SupportProjectRevisionHistory from './SupportProjectRevisionHistory';

const SupportProjectDrawerpanel = () => {


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
            {/* <Tab _selected={{ color: 'white', bg: "#EAAD11", borderRadius:'4px',  fontWeight:'700', }}
            bg={'#E9E9E9'} w={['100%', '25%', '25%', '25%']} h={'70px'} borderRadius={'4px'} lineHeight={'-0.25px'} color={'#515151'}
            >
               Project Documents
            </Tab> */}
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
                <SupportProjectInformation />
            </TabPanel>
            {/* <TabPanel>
                <SupportProjectDocuments />
            </TabPanel> */}
            <TabPanel>
                <SupportProjectComments />
            </TabPanel>
            <TabPanel>
                <SupportProjectRevisionHistory />
            </TabPanel>
        </TabPanels>
    </Tabs>
    </Box>
  )
}

export default SupportProjectDrawerpanel;