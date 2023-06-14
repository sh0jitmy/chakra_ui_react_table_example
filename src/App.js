import { ChakraProvider, Flex, Heading, Text, Icon,Button,Spacer } from '@chakra-ui/react'
import React,{ useEffect, useRef, useState } from 'react'
import {
  QueryClient,
  QueryClientProvider,
} from 'react-query';


import DataTable from './component/DataTable'
import { EditableCell } from './component/EditableCell'
import { BsCheckCircle,BsX } from "react-icons/bs";
import { usePropQuery,useEditPropQuery } from "./hooks/usePropQuery.js"


const QueryPropListTable = () => {
  const {data,isLoading,error,refetch} = useEditPropQuery();
  if (isLoading || !data) {
    return <div>Loading...</div>
  }
  return ( 
    <PropListTable p_data={data} p_refetch={refetch}/>
  )
}


// Example Table
const PropListTable = ({p_data,p_refetch})=>{
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
            [columnId]: newValue
          };
        }
        return row;
      }),
    );
  };

  const useHandleUpdate = () => {
  }; // update the callback if the state changes
  
  const useHandleRefetch = () => {
      p_refetch();
  }; // update the callback if the state changes


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
    <div>
      <DataTable p_data={data}  p_columns={columns} updateTableData={updateTableData}/>
      <Flex justifyContent="max-content" m={4} alignItems="left">
        <Spacer/>
        <Button
          colorScheme='teal'
          onClick={useHandleUpdate}
          ml={8}
        > 設定更新 </Button>
        <Button
          colorScheme='blue'
          onClick={useHandleRefetch}
          ml={8}
        > リセット </Button>
      </Flex>
    </div>
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
