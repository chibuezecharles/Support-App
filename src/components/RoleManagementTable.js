import { Box } from "@chakra-ui/react";
import React, { useEffect } from "react";
import CustomTable from "./CustomTable";
import { useDispatch, useSelector } from "react-redux";
import { setloadDrawer } from "../redux/slices/drawerSlice";
import { fetchRoles, setCurrentRole } from "../redux/slices/rolesSlice";

const RoleManagementTable = () => {
  const dispatch = useDispatch();
  const roles = useSelector((state) => state.roles.data);

  useEffect(() => {
    dispatch(fetchRoles());
  }, [dispatch]);

  const onClickPrivileges = (id) => {
    dispatch(
      setloadDrawer({
        status: true,
        type: "rolePrivileges",
        title: "Role Privileges",
      })
    );
    dispatch(setCurrentRole(id));
  };
  const onClickDetails = (roleName) => {
    dispatch(
      setloadDrawer({
        status: true,
        type: "roleDetails",
        title: roleName,
      })
    );
  };

  const tableProps = {
    data: roles,
    title: {
      name: "Role Name",
      roleDescription: "Role Description",
      department: "Department",
      dateCreated: "Date Created",
      privileges: "Privileges",
    },
    dataKeys: [
      "name",
      "roleDescription",
      "department",
      "dateCreated",
      "privileges",
    ],
    variant: true,
    sn: true,
    transformRow: (item) => ({
      roleName: (
        <span
          onClick={() => onClickDetails(item?.name)}
          style={{ cursor: "pointer" }}
        >
          {item?.name}
        </span>
      ),
      roleDescription: item?.roleDescription,
      department: item?.department,
      dateCreated: new Date(item?.dateCreated).toLocaleDateString(),
      privileges: (
        <span
          onClick={() => onClickPrivileges(item?.id)}
          style={{ cursor: "pointer" }}
        >
          Assign Privileges
        </span>
      ),
    }),
  };
  return (
    <Box my={4}>
      <CustomTable {...tableProps} />
    </Box>
  );
};

export default RoleManagementTable;
