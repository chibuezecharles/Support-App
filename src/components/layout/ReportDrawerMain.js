import React from "react";
import { Box } from "@chakra-ui/react";
import NewProjectDrawer1 from "./NewProjectDrawer1";
import ReportDrawer2 from "./ReportDrawer2";
import { useSelector } from "react-redux";

const ReportDrawerMain = () => {
  // const {ProjectName, projectReferenceCode} = others;
  const toggleDrawer = useSelector((state) => state.drawer.toggleDrawer);

  // const drawer1 = {
  //   ProjectName: ProjectName,
  //   projectReferenceCode: projectReferenceCode
  // };

  // const drawer2 = {
  //   SopTitle: drawer2Data.SopTitle,
  //   NameOfDeveloper: drawer2Data.NameOfDeveloper,
  //   DateTime: drawer2Data.DateTime
  // };

  return (
    <Box>
      {!toggleDrawer ? (
        // <NewProjectDrawer1 {...drawer1} />
        <NewProjectDrawer1 />
      ) : (
        // <ReportDrawer2  {...drawer2} />
        <ReportDrawer2 />
      )}
    </Box>
  );
};

export default ReportDrawerMain;
