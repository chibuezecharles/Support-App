import React, { useState, useEffect } from "react";
import { Table, Thead, Tbody, Tr, Th, Td, TableContainer } from "@chakra-ui/react";
import DotLoader from "./loaders/DotLoader";
import { useSelector } from "react-redux";
import Pagination from "./layout/Pagination";

const CustomTable = ({ sn = true, data, dataKeys, transformRow,
  pageNumber, pageCount, title, variant = false, onClickRowAction,
  // loading,
  
}) => {
  let initialCount =
    pageNumber && pageCount ? pageNumber * pageCount - pageCount : 0;

  const [loading, setLoading] = useState(false);
  const [filteredData, setFilteredData] = useState(data);
  const [currentPage, setCurrentPage] = useState(1);
  const [displayedPages, setDisplayedPages] = useState([1, 2, 3, 4, 5]);
  const searchTerm = useSelector((state) => state.searchFilter.searchData);
  const filterTerm = useSelector((state) => state.searchFilter.filterData);

  const itemsPerPage = 5;
  useEffect(() => {
    setCurrentPage(1); // Reset current page to 1 whenever search term changes
  }, [searchTerm]);
  const totalPages = Math.ceil(filteredData?.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const slicedData = filteredData?.slice(startIndex, endIndex);
  const paginationData = {
    currentPage ,
    setCurrentPage,
    displayedPages,
    setDisplayedPages,
    totalPages,
  }

  useEffect(() => {
    setLoading(true);
    const dataArray = Array.isArray(data) ? data : [data];
    if (dataArray) {
      let filtered = dataArray.filter(row => {
        if (!searchTerm && !filterTerm) {
          setLoading(false);
          setFilteredData(data);
        }
        // Filter based on searchTerm
        if (searchTerm && searchTerm !== "") {
          setLoading(false);
          // Check each field in the row
          for (const field in row) {
              if (Object.hasOwnProperty.call(row, field)) {
                  const value = row[field];
                  // If the value is an array, check each item in the array
                  if (Array.isArray(value)) {
                      for (const item of value) {
                          // Check if any field in the nested object contains the searchTerm
                          for (const nestedField in item) {
                              if (Object.hasOwnProperty.call(item, nestedField)) {
                                  const nestedValue = item[nestedField];
                                  if (nestedValue && nestedValue.toString().toLowerCase().includes(searchTerm.toLowerCase())) {
                                      return true; // If found, include the row in filtered results
                                  }
                              }
                          }
                      }
                  } else {
                      // For non-array values, check if the value contains the searchTerm
                      const stringValue = value && value.toString().toLowerCase();
                      if (stringValue && stringValue.includes(searchTerm.toLowerCase())) {
                          return true; // If found, include the row in filtered results
                      }
                  }
              }
          }
          return false; // If searchTerm not found in any field, exclude the row
        }
        // Filter based on filterTerm
        if (filterTerm && filterTerm !== "") {
          // Check if filterTerm is contained in dataKeys
          setLoading(false);
          // console.log(dataKeys);
          if (!dataKeys.includes(filterTerm)) {
            return false;
          }
          // Check if any row in the column corresponding to filterTerm is empty or null
          const columnValues = row[filterTerm];
          if (!columnValues || (Array.isArray(columnValues) && columnValues.length === 0)) {
            return false;
          }
        }
        return true;
      });
      setFilteredData(filtered);
    }
    setLoading(false);
  }, [data, searchTerm, filterTerm, dataKeys]);

  return (
    <>
      <TableContainer className="text-xs font-light">
        <Table variant={variant ? "simple" : "simple"}>
          <Thead background="#FAFAFB" width={"100%"}>
            <Tr color="#515151">
              {sn && (
                <Th style={{ maxWidth: 70, paddingLeft: 15 }} color="#515151">
                  s/n
                </Th>
              )}
              {dataKeys?.map((item, titleKey) => (
                <Th key={titleKey} color="#515151">
                  {title[item]}
                </Th>
              ))}
            </Tr>
          </Thead>
          <Tbody>
            {(slicedData && slicedData.length > 0) ? (
              slicedData.map((row, rowIndex) => {
                const rowObj = transformRow ? transformRow(row) : row;
                initialCount++;
                return (
                  <React.Fragment key={initialCount}>
                    <Tr
                      onClick={onClickRowAction}
                      cursor={onClickRowAction && "pointer"}
                      _hover={{ backgroundColor: "#F4FFFB" }}
                    >
                      {sn && (
                        <Td
                          style={{ maxWidth: 70, paddingLeft: 15 }}
                          color={"#515151"}
                          lineHeight={"20px"}
                        >
                          <b>{initialCount}.</b>
                        </Td>
                      )}
                      {Object.keys(rowObj).map((key, columnIndex) => {
                        const cellData = rowObj[key];
                        return (
                          <Td key={`${rowIndex}-${columnIndex}`}>
                            {Array.isArray(cellData)
                              ? cellData.map((item, itemIndex) => (
                                  <div
                                    key={`${rowIndex}-${columnIndex}-${itemIndex}`}
                                  >
                                    {item}
                                  </div>
                                ))
                              : cellData}
                          </Td>
                        );
                      })}
                    </Tr>
                  </React.Fragment>
                );
              })
            ) : loading ? (
              <Tr>
                <Td
                  colSpan={
                    sn
                      ? Object.keys(dataKeys).length + 1
                      : Object.keys(dataKeys).length
                  }
                >
                  <div className="text-center" style={{ width: "100%" }}>
                    <DotLoader />
                  </div>
                </Td>
              </Tr>
            ) 
            : (
              <Tr>
                <Td
                  style={{ color: "red", textAlign: "center" }}
                  colSpan={sn ? dataKeys?.length + 1 : dataKeys?.length}
                >
                  No data found.
                </Td>
              </Tr>
            )
            }
          </Tbody>
        </Table>
      </TableContainer>
      <Pagination {...paginationData} />
    </>
  );
};

export default CustomTable;