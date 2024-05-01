'use client'

import React, { useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';

export default function profilePage(){
    const router = useRouter()
    const [data, setData] = useState("nothing")

    const getPersonDetails = async() => {
        const response = await axios.post("api/users/me")
        console.log(response.data)
        setData(response.data.data._id)
    }

    const logout = async() => {
        try {
            await axios.post("api/users/logout")
            toast.success("successfully logout")
            router.push("/login")
        } catch (error: any) {
            console.log(error.message)
            toast.error(error.message)
        }
    }
    return(
        <div className='flex flex-col items-center justify-center 
        min-h-screen py-2'>
            <h1>Person Profile</h1>
            <hr />
            <h2>{data === "nothing" ? "Empty" : <Link href=
            {`/profile/${data}`}>{data}</Link>}</h2>
            <hr />
            <button className='bg-blue-500 mt-4 hover: bg-blue-700 
            text-white font-bold py-2 px-4 rounded'
            onClick={logout}
            >Logout</button>
            <button className='bg-green-500 mt-4 hover: bg-green-500 
            text-white font-bold py-2 px-4 rounded'
            onClick={getPersonDetails}
            >Get Person Details</button>
        </div>
    )
};
