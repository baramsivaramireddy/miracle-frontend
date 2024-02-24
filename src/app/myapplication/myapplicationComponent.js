
'use client'
import { useEffect ,useState } from "react"
import axiosInstance from '@/utils/axiosinstance'
import { useToken } from "@/hooks/useAuth"
import getUserIdFromToken from "@/utils/getUserId"
const ApplicationComponent = () => {
    const [applications, setApplications] = useState(null);
    const token = useToken();
    const userId = getUserIdFromToken(token);
  
    useEffect(() => {
      const fetchALLApplications = async () => {
        try {
          let response = await axiosInstance.get(`/api/applications?userId=${userId}`);
  
          if (response.status !== 200) {
            // Use proper error handling
            toast.error('Backend crashed');
          }
  
          setApplications(response.data.data);
        } catch (error) {
          // Handle error appropriately
          console.error(error);
        }
      };
  
      fetchALLApplications();
    }, []);
  
    return (
      <>
        <h1 className="text-2xl font-bold p-2">My Applications</h1>
  
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-300">
            <thead>
              <tr>
                <th className="py-2  border-b">Application Type</th>
                <th className="py-2  border-b">Status</th>
                <th className="py-2  border-b">Stage Name</th>
                <th className="py-2  border-b">Track Stages</th>
              </tr>
            </thead>
            <tbody>
              {applications === null ? (
                <tr>
                  <td colSpan="4" className="p-4 text-center">
                    Loading...
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
  
  const ApplicationCard = ({ application }) => {
    const trackerArray = Array.from({ length: application.currentStage.order }, (_, index) => index);
  
    return (
      <tr className="shadow-md border-2 p-3">
        <td className="py-2 px-4">
          <div className="font-semibold">{application.application_typeId.name}</div>
        </td>
        <td className="py-2 px-4">
          <div>{application.status}</div>
        </td>
        <td className="py-2 px-4">
          <div>{application.currentStage.stageName}</div>
        </td>
        <td className="py-2 px-4">
          <div className="flex gap-5">
            {trackerArray.map((i, index) => (
              <div key={index} className="bg-green-500 w-3 h-3 rounded-full mx-1"></div>
            ))}
          </div>
        </td>
      </tr>
    );
  };
  
  export default ApplicationComponent;