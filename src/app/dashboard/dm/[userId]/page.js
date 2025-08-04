
'use server';

import { fetchDirectMessages, postDirectMessage } from '@/lib/data';
import { revalidatePath } from 'next/cache';
import { auth } from '../../../../../auth';
import { Box, Button, InputLabel, TextField, Typography } from '@mui/material';
// import { MessageForm } from '@/components/message-form';
// import { MessageList } from '@/components/message-list';
// import { auth } from '../../../../../auth';

export default async function DirectMessagePage({ params }) {
  // Because we need to wait for the params to arrive
  // These declarations need await
  const refreshedParams = await params;
  const messages = await fetchDirectMessages(refreshedParams.userId);

  // const [isLoading, setIsLoading] = useState(false);

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
    <Box sx={{display:'flex', flexDirection:'column', justifyContent:'flex-end', h:'100%'}}>
      <Typography variant='h7'>Conversation with User {refreshedParams.userId}</Typography>
      <Box sx={{display: 'flex', flexDirection:'column', px: 2, py: 1, overflowY: 'auto', flex: 1}}>
        {/* <MessageList messages={messages} />
        <MessageForm userId={resolvedParams.userId} /> */}
        {uniqueMessages.map((message) => {
          const isCurrentUser = String(message.sender.id) === String(session.user.id);
          // console.log('[userId] message.sender.id:', typeof message.sender.id, message.sender.id);
          // console.log('[userId] session.user.id:', typeof session.user.id, session.user.id);
          // console.log('[userId] uniqueMessages user:', typeof isCurrentUser, isCurrentUser);
          return (
          <Box key={message.id} 
            sx={{
              border: '1px solid #FF7300',
              // width: '100%',
              backgroundColor: '#251A1399',
              minWidth: '30ch',
              maxWidth: '66ch',
              maxWidth: '400px',
              p: 1,
              mt: 1,
              mb: 1,
              ml: isCurrentUser ? 'auto' : 0,
              textAlign: isCurrentUser ? 'right' : 'left'
            }}>
            <Typography variant='body2'
              style={{ 
                color: isCurrentUser ? '#00A8E9' : '#B5FF3B',
                pb: 1, 
                 }}>
                [sender]::{(message.sender?.email || 'Unknown').toUpperCase()}

            </Typography>
            <Typography variant='body2' sx={{textAlign: isCurrentUser ? 'left' : 'left'}}>{message.body}</Typography>
            <Typography variant='body2' color='error' sx={{textAlign: isCurrentUser ? 'left' : 'right'}}>
              [time]::{message.created_at} 
            </Typography>
          </Box>
          )
        })}
      </Box>
      <Box sx={{borderTop: '1px solid #FF7300', h: '100%', w:'100dvw', display:'flex', justifyContent:'center'}}>
        <form action={sendMessage} style={{height:'100%', width:'100%', display:'flex', justifyContent:'center'}}>
          <Box sx={{width:'730px', height:'90px', pt:1}}>
            {/* <InputLabel name="message" placeholder="Send a message" /> */}
            <TextField name='message' placeholder='// Type_your_message_here...' fullWidth
              sx={{ backgroundColor: '#1A1A1A99', h: '100%', w: '100%',
                '& input': { color: '#FF7300', fontSize: '12px' },
                '& input::placeholder': { color: '#FF7300', opacity: 1, fontSize: '12px' }
               }} />
          </Box>
          <Button type="submit">Send</Button>
        </form>
      </Box>
    </Box>
  );
}