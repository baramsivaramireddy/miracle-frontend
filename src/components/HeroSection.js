
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
  


  const ApplicationComponent = ({ roles }) => {
    const [applications, setApplications] = useState(null);
    const token = useToken();
    const userId = getUserIdFromToken(token);
    const role = getRoleFromToken(token);
  
    const roled = roles.filter((roledoc) => roledoc.name === role);
  
    useEffect(() => {
      const fetchALLApplications = async () => {
        try {
          let response = await axiosInstance.get(`/api/applications?roleId=${roled[0]._id}`);
  
          if (response.status !== 200) {
            toast.error('Backend crashed');
          }
  
          setApplications(response.data.data);
        } catch (error) {
          console.error(error);
        }
      };
  
      fetchALLApplications();
    }, []);
  
    return (
      <>
        <h1 className="text-2xl font-bold p-2">Applications</h1>
  
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-300">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b">User Name</th>
                <th className="py-2 px-4 border-b">Application Type</th>
                <th className="py-2 px-4 border-b">Download Document</th>
                <th className="py-2 px-4 border-b">Actions</th>
              </tr>
            </thead>
            <tbody>
              {applications === null ? (
                <tr>
                  <td colSpan="4" className="p-4 text-center">
                    Applications loading...
                  </td>
                </tr>
              ) : (
                applications.map((a) => <ApplicationCard key={a._id} application={a} />)
              )}
            </tbody>
          </table>
        </div>
      </>
    );
  };
  
  const ApplicationCard = (props) => {
    const router = useRouter();
  
    const handleReject = async () => {
      let response = await axiosInstance.put(`/api/applications/${props.application._id}`, {
        status: 'rejected',
      });
      location.reload();
      if (response.status === 201) {
        toast.success('Application rejected');
       
      }
    };
  
    const handleApprove = async () => {
      let response = await axiosInstance.put(`/api/applications/${props.application._id}`, {
        status: 'approved',
      });
  
      location.reload();
      if (response.status === 201) {
        toast.success('Application approved');
       
      }
    };
  
    return (
      <tr className="shadow-md border-2 p-3 rounded">
        <td className="py-2 px-4">{props.application.userId.name}</td>
        <td className="py-2 px-4">{props.application.application_typeId.name}</td>
        <td className="py-2 px-4">
          <a className="underline text-blue-500" href={props.application.document}>
            Click here to download
          </a>
        </td>
        <td className="py-2 px-4">
          <button
            className="bg-green-500 hover:bg-green-700 p-2 rounded capitalize text-white font-semibold"
            onClick={handleApprove}
          >
            Approve
          </button>
          <button
            className="bg-red-500 hover:bg-red-700 p-2 rounded capitalize text-white font-semibold ml-2"
            onClick={handleReject}
          >
            Reject
          </button>
        </td>
      </tr>
    );
  };
  
 




  export default HeroSection;
  