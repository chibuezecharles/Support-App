import { Children, cloneElement, isValidElement } from "react";

const {
  ModalOverlay,
  ModalContent,
  Modal,
  ModalHeader,
  // ModalCloseButton,
  ModalBody,
  Button,
  useDisclosure,
  Text,
  Divider,
  Flex,
} = require("@chakra-ui/react");

export default function CustomModal({
  children,
  modalTitle,
  buttonText,
  size,
  buttonProps,
  fontSize,
  px,
  py,
  customButton,
}) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const childrenWithProps = Children.map(children, (child) => {
    // Checking isValidElement is the safe way and avoids a TS error too.
    if (isValidElement(child)) {
      return cloneElement(child, { onClose });
    }

    return child;
  });

  return (
    <>
      <Button
        onClick={onOpen}
        {...buttonProps}
        fontSize={fontSize || "16px"}
        px={px}
        // _hover={{ backgroundColor: "currentColor" }}
        // _active={{ backgroundColor: "inherit" }}
      >
        {buttonText}
      </Button>
      <Modal size={size} isCentered isOpen={isOpen} onClose={onClose}>
        <ModalOverlay
          bg="blackAlpha.300"
          // backdropFilter="blur(10px)"
        />
        <ModalContent borderRadius={"5px"}>
          <Flex justify={"space-between"} alignItems={"center"}>
            <ModalHeader flex={1}>{modalTitle}</ModalHeader>
            {customButton ? (
              customButton
            ) : (
              <Text
                size={"sm"}
                position={"absolute"}
                top="1.3rem"
                right={"1.5rem"}
                color={"#5C5C5C"}
                onClick={onClose}
                cursor={"pointer"}
              >
                Cancel
              </Text>
            )}
          </Flex>
          <Divider />
          <ModalBody
            px={px || 8}
            py={{ base: py || 6, md: py || 4, lg: py || 6 }}
          >
            {childrenWithProps}
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
