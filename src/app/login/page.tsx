"use client"
import React, { useState } from 'react'
import { useForm, } from "react-hook-form";
import axios from 'axios';
import { useRouter } from "next/navigation";
import SignUp from '../signUp/signUp';

const Login = () => {
    
 const router=useRouter();
 const [showSignUp, setShowSignUp] = useState(false); 
 const { register,handleSubmit } = useForm();


  const fetchLogin=async(data:any)=>{
    try{
    const res=await axios.post("http://localhost:4000/login", {
      username: data.myUserName,
      password: data.myPassword,}
     
    )
    console.log("res",res)
       localStorage.setItem("token", res.data.token);
       localStorage.setItem("username", res.data.user.username);



    router.push('../dashboard')
    alert("logginedIn successfully")
    }
    catch(err){
      console.log("err",err)
      alert("Something went wrong ❌");
    }
  }
  if (showSignUp) {
    return <SignUp onClose={() => setShowSignUp(false)} />;
  }
    return (
    
          <div className='flex h-screen justify-center items-center bg-gradient-to-r from-[#d9a7c7] to-[#c7b3f3]'>
                     {/* {outer div} */}
   <div className='w-[900px] h-[500px] bg-white flex rounded-2xl'>
                     {/* leftSide */}
        <div
          className="w-1/2 bg-cover bg-center relative rounded-bl-2xl rounded-tl-2xl"
        style={{backgroundImage:"url('/bgCover.png')"}} >
       </div>          
                      {/* rightSide */}
          <div className='w-1/2 ' style={{display:"flex",alignItems:"center",justifyContent:"center"}}>
          <form  onSubmit={handleSubmit(fetchLogin)}
            className=' text-center p-9 w-100  bg-white rounded-2xl'>
                <h2 className="text-2xl font-bold p-2 mb-4">Login </h2>
                <input {...register("myUserName", { required: true })} placeholder="Name" className="w-full border border-gray-400 p-2 mb-9 rounded-xl outline-0" />
                <input {...register("myPassword", { required: true })} placeholder="Password" className="w-full border   border-gray-400  p-2  rounded-xl outline-0" />
                <button type='submit' className='border bg-purple-900 p-2 m-1 mt-4  text-white rounded-xl w-26  font-bold cursor-pointer'>
                    Login </button>
                    <p className="text-sm mt-4 text-gray-600">
            Don’t have an account?{" "}
            <span
              onClick={() => setShowSignUp(true)}
              className="text-[#4b2e83] font-semibold underline cursor-pointer hover:text-[#6a4caf]"
            >
              Sign Up
            </span>
          </p>
            </form>
        </div>
        </div>
        </div>
    )
}

export default Login





