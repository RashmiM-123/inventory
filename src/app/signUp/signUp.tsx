"use client"
import axios from 'axios';
import React from 'react'
import { useForm, FormProvider } from "react-hook-form";



const SignUp = ({onClose}) => {

const methods = useForm();
const { register, handleSubmit, reset } = methods;

   const handleregister=async(data:any)=>{
    try{
    await axios.post("http://localhost:4000/register",{
        username:data.username,
        password:data.Password
    })
    alert("register successfully")}
    catch(err){
        console.log("err",err)
    }
   }

  return (
    <div className='flex justify-center  h-screen items-center bg-gradient-to-r from-[#d9a7c7] to-[#fffcdc]'>
        <div className='flex justify-center flex-col p-9 bg-white rounded-xl w-80 h-60  '>
            <div  className='flex justify-between p-2'>
        <h2 className='text-xl font-bold'>Create Your Account</h2>
        <button className=' bg-white p-1 font-bold  text-xl cursor-pointer'   onClick={onClose}>  &times;</button>
        </div>
        <FormProvider {...methods}>
            <form className='flex flex-col items-center' onSubmit={handleSubmit(handleregister)}>
                <input {...register("username",{required:true})} placeholder='UserName' className='rounded-xl border p-2 m-2 w-full'/>
                <input {...register("Password",{required:true})} placeholder='Password' className='rounded-xl border p-2 m-2 w-full'/>
                <button type="submit"className='border m-2 w-30 bg-amber-950 text-white p-2 rounded-2xl cursor-pointer' >Sign Up</button>

            </form>
        </FormProvider>
    </div>
    </div>
  )
}

export default SignUp;