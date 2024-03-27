import React from 'react';
import { useSelector } from 'react-redux';
// import LobSOPDrawer1 from './LobSOPDrawer1';
import LobSOPDrawer2 from './LobSOPDrawer2';
import StaffLOBDetails from '../components/StaffLOBDetails';

const LobSOPContainer = () => {
    const toggleDrawer = useSelector((state) => state.drawer.toggleDrawer);
  return (
    <>
    {
         !toggleDrawer ? (
             
            // <LobSOPDrawer1 />
            <StaffLOBDetails />
         ): (
            <LobSOPDrawer2 />
         )
    }
    </>
  )
}

export default LobSOPContainer;