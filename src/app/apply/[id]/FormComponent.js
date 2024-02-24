"use client";
import { useState } from 'react';
import axiosInstance from '@/utils/axiosinstance';
import { useToken } from '@/hooks/useAuth';
import getUserIdFromToken from '@/utils/getUserId';
import toast from 'react-hot-toast';
import { useParams } from 'next/navigation'
const FileUploadComponent = () => {
  const [file, setFile] = useState(null);
  const token = useToken();
  const userId = getUserIdFromToken(token);
  const [loading , setLoading] = useState(false)
  let params =  useParams()
  let applicationTypeId = params.id
  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleFileUpload = async () => {
    try {
      setLoading(true)
      const formData = new FormData();
      formData.append('file', file);

      const response = await axiosInstance.post('/api/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

 
      const fileLocation = response.data.location;

      // Call the API to submit the application
     let responseApplication =  await axiosInstance.post('/api/applications', {
        userId: userId,
        document: fileLocation,
        application_typeId: applicationTypeId,
      });

      if (responseApplication.status == 201){

        toast.success('applied successfully')
      }

      else{

        toast.error('application failed')
      }
  
      setLoading(false)
      console.log('Application submitted successfully');
    } catch (error) {
      console.error('Error uploading file:', error.message);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-md shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Upload your document</h2>
      <div className="mb-4">
        <input type="file" onChange={handleFileChange} className="border p-2" />
      </div>
      <button
        onClick={handleFileUpload}
        className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none"
      >
     {loading ?"uploading ": "upload file"}
      </button>
    </div>
  );
};

export default FileUploadComponent;
