// import { CardSkeletonMUI } from "./skeleton";

import Skeleton from '@mui/material/Skeleton';
import Box from '@mui/material/Box';

export default function CardSkeletonMUI() {
  return (
    <Box sx={{ width: 300 }}>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Box sx={{ margin: 1 }}>
          <Skeleton variant="circular" width={40} height={40} animation="wave" />
        </Box>
        <Box sx={{ width: '100%' }}>
          <Skeleton variant="text" width="100%" animation="wave" />
        </Box>
      </Box>
      <Skeleton variant="rectangular" width="100%" height={118} animation="wave" />
    </Box>
  );
}

export function DashboardSkeleton() {
    return (
      <div>
        <h1><CardSkeletonMUI/></h1>
        <div style={{ border: '1px solid #ccc', padding: '10px', height: '300px', overflowY: 'scroll' }}>
          <CardSkeletonMUI/>
        </div>
        <form>
          <input type="text" placeholder="Sending a message..." disabled />
          <button type="submit" disabled>Send</button>
        </form>
      </div>
    );
  }