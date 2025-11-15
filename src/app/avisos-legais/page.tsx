// src/app/avisos-legais/page.tsx
"use client"; // Esta página será interativa (SPA)

import { useState, useEffect } from 'react';
import { sanityClient } from '@/lib/sanityClient'; // O nosso cliente Sanity
import { Loader2, FileText, Link as LinkIcon, AlertTriangle } from 'lucide-react';
// PortableText é o componente do Sanity para renderizar o Rich Text
import { PortableText } from '@portabletext/react'; 

// 1. Definição do Tipo (Interface)
// Corresponde ao schema que criámos no Sanity
type LegalPage = {
  _id: string;
  title: string;
  slug: { current: string };
  icon: string | null;
  externalReference: string | null;
  content: any[]; // Tipo 'any[]' para o PortableText
};

// 2. Componente de ícone dinâmico (um bónus para usar o seu campo 'icon')
// Tenta renderizar um ícone Lucide pelo nome
const DynamicIcon = ({ name }: { name: string | null }) => {
  const IconComponent = name ? (FileText as any)[name] : FileText; // Usa FileText como padrão
  // Nota: Esta é uma forma simples; uma forma mais robusta usaria um 'import' dinâmico.
  // Por agora, vamos manter simples.
  return <IconComponent className="h-5 w-5 mr-3" />;
};


export default function AvisosLegaisPage() {
  const [pages, setPages] = useState<LegalPage[]>([]);
  const [selectedPage, setSelectedPage] = useState<LegalPage | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // 3. Buscar os dados do Sanity
  useEffect(() => {
    const fetchLegalPages = async () => {
      setLoading(true);
      try {
        // Esta é a query (GROQ) que busca os dados no Sanity
        const query = `*[_type == "legalPage"] | order(title asc) {
          _id,
          title,
          slug,
          icon,
          externalReference,
          content
        }`;
        const data = await sanityClient.fetch<LegalPage[]>(query);
        
        setPages(data);
        if (data.length > 0) {
          setSelectedPage(data[0]); // Seleciona o primeiro item da lista por padrão
        }
      } catch (err) {
        setError("Não foi possível carregar os documentos.");
        console.error(err);
      }
      setLoading(false);
    };

    fetchLegalPages();
  }, []); // [] = Executa apenas uma vez, quando o componente carrega

  // 4. Componente de Renderização do Conteúdo
  // O Sanity usa "Portable Text" para o editor de Rich Text.
  // Precisamos de dizer-lhe como renderizar cada bloco.
  const ptComponents = {
    types: {
      block: ({ children, value }: any) => {
        // Estilos para parágrafos, títulos, etc.
        if (value.style === 'h1') return <h1 className="text-3xl font-title font-bold my-4">{children}</h1>;
        if (value.style === 'h2') return <h2 className="text-2xl font-title font-semibold my-3">{children}</h2>;
        if (value.style === 'h3') return <h3 className="text-xl font-title font-semibold my-2">{children}</h3>;
        if (value.style === 'blockquote') return <blockquote className="border-l-4 border-gray-300 pl-4 italic my-4">{children}</blockquote>;
        return <p className="text-gray-700 mb-4 leading-relaxed">{children}</p>;
      },
    },
    marks: {
      link: ({ children, value }: any) => (
        <a href={value.href} target="_blank" rel="noopener noreferrer" className="text-brand-primary hover:underline">
          {children}
        </a>
      ),
    },
    list: {
      bullet: ({ children }: any) => <ul className="list-disc list-inside mb-4 space-y-2">{children}</ul>,
      number: ({ children }: any) => <ol className="list-decimal list-inside mb-4 space-y-2">{children}</ol>,
    },
  };

  // 5. Estados de UI
  if (loading) {
    return (
      <div className="flex h-[70vh] items-center justify-center">
        <Loader2 className="h-12 w-12 animate-spin text-brand-primary" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto p-8 text-center">
        <AlertTriangle className="h-12 w-12 mx-auto text-red-500 mb-4" />
        <h1 className="text-2xl font-bold">Erro ao Carregar</h1>
        <p className="text-gray-600">{error}</p>
      </div>
    );
  }

  // 6. O Layout SPA
  return (
    <div className="container mx-auto max-w-7xl p-8">
      <h1 className="font-title text-4xl font-bold text-center mb-12">
        Avisos Legais e Documentação
      </h1>
      
      <div className="flex flex-col md:flex-row gap-8">
        
        {/* Barra de Navegação (Esquerda) */}
        <nav className="w-full md:w-1/4">
          <ul className="sticky top-28 space-y-2"> {/* 'sticky top-28' faz fixar no scroll */}
            {pages.map((page) => (
              <li key={page._id}>
                <button
                  onClick={() => setSelectedPage(page)}
                  className={`
                    flex w-full items-center rounded-lg p-3 text-left
                    transition-colors duration-150
                    ${selectedPage?._id === page._id
                      ? 'bg-brand-primary text-white shadow-lg'
                      : 'text-gray-700 hover:bg-gray-100'
                    }
                  `}
                >
                  {/* <DynamicIcon name={page.icon} /> */}
                  <FileText className="h-5 w-5 mr-3 flex-shrink-0" /> {/* Ícone Padrão */}
                  <span className="font-medium">{page.title}</span>
                </button>
              </li>
            ))}
          </ul>
        </nav>

        {/* Área de Conteúdo (Direita) */}
        <main className="w-full md:w-3/4">
          {selectedPage ? (
            <article className="rounded-lg bg-white p-8 shadow-xl">
              <h2 className="font-title text-3xl font-bold text-gray-900 mb-6">
                {selectedPage.title}
              </h2>

              {/* O Conteúdo do Sanity (Rich Text) */}
              <div className="prose max-w-none">
                <PortableText
                  value={selectedPage.content}
                  components={ptComponents}
                />
              </div>

              {/* Referência Externa */}
              {selectedPage.externalReference && (
                <div className="mt-8 border-t pt-4">
                  <p className="text-sm text-gray-500 italic">
                    <LinkIcon className="h-4 w-4 inline-block mr-2" />
                    {selectedPage.externalReference}
                  </p>
                </div>
              )}
            </article>
          ) : (
            <p>Selecione um documento para ler.</p>
          )}
        </main>
      </div>
    </div>
  );
}