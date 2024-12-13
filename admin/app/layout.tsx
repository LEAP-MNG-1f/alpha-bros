import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { AdminCategotyZone } from "@/components/features/AdminHome";
import { ClerkProvider } from "@clerk/nextjs";
const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Admin",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          {/* <header>
            <SignedOut>
              <SignInButton>
                <button className="p-1 border border-green-200 rounded-md">
                  Sign in
                </button>
              </SignInButton>
            </SignedOut>

            <SignedIn>
              <UserButton
                showName
                appearance={{
                  elements: {
                    userButtonBox: "bg-green-200 border border-2 rounded-md",
                  },
                }}
              />
            </SignedIn>
          </header> */}
          <AdminCategotyZone />
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
