import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from 'next/headers';
import { Inter } from 'next/font/google'

import AppContext from "./components/AppContext";

import "antd/dist/reset.css";
import 'antd-mobile/es/global';
import './index.css';

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Auth NodeJS',
  description: 'Auth NextJS + NodeJS',
}

export default async function RootLayout({children})
{
  const supabase = createServerComponentClient({cookies});
  
  const {data} = await supabase.auth.getUser();

  return (
    <html lang="en">
      <body className={inter.className}>
        <AppContext sessionProp={data.user}>
          {children}
        </AppContext>
      </body>
    </html>
  )
}