
'use client'
import { useEffect ,useState } from "react"
import axiosInstance from '@/utils/axiosinstance'
import { useToken } from "@/hooks/useAuth"
import getUserIdFromToken from "@/utils/getUserId"
import { Arapey } from "next/font/google"
const ApplicationComponent = () =>{

    const [applications,setApplications] = useState(null)
    const token = useToken()
    const userId = getUserIdFromToken(token)
    useEffect(()=>{


        const fetchALLApplications = async () =>{

            let response = await  axiosInstance.get(`/api/applications?userId=${userId}`)

            if (response.status != 200){

                toast.error('backend crashed ')
            }

            setApplications(response.data.data)
        }
        fetchALLApplications()
    },[])



    return (

        <>

        <h1  className="text-2xl font-bold p-2"> My Applications </h1>


        <div className="flex flex-col gap-3 p-3" > 
        { applications == null ? "loading": 
        
        applications.map((a) =>{
               return  <ApplicationCard application={a} />

        })
    

    }

        </div>
       
        </>
    )
}


const ApplicationCard = (props)=> {
    let {application} =  props;

    let array = []

    for (let i = 0 ; i< application.currentStage.order; i++){

        array.push(i)
    }
    return (

        <>

        <div className="shadow-md border-2 p-3 ">
            {/* {application } */}

           <div className="flex justify-between">

           <div className="font-semibold">

                {application.application_typeId.name}
             </div>

            <div>
                   <span  className="font-semibold"> status:</span>  {application.status}
            </div>
            <div>

               <span  className="font-semibold">  stage name : </span> {application.currentStage.stageName}
            </div>
           </div>

            <div>

            {/*  tracker */}
                <h1 className="font-semibold mt-5  text-red-500 "> Track stages </h1>
       

                <div>

                {array.map((i ,index) =>(<div  key={index} className="bg-green-500 w-3 h-3 rounded-full">  </div>))}
                </div>
            </div>
        </div>

        </>
    )
}


const Tracking = () =>{

    return (

        <>


        </>
    )
}
export default ApplicationComponent;