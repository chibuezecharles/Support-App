import React, {  useEffect } from 'react';
import { format } from 'date-fns';
import { useSelector,useDispatch, } from 'react-redux';
import { Box,Flex,Text, } from '@chakra-ui/react';
import {devProjectSOPDataloader} from '../redux/slices/projectSlice';
import CustomTable from '../components/CustomTable';
import { drawerToggle} from '../redux/slices/drawerSlice';
import {fetchsop} from "../redux/slices/sopSlice";
import {clearsearchFilter} from "../redux/slices/searchFilterSlice";
import SearchAndFilter from '../components/SearchAndFilter';

const LobSOPDrawer1 = () => {
    const dispatch = useDispatch();
    useEffect(() => {
      dispatch(fetchsop());
      dispatch(clearsearchFilter())
    },[dispatch]);
    // const sopDrawerData = useSelector((state) => state.projectSlice.devprojectData);
    // console.log("sopDrawerData", sopDrawerData);
    const sopData = useSelector((state) => state.sop.sop);

    const handleDevUpdate = async (item) => {
      dispatch(devProjectSOPDataloader(item));
      dispatch((drawerToggle()));
    };
  
      const tableProps = {
          data: sopData,
          title: {
              title: "SOP Title",
              createdBy: "created by",
              dateCreated: "date created",
              updatedBy:'updated By',
              dateModified:'last Modified',
          },
          dataKeys: [
            "title",
            "createdBy",
            "dateCreated",
            "updatedBy",
            "dateModified",
          ],
          variant:"true",
          // sn: false,
          transformRow: (item) => ({
            title: <div style={{cursor:'pointer'}} onClick={() => handleDevUpdate(item)}>{item.title}</div>,
            createdBy: <div style={{cursor:'pointer'}} onClick={() => handleDevUpdate(item)}>{item.createdBy}</div>,
            dateCreated: <div style={{cursor:'pointer'}} onClick={() => handleDevUpdate(item)}> {item.dateCreated && format(new Date(item.dateCreated), 'yyyy-MM-dd')}</div>,
            updatedBy: <div style={{cursor:'pointer'}} onClick={() => handleDevUpdate(item)}>{item.updatedBy}</div>,
            dateModified: <div style={{cursor:'pointer'}} onClick={() => handleDevUpdate(item)}>{item.dateModified &&format(new Date(item.dateModified), 'yyyy-MM-dd')}</div>,
          }),
        
        };



  return (
    <Box>
    <Flex flexDirection={['column', 'row', 'row']} justifyContent={'space-between'} alignItems={'center'} gap={'20px'} borderBottom={'1px solid #B4B1B1'} pb={'10px'} pt={'30px'} px={'20px'}>
        <Text fontSize={'18px'} fontWeight={'400'} color={'#1E1E1E'}>SOP Lists</Text>
    </Flex>
  <Flex justifyContent={'flex-end'} my={5} px={5}>
    <SearchAndFilter  />
  </Flex>

  <CustomTable {...tableProps} />
</Box>
  )
}

export default LobSOPDrawer1;