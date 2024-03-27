import React, { useEffect } from 'react';
import { format } from 'date-fns';
import {Text} from '@chakra-ui/react';
import CustomTable from '../CustomTable';
import {useDispatch,useSelector} from 'react-redux';
import {fetchProjectHistory} from "../../redux/slices/newProjectSlice";



const ProjectRevisionHistory = () => {
  const dispatch = useDispatch();

  const newProjectDataItem = useSelector((state) => state.projectSlice.newProjectData);
  const projectId= newProjectDataItem.id;
  const projectType= newProjectDataItem.projectType;

  useEffect(() =>{
    console.log("Fetching project history...");
    dispatch(fetchProjectHistory({projectId, projectType}));
  }, [dispatch, projectId, projectType]);

  const projectHistoryData= useSelector((state) => state.newProject.projectHistory);
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

export default ProjectRevisionHistory;