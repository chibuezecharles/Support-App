import React, { useEffect, useState } from "react";
import { Divider, Flex, Text } from "@chakra-ui/react";
import DetailsCard from "../components/DetailsCard";
import { PiSquaresFourBold } from "react-icons/pi";
import { FaFileInvoice } from "react-icons/fa";
import { BsFillBarChartLineFill } from "react-icons/bs";
import CardTitle from "../components/CardTitle";
import VerticalBarChart from "../components/VerticalBarChart";
import CustomPieChart from "../components/CustomPieChart";
import CustomCalendar from "../components/CustomCalendar";
import { useSelector } from "react-redux";
import httpRequest from "../utils/httpRequest";
import { BASE_URL } from "../config/settings";

const StaffDashboard = () => {
  const roleId = useSelector((state) => state.auth.user?.roleId);
  const [dashboardData, setDashboardData] = useState({});
  console.log({ roleId });
  console.log({ dashboardData });

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
      name: "TOTAL NUMBER OF PROJECTS ",
      number: dashboardData?.totalProjects,
      borderColor: "#D73439",
      icon: <PiSquaresFourBold size={"2rem"} />,
    },
    {
      name: "TOTAL NUMBER OF LOB",
      number: dashboardData?.lineOfBusinessCount?.reduce((prev, curr) => {
        return prev + curr.count;
      }, 0),
      borderColor: "#D8991F",
      icon: <BsFillBarChartLineFill size={"2rem"} />,
    },
    {
      name: "TOTAL NUMBER OF SOP",
      number: 100,
      borderColor: "#4DA54B",
      icon: <FaFileInvoice size={"2rem"} />,
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
          <Flex basis={["100%", "100%", "100%", "50%"]} grow={1}>
            <Flex>
              <CardTitle
                title={"Distribution of Projects across Line of Businesses"}
              />
              <VerticalBarChart data={dashboardData.lineOfBusinessCount} />
            </Flex>
          </Flex>
          <Flex basis={["100%", "49.9%", "49.9%", "24.9%"]} grow={1}>
            <Flex grow={1}>
              <CardTitle title={"Project Overview"} />
              <CustomPieChart
                data={[
                  {
                    name: "Active Projects",
                    value: 30,
                  },
                  {
                    name: "Inactive  Projects",
                    value: 30,
                  },
                  {
                    name: "Complete  Projects",
                    value: 40,
                  },
                ]}
                colors={["#38B433", "#FFB31F", "#356EFF"]}
              />
            </Flex>
          </Flex>
          <Flex basis={["100%", "49.9%", "49.9%", "24.9%"]} grow={1}>
            <Flex grow={1}>
              <CustomCalendar />
            </Flex>
          </Flex>
        </Flex>
      </>
    </>
  );
};

export default StaffDashboard;
