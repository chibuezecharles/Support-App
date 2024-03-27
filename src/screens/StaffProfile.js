import React from 'react';
import { Text,  } from '@chakra-ui/react';
import staffprofilepics from '../Assets/Images/staff-profile.svg';
import {profileData} from '../data/mock';
import ProfileContent from '../components/layout/ProfileContent';


const StaffProfile = () => {
    const tableProps = {
        data: profileData,
        title: {
            DateTime: "Date and Time",
            Activity: "Activity",
            addCourse: "",
        },
        dataKeys: [
          "DateTime",
          "Activity",
          "addCourse",
        ],
        transformRow: (item) => ({
            DateTime: item.DateTime,
            Activity: item.Activity,
          addCourse: (
            <Text fontWeight={'bold'} fontSize={'18px'}></Text>
          ),
        }),
      };

    const others ={
    profilepics:staffprofilepics ,
    Role:'Business Manager',
    email:'gbemilekedaniel@vatebra.com',
    telephone:'0808 625 33445',
    name:'Esther Bankole',
    }

  return (
    <>
       <ProfileContent tableProps={tableProps} others={others}  />
    </>
  )
}

export default StaffProfile;