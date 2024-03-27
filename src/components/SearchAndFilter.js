import React from 'react';
import { Flex,InputGroup,
  // InputRightElement,
   Input, Select, Button   } from '@chakra-ui/react';
import { BiSearch } from "react-icons/bi";
import { useDispatch } from 'react-redux';
import {setSearchData, setFilterData} from "../redux/slices/searchFilterSlice";

const SearchAndFilter = ({showFilter = false, devFilter = false}) => {
  const dispatch = useDispatch();
  const [searchvalue, setSearchValue] = React.useState('');
  const [filterValue, setFilterValue] = React.useState('Filter by Ref Code');
  const handleFilter = (e) => {
    setFilterValue(e.target.value);
    dispatch(setFilterData(e.target.value));
  }
  const handleSearch = () => {
    dispatch(setSearchData(searchvalue));
    setSearchValue('');
  };

  return (
    <Flex gap={3} justifyContent={['center', 'center', 'flex-end']} flexDirection={['column', 'column', 'row']} alignItems={'center'} ml={[null, null, '60px']}>
        <InputGroup >
            {/* <InputRightElement pointerEvents="none">
            <BiSearch color="gray"  />
            </InputRightElement> */}
            <Input placeholder="Search" onChange={(e) => setSearchValue(e.target.value)} value={searchvalue} borderRadius={' 5px 0 0 5px'} 
              focusBorderColor='0'
            />
            <Button onClick={handleSearch} borderRadius={'0 5px 5px 0'}>
              <BiSearch color="gray" style={{width: '20px', height: '20px'}} />
            </Button>
        </InputGroup>
        {
          devFilter && 
        <Select bg={'#EAAD11'}  focusBorderColor="0.5px solid #EAAD11" _hover={{border: ""}} border={''}
            _placeholder={{ color: "#8A8C8E" }} color={'#FFFFFF'} value={filterValue} w={['200px', '300px','300px']}
            onChange={handleFilter}
        >
            <option value='dateCreated' selected _hover={{ color: "green", bg: "white" }} style={{backgroundColor: '#EAAD11'}}>Filter by Date</option>
            <option value='updatedBy' _hover={{ color: "green", bg: "white" }} style={{backgroundColor: '#EAAD11'}}
            >Modification</option>
            <option value='title' _hover={{ color: "green", bg: "white" }} style={{backgroundColor: '#EAAD11'}}
            >SOP Title</option>
            {/* <option value='Status' _hover={{ color: "green", bg: "white" }} style={{backgroundColor: '#EAAD11'}}>Filter by Status</option> */}
        </Select>
        }

        {
          showFilter && 
        <Select bg={'#EAAD11'}  focusBorderColor="0.5px solid #EAAD11" _hover={{border: ""}} border={''}
            _placeholder={{ color: "#8A8C8E" }} color={'#FFFFFF'} value={filterValue} w={['200px', '300px','300px']}
            onChange={handleFilter}
        >
            <option value='projectRefCode' selected _hover={{ color: "green", bg: "white" }} style={{backgroundColor: '#EAAD11'}}
            >Filter by Ref Code</option>
            <option value='startDate' _hover={{ color: "green", bg: "white" }} style={{backgroundColor: '#EAAD11'}}>Filter by Date</option>
            {/* <option value='Status' _hover={{ color: "green", bg: "white" }} style={{backgroundColor: '#EAAD11'}}>Filter by Status</option> */}
        </Select>
        }
    </Flex>
  )
}

export default SearchAndFilter;