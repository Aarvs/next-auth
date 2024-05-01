'use client'

import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function SignupPage(){
    const router = useRouter()
    const [person, setPerson] = useState({
        email: "",
        password: "", 
        username: ""
    })

    const [buttonDisabled, setButtonDisabled] = useState(false)
    const [loading, setLoading] = useState(false)

    const onSignup = async() => {
        try {
            setLoading(true)
            const response = await axios.post('/api/users/signup', person)
            console.log('Signup success', response.data)
            router.push('/login')
        } catch (error: any) {
            console.log('Signup failed')
            toast.error(error.message)
        }
    }

    useEffect(() => {
        if(person.email.length > 0 && person.password.length > 0 && person.username.length > 0){
            setButtonDisabled(false)
        }else{
            setButtonDisabled(true)
        }
    }, [person])
     
    return(
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1>{loading ? "Loading..." : "Signup"}</h1>
            <hr />
            <label htmlFor="username">username</label>
            <input 
                className="p-2 border border-gray-300 rounded-lg 
                mb-4 focus:outline-none focus:border-gray-600 
                text-black"
                type="text" 
                id="username" 
                value={person.username} 
                onChange={({target}) => setPerson({...person, username: target.value})}
                placeholder="username"
            />

            <label htmlFor="email">email</label>
            <input 
                className="p-2 border border-gray-300 rounded-lg 
                mb-4 focus:outline-none focus:border-gray-600 
                text-black"
                type="text" 
                id="email" 
                value={person.email} 
                onChange={({target}) => setPerson({...person, email: target.value})}
                placeholder="email"
            />
            <label htmlFor="password">password</label>
            <input 
                className="p-2 border border-gray-300 rounded-lg 
                mb-4 focus:outline-none focus:border-gray-600 
                text-black"
                type="password" 
                id="password" 
                value={person.password} 
                onChange={({target}) => setPerson({...person, password: target.value})}
                placeholder="password"
            />

            <button
                onClick={onSignup}
                className="p-2 border border-gray-300 rounded-lg 
                mb-4 focus:ouline-none focus:border-gray-600"
            >
                {buttonDisabled ? "Fill form first": "Signup"}
            </button>
            <Link href="/login">Visit login page</Link>
        </div>
    )
}

