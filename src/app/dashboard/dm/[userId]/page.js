import { fetchDirectMessages, postDirectMessage } from '@/lib/data';
import { revalidatePath } from 'next/cache';
import { auth } from '../../../../../auth';
import { Box, Typography } from '@mui/material';
// import { MessageForm } from '@/components/message-form';
// import { MessageList } from '@/components/message-list';
// import { auth } from '../../../../../auth';

export default async function DirectMessagePage({ params }) {
  // Because we need to wait for the params to arrive
  // These declarations need await
  const refreshedParams = await params;
  const messages = await fetchDirectMessages(refreshedParams.userId);

  // Getting the session id so I can compare it to the user.id
  // If it's the same id, it registers as the 'current user'
  const session = await auth();
  console.log('[userId] session:', session);


  // No duplicate IDs so creates a new array and displays only one message
  const uniqueMessages = Array.from(
    new Map(messages.map(msg => [msg.id, msg])).values()
  );

  // const action = channelId 
  //    ? postMessage.bind(null, { channelId })
  //    : postMessage.bind(null, { userId });

  // More straightforward implementation of passing formData
  // to the data.js PostMessage function
  async function sendMessage(formData) {
    'use server';
    
    try {
      await postDirectMessage(refreshedParams.userId, formData);
      // Refresh the page data so I can receive messages without refreshing it
      revalidatePath(`/dashboard/dm/${refreshedParams.userId}`);
    } catch (error) {
      if (error) {
        console.error('Failed to send message:', error);
      }
    }
  }

  return (
    <Box>
      <Typography variant='h7'>Conversation with User {refreshedParams.userId}</Typography>
      {/* <MessageList messages={messages} />
      <MessageForm userId={resolvedParams.userId} /> */}
      {uniqueMessages.map((message) => {
        const isCurrentUser = message.sender?.id === session.user.id;
        console.log('[userId] uniqueMessages user:', isCurrentUser);
        return (
        <Box key={message.id}>
          <Typography variant='body2'>
            <strong style={{ color: isCurrentUser ? '#00A8E9' : '#B5FF3B' }}>
              {message.sender?.email || 'Unknown'}:
            </strong> 
            {message.body}
          </Typography>
          <Typography variant='body3'> {message.created_at} </Typography>
          </Box>
        )
      })}
      <form action={sendMessage}>
       <input name="message" placeholder="Send a message" required />
       <button type="submit">Send</button>
      </form>
    </Box>
  );
}

// [channelid]