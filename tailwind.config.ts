// tailwind.config.ts
import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: '#42047e', // Cor primária da marca
          secondary: '#07f49e', // Cor secundária da marca
        },
      },
      fontFamily: {
        // Renomeado de 'sans' para 'inter' para clareza
        inter: ['var(--font-inter)', 'sans-serif'],
        // 1. ADICIONADA A FONTE DE TÍTULO
        title: ['var(--font-poppins)', 'sans-serif'],
      },
      borderRadius: {
        btn: '9999px', // Botões arredondados
      },
    },
  },
  // 2. ADICIONADO O PLUGIN DE TIPOGRAFIA
  plugins: [
    require('@tailwindcss/typography'),
  ],
};
export default config;