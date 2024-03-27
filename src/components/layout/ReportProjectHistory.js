import React from "react";
import { Box, Flex, Text } from "@chakra-ui/react";
// import CustomAvatar from '../CustomAvatar';
// import { avatars } from '../../data/mock';
import { useSelector } from "react-redux";
import CustomAvatar from "../CustomAvatar";
import { format } from "date-fns";

const ReportProjectHistory = () => {
  const reportsData = useSelector((state) => state.reportActions.reportData);

  const historyData = [
    { title: "L.O.B", description: reportsData.lob },
    { title: "Business Manager", description: reportsData?.businessManager },
    { title: "Product Manager", description: reportsData?.productManager },
    { title: "Project Type", description: reportsData?.projectType },
    { title: "Project Type Change", description: "Change Request" },
    {
      title: "Date Created",
      description: format(new Date(reportsData?.dateCreated), "dd-MM-yyyy"),
    },
    {
      title: "Date Modified",
      description: format(new Date(reportsData?.dateModified), "dd-MM-yyyy"),
    },
  ];

  const avatarProps = {
    avatars: reportsData.developers,
    contributor: "Assigned Developers",
  };

  return (
    <Box h={["190vh", "165vh", "130vh", "130vh", "130vh"]}>
      <Box mt={8}>
        {historyData?.map((data, index) => (
          <Flex
            color={"#515151"}
            fontSize={"18px"}
            justifyContent={"flex-start"}
            alignItems={"center"}
            mb={4}
            key={index}
            gap={[6, 3, 3]}
          >
            <Text width={"40%"}>{data.title}</Text>
            <Text fontWeight={"500"} width={"60%"}>
              {data.description}
            </Text>
          </Flex>
        ))}
      </Box>

      <CustomAvatar {...avatarProps} />
    </Box>
  );
};

export default ReportProjectHistory;
