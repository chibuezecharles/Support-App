import {
  Box,
  Button,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import React, { useEffect,
  //  useState
   } from "react";
import CustomTable from "./CustomTable";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { setloadDrawer } from "../redux/slices/drawerSlice";
import { fetchLOB } from "../redux/slices/lobSlice";
import { fetchUsers } from "../redux/slices/lobSlice";
import { setLobDetails, editLobDetails } from "../redux/slices/detailsSlice";
import { clearsearchFilter } from "../redux/slices/searchFilterSlice";

const AdminLineOfBusinessTable = () => {
  // const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const lobs = useSelector((state) => state?.lobSlice.lobs);

  useEffect(() => {
    dispatch(fetchLOB());
    dispatch(fetchUsers());
    dispatch(clearsearchFilter());
  }, [dispatch]);

  const onClickRowHandler = (item) => {
    dispatch(setLobDetails(item));
    dispatch(
      setloadDrawer({
        status: true,
        type: "LOBDetails",
        title: "Line Of Business Details",
        data: { item },
      })
    );
  };

  const createLOBHandler = (lob) => {
    dispatch(
      setloadDrawer({
        status: true,
        type: "editLOB",
        title: "Edit Line of Business",
      })
    );
    dispatch(editLobDetails(lob));
  };
  const tableProps = {
    data: lobs,
    title: {
      date: "Date",
      lineOfBusiness: "Line Of Business",
      description: "Description",
      lobBusinessManager: "LOB Business Manager",
      lobLocation: "Location",
    },
    dataKeys: [
      "date",
      "lineOfBusiness",
      "description",
      "lobLocation",
      "lobBusinessManager",
    ],
    variant: true,
    sn: true,
    transformRow: (item) => ({
      date: new Date(item.dateCreated).toLocaleDateString("en-US", {
        year: "numeric",
        month: "numeric",
        day: "numeric",
      }),
      lineOfBusiness: (
        <div
          style={{ cursor: "pointer" }}
          onClick={() => onClickRowHandler(item)}
        >
          {item.name}
        </div>
      ),
      description: (
        <div
          style={{ cursor: "pointer" }}
          onClick={() => onClickRowHandler(item)}
        >
          {item.description}
        </div>
      ),
      lobLocation: (
        <div
          style={{ cursor: "pointer" }}
          onClick={() => onClickRowHandler(item)}
        >
          {item.lobLocation}
        </div>
      ),
      lobBusinessManager: (
        <div
          style={{ cursor: "pointer" }}
          onClick={() => onClickRowHandler(item)}
        >
          {item.lobBusinessManager}
        </div>
      ),

      action: (
        <Menu>
          <MenuButton as={Button} bg={"transparent"}>
            <BsThreeDotsVertical />
          </MenuButton>
          <MenuList minW={"10rem"}>
            <MenuItem onClick={() => createLOBHandler(item)}>Edit</MenuItem>
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

export default AdminLineOfBusinessTable;
