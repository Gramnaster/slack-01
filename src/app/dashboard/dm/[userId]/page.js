import { fetchDirectMessages, postDirectMessage } from '@/lib/data';
import { revalidatePath } from 'next/cache';
// import { MessageForm } from '@/components/message-form';
// import { MessageList } from '@/components/message-list';
// import { auth } from '../../../../../auth';

export default async function DirectMessagePage({ params }) {
  // Because we need to wait for the params to arrive
  // These declarations need await
  const resolvedParams = await params;
  const messages = await fetchDirectMessages(resolvedParams.userId);

  // const action = channelId 
  //    ? postMessage.bind(null, { channelId })
  //    : postMessage.bind(null, { userId });

  async function sendMessage(formData) {
    'use server';
    

    try {
      await postDirectMessage(resolvedParams.userId, formData);
      // Refresh the page data so I can receive messages without refreshing it
      revalidatePath(`/dashboard/dm/${resolvedParams.userId}`);
    } catch (error) {
      if (error) {
        console.error('Failed to send message:', error);
      }
    }
  }

  return (
    <div>
      <h1>Conversation with User {resolvedParams.userId}</h1>
      {/* <MessageList messages={messages} />
      <MessageForm userId={resolvedParams.userId} /> */}
      {messages.map((message) => (
        <div key={message.id}>
          <p><strong>{message.sender?.email || 'Unknown'}:</strong>{message.body}</p>
          <small>{message.created_at}</small>
          </div>
      ))}
      <form action={sendMessage}>
       <input name="message" placeholder="Send a message" required />
       <button type="submit">Send</button>
      </form>
    </div>
  );
}

// [channelid]