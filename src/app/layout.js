import "./globals.css";
import { jetBrainsMono, robotoMono } from "@/ui/fonts";
// import ThemeRegistry from "@/components/ThemeRegistry/ThemeRegistry";
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import { ThemeProvider } from '@mui/material/styles';
// import theme from '@/app/theme';
import themeOptions from "@/app/theme";

// export const experimental_ppr = true;

export const metadata = {
  title: "Miscord | Welcome to the Terminal",
  description: "World's #1 Chat App!",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${jetBrainsMono.variable} ${robotoMono.variable} antialiased`}>
        <AppRouterCacheProvider>
          <ThemeProvider theme={themeOptions}>
            <div className="App">
              {children}
            </div>
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}


