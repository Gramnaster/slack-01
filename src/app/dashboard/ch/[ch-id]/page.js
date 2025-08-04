import { fetchChannelMessages, postChannelMessage } from '@/lib/data';
import { revalidatePath } from 'next/cache';

export default async function ChannelPage({ params }) {
  // Because we need to wait for the params to arrive
  // These declarations need await
  const resolvedParams = await params;
  const messages = await fetchChannelMessages(resolvedParams['ch-id']);

  async function sendMessage(formData) {
    'use server';
    
    try {
      await postChannelMessage(resolvedParams['ch-id'], formData);
      // Refresh the page data so I can receive messages without refreshing it
      revalidatePath(`/dashboard/ch/${resolvedParams['ch-id']}`);
    } catch (error) {
      if (error) {
        console.error('Failed to send message:', error);
      }
    }
  }

  return (
    <div>
      <h1>Channel {resolvedParams['ch-id']}</h1>
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