import React from 'react';
import { Box, Text } from '@chakra-ui/react';

const SupportProjectDocuments = () => {
    const sopLists = [
        {description:"Quality Assurance Procedure - 1.2"},
        {description:"Employee Onboarding Process - 1.0"},
        {description:"Quality Assurance Procedure - 1.2"},
    ]


  return (
    <Box my={8} >

    <Text color={'#121212'} fontSize={'18px'} mb={4} mt={6}>SOPs List</Text>
    {
        sopLists.map((data, index) => (
            <Text key={index} color={'#005E39'} fontSize={'16px'} textDecoration={'underline'} pb={4} cursor={'pointer'}>{data.description}</Text>
        ))
    }
    </Box>
  )
}

export default SupportProjectDocuments;