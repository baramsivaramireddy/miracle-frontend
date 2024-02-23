
"use client";

import { useToken } from "@/hooks/useAuth";
import Link from "next/link";
const Layout = ({children}) =>{

    return (
        <>
     

        <div className="h-1/6">
            <Header />
        </div>
        <div className="h-5/6">

            {children}
        </div>
        </>
    )
}

export default Layout

const Header = () =>{

    return (<>

        <div className="flex flex-row justify-between items-center">


        <div> 
        {/* title */}
        <Title></Title>
        
        </div>

        <div>

            {/* secondary nav */}
            <SecondaryNav />
        </div>

        <div>
            {/* user nav */}
            <UserNav />
        </div>
        </div>
    </>)
}

const Title = () =>{

    return (<>


                <p> APT</p>
        
    </>)
}

const SecondaryNav = () =>{

    return (<>

        {/* based on the type of user these section will differ */}

        <Link href={'/applications'}> Applications</Link>
    </>)
}

const UserNav = () =>{

       {/* if user is present appropriate section is present otherwise sign up and login */}
        const token = useToken();

        if (!token){

            return (<>
             <div>
                <Link href="/login"> Login</Link>
            </div>
            <div>
                <Link href={'/signup'}> signup</Link>
            </div>

            </>)
        }
    return (<>

     <p> user is present</p>

      
    </>)
}