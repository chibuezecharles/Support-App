import React from 'react'
import DevSOPDrawer from './DevSOPDrawer';
import DevSOPDrawer2 from './DevSOPDrawer2';
import { useSelector } from 'react-redux';

const DevSOPDrawerContainer = () => {
    const toggleDrawer = useSelector((state) => state.drawer.toggleDrawer);

  return (
    <>
    {
         !toggleDrawer ? (
         <DevSOPDrawer />
         ) : (
         <DevSOPDrawer2 />
         )
    }
    
    
    </>
  )
}

export default DevSOPDrawerContainer;