import { Inter } from "next/font/google";
import "./global.css"

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "APPLICATION TRACKING SYSTEM",
  description: "CREATED IN A HACKATHON ",
};


import Providers from "./providers";
import Layout from "@/components/Layout";
export default function RootLayout({ children }) {
  return (
    <html lang="en">

  
    <body className={inter.className}>
    

    <Providers>
    <Layout>

    {children}


    </Layout>


    </Providers>
    </body>

    </html>
  );
}
