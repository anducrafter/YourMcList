"use server"
import Link from "next/link";
import Header from "./compoments/header";
import { login } from "@/lib/actions/auth";
import { ButtonSign } from "./compoments/dynamic/ButtonSign";
import { getSession } from "next-auth/react";
import { auth } from "@/auth";


export default async function Home() { 
 
  const session = await auth()
 
  return (
    

   
<main>
 

  <Link href="/users">Users</Link>
</main>
  );
}
