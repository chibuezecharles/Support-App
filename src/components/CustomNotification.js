import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  // AlertDialogOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import { cloneElement, isValidElement, useEffect } from "react";

const CustomNotification = ({ content }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  let contentWithProps = content;
  // Checking isValidElement is the safe way and avoids a TS error too.
  if (isValidElement(content)) {
    contentWithProps = cloneElement(content, { onClose, onOpen });
  }

  useEffect(() => {
    onOpen();

    return () => {
      onClose();
    };
  }, [onOpen, onClose]);

  return (
    <>
      <AlertDialog
        isOpen={isOpen}
        onClose={onClose}
        motionPreset="slideInBottom"
        closeOnOverlayClick={false}
        // isCentered
      >
        {/* <AlertDialogOverlay> */}
          <AlertDialogContent
            borderBottomRadius={"0"}
            borderTopRadius={"50px"}
            py={10}
            px={2}
            maxW={"35rem"}
            position={"fixed"}
            right={[0, "1rem", "1rem", "1rem"]}
            bottom={"-4rem"}
          >
            <AlertDialogBody>{contentWithProps}</AlertDialogBody>
          </AlertDialogContent>
        {/* </AlertDialogOverlay> */}
      </AlertDialog>
    </>
  );
};

export default CustomNotification;
