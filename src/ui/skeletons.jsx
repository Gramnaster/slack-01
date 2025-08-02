export function DashboardSkeleton() {
    return (
      <div>
        <h1>Loading Channel...</h1>
        <div style={{ border: '1px solid #ccc', padding: '10px', height: '300px', overflowY: 'scroll' }}>
          <p>Loading messages...</p>
        </div>
        <form>
          <input type="text" placeholder="Sending a message..." disabled />
          <button type="submit" disabled>Send</button>
        </form>
      </div>
    );
  }