import axios from 'axios';
import { auth } from '../../auth';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

// Helper function to create an Axios instance with auth headers from a server component
// The rest of the file's essentially just various fetches that are server side instead of client
// Because iirc it won't work / will work slowly with 'use client'
async function getAuthenticatedApi() {
  const session = await auth();
  console.log('getAuthenticatedApi: Session:', session);
  console.log('getAuthenticatedApi: API Headers:', session?.apiHeaders);
  
  // All tokens here use the session token from auth.js,
  // Which was passed by JWT, which was passed by the Authenticator
  const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    headers: {
      'access-token': session?.apiHeaders?.['access-token'],
      'client': session?.apiHeaders?.client,
      'uid': session?.apiHeaders?.uid,
      'expiry': session?.apiHeaders?.expiry,
      'token-type': session?.apiHeaders?.['token-type'],
    },
  });
  console.log('getAuthenticatedApi API:', api);
  return api;
}

export async function fetchChannels() {
  try {
    const api = await getAuthenticatedApi();
    const response = await api.get('/channels');
    console.log('fetchChannels response:', response.data.data);
    return response.data.data;
  } catch (error) {
    console.error('API Error fetching channels:', error);
    throw new Error('Failed to fetch channels.');
  }
}

export async function fetchUsers() {
  try {
    const api = await getAuthenticatedApi();
    const response = await api.get('/users');
    console.log('fetchUsers response:', response.data.data);
    return response.data.data;
  } catch (error) {
    console.error('API Error fetching users:', error);
    throw new Error('Failed to fetch users.');
  }
}

export async function fetchChannelMessages(channelId) {
  if (!channelId) return [];
  try {
    const api = await getAuthenticatedApi();
    const response = await api.get(`/messages?receiver_id=${channelId}&receiver_class=Channel`);
    console.log(`fetchChannelMessages${channelId} response:`, response.data.data);
    return response.data.data;
  } catch (error) {
    console.error(`API Error fetching messages for channel ${channelId}:`, error);
    throw new Error('Failed to fetch channel messages.');
  }
}

export async function fetchDirectMessages(userId) {
  if (!userId) return [];
  try {
    const api = await getAuthenticatedApi();
    const response = await api.get(`/messages?receiver_id=${userId}&receiver_class=User`);
    console.log(`fetchDirectMessages${userId} response:`, response.data.data);
    return response.data.data;
  } catch (error) {
    console.error(`API Error fetching messages for user ${userId}:`, error);
    throw new Error('Failed to fetch direct messages.');
  }
}

export async function createNewUser(formData) {
  if (!formData) return null;
  const email = formData.email;
  const password = formData.password;
  const verifyPassword = formData['password-confirm'];

  if (verifyPassword !== password) {
    return 'createNewUser Passwords do not match.';
  }
  
  const requestBody = {
    "email": email,
    "password": password,
    "password_confirmation": verifyPassword
  }

  try {
    const response = await axios.post(`${API_URL}/auth`, requestBody);
    if (response.status === 'success') {
      console.log(`API New user created successfully:`, response.status);
      return response;
    }
  } catch (error) {
    if (error) {
      console.error(`API Error creating new user ${requestBody}`, error);
      throw new Error(`Failed to submit user`);
    }
  }
}

// export async function fetchGenCode() {
//   try {
//     const response = await axios.get(`https://generate-secret.vercel.app/21`);
//     console.log(`fetchGenCode response:`, response.data);

//     if (!response.ok) {
//       throw new Error(`fetchGenCode status:`, response.ok);
//     }
    
//     const data = await response.String();
//     return data;
//   } catch (error) {
//     console.error(`FetchGenCode error:`, error);
//     throw new Error('Failed to fetch generated code');
//   }
// }

// export async function fetchGenCode() {
//   fetch(`https://generate-secret.vercel.app/21`)
//     .then(response => {
//       if (response.ok) {
//         return response.data;
//       }
//     })
//     .catch(error => {
//       console.error(`FetchGenCode error:`, error);
//       throw new Error('Failed to fetch generated code');
//     });
// }