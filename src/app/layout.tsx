import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Providers } from "./provider";
import "./globals.css";
import Footer from "./components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Weather Forecast | Accurate Weather Conditions",
  description:
    "Get real-time weather updates. Accurate temperature, humidity, and wind forecasts.",
  keywords: "weather, weather forecast, temperature, weather conditions",
  openGraph: {
    title: "Weather Forecast | Accurate Weather Conditions",
    description:
      "Get real-time weather updates. Accurate temperature, humidity, and wind forecasts.",
    url: "https://weather-re.netlify.app/",
    type: "website",
    images: [
      "/public/partly-cloudy-day.jpg",
      "/public/snow.jpg",
      "/public/fog.jpg",
      "/public/clear-night.jpg",
      "/public/sunny.jpg",
    ],
  },
  metadataBase: new URL("https://weather-re.netlify.app/"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css"
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}
      >
        <Providers>
          <main className="flex-grow">
            {children}
          </main>
        </Providers>
        <Footer />
      </body>
    </html>
  );
}
