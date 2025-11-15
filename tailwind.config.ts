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
          primary: '#42047e',
          secondary: '#07f49e',
        },
      },
      fontFamily: {
        // Renomeado de 'sans' para 'inter' para clareza
        inter: ['var(--font-inter)', 'sans-serif'],
        // Adicionada a fonte de título
        title: ['var(--font-poppins)', 'sans-serif'],
      },
      borderRadius: {
        btn: '9999px',
      },
    },
  },
  // Adicionado o plugin de tipografia
  plugins: [
    require('@tailwindcss/typography'),
  ],
};
export default config;