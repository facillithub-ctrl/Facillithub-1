// src/app/avisos-legais/page.tsx
"use client"; 

import { useState, useEffect } from 'react';
// 1. IMPORTAR hooks de navegação e ícone de Impressão
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { sanityClient } from '@/lib/sanityClient'; 
import { Loader2, FileText, Link as LinkIcon, AlertTriangle, Printer } from 'lucide-react';
import { PortableText } from '@portabletext/react'; 

type LegalPage = {
  _id: string;
  title: string;
  slug: { current: string }; // O slug é o que usaremos na URL
  icon: string | null;
  externalReference: string | null;
  content: any[]; 
};

export default function AvisosLegaisPage() {
  // Hooks de navegação
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Estados da página
  const [pages, setPages] = useState<LegalPage[]>([]);
  const [selectedPage, setSelectedPage] = useState<LegalPage | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // 2. BUSCAR DADOS (Fetch)
  // Este useEffect agora corre apenas uma vez para buscar todos os dados.
  useEffect(() => {
    const fetchLegalPages = async () => {
      setLoading(true);
      try {
        const query = `*[_type == "legalPage"] | order(title asc) {
          _id, title, slug, icon, externalReference, content
        }`;
        const data = await sanityClient.fetch<LegalPage[]>(query);
        setPages(data);
      } catch (err) {
        setError("Não foi possível carregar os documentos.");
        console.error(err);
      }
      setLoading(false);
    };
    fetchLegalPages();
  }, []); // [] = Executa apenas uma vez

  // 3. LÓGICA DE DEEP LINKING
  // Este useEffect corre sempre que a lista de 'pages' carregar ou a URL (searchParams) mudar.
  useEffect(() => {
    if (pages.length === 0) return; // Se não há páginas, não faz nada

    const slugFromUrl = searchParams.get('doc'); // Pega o ?doc=... da URL

    if (slugFromUrl) {
      // Se há um slug na URL, encontra a página correspondente
      const pageFromUrl = pages.find(p => p.slug.current === slugFromUrl);
      setSelectedPage(pageFromUrl || pages[0]); // Seleciona a página da URL ou a primeira
    } else {
      // Se não há slug na URL, seleciona a primeira página por defeito
      setSelectedPage(pages[0]);
    }
  }, [pages, searchParams]); // Depende das páginas e da URL

  // 4. FUNÇÃO DE SELEÇÃO E IMPRESSÃO
  // Atualiza o estado E a URL quando clica
  const handleSelectPage = (page: LegalPage) => {
    setSelectedPage(page);
    // Cria a nova URL (ex: /avisos-legais?doc=termos-de-uso)
    const newUrl = `${pathname}?doc=${page.slug.current}`;
    // Atualiza a URL no navegador sem recarregar a página
    router.push(newUrl, { scroll: false }); 
  };

  // Abre a janela de impressão do navegador
  const handlePrint = () => {
    window.print();
  };

  // 5. Componentes de Renderização do Sanity (Rich Text)
  const ptComponents = {
    marks: {
      link: ({ children, value }: any) => (
        <a href={value.href} target="_blank" rel="noopener noreferrer" className="text-brand-primary hover:underline">
          {children}
        </a>
      ),
    },
  };

  // ... (Estados de Loading e Erro) ...
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


  // 6. O Layout SPA (Atualizado com 'handleSelectPage')
  return (
    <div className="container mx-auto max-w-7xl px-4 py-8 md:px-8 md:py-12">
      {/* (Este título não será impresso por causa das regras de CSS) */}
      <h1 className="font-title text-3xl md:text-4xl font-bold text-center mb-12 text-gray-900 no-print">
        Avisos Legais e Documentação
      </h1>
      
      <div className="flex flex-col md:flex-row gap-8 lg:gap-12">
        
        {/* Barra de Navegação (Esquerda) - Não será impressa */}
        <nav className="w-full md:w-1/4 no-print">
          <ul className="md:sticky md:top-28 space-y-2"> 
            {pages.map((page) => (
              <li key={page._id}>
                <button
                  onClick={() => handleSelectPage(page)} // <-- USA A NOVA FUNÇÃO
                  className={`
                    flex w-full items-center rounded-lg p-3 text-left
                    transition-colors duration-150
                    ${selectedPage?._id === page._id
                      ? 'font-semibold text-brand-primary bg-purple-50' 
                      : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                    }
                  `}
                >
                  <FileText className="h-5 w-5 mr-3 flex-shrink-0" />
                  <span>{page.title}</span>
                </button>
              </li>
            ))}
          </ul>
        </nav>

        {/* Área de Conteúdo (Direita) */}
        <main className="w-full md:w-3/4">
          {selectedPage ? (
            // 7. CORREÇÃO DE IMPRESSÃO: Adiciona a classe 'printable-area'
            <article className="rounded-lg bg-white p-6 md:p-8 lg:p-12 shadow-xl printable-area">
              
              {/* Botão de Imprimir (só aparece aqui) */}
              <button
                onClick={handlePrint}
                className="no-print float-right mb-4 flex items-center gap-2 rounded-lg py-2 px-4 text-sm font-medium text-gray-600 hover:bg-gray-100"
              >
                <Printer className="h-4 w-4" />
                Imprimir
              </button>

              <h2 className="font-title text-3xl font-bold text-gray-900 mb-6 border-b pb-4">
                {selectedPage.title}
              </h2>

              <div className="prose prose-lg max-w-none prose-h1:font-title prose-h2:font-title prose-h3:font-title">
                <PortableText
                  value={selectedPage.content}
                  components={ptComponents}
                />
              </div>

              {selectedPage.externalReference && (
                <div className="mt-8 border-t border-gray-200 pt-4">
                  <p className="text-sm text-gray-500 italic">
                    <LinkIcon className="h-4 w-4 inline-block mr-2" />
                    {selectedPage.externalReference}
                  </p>
                </div>
              )}
            </article>
          ) : (
            <p className="text-gray-600">Selecione um documento no menu para ler.</p>
          )}
        </main>
      </div>
    </div>
  );
}