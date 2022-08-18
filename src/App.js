import { ChakraProvider, Flex, Heading, Text, Icon } from '@chakra-ui/react'
import React,{ useEffect, useRef, useState } from 'react'
//import { ChakraUITable } from './lib'
//import DataTable from './component/DataTable'
import DataTable from './component/DataTable'
import { BsCheckCircle,BsX } from "react-icons/bs";
import { usePropQuery } from "./hooks/PropQuery.js"

// Example Table
const PropListTable = ()=>{
  //const columns = React.useMemo(
  // () => [
  const columns = [ 
    {
      Header: '設定項目',
      accessor: 'name',
    },
    {
      Header: 'ID',
      accessor: 'id',
    },
    {
      Header: '現在の設定',
      accessor: 'value',
    },
    {
      Header: '更新時刻',
      accessor: 'updateat',
    },
  ]
  //const [data , isLoding,error] = usePropQuery()
  const {data} = usePropQuery();
  //const data = [] 
  /*
  const [data, setData] = useState(null)

  const loadData = useRef()
  loadData.current = async () => {
    const url = 'http://localhost:8080/property'
    try {
      const result = await Promise.all(
        url => fetch(url).then(r => r.json())
      )
      console.log(result)
      if (result.length > 0) {
        const propList = result.data
        setData(propList)
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    loadData.current()
  }, [])
  */
    {/*<DataTable table={{p_data:{data},p_columns:{columns}}}/> */}
  return (
    <DataTable p_data={data} p_columns={columns} />
    )
}


function App() {

  return (
    <ChakraProvider>
      <Flex direction="column" p={10}>
        <Heading mb={4}>React ChakraUI Table</Heading>
        <PropListTable />
      </Flex>
    </ChakraProvider>
  )
}

export default App
