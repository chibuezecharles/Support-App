import React, { useEffect } from 'react';
import { format } from 'date-fns';
import { Box,Text, Flex,
  // Input, InputGroup,InputRightElement, Select,
  } from '@chakra-ui/react';
// import { BiSearch } from "react-icons/bi";
import { useDispatch, useSelector } from 'react-redux';
import {setloadDrawer,} from '../redux/slices/drawerSlice';
import {devprojectDataloader} from '../redux/slices/projectSlice';
import CustomTable from '../components/CustomTable';
import { Button,} from '@chakra-ui/react';
import {fetchNewProject} from "../redux/slices/newProjectSlice"
import {fetchsop} from "../redux/slices/sopSlice";
import {clearsearchFilter} from "../redux/slices/searchFilterSlice";
import SearchAndFilter from '../components/SearchAndFilter';


const DevProject = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchNewProject ());
    dispatch(fetchsop());
    dispatch(clearsearchFilter());
  }, [dispatch]);

  const newProjects = useSelector((state) => state.newProject.projects);
  const onClick = (item) => {
      dispatch(setloadDrawer({ status: true, type: "devSOPDrawer" }));
      dispatch(devprojectDataloader(item));
      // console.log("onclick",item);
    };
  const handleDevUpdate = (item) => {
      dispatch(setloadDrawer({ status: true, type: 'devProjectDrawer', }));
      dispatch(devprojectDataloader(item));
      // console.log(item);
  };

  const tableProps = {
    data: newProjects,
    title: {
        projectRefCode: "Project Ref Code",
        projectName: "Project Name",
        lob: "LINE OF BUSINESS",
        productManager:'product Manager',
        startDate:' Start Date',
        endDate:'End Date',
        SOP:'SOP',
        Status:'Status',
    },
    dataKeys: [
      "projectRefCode",
      "projectName",
      "lob",
      "productManager",
      "startDate",
      "endDate",
      "SOP",
      "Status",
    ],
    variant:"true",
    sn: true,
    transformRow: (item) => ({
        projectRefCode: <div style={{cursor:'pointer'}} onClick={() => handleDevUpdate(item)}>{item.projectRefCode}</div>,
        projectName: <div style={{cursor:'pointer'}} onClick={() => handleDevUpdate(item)}>{item.projectName}</div>,
        lob: <div style={{cursor:'pointer'}} onClick={() => handleDevUpdate(item)}>{item.lob}</div>,
        productManager: <div style={{cursor:'pointer'}} onClick={() => handleDevUpdate(item)}>{item.productManager}</div>,
        startDate: <div style={{cursor:'pointer'}} onClick={() => handleDevUpdate(item)}>{format(new Date(item.startDate), 'yyyy-MM-dd')}</div>,
        endDate: <div style={{cursor:'pointer'}} onClick={() => handleDevUpdate(item)}>{format(new Date(item.endDate), 'yyyy-MM-dd')}</div>,
        SOP:(
           <Text color={'#5CBF14'} fontSize={'16px'} fontWeight={'500'} lineHeight={'20px'} textDecoration={'underline'} cursor={'pointer'}
           onClick={() => onClick(item)}
           >View SOP</Text>
        ),
        Status: (
          <Button color={'#356EFF'} bg={'#E1E9FF'} borderRadius={'4px'} fontSize={'16px'} lineHeight={'20px'} 
              _hover={{backgroundColor: ''}}
              onClick={() => handleDevUpdate(item)}
          >Active</Button>
      ),
    }),
  
  };

  return (
    <Box bg={'#FFFFFF'} py={'30px'} >
      <Text fontSize={'18px'} fontWeight={'400'} borderBottom={'1px solid #B4B1B1'} py={'20px'} px={'20px'}>Assigned Projects</Text>
      {/* <Flex gap={3} justifyContent={'flex-end'} flexDirection={['column', 'column', 'row']} alignItems={'center'} pt={6} pb={5} px={'20px'}>
        <InputGroup width={'342px'}>
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
        <SearchAndFilter showFilter={true} />
      </Flex>

      <CustomTable {...tableProps} />
    </Box>
  )
}

export default DevProject;