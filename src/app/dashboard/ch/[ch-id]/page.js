import { fetchChannelDetails, fetchChannelMessages, postChannelMessage } from '@/lib/data';
import { Box, Button, TextField, Typography } from '@mui/material';
import { revalidatePath } from 'next/cache';
import { auth } from '../../../../../auth';

export default async function ChannelPage({ params }) {
  // Because we need to wait for the params to arrive
  // These declarations need await
  const refreshedParams = await params;

  // Prop drilling is a huge PITA but I can't make it work
  const [messages, channel] = await Promise.all([
    fetchChannelMessages(refreshedParams['ch-id']),
    fetchChannelDetails(refreshedParams['ch-id'])
  ]);

  console.log('[ch-id] messages, channel:', messages, channel);
  console.log('[ch-id] channel.channel_members:', channel?.channel_members);
  console.log('[ch-id] Full channel object:', JSON.stringify(channel, null, 2));

  const session = await auth();
  console.log('[ch-id] session:', session);

  async function sendMessage(formData) {
    'use server';
    
    try {
      await postChannelMessage(refreshedParams['ch-id'], formData);
      // Refresh the page data so I can receive messages without refreshing it
      revalidatePath(`/dashboard/ch/${refreshedParams['ch-id']}`);
    } catch (error) {
      if (error) {
        console.error('Failed to send message:', error);
      }
    }
  }

  const handleHeaderTarget = () => {
    if (channel && channel.name) { 
      console.log('[ch-id] channel + channel.name:', channel, channel.name);
      return String(channel.name).toUpperCase();
    } else {
      return 'CHANNEL_NOT_FOUND';
    }
  }

  return (
    <Box 
      sx={{display:'flex', flexDirection:'column', height:'100%'}}>

      {/* Section Header */}
      <Box 
        sx={{
          display: 'flex', 
          flexDirection: 'row', 
          justifyContent: 'space-between',
          // h: '100%',
          flexShrink: 0, 
          p: '4px',
          borderBottom: '1px solid #FF7300',
          borderLeft: '1px solid #1A1A1A',
          borderRight: '1px solid #1A1A1A',
          backgroundColor: '#FF7300',
          // overflow:'hidden'
      }}>
        <Typography variant='body2' color='text.secondary'>.///CHANNEL_MESSAGES</Typography>
        <Typography variant='body2' color='text.secondary'>TO-GROUP::/{handleHeaderTarget()}</Typography>
      </Box>

      {/* Messages Container */}
        <Box 
          sx={{
            display: 'flex', 
            flexDirection:'column', 
            px: 3, 
            py: 1, 
            flex:1, 
            overflowY: 'auto', 
            minHeight: 0,
        }}>
          <Box sx={{ flex: 1, minHeight: 0 }} />
          {messages.map((message) => {
            const isCurrentUser = String(message.sender.id) === String(session.user.id);

            return (
            <Box key={message.id} 
              sx={{
                border: '1px solid #FF7300',
                backgroundColor: '#251A1399',
                minWidth: '30ch',
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
                  [sndr]::{(message.sender?.email || 'Unknown').toUpperCase()}

              </Typography>
              <Typography variant='body2' sx={{textAlign: isCurrentUser ? 'left' : 'left'}}>{message.body}</Typography>
              <Typography variant='body2' color='error' sx={{textAlign: isCurrentUser ? 'left' : 'right'}}>
                [time]::{message.created_at} 
              </Typography>
            </Box>
            )
          })}
          {/* </Box> */}
        </Box>

        {/* Text Field */}
        <Box sx={{borderTop: '1px solid #FF7300', display:'flex', justifyContent:'center', p:2, flexShrink: 0}}>
          <form action={sendMessage} style={{width:'100%', display:'flex', justifyContent:'center', gap: 3}}>
            <Box sx={{width:'590px', height:'90px'}}>
              <TextField name='message' placeholder='// Type_your_message_here...' fullWidth multiline
                sx={{ backgroundColor: '#1A1A1A', height: '100%', width: '100%', pr: 1, borderRadius: 0,
                  '& .MuiOutlinedInput-root': {
                    height: '100%',
                    alignItems: 'flex-start',
                    p: '8px 14px',
                  },'& .MuiInputBase-input': { 
                    color: '#FF7300', 
                    fontSize: '12px' ,
                    overflowY: 'auto !important',
                    height: '100% !important',
                    paddingRight: '16px',
                  },'& .MuiInputBase-input::placeholder': { 
                    color: '#FF7300', 
                    opacity: 1, 
                    fontSize: '12px' 
                  }
                }} />
            </Box>
            <Button type="submit" variant='contained' sx={{borderRadius:0}}>Send</Button>
          </form>
        </Box>
      </Box>
  );
}