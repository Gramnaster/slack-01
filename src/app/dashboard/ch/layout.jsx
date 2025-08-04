import { Box } from "@mui/material";

export default function ChannelMessageLayout({ children }) {
  return (
    <Box sx={{height:'100%'}}>
      {/* Basic layout for now */}
      {children}
    </Box>
  );
}