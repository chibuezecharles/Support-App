import React from 'react';
import { Text,  } from '@chakra-ui/react';
import devprofilepics from '../Assets/Images/dev-profile.svg';
import {profileData} from '../data/mock';
import ProfileContent from '../components/layout/ProfileContent';

const DevProfile = () => {
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
    profilepics:devprofilepics ,
    Role:'Developer',
    email:'fredchuckuma@vatebra.com',
    telephone:'0808 625 33445',
    name:'Frederick Chukuma',
    }

  return (
    <>
       <ProfileContent tableProps={tableProps} others={others}  />
    </>
  )
}

export default DevProfile