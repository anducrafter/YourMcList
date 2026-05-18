import Script from 'next/script';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        {children}
        {/* Load it once here, and it works for all Iubenda links on any page */}
        <Script src="https://cdn.iubenda.com/iubenda.js" strategy="lazyOnload" />
      </body>
    </html>
  );
}