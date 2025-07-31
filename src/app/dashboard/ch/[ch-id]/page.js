import { fetchChannelMessages } from '@/lib/data';
import { MessageForm } from '@/components/message-form';
import { MessageList } from '@/components/message-list';

export default async function ChannelPage({ params }) {
  const messages = await fetchChannelMessages(params.channelId);

  return (
    <div>
      <h1>Channel {params.channelId}</h1>
      <MessageList messages={messages} />
      <MessageForm channelId={params.channelId} />
    </div>
  );
}
