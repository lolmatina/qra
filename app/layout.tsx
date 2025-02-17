import '@/app/globals.css';
import '@mantine/core/styles.css';
import React from 'react';
import { ColorSchemeScript, mantineHtmlProps, MantineProvider } from '@mantine/core';
import { theme } from '../theme';

export const metadata = {
  title: 'QazRailAutomatic | Qaz Rail Automatic | Каз Рейл Автоматик',
  description: 'Микропроцессорная автоматизация железнодорожного транспорта',
  openGraph: {
    type: 'website',
    locale: 'ru_RU',
    url: 'https://new.qazrailautomatic.kz/',
    site_name: 'QazRailAutomatic',
  },
  twitter: {
    cardType: 'summary_large_image',
  },
};

export default function RootLayout({ children }: { children: any }) {
  return (
    <html lang="en" {...mantineHtmlProps}>
      <head>
        <ColorSchemeScript />
        <link rel="shortcut icon" href="/favicon.svg" />
        <meta name="google-site-verification" content="LYvI6hFNGkxIB90I0r2-CV5ntLPtxvcDP3zow4c1wIs" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        {/* @ts-ignore */}
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap"
          rel="stylesheet"
        />
        <link
          rel="stylesheet"
          type="text/css"
          charSet="UTF-8"
          href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css"
        />
        <link
          rel="stylesheet"
          type="text/css"
          href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css"
        />
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no"
        />
        <meta name="robots" content="index, follow" />
        <meta name="google-site-verification" content="your-verification-code" />
      </head>
      <body className="bg-[#F5F5F5] font-montserrat">
        <MantineProvider theme={theme}>{children}</MantineProvider>
      </body>
    </html>
  );
}
