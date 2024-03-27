import { Box, Button, Flex, IconButton, Text } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { GoArrowLeft } from "react-icons/go";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getProfile } from "../../redux/slices/profileSlice";
import { format } from "date-fns";

const ProfileContent = ({ tableProps }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.profile);
  const userId = useSelector((state) => state.auth.user.user.userId);

  useEffect(() => {
    dispatch(getProfile(userId));
  }, [dispatch, userId]);

  return (
    <>
      <Box bg={"#FFFFFF"} py={"30px"}>
        <Flex
          justifyContent={"flex-start"}
          alignItems={"center"}
          gap={"20px"}
          borderBottom={"1px solid #B4B1B1"}
          py={"20px"}
          px={"20px"}
        >
          <IconButton
            icon={<GoArrowLeft size={"1.5rem"} />}
            bg={"transparent"}
            onClick={() => navigate(-1)}
          />

          <Text fontSize={"18px"} fontWeight={"400"}>
            Profile Settings
          </Text>
        </Flex>

        <Flex
          px={"20px"}
          pt={"20px"}
          gap={"50px"}
          flexDirection={["column", "Column", "Column", "row"]}
          justifyContent={["center", "center", "center", "flex-start"]}
          alignItems={["center", "center", "center", "flex-start"]}
        >
          <Flex flexDirection={"column"} width={["100%", "80%", "80%"]}>
            <Flex
              justifyContent={["center", "flex-start", "space-between"]}
              alignItems={"center"}
              fontSize={"16px"}
              flexDirection={["column", "row", "row"]}
              gap={["30px", null, null]}
            >
              <Flex
                flexDirection={"column"}
                justifyContent={["center", "flex-start", "flex-start"]}
                alignItems={["center", "flex-start", "flex-start"]}
                width={["100%", "50%", "50%", "42%", "20%"]}
              >
                <Text
                  fontSize={"18px"}
                  fontWeight={"500"}
                  color={"#121212"}
                  lineHeight={"16px"}
                >{`${profile?.user?.firstName} ${profile?.user?.lastName}`}</Text>
                <Button
                  mt={4}
                  borderRadius={"4px"}
                  bg={"#E1E9FF"}
                  _hover={{ backgroundColor: "#E1E9FF" }}
                  color={"#356EFF"}
                  fontSize={"16px"}
                  fontWeight={"400"}
                  lineHeight={"20px"}
                  maxWidth={"120px"}
                  onClick={() => navigate("/profile/notification")}
                >
                  Active
                </Button>
              </Flex>

              <Flex
                flexDirection={"column"}
                justifyContent={["center", "flex-start", "flex-start"]}
                alignItems={["center", "flex-start", "flex-start"]}
                width={["100%", "30%", "30%", "30%", "20%"]}
              >
                <Text color={"#515151"}>Date Joined</Text>
                <Text
                  color={"#515151"}
                  fontWeight={"500"}
                  lineHeight={"17px"}
                  mt={4}
                >
                  {profile?.user?.dateCreated &&
                    format(new Date(profile?.user?.dateCreated), "dd-MMM-yyyy")}
                </Text>
              </Flex>
              <Flex
                flexDirection={"column"}
                justifyContent={["center", "flex-start", "flex-start"]}
                alignItems={["center", "flex-start", "flex-start"]}
                width={["100%", "15%", "15%", "20%", "20%"]}
              >
                <Text color={"#515151"}>Role</Text>
                <Button
                  mt={4}
                  bg={"rgba(215, 52, 57, 0.12)"}
                  color={"#D73439"}
                  borderRadius={"4px"}
                  fontWeight={"500"}
                  _hover={{ backgroundColor: "rgba(215, 52, 57, 0.12)" }}
                >
                  {profile?.user?.userRoles?.[0]?.roleName}
                </Button>
              </Flex>
            </Flex>
            <Box border={"1px solid #E9ECF0"} my={"30px"}></Box>
            <Flex
              justifyContent={["center", "flex-start", "space-between"]}
              alignItems={"center"}
              fontSize={"16px"}
              flexDirection={["column", "row", "row"]}
              gap={["30px", null, null]}
            >
              <Flex
                flexDirection={"column"}
                justifyContent={["center", "flex-start", "flex-start"]}
                alignItems={["center", "flex-start", "flex-start"]}
                width={["100%", "50%", "50%", "42%", "20%"]}
              >
                <Text color={"#515151"}>Email address</Text>
                <Button
                  mt={4}
                  border={"1px solid #F0F0F0"}
                  bg={"#F9FAFC"}
                  _hover={{ backgroundColor: "#F9FAFC" }}
                  color={"#8A8C8E"}
                  fontWeight={"500"}
                  borderRadius={"4px"}
                >
                  {profile?.user?.email}
                </Button>
              </Flex>
              <Flex
                flexDirection={"column"}
                justifyContent={["center", "flex-start", "flex-start"]}
                alignItems={["center", "flex-start", "flex-start"]}
                width={["100%", "30%", "30%", "30%", "20%"]}
              >
                <Text color={"#515151"}>Telephone</Text>
                <Button
                  mt={4}
                  border={"1px solid #F0F0F0"}
                  bg={"#F9FAFC"}
                  _hover={{ backgroundColor: "#F9FAFC" }}
                  color={"#515151"}
                  fontWeight={"500"}
                  borderRadius={"4px"}
                >
                  {profile?.user?.phoneNumber}
                </Button>
              </Flex>
            </Flex>
          </Flex>
        </Flex>
      </Box>
    </>
  );
};

export default ProfileContent;
