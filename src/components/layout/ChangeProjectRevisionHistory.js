import React,{useEffect} from 'react';
import { format } from 'date-fns';
import {Text,} from '@chakra-ui/react';
import CustomTable from '../CustomTable';
import { useDispatch, useSelector } from 'react-redux';
import {fetchChangeProjectHistory} from "../../redux/slices/changeRequestSlice";

const ChangeProjectRevisionHistory = () => {
  const dispatch = useDispatch();

  const changerequestDataItem = useSelector((state) => state.projectSlice.changeRequestData);
  console.log("newProjectDataItem for peoject history: ", changerequestDataItem);
  const projectId= changerequestDataItem.id;
  const projectType= changerequestDataItem.projectType;

  useEffect(() =>{
    console.log("Fetching project history...");
    dispatch(fetchChangeProjectHistory({projectId}));
  }, [dispatch, projectId, projectType]);

  const projectHistoryData= useSelector((state) => state.changeRequest.changeprojectHistory);
  console.log("projectHistoryData: ", projectHistoryData);

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
      dateCreated:format(new Date(item.dateCreated), 'yyyy-MM-dd'),
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

export default ChangeProjectRevisionHistory;