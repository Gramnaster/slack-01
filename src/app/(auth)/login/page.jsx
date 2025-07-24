'use client';
import { useState } from 'react';
// import './Login.css';
import axios from "axios";
import { useRouter } from "next/navigation";
import { useData } from "@/context/DataProvider";
import React from 'react';
// import Navigation from '@/components/Navigation/Navigation';

// NEXT uses this for .env 
const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // NEXT uses this for Router
  const router = useRouter(); 
  const { handleHeaders, handleLogin } = useData();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const loginCredentials = {
        email,
        password
      }

      const response = await axios.post(`${API_URL}/auth/sign_in`, loginCredentials);
      const { data, headers } = response;
      
      if(data.data && headers) {
        handleHeaders(headers);
        handleLogin(true);
        router.push('/'); // NEXT navigation
      }

    } catch (error) {
      if(error) {
        alert(`Invalid email or password: ${error}`);
      }
    }
  };

  return (
      <div style={{ textAlign: "center" }}>
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Email:</label>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label>Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit">Login</button>
        </form>
      </div>
  );
}