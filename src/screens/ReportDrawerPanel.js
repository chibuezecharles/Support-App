import React from 'react';
import { Box, Tabs, TabList, Tab, TabPanels, TabPanel } from '@chakra-ui/react';
import ReportProjectHistory from '../components/layout/ReportProjectHistory';
import ReportDeveloperUpdate from '../components/layout/ReportDeveloperUpdate';
import ReportProjectDocument from '../components/layout/ReportProjectDocument';
import ReportAuditLog from '../components/layout/ReportAuditLog';

const ReportDrawerPanel = () => {
    return (
        <Box py={8} >
            <Tabs variant='unstyled'  >
                <TabList px={3} gap={'17px'} flexDirection={['column', 'row', 'row']}
                    justifyContent={['center', 'space-between', 'space-between']} alignItems={'center'} >
                    <Tab _selected={{ color: 'white', bg: "#EAAD11", borderRadius: '4px', fontWeight: '700', }}
                        bg={'#E9E9E9'} w={['100%', '25%', '25%', '25%']} h={'70px'} borderRadius={'4px'} lineHeight={'-0.25px'} color={'#515151'}
                    >
                        Project History
                    </Tab>
                    <Tab _selected={{ color: 'white', bg: "#EAAD11", borderRadius: '4px', fontWeight: '700', }}
                        bg={'#E9E9E9'} w={['100%', '25%', '25%', '25%']} h={'70px'} borderRadius={'4px'} lineHeight={'-0.25px'} color={'#515151'}
                    >
                        Developers Updates
                    </Tab>
                    <Tab _selected={{ color: 'white', bg: "#EAAD11", borderRadius: '4px', fontWeight: '700', }}
                        bg={'#E9E9E9'} w={['100%', '25%', '25%', '25%']} h={'70px'} borderRadius={'4px'} lineHeight={'-0.25px'} color={'#515151'}
                    >
                        Project Documents
                    </Tab>
                    {/* <Tab _selected={{ color: 'white', bg: "#EAAD11", borderRadius:'4px',  fontWeight:'700', }}
                bg={'#E9E9E9'} w={['100%', '25%', '25%', '25%']}  h={'70px'}borderRadius={'4px'} lineHeight={'-0.25px'} color={'#515151'}
                >
                    Audit log
                </Tab> */}
                </TabList>
                <TabPanels>
                    <TabPanel>
                        <ReportProjectHistory />
                    </TabPanel>
                    <TabPanel>
                        <ReportDeveloperUpdate />
                    </TabPanel>
                    <TabPanel>
                        <ReportProjectDocument />
                    </TabPanel>
                    <TabPanel>
                        <ReportAuditLog />
                    </TabPanel>
                </TabPanels>
            </Tabs>
        </Box>
    )
}

export default ReportDrawerPanel;