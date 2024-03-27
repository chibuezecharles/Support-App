import React from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import BreadCrumbs from "./BreadCrumbs";
// import Footer from "./Footer";
import { Flex } from "@chakra-ui/react";
import { Favourites } from "./Favourites";
import MobileHeader from "./MobileHeader";

const PageWrapper = ({ children, breadcrumb }) => {
  return (
    <Flex position={"relative"} minH={"100vh"}>
      <BreadCrumbs breadcrumb={breadcrumb} />
      <Flex maxW={"20%"} position={"fixed"} top={0} zIndex={100}>
        <Sidebar />
        <Favourites />
      </Flex>
      <Flex
        direction={"column"}
        grow={1}
        pl={[0, 0, 0, "20%"]}
        maxW={["100%", "100%", "100%", "100%"]}
      >
        <Header />
        <MobileHeader />

        <Flex
          px={[1, 1, 4, 4]}
          py={2}
          bg={"#F4F3F3"}
          grow={"1"}
          direction={"column"}
          borderLeft={"1px solid #8080801a"}
        >
          {children}
        </Flex>
      </Flex>
      {/* <Footer/> */}
    </Flex>
  );
};

export default PageWrapper;
