import React, {  useEffect } from 'react';
import { format } from 'date-fns';
import { useSelector,useDispatch, } from 'react-redux';
import { Box,Flex,Text, Button,
  // Input, InputGroup,InputRightElement, Select,
  Menu, MenuButton, MenuItem, MenuList  } from '@chakra-ui/react';
import { PiPlusBold } from "react-icons/pi";
// import { BiSearch } from "react-icons/bi";
import { setloadDrawer, } from "../../redux/slices/drawerSlice";
import {devProjectSOPDataloader, editDevProjectSOPDataloader} from '../../redux/slices/projectSlice';
import {BsThreeDotsVertical} from 'react-icons/bs';
import CustomTable from '../CustomTable';
import { drawerToggle} from '../../redux/slices/drawerSlice';
import {fetchsop} from "../../redux/slices/sopSlice";
import httpRequest from "../../utils/httpRequest";
import { BASE_URL } from "../../config/settings";
import {clearsearchFilter} from "../../redux/slices/searchFilterSlice";
import SearchAndFilter from '../../components/SearchAndFilter';
import {setloadTost} from "../../redux/slices/toastSlice";

const DevSOPDrawer = () => {
    const dispatch = useDispatch();
    useEffect(() => {
      dispatch(fetchsop());
      dispatch(clearsearchFilter())
    },[dispatch]);
    const sopDrawerData = useSelector((state) => state.projectSlice.devprojectData);
    // console.log("sopDrawerData", sopDrawerData);
    const sopData = useSelector((state) => state.sop.sop);

    const handleNewSOP = () => {
        dispatch(setloadDrawer({ status: true, type: "addNewSOP" }));
      };

      const onClick = async (item) => {
        dispatch(setloadDrawer({ status: true, type: "editSOP" }));
        dispatch(editDevProjectSOPDataloader(item));
        // console.log("edit sop item", item);
      };
    const handleDevUpdate = async (item) => {
      dispatch(devProjectSOPDataloader(item));
      dispatch((drawerToggle()));
    };

    const handleDeactivate =  async (item) => {
      // console.log("handleDeactivate", item);
      try {
          if (item.isActive) {
              await httpRequest(
                  `${BASE_URL}/sop/deactivate-sop?id=${item.id}`,
                  "post",
              );
              await dispatch(fetchsop());
              dispatch(setloadTost({ title: 'SOP Deactivated', description: `${item.title} has been deactivated successfully`, status: 'success', duration: 5000, isClosable: true, position: 'top' }));
          } else {
              await httpRequest(
                  `${BASE_URL}/sop/activate-sop?id=${item.id}`,
                  "post",
              );
              dispatch(fetchsop());
              dispatch(setloadTost({ title: 'SOP activated', description: `${item.title} has been activated successfully`, status: 'success', duration: 5000, isClosable: true, position: 'top' }));
          }
          
      } catch (error) {
          console.log(error);
      }
  }

    const tableProps = {
        data: sopData,
        title: {
            title: "SOP Title",
            createdBy: "created by",
            dateCreated: "date created",
            updatedBy:'updated By',
            dateModified:'last Modified',
            Action:'Action',
        },
        dataKeys: [
          "title",
          "createdBy",
          "dateCreated",
          "updatedBy",
          "dateModified",
          "Action",
        ],
        variant:"true",
        // sn: false,
        transformRow: (item) => ({
          title: <div style={{cursor:'pointer'}} onClick={() => handleDevUpdate(item)}>{item.title}</div>,
          createdBy: <div style={{cursor:'pointer'}} onClick={() => handleDevUpdate(item)}>{item.createdBy}</div>,
          dateCreated: <div style={{cursor:'pointer'}} onClick={() => handleDevUpdate(item)}> {item.dateCreated && format(new Date(item.dateCreated), 'yyyy-MM-dd')}</div>,
          updatedBy: <div style={{cursor:'pointer'}} onClick={() => handleDevUpdate(item)}>{item.updatedBy}</div>,
          dateModified: <div style={{cursor:'pointer'}} onClick={() => handleDevUpdate(item)}>{item.dateModified &&format(new Date(item.dateModified), 'yyyy-MM-dd')}</div>,
          Action:(
               <Menu>
                <MenuButton>
                    <BsThreeDotsVertical />
                </MenuButton>
                    
                <MenuList >
                    <MenuItem onClick={() => onClick(item)}>Edit</MenuItem>
                    <MenuItem onClick={() => handleDeactivate(item)}>{item.isActive ? "Deactivate" : "Activate"}</MenuItem>
                </MenuList>
               </Menu>
            )
        }),
      
      };


  return (
    <Box>
        <Text color={'#121212'} fontSize={'24px'} fontWeight={'500'} letterSpacing={'-0.96px'} lineHeight={'36px'}>Standard Operating Procedure</Text>
        <Text color={'#515151'} fontSize={'16px'} lineHeight={'25.6px'}>{sopDrawerData.projectName}  &gt;&gt; Project Report</Text>
        <Flex flexDirection={['column', 'row', 'row']} justifyContent={'space-between'} alignItems={'center'} gap={'20px'} borderBottom={'1px solid #B4B1B1'} pb={'10px'} pt={'30px'} px={'20px'}>
            <Text fontSize={'18px'} fontWeight={'400'} color={'#1E1E1E'}>SOP Lists</Text>
            <Button borderRadius={"3px"} bg={"brand.primary"} leftIcon={<PiPlusBold />} color="white"
                    onClick={handleNewSOP} px={9}  _hover={{backgroundColor: ''}} size={'lg'} 
                >
                Add New SOP
                </Button>
        </Flex>
        {/* <Flex gap={3} justifyContent={'flex-end'} flexDirection={['column', 'column', 'row']} alignItems={'center'} pt={6} pb={5} px={'20px'}>
        <InputGroup width={'229px'}>
            <InputRightElement pointerEvents="none" >
            <BiSearch color="gray" />
            </InputRightElement>
            <Input placeholder="Search" borderRadius={'4px'}  />
        </InputGroup>

        <Select bg={'#EAAD11'}  focusBorderColor="0.5px solid #EAAD11" _hover={{border: ""}} border={''}
            _placeholder={{ color: "#8A8C8E" }} color={'#FFFFFF'} width={'198px'} borderRadius={'4px'}
        >
            <option value='Filter by Ref Code' selected _hover={{ color: "green", bg: "white" }}
            >Filter by Ref Code</option>
            <option value='Filter by Date' _hover={{ color: "green", bg: "white" }}>Filter by Date</option>
            <option value='Filter by Status' _hover={{ color: "green", bg: "white" }}>Filter by Status</option>
        </Select>
      </Flex> */}
      <Flex justifyContent={'flex-end'} my={5} px={5}>
        <SearchAndFilter devFilter={true} />
      </Flex>

      <CustomTable {...tableProps} />
    </Box>
  )
}

export default DevSOPDrawer;