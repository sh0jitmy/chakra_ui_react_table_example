import axios from 'axios';
import {
  useMutation,
  useQuery,
  useQueryClient,
} from 'react-query';
const GET_URL = "http://localhost:58080/property";

const proptable = [
 {Name:"Name1",ID:"ID1",Value:"Value1",Updateat:"2022/08/13 00:00:00"},
 {Name:"Name2",ID:"ID2",Value:"Value2",Updateat:"2022/08/13 00:00:00"},
 {Name:"Name3",ID:"ID3",Value:"Value3",Updateat:"2022/08/13 00:00:00"},
 {Name:"Name4",ID:"ID4",Value:"Value4",Updateat:"2022/08/13 00:00:00"},
 {Name:"Name5",ID:"ID5",Value:"Value5",Updateat:"2022/08/13 00:00:00"},
 {Name:"Name6",ID:"ID6",Value:"Value6",Updateat:"2022/08/13 00:00:00"},
 {Name:"Name7",ID:"ID7",Value:"Value7",Updateat:"2022/08/13 00:00:00"},
 {Name:"Name8",ID:"ID8",Value:"Value8",Updateat:"2022/08/13 00:00:00"},
 {Name:"Name9",ID:"ID9",Value:"Value9",Updateat:"2022/08/13 00:00:00"},
 {Name:"Name10",ID:"ID10",Value:"Value10",Updateat:"2022/08/13 00:00:00"},
 {Name:"Name11",ID:"ID11",Value:"Value11",Updateat:"2022/08/13 00:00:00"},
];

export const useEditPropQuery = () => {
  const result = usePropQuery();
  if (result.data != null )
  {
    for (var entry = 0 ; entry <  result.data.length; entry++) {
      Object.assign(result.data[entry],{"fetchValue": result.data[entry]["Value"]});
    }
  }
  return result 
}

export const useEditPropMutation = () => {
  const mutation = useMutation((data) => {updateEditPropList(data);})
  return {mutation}
}




export const usePropQuery = () => {
  const result = useQuery(["proplist"],getPropList, { staleTime: Infinity });
  return result 
};

export const usePropMutation = () => {
  const result = useMutation((data) => {updatePropList(data);})
  return result;
};


const updateEditPropList = async(reqdata) => {
  if (reqdata == null) {
    return
  }
  for (var entry = 0 ; entry <  reqdata.length; entry++) {
    delete reqdata[entry]["fetchValue"];
  }
  try {
    const res = await axios.put(GET_URL,reqdata);
    console.log(res)
    return res.data
  } catch (err) {
   return err.error;
  }
  return
}

const updatePropList = async(data) => {
  if (data == null) {
    return
  }
  try {
    const res = await axios.put(GET_URL,data);
    console.log(res)
    return res.data
  } catch (err) {
   return err.error;
  }
  return
}

const getPropList = async() => {
  try {
    const res = await axios.get(GET_URL);
    console.log(res)
    return res.data
  } catch (err) {
   return err.error;
  }
  return
}
