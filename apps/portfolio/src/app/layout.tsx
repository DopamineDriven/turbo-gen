import type { Metadata, Viewport } from "next";
import { ViewTransitions } from "next-view-transitions";
import { getSiteUrl } from "@/lib/site-url";
import {
  BasisGrotesqueProBlack,
  BasisGrotesqueProBlackItalic,
  BasisGrotesqueProBold,
  BasisGrotesqueProBoldItalic,
  BasisGrotesqueProItalic,
  BasisGrotesqueProLight,
  BasisGrotesqueProLightItalic,
  BasisGrotesqueProMedium,
  BasisGrotesqueProMediumItalic,
  BasisGrotesqueProRegular
} from "@/typography";
import "./global.css";
import React from "react";
import { Geist, Geist_Mono } from "next/font/google";
/* populate relevant values in src/lib/site-url.ts and uncomment for url injetion */
// import { getSiteUrl } from "@/lib/site-url";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"]
});
export const viewport = {
  themeColor: "#E1242A",
  userScalable: true,
  viewportFit: "auto",
  colorScheme: "normal",
  initialScale: 1,
  maximumScale: 1,
  width: "device-width"
} satisfies Viewport;

export const metadata = {
  metadataBase: new URL(getSiteUrl(process.env.NODE_ENV)),
  title: {
    default: "Portfolio",
    template: "%s | Andrew Ross"
  },
  description: "TBD",
  appleWebApp: {
    capable: true,
    title: "Andrew Ross Portfolio",
    statusBarStyle: "black-translucent",
    startupImage: [{ url: "/apple-icon.png" }]
  },
  authors: [{ name: "Andrew Ross", url: "https://github.com/DopamineDriven" }],
  icons: [
    {
      type: "image/png",
      rel: "apple-touch-icon",
      url: new URL(
        "/meta/apple-touch-icon.png",
        getSiteUrl(process.env.NODE_ENV)
      ),
      sizes: "180x180"
    },
    {
      type: "image/png",
      rel: "icon",
      url: new URL("/meta/favicon-96x96.png", getSiteUrl(process.env.NODE_ENV)),
      sizes: "96x96"
    },
    {
      type: "image/png",
      rel: "icon",
      url: new URL("/meta/favicon-32x32.png", getSiteUrl(process.env.NODE_ENV)),
      sizes: "32x32"
    }
  ],
  robots: {
    googleBot: {
      follow: true,
      index: true,
      indexifembedded: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1
    },
    follow: true,
    index: true,
    indexifembedded: true,
    "max-video-preview": -1,
    "max-image-preview": "large",
    "max-snippet": -1
  }
} satisfies Metadata;

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <ViewTransitions>
      <html
        suppressHydrationWarning
        lang='en'
        className={`h-full ${BasisGrotesqueProBlack.variable} ${BasisGrotesqueProBlackItalic.variable} ${BasisGrotesqueProBold.variable} ${BasisGrotesqueProBoldItalic.variable} ${BasisGrotesqueProItalic.variable} ${BasisGrotesqueProLight.variable} ${BasisGrotesqueProLightItalic.variable} ${BasisGrotesqueProMedium.variable} ${BasisGrotesqueProMediumItalic.variable} ${BasisGrotesqueProRegular.variable}`}>
        <body className='antialiased'>
          <div className='m-0 flex min-h-full flex-col justify-between  p-0'>
            {/* <Nav /> */}
            <main className=''>{children}</main>
            {/* <Footer /> */}
          </div>
        </body>
      </html>
    </ViewTransitions>
  );
}
