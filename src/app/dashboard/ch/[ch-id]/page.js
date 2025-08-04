import { fetchChannelMessages } from '@/lib/data';
import { MessageForm } from '@/components/message-form';
import { MessageList } from '@/components/message-list';
// import { auth } from '../../../../../auth';

export default async function ChannelPage({ params }) {
  const resolvedParams = await params;
  const messages = await fetchChannelMessages(resolvedParams.channelId);

  return (
    <div>
      <h1>Channel {resolvedParams['ch-id']}</h1>
      <MessageList messages={messages} />
      <MessageForm channelId={resolvedParams['ch-id']} />
    </div>
  );
}
