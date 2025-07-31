import { fetchDirectMessages } from '@/lib/data';
import { MessageForm } from '@/components/message-form';
import { MessageList } from '@/components/message-list';

export default async function DirectMessagePage({ params }) {
  const messages = await fetchDirectMessages(params.userId);

  return (
    <div>
      <h1>Conversation with User {params.userId}</h1>
      <MessageList messages={messages} />
      <MessageForm userId={params.userId} />
    </div>
  );
}

// [channelid]