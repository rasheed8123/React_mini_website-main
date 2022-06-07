import { useEffect, useState } from "react";
import { useNavigate ,useLocation} from "react-router-dom";
import "../Styles/Home.css"
export const Home=()=>{
const [data,setData]=useState([])
const [page1,setPage]=useState(1)
const [pagesize1,setpagesize]=useState(12)
const [totalPage,setTotal]=useState(1)

const search = useLocation().search;
  const page = new URLSearchParams(search).get('page')||page1
  const pagesize=new URLSearchParams(search).get('pagesize')||pagesize1
  const filter=new URLSearchParams(search).get('filter')||"color"
  const sort=new URLSearchParams(search).get('sort')||"model_year"
  const filtervalue=new URLSearchParams(search).get('filtervalue')||"Teal"
  const sortvalue=new URLSearchParams(search).get('sortvalue')||1
  const navigate=useNavigate()
//let url = `http://localhost:8080/`;

useEffect(()=>{
 const FetchData=async()=>{
     console.log("f",filter,filtervalue,sort,sortvalue)
  const data=await fetch(`https://reactmongo.herokuapp.com/?page=${page}&pagesize=${pagesize}`)
  //&${filter}=${filtervalue}&${sort}=${sortvalue}`)
  const d= await data.json()
  setData(d.home)
  setTotal(d.totalpage)
  
}
 FetchData()
},[page1,page])


const next=()=>{
    console.log(page1)
   if(page1!==totalPage){
   navigate(`/?page=${page1+1}&pagesize=12&${filter}=${filtervalue}&${sort}=${sortvalue}`)
   setPage(page1+1)
   }
   else{
   
    setPage(page1)
   }
   
}
const prev=()=>{
    if(page1>1){
        navigate(`/?page=${page1-1}&pagesize=12&${filter}=${filtervalue}&${sort}=${sortvalue}`)
        setPage(page1-1)
    }
  
    else
    setPage(page1)
   
}

const sortByPrice=(e)=>{
if(e.target.value==="low"){
 let d1= data.sort((a,b)=>+a.model_year-(+b.model_year) ) 
 setData([...data,d1])
}

else if(e.target.value==="high"){
 let d2= data.sort((a,b)=>+b.model_year-(+a.model_year) ) 
setData([...data,d2])
       
       
}
else{
    setData([...data])  
}
}


const filterdata=(e)=>{
  
  if(e.target.value==="less"){
    let d3=data.filter((a)=>{
        return a.color==="Red"
    })
   
    setData([...d3])
  }
  else if(e.target.value==="more"){
    let d4=data.filter((a)=>{
        return a.color==="Teal"
    })
    console.log("d4",d4)
    setData([...d4])
}
 


}

    return (
        <div style={{border:"1px solid green"}}>
        <div className="pricesort">
            <select onChange={sortByPrice}>
                <option value="">sort by Year</option>
                <option value="high">High to low</option>
                <option value="low">Low to high</option>
            </select>

            <select onChange={ filterdata}>
                <option value="">filter by color</option>
                <option value="less">Red</option>
                <option value="more">Teal</option>
            </select>
        </div>
        <div className="container"  style={{border:"1px solid yellow"}}>
         { data.map((e)=>{
             return(
                  <div key={e._id} className="box">
                   <div>Car Make{e.car_make}</div>
                   <div>Car Model{e.car_model}</div>
                   <div>Model Year : {e.model_year}</div>
                   <div>Color : {e.color}</div>
                 </div>
             )
         })}
         </div>
       <div style={{marginTop:"10%"}}>
          
           <button onClick={prev}>Prev</button>
           <button onClick={next}>Next</button>
       </div>
        </div>
    )
}