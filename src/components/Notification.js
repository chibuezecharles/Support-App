import { createStandaloneToast } from "@chakra-ui/react";
import theme from "../theme";

export const { ToastContainer, toast } = createStandaloneToast({ theme });

export const errorNotifier = (errorMessage) => {
  return toast({
    title: "Error",
    description:
      typeof errorMessage === "string" ? errorMessage : "SOMETHING WENT WRONG",
    status: "error",
    duration: 5000,
    isClosable: true,
    position: "top-right",
  });
};

export const successNotifier = (info) => {
  return toast({
    title: "Success",
    description: info,
    status: "success",
    duration: 5000,
    isClosable: true,
    position: "top",
  });
};
