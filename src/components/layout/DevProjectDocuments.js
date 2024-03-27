import React from 'react';
import { Box, Text } from '@chakra-ui/react';
import {useSelector} from 'react-redux';

const DevProjectDocuments = () => {
    const devProjectDataItem = useSelector((state) => state.projectSlice.devprojectData);
    const devProjectDataDocs = devProjectDataItem.documents;


  return (
    <Box my={8} >
        <Text color={'#121212'} fontSize={'18px'} mb={4}>Project Documents</Text>
        {
            devProjectDataDocs.map((data, index) => (
                <>
                <Text key={index} color={'#005E39'} fontSize={'16px'} textDecoration={'underline'} pb={4} cursor={'pointer'}>{data.brsLink}</Text>
                <Text key={index} color={'#005E39'} fontSize={'16px'} textDecoration={'underline'} pb={4} cursor={'pointer'}>{data.srsLink}</Text>
                <Text key={index} color={'#005E39'} fontSize={'16px'} textDecoration={'underline'} pb={4} cursor={'pointer'}>{data.manual}</Text>
                </>
            ))
        }

       
    </Box>
  )
}

export default DevProjectDocuments;