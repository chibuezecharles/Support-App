import React from "react";
import { format } from "date-fns";
import { useDispatch, useSelector } from "react-redux";
import { setloadDrawer } from "../../redux/slices/drawerSlice";
import {
  changeRequestEditDataloader,
  changeRequestDataloader,
} from "../../redux/slices/projectSlice";
import CustomTable from "../CustomTable";
import { Button, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import { BsThreeDotsVertical } from "react-icons/bs";
import httpRequest from "../../utils/httpRequest";
import { BASE_URL } from "../../config/settings";
import { fetchChangeRequest } from "../../redux/slices/changeRequestSlice";
import {setloadTost} from "../../redux/slices/toastSlice";

const ChangeReqstProjectTable = () => {
  const dispatch = useDispatch();
  // const [isLoading, setIsLoading] = useState(false);
  const changeRequestData = useSelector(
    (state) => state.changeRequest.changeRequest
  );

  const onClick = (item) => {
    dispatch(setloadDrawer({ status: true, type: "editChangeRequest" }));
    dispatch(changeRequestEditDataloader(item));
  };
  const handleDevUpdate = (item) => {
    dispatch(setloadDrawer({ status: true, type: "changeProjectsDrawer" }));
    dispatch(changeRequestDataloader(item));
  };

  const handleDeactivate = async (item) => {
    // console.log("handleDeactivate", item);

    // setIsLoading(true);
    try {
      if (item.isActive) {
        await httpRequest(`${BASE_URL}/project/deactivate-project`, "post", {
          projectType: item.projectType,
          id: item.id,
        });
        await dispatch(fetchChangeRequest());
        dispatch(setloadTost({ title: 'Project Deactivated', description: `${item.projectName} has been deactivated successfully`, status: 'success', duration: 5000, isClosable: true, position: 'top' }));
      } else {
        await httpRequest(`${BASE_URL}/project/activate-project`, "post", {
          projectType: item.projectType,
          id: item.id,
        });
        await dispatch(fetchChangeRequest());
        dispatch(setloadTost({ title: 'Project Activated', description: `${item.projectName} has been activated successfully`, status: 'success', duration: 5000, isClosable: true, position: 'top' }));
      }
    } catch (error) {
      console.log(error);
    } finally {
      // setIsLoading(false);
    }
  };

  const handleDelete = async (item) => {
    try {
      await httpRequest(`${BASE_URL}/project/delete-project`, "post", {
        projectType: item.projectType,
        id: item.id,
      });
      await dispatch(fetchChangeRequest());
      dispatch(setloadTost({ title: 'Project Deleted', description: `${item.projectName} has been deleted successfully`, status: 'success', duration: 5000, isClosable: true, position: 'top' }));
    } catch (error) {}
  };

  const tableProps = {
    data: changeRequestData,
    title: {
      projectRefCode: "Project Ref Code",
      projectName: "Project Name",
      startDate: " Start Date",
      endDate: "End Date",
      Status: "Status",
      Action: "Action",
    },
    dataKeys: [
      "projectRefCode",
      "projectName",
      "startDate",
      "endDate",
      "Status",
      "Action",
    ],
    variant: "true",
    sn: true,
    transformRow: (item) => ({
      projectRefCode: (
        <div
          style={{ cursor: "pointer" }}
          onClick={() => handleDevUpdate(item)}
        >
          {item.projectRefCode}
        </div>
      ),
      projectName: (
        <div
          style={{ cursor: "pointer" }}
          onClick={() => handleDevUpdate(item)}
        >
          {item.projectName}
        </div>
      ),
      startDate: (
        <div
          style={{ cursor: "pointer" }}
          onClick={() => handleDevUpdate(item)}
        >
          {item?.startDate
            ? format(new Date(item.startDate), "yyyy-MM-dd")
            : "N/A"}
        </div>
      ),
      endDate: (
        <div
          style={{ cursor: "pointer" }}
          onClick={() => handleDevUpdate(item)}
        >
          {item?.endDate ? format(new Date(item.endDate), "yyyy-MM-dd") : "N/A"}
        </div>
      ),
      Status: (
        <Button
          color={"#356EFF"}
          bg={"#E1E9FF"}
          borderRadius={"4px"}
          fontSize={"16px"}
          lineHeight={"20px"}
          _hover={{ backgroundColor: "" }}
          onClick={() => handleDevUpdate(item)}
        >
          {item.isActive ? "Active " : "Deactivated"}
        </Button>
      ),
      Action: (
        <Menu>
          <MenuButton>
            <BsThreeDotsVertical />
          </MenuButton>

          <MenuList>
            <MenuItem onClick={() => onClick(item)}>Edit</MenuItem>
            <MenuItem onClick={() => handleDeactivate(item)}>
              {item.isActive ? "Deactivate" : "Activate"}
            </MenuItem>
            <MenuItem onClick={() => handleDelete(item)}>Delete</MenuItem>
          </MenuList>
        </Menu>
      ),
    }),
  };

  return (
    <>
      <CustomTable {...tableProps} />
    </>
  );
};

export default ChangeReqstProjectTable;