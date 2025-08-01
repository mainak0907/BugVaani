// app/layout.js
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'A issue a day',
  description: 'GitHub Good First Issue Finder',
};


export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark"> {/* Use "dark" for dark mode or "" for light */}
      <body className={`${inter.className} bg-white text-black dark:bg-gray-950 dark:text-white`}>
        {children}
      </body>
    </html>
  );
}
