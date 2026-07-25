import logo from "/iconschool.jpg";
import Options from "./option"
import Question from "./question";
import { FiMenu } from "react-icons/fi";
import { useState } from "react";
import { RxCross2 } from "react-icons/rx";
import SetQuiz from "./setQuiz";
import ManageQuiz from "./manageQuiz";
import { useNavigate } from "react-router-dom";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
gsap.registerPlugin(useGSAP)
import { useRef } from "react";
import Team from "./team";
import { useQuiz } from "../context/quizContext";
import RapidRound from "../round/rapidRound";
export default function QuizHome() {

 
  const navigate = useNavigate();
    const [isOpen,setOpen] = useState(false)
  const listItem = ["Quiz", "Set Quiz" , "manage quiz","Team"]
  const [display, setDisplay]=useState("")
  const {selectedRound} =useQuiz()
  const navItem = useRef<HTMLDivElement>(null);
const tl = useRef<gsap.core.Timeline | null>(null);
const handleToggle =()=>{
  gsap.to(navItem.current,{
    x:-300,
    opacity:0,
    duration:1,
    onComplete:()=>{
      setOpen(prev=>!prev)
    }
  })
}

useGSAP(
  () => {
    if (!isOpen || !navItem.current) return;

    tl.current=gsap.timeline()
    
   tl.current = gsap.timeline();

tl.current.from(navItem.current, {
  x: -150,
  duration: 0.4,
  ease: "power3.out",
});

tl.current.from(
  navItem.current.children,
  {
    x: -100,
    opacity: 0,
    stagger: 0.1,
  },
  "-=0.2"
);
    

    
  }
  
  
  ,
  { dependencies: [isOpen] }
);
const handleLogout = () => {
  localStorage.clear(); // Remove everything

  navigate("/", { replace: true });
};
  return (
     <div className="bg-[#1F3662] w-full min-h-screen relative">

      

         <FiMenu className="absolute top-12  left-12 text-white "  size={24} onClick={()=> setOpen(!isOpen)
    }/>
        { 
          
          
          isOpen && <div className="absolute bg-slate-200 top-0 bottom-0 w-48 pt-16 z-100" ref={navItem}>
              
              <RxCross2   className={`absolute top-8 right-6 cursor-pointer`} size={24} onClick={handleToggle}/>


             {
              
              listItem.map((item)=>(

                <div className="bg-[#1F3662] mt-2 px-2 py-2 font-semibold text-white rounded mx-2 cursor-pointer"
                 onClick={ ()=> setDisplay(item)}
                key={item}  
                >
                  {item}



                  </div>
              ))


             }
             <div className="bg-[#1F3662] mt-2 px-2 py-2 font-semibold text-white rounded mx-2 cursor-pointer"
                  onClick={handleLogout} >
                
                  Logout
                    </div>

      
         </div>}
      <div className="text-white w-full  h-32  text-sm md:text-lg lg:text-4xl flex  flex-col md:flex-row items-center " onClick={()=> setOpen(false)}>
        
        <div className="w-full md:w-2/4 flex   flex-col justify-end px-4 font-bold  h-full items-center md:px-24  text-yellow-300 ">
         QUIZ COMPETITION-2083
         <p className="text-lg text-white">
          science and mathematics
         </p>
        </div>

        <div className="md:w-2/4 w-full h-full flex items-center justify-center relative ">
       
          <div className=" bg-white text-blue-600 md:h-1/2 h-[38px] absolute right-0 z-0  flex items-center ">
             <img
            src={logo}
            alt="School Logo"
            className="md:h-28 md:w-28 h-14 w-14 object-cover z-2 md:-translate-x-12 -translate-x-8"
            style={{
              clipPath: "circle(40% at 50% 53%)",
            }}
          />
            <div className="-translate-x-8 text-[12px] md:text-2xl lg:text-4xl w-64 md:w-full ">
              SUNFLOWER ACADEMY 
              <div className="w-full h-1 bg-blue-700">

              </div>
              <p  className="md:font-bold font-normal text-center text-[12px] md:text-[14px] lg:text-[16px]  ">
                TARKESHWORE-06, KATHMANDU
              </p>

              
            </div>

          </div>
        </div>

      </div>

   
          <div className="w-full  flex justify-center px-4 font-bold  h-full items-center text-white text-4xl" >
              
        </div>
{
  /*   compoonents for displaying questions and options for selecting    */



}
{
  display ==="" &&
   <div className="w-full flex justify-center pt-12 text-white" onClick={()=> setOpen(false)}> 
    
    Welcome to quiz COMPETITION
    
     </div>

    
 





}
{
  display === "Quiz" &&
   <div className="w-full flex flex-col md:flex-row z-10" onClick={()=> setOpen(false)}>
  <div className="w-full md:w-2/3">
  {
    selectedRound === "rapid" ? <RapidRound />: <Question />
  }
   
  </div>

  <div className="w-full md:w-1/3">
    <Options />
  </div>
</div>

}


{
  display ==="Set Quiz" &&  <div className=" relative z-50"> <SetQuiz />  </div>
}


{
  display ==="manage quiz" &&  <div className=" relative z-50"> <ManageQuiz />  </div>
}


{
  display ==="Team" &&  <div className=" relative z-50"> <Team setDisplay={setDisplay} />  </div>
}


    

       <div className="absolute w-full h-48 bottom-0 z-0">


               <div
                className="bg-yellow-300 w-72 h-48 absolute right-0 flex items-end justify-end p-6 z-4"
                style={{
                  clipPath: "polygon(100% 0, 100% 100%, 0 100%)",
                }}
              >
                <p className="text-blue-700 font-bold">
                  sfa2061@gmail.com
                </p>
              </div>


                    <div className="absolute w-full bg-[#245FCC] h-2 bottom-0 z-0">



                  </div>




       </div>


    </div>
  );
}