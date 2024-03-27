import React from 'react';
import EmptyProject from './EmptyProject';
import CreateProjectTable from './CreateProjectTable';
import { useSelector } from 'react-redux';

const ProjectCreate = () => {
  const newProjects = useSelector((state) => state.newProject.projects)||[];
  const isEmpty = newProjects.length <= 0;

  return (
    <>
      {isEmpty ? (<EmptyProject createProject='true' />) : (<CreateProjectTable />)}
    </>
  )
}

export default ProjectCreate;