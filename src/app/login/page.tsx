'use client'

import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginPage(){
    const router = useRouter()
    const [person, setPerson] = useState({
        email: "",
        password: ""
    })

    const [buttonDisabled, setButtonDisabled] = useState(false)
    const [loading, setLoading] = useState(false)

    const onLogin = async() => {
        try {
            setLoading(true)
            const response = await axios.post('/api/users/login', person)
            console.log('Login success', response.data)
            router.push('/profile')
        } catch (error: any) {
            console.log('Login failed')
            toast.error(error.message)
        }
    }

    useEffect(() => {
        if(person.email.length > 0 && person.password.length > 0){
            setButtonDisabled(false)
        }else{
            setButtonDisabled(true)
        }
    }, [person])
     
    return(
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1>{loading ? "Loading..." : "Login"}</h1>
            <hr />
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
                onClick={onLogin}
                className="p-2 border border-gray-300 rounded-lg 
                mb-4 focus:ouline-none focus:border-gray-600"
            >
                {buttonDisabled ? "Fill form first": "Login"}
            </button>
            <Link href="/signup">Visit Signup page</Link>
        </div>
    )
}