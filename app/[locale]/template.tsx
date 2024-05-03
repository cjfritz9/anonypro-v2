import Script from 'next/script';

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Script
        async
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9924000383649266"
        crossOrigin="anonymous"
      ></Script>
      {children}
    </>
  );
}
