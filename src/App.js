import { ChakraProvider, Flex, Heading, Text, Icon } from '@chakra-ui/react'
import React,{ useEffect, useRef, useState } from 'react'
import {
  QueryClient,
  QueryClientProvider,
} from 'react-query';


import DataTable from './component/DataTable'
import { BsCheckCircle,BsX } from "react-icons/bs";
import { usePropQuery } from "./hooks/usePropQuery.js"

// Example Table
const PropListTable = ()=>{
  //const columns = React.useMemo(
  // () => [
  const columns = [ 
    {
      Header: '設定項目',
      accessor: 'Name',
    },
    {
      Header: 'ID',
      accessor: 'ID',
    },
    {
      Header: '現在の設定',
      accessor: 'Value',
    },
    {
      Header: '更新時刻',
      accessor: 'Updateat',
    },
  ]
  //const [data , isLoding,error] = usePropQuery()
  const {data,isLoading,error} = usePropQuery();
  if (isLoading || !data) {
    return <div>Loading...</div>
  }
  return (
      <DataTable p_data={data} p_columns={columns} />
  )
}


function App() {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider>
        <Flex direction="column" p={10}>
          <Heading mb={4}>React ChakraUI Table</Heading>
          <PropListTable />
        </Flex>
      </ChakraProvider>
    </QueryClientProvider>
  )
}

export default App
