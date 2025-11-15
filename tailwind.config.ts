// tailwind.config.ts
import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    // Em v3, usamos 'extend' para adicionar nossas coisas sem apagar as do Tailwind
    extend: {
      colors: {
        brand: {
          primary: '#42047e', // Cor primária da marca
          secondary: '#07f49e', // Cor secundária da marca
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'sans-serif'],
      },
      borderRadius: {
        btn: '9999px', // Botões arredondados
      },
    },
  },
  plugins: [],
};
export default config;