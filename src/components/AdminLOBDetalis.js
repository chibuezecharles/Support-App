import {
  Flex,
  // Table,TableContainer,Tbody,Td,Th,Thead,Tr,
  Text,
} from "@chakra-ui/react";
import React from "react";
import StatusBadge from "./StatusBadge";
import { useSelector } from "react-redux";

const LOBDetails = () => {
  const lobDetails = useSelector((state) => state.detailsSlice.lobDetails);
  console.log(lobDetails);
  return (
    <>
      <StatusBadge title={lobDetails.name} />
      <Flex direction={"column"} gap={6} ml={6}>
        <Flex>
          <Text flexBasis={"10rem"} flexGrow={0} flexShrink={0}>
            Created By
          </Text>
          <Text>{lobDetails.creator}</Text>
        </Flex>
        <Flex>
          <Text flexBasis={"10rem"} flexGrow={0} flexShrink={0}>
            Date Created
          </Text>
          <Text>
            {new Date(lobDetails.dateCreated).toLocaleDateString("en-US", {
              day: "numeric",
              month: "numeric",
              year: "numeric",
            })}
          </Text>
        </Flex>
        <Flex>
          <Text flexBasis={"10rem"} flexGrow={0} flexShrink={0}>
            L.O.B Location
          </Text>
          <Text>{lobDetails.lobLocation}</Text>
        </Flex>
        <Flex>
          <Text flexBasis={"10rem"} flexGrow={0} flexShrink={0}>
            Description
          </Text>
          <Text>{lobDetails.description}</Text>
        </Flex>
      </Flex>
      {/* <TableContainer my={6}>
        <Table variant="simple" color={"#515151"}>
          <Thead
            sx={{
              "& th": { fontWeight: "700", fontSize: "1rem" },
            }}
          >
            <Tr>
              <Th>PROJECTS</Th>
              <Th>REFERENCE CODE</Th>
              <Th>PROJECT TYPE</Th>
            </Tr>
          </Thead>
          <Tbody
            sx={{
              "& td:nth-child(1)": { fontWeight: "bold" },
            }}
          >
            <Tr>
              <Td>Scholaroom</Td>
              <Td>SCH/ 001 V.1</Td>
              <Td>New Project</Td>
            </Tr>
            <Tr>
              <Td>Vatebra Academy</Td>
              <Td>SCH/ 001 V.1</Td>
              <Td>New Project</Td>
            </Tr>
            <Tr>
              <Td>Scholaroom</Td>
              <Td>SCH/ 001 V.1</Td>
              <Td>Customer Request</Td>
            </Tr>
            <Tr>
              <Td>Vatebra Academy</Td>
              <Td>SCH/ 001 V.1</Td>
              <Td>Support Project</Td>
            </Tr>
          </Tbody>
        </Table>
      </TableContainer> */}
    </>
  );
};

export default LOBDetails;
