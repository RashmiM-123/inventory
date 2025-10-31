"use client"
import React, { useState } from 'react'
import SideBar from '../sideBar/page'
import CreateForm from '../createForm/page'
import { useEffect } from 'react'
import axios from 'axios'

const Dashboard = () => {
  const[showData,setShowData]=useState(false)
  const [products, setProducts] = useState([]);
  console.log("P",products)
  const[editProduct,setEditProduct]=useState(null)

     useEffect(() => {
    axios.get("http://localhost:4000/api/products")
      .then(res => setProducts(res.data))
      .catch(err => console.error("Error fetching products:", err));
  }, []);


  const handleEdit=(product:any)=>{
        setEditProduct(product)
        setShowData(true)
  }
  const handleDelete=async(productId:any)=>{
    try{
    const res=await axios.delete(`http://localhost:4000/api/loan/${productId}`);
     setProducts(res.data);
    alert("Deleted SuccessFully")
    }
    catch(error){
          console.error("Error deleting loan:", error);
    alert("Failed to delete. Please try again.");
    }
  }

  return (

    <div className='bg-gradient-to-r from-[#d9a7c7] to-[#c7b3f3] h-screen p-8'>
 <div className=" flex bg-white h-full rounded-3xl ">



    <SideBar/>

    <div className='flex flex-col text-center w-full pt-2 p-6 '>
      {!showData?(
        <>
        <div className='flex justify-between p-3 border-b border-gray-200'>
      <h2 className='font-medium text-2xl p-2'>DashBoard</h2>
    <div className='border border-gray-300 flex  rounded-lg w-fit p-2 gap-2'> 
        <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-6 w-5 text-gray-200"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1110.5 3a7.5 7.5 0 016.15 13.65z"
    />
  </svg>
      <input type='text' placeholder='Search.....here' className=' outline-0 border-0 '/>

     </div>
     </div>


    <div className="bg-gray-200 rounded-xl w-full  overflow-x-auto shadow-md flex justify-center m-4 p-2">
    <table className="   min-w-full text-center m-6">
  <thead>
    <tr className=" uppercase  text-gray-700 font-medium text-sm tracking-wider ">
      <th className=" px-4 py-4">Name</th>
      <th className=" px-4 py-4">Category</th>
      <th className="px-4 py-4">Description</th>
      <th className="px-4 py-4">Image</th>
      <th className=" px-4 py-4">Price</th>
      <th className=" px-4 py-4">Stock</th>
      <th className=" px-4 py-4">Action</th>
    </tr>
  </thead>
  <tbody className='text-gray-700 font-medium text-sm border-t border-gray-300 tracking-wider'>
   {products.map((product,index)=>(
   
    <tr key={index}>
      <td className=" px-4 py-2">{product.name}</td>
      <td className=" px-4 py-2">{product.category}</td>
      <td className=" px-4 py-2">{product.description}</td>
      <td className="px-4 py-2">
                            <img
                              src={`http://localhost:4000${product.image}`}
                              alt={product.name}
                              className="w-16 h-16 object-cover rounded-md"
                            />
                          </td>
      <td className=" px-4 py-2">{product.price}</td>
      <td className=" px-4 py-2">{product.stock}</td>
      <td className=" px-4 py-2 ">

        <button className='cursor-pointer bg-[#D5ABD4]  p-1 pr-2 pl-2 mr-3 rounded-md' onClick={()=>handleEdit(product)}>Edit</button>
        <button className='cursor-pointer bg-[#CAB1ED]  p-1 pr-2 pl-2 mr-3 rounded-md' onClick={()=>handleDelete(product.id)}>Delete</button>


      </td>
    </tr>))
}
  </tbody>
</table>
</div>

<div >
  <button className='bg-purple-900  text-white border p-2 rounded-md cursor-pointer hover:bg-purple-800'
  onClick={()=>setShowData(true)}>Create</button>

</div>
</>
):(
  <div className="flex justify-center items-center w-full h-full">
  {/* <CreateForm /> */}
<CreateForm 
  onClose={() => setShowData(false)} 
  editProduct={editProduct}
  setProducts={setProducts}  // ✅ pass setter to update list instantly
/>

</div>
)}
{/* jjj */}
</div>

</div>


    </div>

  )
}

export default Dashboard











