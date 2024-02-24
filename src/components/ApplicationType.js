"use client"
import axiosInstance from '@/utils/axiosinstance'

import {useState , useEffect} from 'react';

import { useToken } from '@/hooks/useAuth';
import Link from 'next/link';
const ApplicationsList = () =>{

    const [loading, setLoading] = useState(true);
    const [applicationTypes, setApplicationTypes] = useState([]);
    useEffect(() =>{

        const fetchApplicationTypes = async () => {
            try {
              const response = await axiosInstance.get('/api/applicationType');
      
              if (response.status === 200) {
                setApplicationTypes(response.data.data);
              } else {
                console.error('Failed to fetch application types');
              }
            } catch (error) {
              console.error('Error fetching application types:', error.message);
            } finally {
              setLoading(false);
            }
          };
      
          fetchApplicationTypes();
    } ,[])

    return (<>

        <div className="shadow-md p-4">
            <h2 className="text-2xl mb-4 text-red-500 font-bold">Application Types</h2>
            {loading ? (
                <p className="text-gray-500">Loading...</p>
            ) : (
                <div>
                {applicationTypes.map((application) => (


                    <ApplicationCard  key={application._id} id={application._id} name={application.name} description={application.description} />
                ))}
                </div>
            )}
            </div>

    </>)
}


const ApplicationCard = ({id,name, description}) =>{


  const token  = useToken()
    return (<div className='shadow-md border-2 m-5 p-5  flex items-center'>

        <div className='w-5/6'>
              <p className='text-xl font-semibold'> {name}</p>
                  <div className='text-blue-500'>
                      {description}
                  </div>
        </div>
          {token?  <div className='w-1/6'> 

              <Link href={'/apply/' +id } className='bg-green-500 text-white p-2  rounded  hover:bg-green-700'> APPLY</Link>
              </div>:''}
             

    </div>)
}
export default ApplicationsList;

