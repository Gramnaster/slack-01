import { Box } from "@mui/material";

export default function DirectMessageLayout({ children }) {
  return (
    <Box sx={{height:'100%'}}>
      {/* Basic layout for now */}
      {children}
    </Box>
  );
}