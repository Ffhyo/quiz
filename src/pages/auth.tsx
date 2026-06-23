import { BiChevronRight } from "react-icons/bi";
import heroImg from "../assets/school.jpg"
import logo from "/iconschool.jpg";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
export function Auth( ){
  const navigate = useNavigate();

  const [email , setEmail] =useState('')
  const [password,setPassword] =useState('')
 const handleLogin = async (e: React.FormEvent) => {
  e.preventDefault();

  try {
    const response = await fetch("https://quizbackend-yo87.onrender.com/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    const data = await response.json();
    console.log(response.status)

    if (response.ok) {
      // Assuming your backend returns:
      // { token: "jwt-token-here" }

      localStorage.setItem("token",data.data.token)
     

      console.log("Login successful");
     navigate("/quiz")
    } else {
      console.log(data.message);
    }
  } catch (error) {
    console.error("Login failed:", error);
  }
};
  return (
    <div className="w-full flex justify-center items-center h-screen ">
       <div className=" bg-white text-blue-600 md:h-16 h-[38px] absolute top-12 left-0  flex items-center  z-20">
          
            <div className="translate-x-8 text-[12px] md:text-2xl lg:text-2xl w-64 md:w-full ">
              SUNFLOWER ACADEMY 
              <div className="w-full h-1 bg-blue-700">

              </div>
              <p  className="md:font-bold font-normal text-center text-[12px] md:text-[14px] lg:text-[16px]  ">
                TARKESHWORE-06, KATHMANDU
              </p>

              
            </div>
               <img
            src={logo}
            alt="School Logo"
            className="md:h-28 md:w-28 h-14 w-14 object-cover  translate-x-8"
            style={{
              clipPath: "circle(40% at 50% 53%)",
            }}
          />

          </div>


      <div
  className="relative w-full h-screen bg-cover bg-center"
  style={{ backgroundImage: `url(${heroImg})` }}
>
  {/* Overlay */}
  <div className="absolute inset-0 bg-blue-900/30"></div>

  {/* Content on top of image */}
  <div className="relative z-10 flex items-center justify-center h-full text-white ">
    <div className="max-w-lg text-center">
      <h1 className="text-5xl font-bold mb-4">Welcome Back</h1>
      <p className="text-lg font-medium tex-t-gray-200">
        Manage your school activities such as quizzes .
      </p>
    </div>
  </div>
</div>
      <div className=" w-128 h-screen flex justify-center items-center gap-4 bg-white">
         <form className="w-2/3 p-4" onSubmit={handleLogin}>
          <h1 className="text-2xl font-bold text-blue-800 mb-4 text-center ">LOG IN </h1>

         <label className="mt-2">
  <input
    type="email"
className="w-full p-2 mb-4 border-b-3 border-gray-300 focus:outline-none focus:border-blue-800 bg-transparent transition-colors"    placeholder="Email"
 onChange={(e)=>setEmail(e.target.value)}
 />
</label>

<label>
  <input
    type="password"
className="w-full p-2 mb-4 border-b-3 border-gray-300 focus:outline-none focus:border-blue-800 bg-transparent transition-colors"    placeholder="Password"
 
 onChange={(e)=>setPassword(e.target.value)}
 />
</label>
<div className="flex  flex-col w-full items-center gap-4">

<button className="bg-blue-800 text-white  p-2 px-8 rounded-full flex items-center gap-2 hover:scale-105 transition-transform" type="submit">Log In <BiChevronRight className="translate-y-[1px]" size={24} /></button>
<p className="text-sm text-gray-600 hover:text-blue-800 cursor-pointer">Forget Password?</p>

</div>
          


         </form>


       </div>
      
    </div>
  );
}