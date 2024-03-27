import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Grid,
  GridItem,
  Input,
  Text,
} from "@chakra-ui/react";
import { Form, Formik } from "formik";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getReport } from "../../redux/slices/reportSlice";
import { GenerateReportFormSchema } from "../../utils/formValidationSchema";

const initialValues = {
  projectName: "",
  developerName: "",
  startDate: "",
  endDate: "",
};

const ReportPanel = () => {
  const dispatch = useDispatch();

  const report = useSelector((state) => state.report);

  const handleSubmit = (values) => {
    dispatch(getReport(values));
  };

  return (
    <Box>
      <Text color={"#5CBF14"} fontSize={"16px"}>
        Select any option below to generate report
      </Text>

      <Formik
        enableReinitialize
        initialValues={initialValues}
        validationSchema={GenerateReportFormSchema}
        onSubmit={(values) => handleSubmit(values)}
      >
        {({ errors, handleBlur, handleChange }) => {
          return (
            <>
              {errors.fieldError && (
                <Text color={"red"}>{errors.fieldError}</Text>
              )}
              <Grid
                as={Form}
                templateColumns={[
                  "repeat(1, 1fr)",
                  "repeat(2, 1fr)",
                  "repeat(2, 1fr)",
                  "repeat(3, 1fr)",
                ]}
                gap={4}
                pb={4}
              >
                <GridItem>
                  <FormControl>
                    <FormLabel>Project Name</FormLabel>
                    <Input
                      type="text"
                      name="projectName"
                      placeholder="Select Project Name"
                      bg={"#FAFAFA"}
                      border={"0.5px solid #8A8C8E"}
                      _placeholder={{ color: "#8A8C8E" }}
                      focusBorderColor="0.5px solid #8A8C8E"
                      onBlur={handleBlur}
                      onChange={handleChange}
                    />
                  </FormControl>
                </GridItem>
                <GridItem>
                  <FormControl>
                    <FormLabel>Start Date</FormLabel>
                    <Input
                      type="date"
                      bg={"#FAFAFA"}
                      name="startDate"
                      border={"0.5px solid #8A8C8E"}
                      _placeholder={{ color: "#8A8C8E" }}
                      focusBorderColor="0.5px solid #8A8C8E"
                      color={"#8A8C8E"}
                      onBlur={handleBlur}
                      onChange={handleChange}
                    />
                  </FormControl>
                </GridItem>
                <GridItem>
                  <FormControl>
                    <FormLabel>End Date</FormLabel>
                    <Input
                      type="Date"
                      bg={"#FAFAFA"}
                      border={"0.5px solid #8A8C8E"}
                      name="endDate"
                      _placeholder={{ color: "#8A8C8E" }}
                      focusBorderColor="0.5px solid #8A8C8E"
                      color={"#8A8C8E"}
                      onBlur={handleBlur}
                      onChange={handleChange}
                    />
                  </FormControl>
                </GridItem>
                <GridItem>
                  <FormControl>
                    <FormLabel>Developer Name</FormLabel>
                    <Input
                      type="text"
                      placeholder="Enter Developer Name"
                      name="developerName"
                      bg={"#FAFAFA"}
                      border={"0.5px solid #8A8C8E"}
                      _placeholder={{ color: "#8A8C8E" }}
                      focusBorderColor="0.5px solid #8A8C8E"
                      onBlur={handleBlur}
                      onChange={handleChange}
                    />
                  </FormControl>
                </GridItem>
                <GridItem>
                  <FormControl>
                    <FormLabel color={"transparent"}>.</FormLabel>
                    <Button
                      isLoading={report.loading}
                      width={"100%"}
                      type="submit"
                      color={"#FFFFFF"}
                      fontWeight={"500"}
                      lineHeight={"-0.25"}
                      bg={"brand.primary"}
                      borderRadius={"3px"}
                      _hover={{ backgroundColor: "#005E39" }}
                    >
                      Generate Project Report
                    </Button>
                  </FormControl>
                </GridItem>
              </Grid>
            </>
          );
        }}
      </Formik>
    </Box>
  );
};

export default ReportPanel;
