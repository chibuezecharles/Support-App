import {
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerContent,
  Flex,
  Input,
  InputGroup,
  InputRightElement,
  useDisclosure,
} from "@chakra-ui/react";
import { LOBSOPsData } from "../data/mock";
import CustomTable from "./CustomTable";
import { BiChevronDown, BiSearch } from "react-icons/bi";
import { AiOutlineClose } from "react-icons/ai";
import ReportDrawer2 from "./layout/ReportDrawer2";

const CustomDrawer = ({ children, openDrawer, closeDrawer }) => {
  return (
    <Drawer
      isOpen={openDrawer}
      placement="right"
      closeOnOverlayClick={false}
      size={['md', 'lg', 'xl']}
      onClose={closeDrawer}
    >
      <DrawerContent px={[2, 4, 6, 10]}>
        <AiOutlineClose
          style={{ position: "relative", top: "1rem" }}
          size={"1.5rem"}
          cursor={"pointer"}
          onClick={closeDrawer}
        />
        <DrawerBody pb={6}>{children}</DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};
const StaffLOBSOPsTable = () => {
  const { isOpen, onClose, onOpen } = useDisclosure(false);

  const tableProps = {
    data: LOBSOPsData,
    title: {
      title: "Title",
      createdBy: "Created By",
      date: "Date",
      status: "Status",
    },
    dataKeys: ["title", "createdBy", "date"],
    variant: true,
    sn: false,
    transformRow: (item) => ({
      title: item.title,
      createdBy: item.createdBy,
      date: item.date,
    }),
  };
  return (
    <Box my={4}>
      <CustomDrawer openDrawer={isOpen} closeDrawer={onClose}>
        <ReportDrawer2 showClose={false} />
      </CustomDrawer>
      <Flex justify={"end"} align={"center"} py={2} bg={"white"}>
        <Flex gap={2}>
          <InputGroup>
            <InputRightElement pointerEvents="none">
              <BiSearch color="gray" />
            </InputRightElement>
            <Input placeholder="Search" />
          </InputGroup>

          <Button
            bg={"#EAAD11"}
            rightIcon={<BiChevronDown />}
            color={"white"}
            minW={"150px"}
            p={4}
            borderRadius={"3px"}
          >
            Filter by Date
          </Button>
        </Flex>
      </Flex>
      <Box>
        <CustomTable {...tableProps} onClickRowAction={onOpen} />
      </Box>
    </Box>
  );
};

export default StaffLOBSOPsTable;
