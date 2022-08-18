const proptable = [
 {name:"name1",id:"id1",value:"value1",updateat:"2022/08/13 00:00:00"},
 {name:"name2",id:"id2",value:"value2",updateat:"2022/08/13 00:00:00"},
 {name:"name3",id:"id3",value:"value3",updateat:"2022/08/13 00:00:00"},
 {name:"name4",id:"id4",value:"value4",updateat:"2022/08/13 00:00:00"},
 {name:"name5",id:"id5",value:"value5",updateat:"2022/08/13 00:00:00"},
 {name:"name6",id:"id6",value:"value6",updateat:"2022/08/13 00:00:00"},
 {name:"name7",id:"id7",value:"value7",updateat:"2022/08/13 00:00:00"},
 {name:"name8",id:"id8",value:"value8",updateat:"2022/08/13 00:00:00"},
 {name:"name9",id:"id9",value:"value9",updateat:"2022/08/13 00:00:00"},
 {name:"name10",id:"id10",value:"value10",updateat:"2022/08/13 00:00:00"},
 {name:"name11",id:"id11",value:"value11",updateat:"2022/08/13 00:00:00"},
];

export const usePropQuery = () => {
  const data = proptable;
  //const isLoading = false;
  //const error = false;
  //return [data,isLoading,error];
  return {data};
};
