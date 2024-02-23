
"use client";

import  useAuth,{ useToken } from "@/hooks/useAuth";
import Link from "next/link";
const Layout = ({children}) =>{

    return (
        <>
     

        <div className="h-1/6 shadow-sm border-b-2 px-3">
            <Header />
        </div>
        <div className="h-5/6">

            {children}
        </div>
        </>
    )
}

export default Layout
const Header = () => {
    return (
      <div className="flex justify-between items-center px-8 py-4 bg-white text-black">
        <div>
          {/* title */}
          <Title />
        </div>
        <div>
          {/* secondary nav */}
          <SecondaryNav />
        </div>
        <div className="flex gap-5">
          {/* user nav */}
          <UserNav />
        </div>
      </div>
    );
  };
  
  const Title = () => {
    return (
      <p className="text-2xl font-bold">APT</p>
    );
  };
  
  const SecondaryNav = () => {
    return (
      <Link href="/applications" className="underline text-blue-500">
        Applications
      </Link>
    );
  };
const UserNav = () => {
  const token = useToken();
  const  {logout}=useAuth()
  if (!token) {
    return (
      <div className="flex space-x-4">
        <button className="text-black bg-white border border-black hover:bg-gray-300 hover:text-black px-3 py-1 rounded">
          <Link href="/login">Login</Link>
        </button>
        <button className="text-black bg-white border border-black hover:bg-gray-300 hover:text-black px-3 py-1 rounded">
          <Link href="/signup">Signup</Link>
        </button>
      </div>
    );
  }

  // Styles for the logged-in state
  return (
    <div className="flex items-center">
      <p className="text-black mr-3">Welcome, user!</p>
      <button onClick={()=>{logout()}} className="text-black bg-white border border-black hover:bg-gray-300 hover:text-black px-3 py-1 rounded">
        Logout
      </button>
    </div>
  );
};
