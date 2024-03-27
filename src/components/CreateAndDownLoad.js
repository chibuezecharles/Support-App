import React from 'react';
import {Flex, Button } from '@chakra-ui/react';
import DownloadBTN from '../components/DownloadBTN';
import { PiPlusBold } from "react-icons/pi";

const CreateAndDownLoad = ({onClick, createText, btn_Text, btn_Text_color}) => {
  return (
    <Flex alignItems={'center'} gap={5} flexDirection={['column', 'row', 'row']}>
        <Button borderRadius={"3px"} bg={"brand.primary"} leftIcon={<PiPlusBold />} color="white"
            onClick={onClick} px={9} _hover={{ backgroundColor: '' }} size={'lg'}
        >
            {createText}
        </Button>
        <DownloadBTN btn_Text={btn_Text} btn_Text_color={btn_Text_color} />
    </Flex>
  )
}

export default CreateAndDownLoad