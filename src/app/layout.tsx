import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import StyledComponentsRegistry from './registry'
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { darkTheme } from "@/app/theme";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ANTARES",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body className={inter.className}>
          <ThemeProvider theme={darkTheme}>
              <CssBaseline />
              <AppRouterCacheProvider>
                  <StyledComponentsRegistry>
                      {children}
                    </StyledComponentsRegistry>
              </AppRouterCacheProvider>
          </ThemeProvider>
      </body>
    </html>
  );
}
