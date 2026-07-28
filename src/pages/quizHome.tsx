
import Options from "./option"
import Question from "./question";
import { FiArrowRight} from "react-icons/fi";
import { useState,useEffect } from "react";
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
import RapidRound from "../round/rapidRound"
import schoolIcon from "../assets/schoolicon.png"
export default function QuizHome() {

 
  const navigate = useNavigate();
    const [isOpen,setOpen] = useState(false)
  const listItem = ["Quiz", "Set Quiz" , "manage quiz","Team"]
  const [display, setDisplay]=useState("")
  const {selectedRound} =useQuiz()

  const [showArrow, setShowArrow] = useState(false);

useEffect(() => {
  let timer: ReturnType<typeof setTimeout>;

  const show = () => {
    setShowArrow(true);

    clearTimeout(timer);

    timer = setTimeout(() => {
      setShowArrow(false);
    }, 2000);
  };

  
  window.addEventListener("click", show);

  return () => {
    
    window.removeEventListener("click", show);
    clearTimeout(timer);
  };
}, []);
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

           <div className=" w-full h-48  ">


               <div
                className="bg-yellow-300 w-72 
                 h-48 absolute left-0 flex items-end justify-end p-6 z-4"
                style={{
                  clipPath: "polygon(0 0, 100% 0, 0 100%)",
                }}
              >

                <img src={schoolIcon}  className="w-18 h-18 absolute top-6 left-6 rounded-full"/>
                 
              </div>


                    <div className="absolute w-full bg-[#245FCC] h-2 ">



                  </div>




       </div>

   <FiArrowRight
  className={`absolute top-1/2 left-6 z-100 border text-white w-8 h-8 rounded-full
     cursor-pointer transition-opacity duration-300 ${
    showArrow ? "opacity-100" : "opacity-0 pointer-events-none"
  }`}
  size={24}
  onClick={() => setOpen(!isOpen)}
/>
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
      <div className="text-white w-full  h-32  absolute top-0  left-24  translate-x-48  text-sm md:text-lg lg:text-4xl flex  flex-col md:flex-row items-center " onClick={()=> setOpen(false)}>
        
        <div className="w-full md:w-2/4 flex   flex-col justify-end px-4 font-bold  h-full items-center md:px-24  text-yellow-300 ">
         QUIZ COMPETITION-2083
         <p className="text-lg text-white">
          Science and Mathematics
         </p>
        </div>


      </div>

   
{
  /*   compoonents for displaying questions and options for selecting    */



}
{
  display ==="" &&
   <div className="w-full flex justify-center pt-12 text-white" onClick={()=> setOpen(false)}> 
    
    WElCOME TO QUIZ COMPETITION
    
     </div>

    
 





}
{
  display === "Quiz" &&
   <div className="w-full flex flex-col md:flex-row z-10 -translate-y-16" onClick={()=> setOpen(false)}>
  <div className="w-full md:w-2/3">
  {
    selectedRound === "rapid" ? <RapidRound />: <Question />
  }
   
  </div>

  <div className="w-full md:w-1/3 relative z-50">
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
              <div className="absolute bottom-6 flex  flex-col px-4 font-bold text-yellow-300 text-3xl">
                SUNFLOWER <span>ACADEMY</span>
              </div>


                    <div className="absolute w-full bg-[#245FCC] h-2 bottom-0 z-0">



                  </div>




       </div>


    </div>
  );
}