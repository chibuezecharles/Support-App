import React, { useEffect, useState } from "react";
import { Divider, Flex, Text } from "@chakra-ui/react";
import DetailsCard from "../components/DetailsCard";
import { PiSquaresFourBold } from "react-icons/pi";
import { HiUserGroup } from "react-icons/hi";
import { BsFillBarChartLineFill } from "react-icons/bs";
import CardTitle from "../components/CardTitle";
import VerticalBarChart from "../components/VerticalBarChart";
import CustomPieChart from "../components/CustomPieChart";
import httpRequest from "../utils/httpRequest";
import { BASE_URL } from "../config/settings";
import { useSelector } from "react-redux";

const AdminDashboard = () => {
  const [dashboardData, setDashboardData] = useState({
    totalAssignedProject: 0,
    totalUnassignedProject: 0,
    totalAssignedDeveloper: 0,
    totalUnassignedDeveloper: 0,
    lineOfBusinessCount: [],
    totalProjects: 0,
    totalDevelopers: 0,
  });


  const roleId = useSelector((state) => state.auth.user?.roleId);

  useEffect(() => {
    async function fetchLandingData() {
      const response = await httpRequest(
        `${BASE_URL}/home/dashboard-statistics?roleid=${roleId}`,
        "get"
      );
      setDashboardData(response?.data);
    }
    fetchLandingData();
  }, [roleId]);

  const detailsCard = [
    {
      name: "Projects ",
      number: dashboardData?.totalProjects,
      borderColor: "#D73439",
      icon: <PiSquaresFourBold size={"2rem"} />,
    },
    {
      name: "Line of Business",
      number: dashboardData?.lineOfBusinessCount.length,
      borderColor: "#D8991F",
      icon: <BsFillBarChartLineFill size={"2rem"} />,
    },
    {
      name: "Developers",
      number: dashboardData?.totalDevelopers,
      borderColor: "#4DA54B",
      icon: <HiUserGroup size={"2rem"} />,
    },
  ];

  return (
    <>
      <Text fontSize={"1.2rem"}>Dashboard</Text>
      <Divider my={4} />

      <Flex wrap={"wrap"}>
        {detailsCard.map(({ name, number, borderColor, icon }) => (
          <DetailsCard
            name={name}
            number={number}
            key={name}
            borderColor={borderColor}
            icon={icon}
          />
        ))}
      </Flex>

      <>
        <Flex
          wrap="wrap"
          py={2}
          justify={"space-between"}
          sx={{
            "& > div": {
              h: "30rem",
              px: 2,
              pt: 4,
              "& > div": {
                flexGrow: 1,
                bg: "white",
                flexDir: "column",
                py: 4,
              },
            },
          }}
        >
          <Flex basis={["100%", "100%", "100%", "50%"]}>
            <Flex>
              <CardTitle
                title={"Distribution of Projects across Line of Businesses"}
              />
              <VerticalBarChart data={dashboardData?.lineOfBusinessCount} />
            </Flex>
          </Flex>
          <Flex basis={["100%", "49.9%", "49.9%", "24.9%"]}>
            <Flex>
              <CardTitle title={"Project Overview"} />
              {dashboardData?.totalAssignedProject === 0 &&
              dashboardData?.totalUnassignedProject === 0 ? (
                <Flex
                  align={"center"}
                  justify={"center"}
                  h={"100%"}
                  placeContent={"center"}
                >
                  <Text align={"center"}>
                    No Projects Yet. <br /> Create Project to see data
                  </Text>
                </Flex>
              ) : (
                <CustomPieChart
                  data={[
                    {
                      name: "Assigned Projects",
                      value: dashboardData?.totalAssignedProject,
                    },
                    {
                      name: "Unassigned  Projects",
                      value: dashboardData?.totalUnassignedProject,
                    },
                  ]}
                  colors={["#38B433", "#FFB31F"]}
                />
              )}
            </Flex>
          </Flex>
          <Flex basis={["100%", "49.9%", "49.9%", "24.9%"]}>
            <Flex>
              <CardTitle title={"Developers Overview"} />
              {dashboardData?.totalUnassignedDeveloper === 0 &&
              dashboardData?.totalAssignedDeveloper === 0 ? (
                <Flex
                  align={"center"}
                  justify={"center"}
                  h={"100%"}
                  placeContent={"center"}
                >
                  <Text align={"center"}>
                    No Developers Yet. <br /> Create Developer to see data
                  </Text>
                </Flex>
              ) : (
                <CustomPieChart
                  data={[
                    {
                      name: "Assigned Developers",
                      value: dashboardData?.totalAssignedDeveloper,
                    },
                    {
                      name: "Unassigned Developers",
                      value: dashboardData?.totalUnassignedDeveloper,
                    },
                  ]}
                  colors={["#38B433", "#FFB31F"]}
                />
              )}
            </Flex>
          </Flex>
        </Flex>
      </>
      {/* <RecentActivityTable /> */}
    </>
  );
};

export default AdminDashboard;
