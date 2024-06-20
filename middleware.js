// import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";
          {/*todo: uncomment*/}

// export async function middleware(req)
// {
//   const res = NextResponse.next();

//   const supabase = createMiddlewareClient({req, res});

//   await supabase.auth.getSession();

//   return res;
// }

export async function middleware(req)
{
  const res = NextResponse.next();

  return res;
}