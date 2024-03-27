import {
  // Button,
  Checkbox,
  CheckboxGroup,
  Divider,
  Flex,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import httpRequest from "../utils/httpRequest";
import { BASE_URL } from "../config/settings";

const RolePrivilegesForm = () => {
  const currentRoleId = useSelector((state) => state.roles.currentRole);
  const [permissions, setPermissions] = useState([]);
  const [rolePermissions, setRolePermissions] = useState([]);
  const [isLoading, setisLoading] = useState(false);

  const rolePermissionIds = rolePermissions?.map(
    (permission) => permission.permissionId
  );

  useEffect(() => {
    async function fetchRolePermssions() {
      const response = await httpRequest(
        `${BASE_URL}/rolepermission/get-role-permissions/${currentRoleId}?roleid=${currentRoleId}`
      );
      setRolePermissions(response?.data?.[0]?.permissions || []);
    }
    async function fetchAllPermissions() {
      const response = await httpRequest(
        `${BASE_URL}/permission/get-all-permissions`
      );
      setPermissions(response?.data);
    }
    fetchRolePermssions();
    fetchAllPermissions();
  }, [currentRoleId, isLoading]);

  async function handleChangeApi(permissionId) {
    setisLoading(true);
    try {
      if (rolePermissionIds?.includes(permissionId)) {
        await httpRequest(
          `${BASE_URL}/rolepermission/unassign-permission`,
          "post",
          {
            roleId: currentRoleId,
            permissionIds: [permissionId],
          }
        );
      } else {
        await httpRequest(
          `${BASE_URL}/rolepermission/assign-permission`,
          "post",
          {
            roleId: currentRoleId,
            permissionIds: [permissionId],
          }
        );
      }
    } catch (error) {
      console.log(error);
    } finally {
      setisLoading(false);
    }
    // rolePermissionIds?.includes(item.id)
    //   ? setRolePermissions(
    //       rolePermissions?.filter((permission) => {
    //         return permission.permissionId !== item.id;
    //       })
    //     )
    //   : setRolePermissions([
    //       ...rolePermissions,
    //       { permissionId: item.id, permissionName: item.name },
    //     ]);
  }

  // async function handleCheckChange(item) {
  //   rolePermissionIds?.includes(item.id)
  //     ? setRolePermissions(
  //         rolePermissions?.filter((permission) => {
  //           return permission.permissionId !== item.id;
  //         })
  //       )
  //     : setRolePermissions([
  //         ...rolePermissions,
  //         { permissionId: item.id, permissionName: item.name },
  //       ]);
  // }

  // async function handleSave() {
  //   const formData = {
  //     roleId: currentRoleId,
  //     permissionIds: rolePermissionIds,
  //   };

  //   const response = await httpRequest(
  //     `${BASE_URL}/rolepermission/assign-permission`,
  //     "post",
  //     formData
  //   );

  //   console.log({ response });
  // }

  function addSpaceBeforeCapital(word) {
    // Use a regular expression to find capital letters and insert a space before them
    return word.replace(/([A-Z])/g, " $1").trim();
  }

  return (
    <>
      {/* <Flex gap={4}>
        <Button
          variant={"ghost"}
          onClick={() =>
            setRolePermissions(
              permissions?.map((permission) => ({
                permissionId: permission.id,
                permissionName: permission.name,
              }))
            )
          }
        >
          Check All
        </Button>
        <Button variant={"ghost"} onClick={() => setRolePermissions([])}>
          Uncheck All
        </Button>
      </Flex> */}
      <Divider mt={0.5} mb={4} borderColor={"gray"} />
      <Flex
        direction="column"
        gap={4}
        sx={{
          "& > label.chakra-checkbox": {
            py: 4,
            gap: 4,
            ml: 4,
            borderBottom: ".5px solid #8080804d",
            iconSize: "2rem",
          },
        }}
      >
        <CheckboxGroup isDisabled={isLoading} size={"lg"} colorScheme="green">
          {permissions.map((item) => (
            <Checkbox
              isChecked={rolePermissionIds?.includes(item.id)}
              // onChange={() => handleCheckChange(item)}
              onChange={() => handleChangeApi(item.id)}
              key={item.id}
            >
              {addSpaceBeforeCapital(item.name)}
            </Checkbox>
          ))}
        </CheckboxGroup>
      </Flex>
      {/* {permissions.length > 0 ? (
        <Flex justify={"end"} mt={20}>
          <Button
            alignSelf={"end"}
            marginTop={"auto"}
            borderRadius={"3px"}
            bg={"brand.primary"}
            color="white"
            px={10}
            onClick={handleSave}
          >
            Save
          </Button>
        </Flex>
      ) : null} */}
    </>
  );
};

export default RolePrivilegesForm;
