import React from 'react';
import EmptyProject from './EmptyProject';
import { useSelector } from 'react-redux';
import SupportProjectTable from './SupportProjectTable';

const ProjectSupport = () => {
  // const isEmpty = useSelector((state) => state.emptyState.supportEmpty);
  const supportProjects = useSelector((state) => state.supportRequest.supportRequest) || [];
  const isEmpty= supportProjects.length <= 0;

  return (
    <>
      {isEmpty ? (<EmptyProject support='true' />) : (<SupportProjectTable />)}
    </>
  )
}

export default ProjectSupport;