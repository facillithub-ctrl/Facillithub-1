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
      // 1. Documentação: Adicionando Cores da Marca
      // Aqui estendemos as cores padrão do Tailwind.
      // Agora podemos usar classes como: bg-brand-primary ou text-brand-secondary
      colors: {
        brand: {
          primary: '#42047e', // Cor primária da marca
          secondary: '#07f49e', // Cor secundária da marca
        },
      },
      // 2. Documentação: Adicionando a Fonte Inter
      // Definimos 'sans' (fonte padrão) para usar a variável '--font-inter'.
      // Vamos configurar essa variável no próximo passo (layout.tsx).
      fontFamily: {
        sans: ['var(--font-inter)', 'sans-serif'],
      },
      // 3. Documentação: Arredondamento dos Botões
      // Adicionamos um estilo 'btn' para os botões arredondados.
      // Podemos usar a classe 'rounded-btn'
      borderRadius: {
        btn: '9999px', // Um valor bem alto para garantir "pílula"
      },
    },
  },
  plugins: [],
};
export default config;