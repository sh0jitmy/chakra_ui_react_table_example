import React ,{useRef} from "react"


import { 
  useTable, 
  useSortBy,
  useGlobalFilter,
  useAsyncDebounce,
  usePagination 
  } from 'react-table'

import { 
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td, 
  chakra,
  Flex,
  IconButton,
  Button,
  Text,
  Tooltip,
  Select,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Stack,
  Spacer,
  Box,
} from "@chakra-ui/react";


import {
  TriangleDownIcon, 
  TriangleUpIcon,
  SearchIcon,
  ArrowRightIcon,
  ArrowLeftIcon,
  ChevronRightIcon,
  DownloadIcon,
  ChevronLeftIcon
} from "@chakra-ui/icons";

import { CSVLink } from "react-csv";

//Chakra UI DataTable Function
function DataTable ({p_data,p_columns,loading,updateTableData})  {
  //transform memo
  //change editable code (Memo -> useState)
  //const data = React.useMemo(() =>p_data,[])
  const data = p_data
  const columns = React.useMemo(() => p_columns,[])
  const csvLink = useRef() 
  
 
  //display default
  const defaultValue = 10;// display num def
  const pageEntries = [10, 20, 30, 40, 50];//select display num
  

  //react-table hooks
  const { getTableProps, getTableBodyProps, headerGroups, prepareRow ,page,
          pageOptions,pageCount,canPreviousPage,canNextPage,gotoPage,nextPage,previousPage,setPageSize,
          setGlobalFilter,preGlobalFilteredRows,
          state:{globalFilter,pageIndex,pageSize}} =
     useTable({ columns, data, initialState:{ pageIndex: 0},updateTableData}, useGlobalFilter,useSortBy,usePagination);

  const getTransactionData = async() => {
   csvLink.current.link.click()
  }

 

  // render 
  return (
   <div>
   {/* debugs  */}
   {/*
     <pre>
       <code>
         {JSON.stringify(
           {
             pageIndex,
             pageSize,
             pageCount,
             canNextPage,
             canPreviousPage
           },
           null,
           2
         )}
       </code>
     </pre>
    */}
    {/* global filter(search) fields  */}
    <Flex alignItems="right">
      <Spacer /> 
      <InputGroup width={200}> 
        <InputRightElement
          pointerEvents='none'
          children={<SearchIcon color='gray.300' />}
        />
        <Input
         type="text"
         variant="filled"
         placeholder="search"
         value={globalFilter || ""}
         onChange={e => setGlobalFilter(e.target.value)}
     />
      </InputGroup> 
    </Flex>

    {/* table contents  */}
    <Table {...getTableProps()}>
      <Thead>
        {headerGroups.map((headerGroup) => (
          <Tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <Th
                {...column.getHeaderProps(column.getSortByToggleProps())}
                isNumeric={column.isNumeric}
              >
                {column.render('Header')}
                <chakra.span pl='4'>
                  {column.isSorted ? (
                    column.isSortedDesc ? (
                      <TriangleDownIcon aria-label='sorted descending' />
                    ) : (
                      <TriangleUpIcon aria-label='sorted ascending' />
                    )
                  ) : null}
                </chakra.span>
              {/* columns filter */}
              {/*<GlobalFilter
                preGlobalFilteredRows={preGlobalFilteredRows}
                globalFilter={globalFilter}
                setGlobalFilter={setGlobalFilter}
              />*/}
              </Th>
            ))}
          </Tr>
        ))}
      </Thead>
      <Tbody {...getTableBodyProps()}>
        {page.map((row,i) => {
          prepareRow(row)
          var color = 'white'
          if (row.original["Value"] != row.original["fetchValue"]) {
             color = 'pink'
          } else {
             color = 'white'
          }
          return (
            <Tr {...row.getRowProps()}>
              {row.cells.map((cell) => (
                <Td {...cell.getCellProps()} isNumeric={cell.column.isNumeric} bg={color} >
                  {cell.render('Cell')}
                </Td>
              ))}
            </Tr>
          )
        })}
      </Tbody>
    </Table>
    
    {/* pagination control  */}
    <Flex justifyContent="space-between" m={4} alignItems="center">
        {/* previous button  */}
        <Flex>
          <Tooltip label="First Page">
            <IconButton
              onClick={() => gotoPage(0)}
              isDisabled={!canPreviousPage}
              icon={<ArrowLeftIcon h={3} w={3} />}
              mr={4}
            />
          </Tooltip>
          <Tooltip label="Previous Page">
            <IconButton
              onClick={previousPage}
              isDisabled={!canPreviousPage}
              icon={<ChevronLeftIcon h={6} w={6} />}
            />
          </Tooltip>
        </Flex>
        {/* center text & input/select   */}
        <Flex alignItems="center">
          <Text flexShrink="0" mr={8}>
            ページ{" "}
            <Text fontWeight="bold" as="span">
              {pageIndex + 1}
            </Text>{" "}
            /{" "}
            <Text fontWeight="bold" as="span">
              {pageOptions.length}
            </Text>
          </Text>
          <Text flexShrink="0">ページ表示:</Text>{" "}
          <NumberInput
            ml={2}
            mr={8}
            w={28}
            min={1}
            max={pageOptions.length}
            onChange={(value) => {
              const page = value ? value - 1 : 0;
              gotoPage(page);
            }}
            defaultValue={pageIndex + 1}
          >
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
          <Select
            w={32}
            value={pageSize}
            onChange={(e) => {
              setPageSize(Number(e.target.value));
            }}
          >
            {pageEntries.map((pageSize) => (
              <option key={pageSize} value={pageSize}>
                {pageSize} 件表示
              </option>
            ))}
          </Select>
          {/* CSV Output*/}
          <Button
            onClick={getTransactionData}
            leftIcon={<DownloadIcon h={6} w={6} />}
            ml={8}
          > Download </Button>
          <CSVLink
           data={data}
           filename='transactions.csv'
           className='hidden'
           ref={csvLink}
           target='_blank'
          />
        </Flex>
        {/* next button  */}
        <Flex>
          <Tooltip label="Next Page">
            <IconButton
              onClick={nextPage}
              isDisabled={!canNextPage}
              icon={<ChevronRightIcon h={6} w={6} />}
            />
          </Tooltip>
          <Tooltip label="Last Page">
            <IconButton
              onClick={() => gotoPage(pageCount - 1)}
              isDisabled={!canNextPage}
              icon={<ArrowRightIcon h={3} w={3} />}
              ml={4}
            />
          </Tooltip>
        </Flex>
      </Flex>
{/*
    <Flex justifyContent="max-content" m={4} alignItems="left">
      <Spacer/>
      <Button
        colorScheme='teal'
        onClick={getTransactionData}
        ml={8}
      > 設定更新 </Button>
      <Button
        colorScheme='blue'
        onClick={getTransactionData}
        ml={8}
      > リセット </Button>
    </Flex>
*/}
   </div>
  )
}


//Columns Filter Function
function GlobalFilter({
  preGlobalFilteredRows,
  globalFilter,
  setGlobalFilter,
}) {
  const count = preGlobalFilteredRows.length
  const [value, setValue] = React.useState(globalFilter)
  const onChange = useAsyncDebounce(value => {
    setGlobalFilter(value || undefined)
  }, 200)

  return (
    <span>
      Search:{' '}
      <input
        value={value || ""}
        onChange={e => {
          setValue(e.target.value);
          onChange(e.target.value);
        }}
        placeholder={`${count} records...`}
        style={{
          fontSize: '1.1rem',
          border: '0',
        }}
      />
    </span>
  )
}

export default DataTable
