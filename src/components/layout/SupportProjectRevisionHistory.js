import React, {useEffect} from 'react';
import { format } from 'date-fns';
import {Text,} from '@chakra-ui/react';
import CustomTable from '../CustomTable';
import { useDispatch, useSelector } from 'react-redux';
import {fetchsupportProjectHistory} from "../../redux/slices/supportRequestSlice";

const SupportProjectRevisionHistory = () => {
  const dispatch = useDispatch();

  const supportProjectDataItem = useSelector((state) => state.projectSlice.supportProjectData);
  console.log("newProjectDataItem for support: ", supportProjectDataItem);
  const projectId= supportProjectDataItem.id;
  const projectType= supportProjectDataItem.projectType;

  useEffect(() =>{
    console.log("Fetching project history...");
    dispatch(fetchsupportProjectHistory({projectId}));
  }, [dispatch, projectId, projectType]);

  const projectHistoryData= useSelector((state) => state.supportRequest.supportprojectHistory);
  console.log("projectHistoryData for support 2: ", projectHistoryData);

  const tableProps = {
    data: projectHistoryData ,
    title: {
      dateCreated: "date",
      createdByName: "name",
      description: "description of change",
    },
    dataKeys: [
      "dateCreated",
      "createdByName",
      "description",
    ],
    transformRow: (item) => ({
      dateCreated: format(new Date(item.dateCreated), 'yyyy-MM-dd'),
      createdByName: item.createdByName,
      description:item.description,
    }),
};

  return (
    <>
        <Text color={'#121212'} fontSize={'18px'} lineHeight={'20px'} mt={8} mb={5}>Revision History</Text>
        <CustomTable {...tableProps} />
    </>
  )
}

export default SupportProjectRevisionHistory;