import axios from 'axios';
import { auth } from '../../auth';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

// Helper function to create an Axios instance with auth headers from a server component
// The rest of the file's essentially just various fetches that are server side instead of client
// Because iirc it won't work / will work slowly with 'use client'
async function getAuthenticatedApi(session) {
  // Checks session instead of revalidating every damn time lmao
  if (!session?.user?.apiHeaders) {
    console.error('getAuthenticatedApi: No session or API headers found.');
    throw new Error('Authentication required.');
  }
  
  // const session = await auth();
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

export async function fetchChannels(session) {
  try {
    const api = await getAuthenticatedApi(session);
    const response = await api.get('/channels');
    console.log('fetchChannels response:', response.data.data);
    return response.data.data;
  } catch (error) {
    console.error('API Error fetching channels:', error);
    throw new Error('Failed to fetch channels.');
  }
}

export async function fetchUsers(session) {
  try {
    const api = await getAuthenticatedApi(session);
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

export async function createNewUser(requestBody) {
  console.log('createNewUser data received:', requestBody);
  
  if (!requestBody) throw new Error('createNewUser No form data found');

  // if (data) {
  //   const formData =  new FormData(data);
  //   console.log('createNewUser formData:', formData);
  //   const email = formData.email;
  //   const password = formData.password;
  //   const verifyPassword = formData['password-confirm'];

  //   if (!email || !password || !verifyPassword) {
  //     throw new Error('createNewUser Form incomplete!');
  //   }
    
  //   if (verifyPassword !== password) {
  //     throw new Error('createNewUser Passwords do not match.');
  //   }
    
  //   requestBody = {
  //     "email": email,
  //     "password": password,
  //     "password_confirmation": verifyPassword
  //   }

  //   console.log(`createNewUser requestBody:`, requestBody);
  // }

  try {
    const response = await axios.post(`${API_URL}/auth`, requestBody);
    if (response.data && response.data.status === 'success') {
      console.log(`API New user created successfully:`, response.status);
      return response.data;
    }
  } catch (error) {
    // if (error) {
    //   // Check .length of all error props
    //   const fullMsgErrors = error.response.data.errors.full_messages;
    //   // console.error(`Full Message Error:`, fullMsgError[0]);
    //   fullMsgErrors.forEach((message, index) => {
    //       console.error(`Error ${index + 1}: ${message}`);
    //   });
    //   // console.error(`API Error:`, error);
    //   // console.error(`API Error creating new user:`, fullMsgError[0]);
    //   // console.error(`API Error creating new user ${requestBody.email}`, typeof error.response.data.errors);
    //   // console.error(`API Error with email: ${error.response.data.errors.email}`, typeof error.response.data.errors.email);
    //   // console.error(`API Error with password: ${error.response.data.errors.password}`, typeof error.response.data.errors.password);
    //   // throw new Error(`Failed to submit user`);
    //   return error;
    if (error.response?.data?.errors?.full_messages) {
      const messages = error.response.data.errors.full_messages;
      // Log each error for debugging
      messages.forEach((message, index) => {
        console.error(`API Error ${index + 1}: ${message}`);
      });
      // Join the messages and throw a new error that the UI can catch
      throw new Error(messages.join('\n'));
    } else {
      // Handle unexpected errors
      console.error('An unexpected API error occurred:', error);
      throw new Error('Failed to create user due to an unexpected error.');
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