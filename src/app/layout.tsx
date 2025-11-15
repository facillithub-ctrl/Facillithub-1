// src/app/layout.tsx
import type { Metadata } from 'next';
// 1. Importe Poppins junto com Inter
import { Inter, Poppins } from 'next/font/google';
import './globals.css'; // <--- O './globals.css' É IMPORTADO AQUI
import Header from '@/components/Header'; //

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

// 2. Configure a Poppins
const poppins = Poppins({
  subsets: ['latin'],
  weight: ['600', '700'], // Pesos para títulos
  variable: '--font-poppins',
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
    // 3. Adicione a variável da Poppins ao <html>
    <html lang="pt-BR" className={`${inter.variable} ${poppins.variable}`}>
      {/* 4. Use 'font-inter' como base */}
      <body className="font-inter bg-gray-50 dark:bg-gray-900">
        <Header />
        <main>
          {children}
        </main>
      </body>
    </html>
  );
}