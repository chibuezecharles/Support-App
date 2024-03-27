import { Flex, Text } from "@chakra-ui/react";
import React from "react";
import StatusBadge from "./StatusBadge";
import { useSelector } from "react-redux";

const ManageClientDetails = () => {
  const clientDetails = useSelector(
    (state) => state.detailsSlice.clientDetails
  );
  return (
    <>
      <StatusBadge title={clientDetails.nameOfClient} />
      <Flex direction={"column"} gap={6} ml={6}>
        <Flex>
          <Text flexBasis={"10rem"} flexGrow={0} flexShrink={0}>
            Date Created
          </Text>
          <Text>
            {new Date(clientDetails.dateCreated).toLocaleDateString("en-US", {
              day: "numeric",
              month: "numeric",
              year: "numeric",
            })}
          </Text>
        </Flex>
        <Flex>
          <Text flexBasis={"10rem"} flexGrow={0} flexShrink={0}>
            Contact Person
          </Text>
          <Text>{clientDetails.contactPerson}</Text>
        </Flex>
        <Flex>
          <Text flexBasis={"10rem"} flexGrow={0} flexShrink={0}>
            Contact Address
          </Text>
          <Text>{clientDetails.contactEmailAddress}</Text>
        </Flex>
        <Flex>
          <Text flexBasis={"10rem"} flexGrow={0} flexShrink={0}>
            Phone Number
          </Text>
          <Text>{clientDetails.contactPhoneNumber}</Text>
        </Flex>
      </Flex>
    </>
  );
};

export default ManageClientDetails;
