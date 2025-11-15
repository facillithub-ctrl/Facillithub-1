// src/app/layout.tsx
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

// 1. Documentação: Importando nosso novo componente Header
import Header from '../src/components/Header';// O '@/' é um atalho para a pasta 'src/'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Facillit Hub',
  description: 'Tornando a jornada digital mais simples e eficaz.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={inter.variable}>
      <body className="font-sans bg-gray-50 dark:bg-gray-950">
        {/* 2. Documentação: Adicionando o Header */}
        {/* O Header ficará fixo acima de todo o 'children' (o conteúdo da página) */}
        <Header />
        
        {/* 'children' é onde o Next.js vai renderizar o conteúdo de cada página (ex: page.tsx) */}
        <main>
          {children}
        </main>
        
        {/* TODO: Adicionar o Footer aqui futuramente */}
      </body>
    </html>
  );
}