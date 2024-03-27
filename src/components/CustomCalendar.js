import { Flex, IconButton, Text } from "@chakra-ui/react";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { Calendar } from "react-date-range";
import {
  BiSolidChevronLeftCircle,
  BiSolidChevronRightCircle,
} from "react-icons/bi";

const CustomCalendar = ({
  setShowCalendar,
  showCloseButton = false,
  customRender = null,
  dayHeight = "auto",
  dayBorder = "none",
  textAlign = "center",
  monthPadding = null,
  fontWeight = "500",
  todayStyles = null,
  monthAndYearWrapperMargin = "1rem .5rem",
  handleChange,
  ...props
}) => {
  return (
    <Flex
      borderRadius={"5px"}
      bg={"white"}
      direction={"column"}
      position={"relative"}
      p={2}
      grow={1}
      sx={{
        "&": {
          justifyContent: "center",
          " p": {
            lineHeight: "initial",
          },
          ".rdrWeekDay": {
            textAlign: textAlign,
          },
          ".rdrCalendarWrapper": {
            flexGrow: 1,
            borderRadius: "5px",
          },
          ".rdrMonthAndYearWrapper": {
            // justifyContent: "flex-end",
            padding: "0 1rem",
            margin: monthAndYearWrapperMargin,
          },
          ".rdrMonthAndYearPickers": {
            color: "primary",
            fontSize: "1.5rem",
          },
          ".rdrCalendarWrapper:not(.rdrDateRangeWrapper) .rdrDayHovered .rdrDayNumber:after, .rdrDayStartPreview.rdrDayEndPreview":
            {
              border: "none",
            },
          ".rdrMonth": {
            width: "100%",
            padding: monthPadding,
          },
          "button.rdrDay": {
            height: dayHeight,
            border: dayBorder,
            position: "relative",
          },
          ".rdrNextPrevButton": {
            margin: "0 0.2rem",
            borderRadius: "1000px",
            color: "Dark Gray",
            background: "#FEEBDC",
          },
          ".rdrDayNumber": {
            alignItems: "flex-start",
            justifyContent: "center",
            fontWeight: fontWeight,
            position: "static",
            height: "inherit",
            "&.past": {
              cursor: "initial !important",
              pointerEvents: "none",
            },
          },
          ".rdrDayToday .rdrDayNumber": {
            "& span": {
              zIndex: 1,
              color: "#D73439",
              "&::after": {
                width: "2rem",
                height: "2rem",
                background: "#FEEBDC",
                borderRadius: "10000px",
                zIndex: "-1",
                top: "2px",
                ...todayStyles,
              },
            },
          },
        },
      }}
      {...props}
    >
      <Calendar
        dragSelectionEnabled={false}
        showMonthAndYearPickers={false}
        dayContentRenderer={customRender}
        showPreview={false}
        onChange={(date) => {}}
        showDateDisplay={false}
        navigatorRenderer={(currFocusedDate, changeShownDate) => {
          return (
            <Flex justify={"space-between"} align={"center"}>
              <IconButton
                icon={<BiSolidChevronLeftCircle size={"1.5rem"} />}
                cursor={"pointer"}
                onClick={() => changeShownDate(-1, "monthOffset")}
                bg={"transparent"}
              />
              <Text fontSize={"1.5rem"} fontWeight={"bold"}>
                {currFocusedDate.toLocaleString("default", { month: "long" })}
              </Text>
              <IconButton
                icon={<BiSolidChevronRightCircle size={"1.5rem"} />}
                cursor={"pointer"}
                onClick={() => changeShownDate(+1, "monthOffset")}
                bg={"transparent"}
              />
            </Flex>
          );
        }}
      />
      {showCloseButton && (
        <Text
          position={"absolute"}
          color={"#898989"}
          bottom={"1rem"}
          onClick={() => setShowCalendar(false)}
          fontSize={"xs"}
          right="2rem"
          cursor={"pointer"}
        >
          Close
        </Text>
      )}
    </Flex>
  );
};

export default CustomCalendar;
