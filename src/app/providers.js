
import { AuthProvider } from "@/hooks/useAuth"

import { Toaster } from 'react-hot-toast';
const Providers = ({children} ) =>{



    return (
        
        <AuthProvider>
        <Toaster />
        {children}
        </AuthProvider>
       
    )

}
export default  Providers