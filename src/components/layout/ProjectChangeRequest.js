import React from 'react';
import EmptyProject from './EmptyProject';
import { useSelector } from 'react-redux';
import ChangeReqstProjectTable from './ChangeReqstProjectTable';

const ProjectChangeRequest = () => {
  // const isEmpty = useSelector((state) => state.emptyState.changRequeststEmpty);
  const changeRequestProjects = useSelector((state) => state.changeRequest.changeRequest) || [];
  const isEmpty = changeRequestProjects.length <= 0;

  return (
    <>
      {isEmpty ? (<EmptyProject changeRequest='true' />) : (<ChangeReqstProjectTable />)}
    </>
  )
}

export default ProjectChangeRequest;