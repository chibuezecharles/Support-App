import {
  Box,
  Button,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import React, { useEffect } from "react";
import CustomTable from "./CustomTable";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { setloadDrawer } from "../redux/slices/drawerSlice";
import { fetchClient } from "../redux/slices/clientSlice";
import {
  editClientDetails,
  setClientDetails,
} from "../redux/slices/detailsSlice";

const ManageClientTable = () => {
  const dispatch = useDispatch();
  const clients = useSelector((state) => state?.clientSlice?.clients);
  // console.log(clients);

  useEffect(() => {
    dispatch(fetchClient());
  }, [dispatch]);

  const onClickRowHandler = (item) => {
    dispatch(setClientDetails(item));
    dispatch(
      setloadDrawer({
        status: true,
        type: "manageClient",
        title: "Manage Client",
      })
    );
  };
  const createClientHandler = async (item) => {
    dispatch(
      setloadDrawer({
        status: true,
        type: "editClient",
        title: "Edit Client",
      })
    );
    await dispatch(editClientDetails(item));
  };

  const tableProps = {
    data: clients,
    title: {
      dateCreated: "Date",
      nameOfClient: "Client Name",
      contactPerson: "Contact Person",
      contactEmailAddress: "Contact Mail",
      contactPhoneNumber: "Contact Phone Number",
      // status: "Status",
    },
    dataKeys: [
      "dateCreated",
      "nameOfClient",
      "contactPerson",
      "contactEmailAddress",
      "contactPhoneNumber",
      // "status",
      "action",
    ],
    variant: true,
    sn: true,
    transformRow: (item) => ({
      date: new Date(item.dateCreated).toLocaleDateString("en-US", {
        year: "numeric",
        month: "numeric",
        day: "numeric",
      }),
      nameOfClient: (
        <div
          style={{ cursor: "pointer" }}
          onClick={() => onClickRowHandler(item)}
        >
          {item.nameOfClient}
        </div>
      ),
      contactPerson: (
        <div
          style={{ cursor: "pointer" }}
          onClick={() => onClickRowHandler(item)}
        >
          {item.contactPerson}
        </div>
      ),
      emailAddress: (
        <div
          style={{ cursor: "pointer" }}
          onClick={() => onClickRowHandler(item)}
        >
          {item.contactEmailAddress}
        </div>
      ),
      phoneNumber: (
        <div
          style={{ cursor: "pointer" }}
          onClick={() => onClickRowHandler(item)}
        >
          {item.contactPhoneNumber}
        </div>
      ),
      // status: (
      //   <div
      //     style={{ cursor: "pointer" }}
      //     onClick={() => onClickRowHandler(item)}
      //   >
      //     {item.status}
      //   </div>
      // ),
      action: (
        <Menu>
          <MenuButton as={Button} bg={"transparent"}>
            <BsThreeDotsVertical />
          </MenuButton>
          <MenuList minW={"10rem"}>
            <MenuItem onClick={() => createClientHandler(item)}>Edit</MenuItem>
            {/* <MenuItem>Activate</MenuItem> */}
          </MenuList>
        </Menu>
      ),
    }),
  };

  return (
    <Box my={4}>
      <CustomTable {...tableProps} sn={false} />
    </Box>
  );
};

export default ManageClientTable;
