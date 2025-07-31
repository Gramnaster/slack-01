import "./globals.css";
import { jetBrainsMono, robotoMono } from "@/ui/fonts";
// import ThemeRegistry from "@/components/ThemeRegistry/ThemeRegistry";
// import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';

// export const experimental_ppr = true;

export const metadata = {
  title: "Miscord | Welcome to the Terminal",
  description: "World's #1 Chat App!",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${jetBrainsMono} ${robotoMono} antialiased`}>
        {/* <ThemeRegistry options={{ key: 'mui' }}> */}
            <div className="App">
              {children}
            </div>
        {/* </ThemeRegistry> */}
      </body>
    </html>
  );
}


