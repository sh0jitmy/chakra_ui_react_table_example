import { ChakraProvider, Flex, Heading, Text, Icon } from '@chakra-ui/react'
import React,{ useEffect, useRef, useState } from 'react'
import {
  QueryClient,
  QueryClientProvider,
} from 'react-query';


import DataTable from './component/DataTable'
import { EditableCell } from './component/EditableCell'
import { BsCheckCircle,BsX } from "react-icons/bs";
import { usePropQuery } from "./hooks/usePropQuery.js"

const QueryPropListTable = () => {
  const {data,isLoading,error} = usePropQuery();
  if (isLoading || !data) {
    return <div>Loading...</div>
  }
  return ( 
    <PropListTable p_data={data} />
  )
}


// Example Table
const PropListTable = ({p_data})=>{
  const [data, setData] = React.useState(p_data);
  const updateTableData = (
    rowIndex,
    columnId,
    newValue,
  ) => {
    setData(
      data.map((row, index) => {
        if (index === rowIndex) {
          return {
            ...data[rowIndex],
            [columnId]: newValue,
            ["edited"]: true,
          };
        }
        return row;
      }),
    );
  };

  //const columns = React.useMemo(
  // () => [
  const columns = [ 
    {
      Header: 'ID',
      accessor: 'ID',
    },
    {
      Header: '設定値',
      accessor: 'Value',
      Cell: EditableCell
    },
    {
      Header: '更新時刻',
      accessor: 'Updateat',
    },
  ]
  //const [data , isLoding,error] = usePropQuery()
  return (
      <DataTable p_data={data}  p_columns={columns} updateTableData={updateTableData}/>
  )
}


function App() {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider>
        <Flex direction="column" p={10}>
          <Heading mb={4}>React ChakraUI Table</Heading>
          <QueryPropListTable />
        </Flex>
      </ChakraProvider>
    </QueryClientProvider>
  )
}

export default App
