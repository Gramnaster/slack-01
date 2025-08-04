// import { postMessage } from '@/lib/actions';

// export function MessageForm({ channelId, userId }) {
//   // We need to bind the id to the server action
//   // How does this even work??
//   const action = channelId 
//     ? postMessage.bind(null, { channelId })
//     : postMessage.bind(null, { userId });

//   return (
//     <form action={action}>
//       <input name="message" placeholder="Send a message" required />
//       <button type="submit">Send</button>
//     </form>
//   );
// }
