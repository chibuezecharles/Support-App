import React from 'react';
import { Button, Text, Flex } from '@chakra-ui/react';

const Pagination = ({ currentPage, setCurrentPage, totalPages }) => {

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(prevPage => prevPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(prevPage => prevPage + 1);
    }
  };

  const renderPageButtons = () => {
    const buttons = [];
    const MAX_VISIBLE_PAGES = 2;

    if (totalPages <= MAX_VISIBLE_PAGES) {
      for (let i = 1; i <= totalPages; i++) {
        buttons.push(renderPageButton(i));
      }
    } else {
      let startPage;
      if (currentPage <= Math.ceil(MAX_VISIBLE_PAGES / 2)) {
        startPage = 1;
      } else if (currentPage > totalPages - Math.floor(MAX_VISIBLE_PAGES / 2)) {
        startPage = totalPages - MAX_VISIBLE_PAGES + 1;
      } else {
        startPage = currentPage - Math.floor(MAX_VISIBLE_PAGES / 2);
      }

      const endPage = Math.min(startPage + MAX_VISIBLE_PAGES - 1, totalPages);

      if (startPage > 1) {
        buttons.push(renderPageButton(1));
        if (startPage > 2) {
          buttons.push(renderEllipsis());
        }
      }

      for (let i = startPage; i <= endPage; i++) {
        buttons.push(renderPageButton(i));
      }

      if (endPage < totalPages) {
        if (endPage < totalPages - 1) {
          buttons.push(renderEllipsis());
        }
        buttons.push(renderPageButton(totalPages));
      }
    }

    return buttons;
  };

  const renderPageButton = (page) => (
    <Button
      key={page}
      onClick={() => handlePageChange(page)}
      isActive={currentPage === page}
      style={{
        color: currentPage === page ? "#FFFFFF" : "#121212",
        backgroundColor: currentPage === page ? "#22944E" : "#FFFFFF",
        fontWeight: "bold",
      }}
      size="sm"
    >
      {page}
    </Button>
  );

  const renderEllipsis = () => (
    <Text mx={2} fontSize="14px" fontWeight="bold">
      ...
    </Text>
  );

  return (
    <>
      {totalPages ? (
        <Flex justifyContent="center" mt={[6, 12, 12]} alignItems="center" flexDirection={["column", "row", "row"]} gap={3}>
          <Button
            onClick={handlePreviousPage}
            disabled={currentPage === 1}
            bg="#F7F9FB"
            color="#121212"
            fontSize={["12px", "14px", "14px"]}
            fontWeight="400"
            _hover={{ bg: "#F7F9FB", color: "#121212" }}
            size="sm"
          >
            PREV
          </Button>
          <Flex justifyContent="center" alignItems="center">
            {renderPageButtons()}
          </Flex>
          <Button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            bg="#F7F9FB"
            color="#121212"
            fontSize={["12px", "14px", "14px"]}
            fontWeight="400"
            _hover={{ bg: "#F7F9FB", color: "#121212" }}
            size="sm"
          >
            NEXT
          </Button>
        </Flex>
      ) : null}
    </>
  );
};

export default Pagination;
