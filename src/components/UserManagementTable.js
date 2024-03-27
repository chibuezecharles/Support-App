import {
  Badge,
  Box,
  Button,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import CustomTable from "./CustomTable";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { addCurrentUser, fetchUsers } from "../redux/slices/usersSlice";
import { setloadDrawer } from "../redux/slices/drawerSlice";
import httpRequest from "../utils/httpRequest";
import { BASE_URL } from "../config/settings";
import {clearsearchFilter} from "../redux/slices/searchFilterSlice";

const UserManagementTable = () => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const users = useSelector((state) => state.users.data);

  useEffect(() => {
    dispatch(fetchUsers());
    dispatch(clearsearchFilter())
  }, [dispatch, isLoading]);

  const handleEdit = (user) => {
    dispatch(
      addCurrentUser({
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.userRoles,
        email: user.email,
      })
    );
    dispatch(
      setloadDrawer({
        status: true,
        type: "createNewUser",
        title: "Edit User",
      })
    );
  };

  const handleUpdate = async (user) => {
    setIsLoading(true);
    try {
      if (user.isActive) {
        await httpRequest(
          `${BASE_URL}/users/deactivate-user?useremail=${user.email}`,
          "post"
        );
      } else {
        await httpRequest(
          `${BASE_URL}/users/activate-user?useremail=${user.email}`,
          "post"
        );
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
  const tableProps = {
    data: users,
    title: {
      name: "Name",
      role: "Role",
      email: "Email",
      status: "Status",
      action: "Action",
    },
    dataKeys: ["name", "role", "email", "status"],
    variant: true,
    sn: true,
    transformRow: (item) => ({
      name: `${item.lastName} ${item.firstName} `,
      role: item.userRoles?.map((role) => {
        return role.roleName;
      }),
      email: item.email,
      status: (
        <Badge
          bg={item.isActive ? "#E1E9FF" : "#FCF6DF"}
          color={item.isActive ? "#356EFF" : "#E9B500"}
          _hover={{ backgroundColor: "" }}
        >
          {item.isActive ? "Active" : "Deactivated"}
        </Badge>
      ),
      action: (
        <Menu>
          <MenuButton as={Button}>
            <BsThreeDotsVertical />
          </MenuButton>
          <MenuList minW={"10rem"}>
            <MenuItem onClick={() => handleEdit(item)}>Edit</MenuItem>
            <MenuItem onClick={() => handleUpdate(item)}>
              {item.isActive ? "Deactivate" : "Activate"}
            </MenuItem>
          </MenuList>
        </Menu>
      ),
    }),
  };
  return (
    <Box my={4}>
      <CustomTable {...tableProps} />
    </Box>
  );
};

export default UserManagementTable;
