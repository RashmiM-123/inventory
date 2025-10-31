"use client";
import axios from "axios";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";


const Page = ({ onClose,editProduct ,setProducts}) => {
  const { register, handleSubmit, reset } = useForm();
   const router = useRouter();


  type ProductFormData = {
  name: string;
  category: string;
  description: string;
  price: string;
  stock: string;
  image: FileList;
};

console.log("editProduct",editProduct)

useEffect(() => {
  if (editProduct) {
    reset({
      name: editProduct.name,
      category: editProduct.category,
      description: editProduct.description,
      price: editProduct.price,
      stock: editProduct.stock,
    });
  }
}, [editProduct, reset]);

  const handleSave = async (data) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("category", data.category);
    formData.append("description", data.description);
    formData.append("price", data.price);
    formData.append("stock", data.stock);

    if (data.image?.[0]) {
      formData.append("image", data.image[0]);
    }

    try {
      let res;
      if (editProduct) {
        
        res=await axios.put(`http://localhost:4000/api/products/${editProduct.id}`, formData);

        alert("✅ Product updated successfully!");
      } else {
         res=await axios.post("http://localhost:4000/api/products", formData);
        alert("✅ Product created successfully!");
      }
       setProducts(res.data);
      reset();
      onClose();
    } catch (err) {
      console.error(err);
      alert("❌ Error saving product");
    }
  };


  return (
    <div className="fixed inset-0 z-50 flex justify-center items-center p-4">
      {/* <div> */}
      <div className="relative w-full max-w-md">
      {/* <div> */}
   <button
           onClick={onClose}
  aria-label="Close form"
          className="absolute -top-4 -right-1    p-1.5 hover:scale-105 transition"
        >
      
          <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24" aria-hidden="true">
            <circle cx="12" cy="12" r="12" fill="#6b21a8"/>
            <path d="M8.5 8.5 L15.5 15.5 M15.5 8.5 L8.5 15.5" stroke="#fff" strokeWidth="1.6" strokeLinecap="round"/>
          </svg>
        </button>
<form
      onSubmit={handleSubmit(handleSave)}
      className="flex flex-col p-4 shadow-2xl gap-y-5 w-full max-w-md rounded-2xl bg-gray-100 items-center"
    >
      <h2 className="font-bold text-gray-600 text-lg mb-2">Create Product Form</h2>

      <input {...register("name", { required: true })} placeholder="Product Name" className="border border-gray-300 p-2 rounded-md w-full outline-0" />

      <input {...register("category", { required: true })} placeholder="Product Category" className="border border-gray-300 p-2 rounded-md w-full outline-0" />

      <textarea {...register("description", { required: true })} placeholder="Product Description" className="border border-gray-300 p-2 rounded-md w-full outline-0" />

      <input {...register("price", { required: true })} placeholder="Price" type="number" className="border border-gray-300 p-2 rounded-md w-full outline-0" />

      <select {...register("stock", { required: true })} className="border border-gray-300 p-2 rounded-md w-full text-gray-600 outline-0">
        <option value="Available">Available</option>
        <option value="Out Of Stock">Out Of Stock</option>
      </select>

      <input type="file" {...register("image")} accept="image/*" className="border border-gray-300 p-2 rounded-md w-full text-gray-600 outline-0" />

      <button type="submit" className="p-2 rounded-md w-32 bg-purple-900 text-white">
        {editProduct ? "Update" : "Save"}
      </button>
    </form>
</div>
</div>
  );

};

export default Page;


