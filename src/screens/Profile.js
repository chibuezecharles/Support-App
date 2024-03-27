import React from "react";
import { Text } from "@chakra-ui/react";

import { profileData } from "../data/mock";
import ProfileContent from "../components/layout/ProfileContent";

const Profile = () => {
  const tableProps = {
    data: profileData,
    title: {
      DateTime: "Date and Time",
      Activity: "Activity",
      addCourse: "",
    },
    dataKeys: ["DateTime", "Activity", "addCourse"],
    transformRow: (item) => ({
      DateTime: item.DateTime,
      Activity: item.Activity,
      addCourse: <Text fontWeight={"bold"} fontSize={"18px"}></Text>,
    }),
  };

  return (
    <>
      <ProfileContent tableProps={tableProps} />
    </>
  );
};

export default Profile;
