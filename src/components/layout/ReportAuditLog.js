import React from 'react';
import { Box,  Divider,  Text } from '@chakra-ui/react';
import { auditLogData} from '../../data/mock';
import CustomTable from '../CustomTable';

const ReportAuditLog = () => {

    const tableProps3 = {
        data: auditLogData,
        title: {
          DateTime: " Date & Time",
          Username: "Username",
          Action: " Action",
        },
        dataKeys: [
          "DateTime",
          "Username",
          "Action",
        ],
        variant:"true",
        sn: false,
        transformRow: (item) => ({
          DateTime: item.DateTime,
          Username: item.Username,
          Action: item.Action,
        }),
      };

  return (
    <Box mt={7}>
        <Text color={'#121212'} fontSize={'18px'} fontWeight={'500'} lineHeight={'20px'} py={3}
        >Audit Log</Text>
        <Divider border={'1px solid #B4B1B1'} mb={4} />
        <CustomTable {...tableProps3}/>
  </Box>
  )
}

export default ReportAuditLog;