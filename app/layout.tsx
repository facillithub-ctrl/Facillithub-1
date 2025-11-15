// src/app/layout.tsx
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

// 1. Documentação: Importando com o atalho CORRETO
import Header from '@/components/Header'; 

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter', // Define a variável CSS
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
    // 2. Documentação: Aplicando a variável da fonte
    <html lang="pt-BR" className={inter.variable}>
      {/* 3. Documentação: Aplicando 'font-sans' (definido no tailwind.config)
          e as cores de fundo padrão. */}
      <body className="font-sans bg-gray-50 dark:bg-gray-950">
        <Header />
        <main>
          {children}
        </main>
        {/* TODO: Adicionar o Footer aqui futuramente */}
      </body>
    </html>
  );
}