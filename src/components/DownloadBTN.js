import React from 'react'
import {Box, Button} from '@chakra-ui/react';
import {BiDownload} from 'react-icons/bi';

const DownloadBTN = ({btn_Text, btn_Text_color}) => {

  return (
    <Box>   
      <Button leftIcon={<BiDownload style={{width:'20px', height:'20px'}} />} bg={btn_Text_color? btn_Text_color : '#EAAD11'} letterSpacing={'-0.25'}
          color={'#FFFFFF'} borderRadius={'3px'} size={'lg'} _hover={{backgroundColor:''}} py={'10px'} px={'20px'} width={'235px'}
      >
        {btn_Text}
      </Button>
    </Box>
  )
}

export default DownloadBTN;