
'use client'

import useAuth, { useToken } from "@/hooks/useAuth";
import getRoleFromToken from "@/utils/getRole";

import { useEffect ,useState } from "react"
import axiosInstance from '@/utils/axiosinstance'
import getUserIdFromToken from "@/utils/getUserId"
import toast from 'react-hot-toast'
import { useRouter } from "next/navigation";
const HeroSection = () => {


  const token = useToken();

  if (token == null){

   return (
    <div className="bg-blue-500 text-white p-12 h-[92vh]">
  
    <div className="flex justify-center items-center">
      <img src='/mp1.jpg' height='300px' alt="Document Management Illustration" />
    </div>

 
  </div>
   )

  }
  let presentUser = getRoleFromToken(token);


  const [loading , setLoading] = useState(true)

  const [roles,setRoles] = useState(null)
  useEffect(() =>{


    const getAllRole = async () =>{

    let response =   await axiosInstance.get('/api/role')
    setRoles(response.data.data)
    setLoading(false)
    }
    getAllRole()

  
  } ,[])

    

  if (loading == true) {

    return (<>  loading...</>)
  }




  if (presentUser == 'user') {

    return (
      <div className="bg-blue-500 text-white p-12 h-[92vh]">
  
        <div className="flex justify-center items-center">
          <img src='/mp1.jpg' height='300px' alt="Document Management Illustration" />
        </div>
  
     
      </div>
    );
  }
  else {

    return (
      <>
  <ApplicationComponent  roles= {roles}/>

      </>
    )
  }
    
  };
  


  

const ApplicationComponent = ({roles}) =>{

    const [applications,setApplications] = useState(null)
    const token = useToken()
    const userId = getUserIdFromToken(token)
    const role = getRoleFromToken(token)


    

    const roled = roles.filter( (roledoc)  => roledoc.name == role)
 
    useEffect(()=>{


        const fetchALLApplications = async () =>{

            let response = await  axiosInstance.get(`/api/applications?roleId=${roled[0]._id}`)

            if (response.status != 200){

                toast.error('backend crashed ')
            }

            setApplications(response.data.data)
        }
        fetchALLApplications()
    },[])



    return (

        <>

        <h1  className="text-2xl font-bold p-2">  Applications </h1>


        <div className="flex flex-col gap-3 p-3" > 
        { applications == null ? " applications loading": 
        


        
        applications.map((a) =>{
               return  <ApplicationCard application={a} />

        })
    

    }

        </div>
       
        </>
    )
}


const ApplicationCard = (props)=> {
 
  const router = useRouter()
  const handleReject =  async () =>{
  
  let response =  await  axiosInstance.put(`/api/applications/${props.application._id}`,{status:'rejected'})

  if (response.status == 201){

    toast.success('updated ..')
    router.refresh()
  }
  }

  const handleApprove  = async () =>{

   
    let response =  await  axiosInstance.put(`/api/applications/${props.application._id}`,{status:'approved'})

    if (response.status == 201){
  
      toast.success('updated ..')
      router.refresh()
    }

  }
    return (

        <>

        <div className="shadow-md border-2 p-3 rounded  flex justify-between gap-5  py-5">
            {/* {application } */}

        {/* <div>
        {props.application._id}
          
        </div> */}


        <div>
        {props.application.userId.name}

        </div>
        <div>
        {props.application.application_typeId.name}

        </div>

        <div>

          <a  className="underline text-blue-500" href={props.application.document}> click here to download  </a>
        </div>


        <button className="bg-green-500 hover:bg-green-700 p-2 rounded capitalize text-white font-semibold " onClick={() =>{
         

         handleApprove()
        }}>

        approve
        </button>

        <button className="bg-red-500 hover:bg-red-700 p-2 rounded capitalize text-white font-semibold" onClick={() =>{
         

         handleReject()
        }}>

        reject
        </button>
        </div>

       
        </>
    )
}







  export default HeroSection;
  