import {
  Box, Divider, Flex,  Text,
  // Input,InputGroup,InputRightElement,
} from "@chakra-ui/react";
// import { BiSearch } from "react-icons/bi";
import StaffLineOfBusinessTable from "../components/StaffLineOfBusinessTable";
import SearchAndFilter from "../components/SearchAndFilter";
import {clearsearchFilter} from "../redux/slices/searchFilterSlice";
import { useDispatch } from "react-redux";
import { useEffect } from "react";

const StaffLineOfBusiness = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(clearsearchFilter())
  }, [dispatch]);

  return (
    <Box bg={"white"} py={4}>
      <Flex justify={"space-between"} align={"center"} px={4}>
        <Text>Line Of Business</Text>{" "}
        {/* <InputGroup width={"auto"}>
          <InputRightElement pointerEvents="none">
            <BiSearch color="gray" />
          </InputRightElement>
          <Input placeholder="Search" />
        </InputGroup> */}
        <SearchAndFilter />
      </Flex>
      <Divider my={2} />
      <StaffLineOfBusinessTable />
    </Box>
  );
};

export default StaffLineOfBusiness;
