// src/app/avisos-legais/LegalPageClient.tsx
"use client"; 

import { useState, useEffect } from 'react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { sanityClient } from '@/lib/sanityClient'; 
import { Loader2, FileText, Link as LinkIcon, AlertTriangle, Printer } from 'lucide-react';
import { PortableText } from '@portabletext/react'; 

type LegalPage = {
  _id: string;
  title: string;
  slug: { current: string };
  icon: string | null;
  externalReference: string | null;
  content: any[]; 
};

// Este é o componente que realmente usa os hooks de cliente
export default function LegalPageClient() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams(); // O hook problemático está aqui

  const [pages, setPages] = useState<LegalPage[]>([]);
  const [selectedPage, setSelectedPage] = useState<LegalPage | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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
  }, []); 

  useEffect(() => {
    if (pages.length === 0) return; 

    const slugFromUrl = searchParams.get('doc'); 

    if (slugFromUrl) {
      const pageFromUrl = pages.find(p => p.slug.current === slugFromUrl);
      setSelectedPage(pageFromUrl || pages[0]); 
    } else {
      setSelectedPage(pages[0]);
    }
  }, [pages, searchParams]); 

  const handleSelectPage = (page: LegalPage) => {
    setSelectedPage(page);
    const newUrl = `${pathname}?doc=${page.slug.current}`;
    router.push(newUrl, { scroll: false }); 
  };

  const handlePrint = () => {
    window.print();
  };

  const ptComponents = {
    marks: {
      link: ({ children, value }: any) => (
        <a href={value.href} target="_blank" rel="noopener noreferrer" className="text-brand-primary hover:underline">
          {children}
        </a>
      ),
    },
  };

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

  return (
    <div className="container mx-auto max-w-7xl px-4 py-8 md:px-8 md:py-12">
      <h1 className="font-title text-3xl md:text-4xl font-bold text-center mb-12 text-gray-900 no-print">
        Avisos Legais e Documentação
      </h1>
      
      <div className="flex flex-col md:flex-row gap-8 lg:gap-12">
        
        <nav className="w-full md:w-1/4 no-print">
          <ul className="md:sticky md:top-28 space-y-2"> 
            {pages.map((page) => (
              <li key={page._id}>
                <button
                  onClick={() => handleSelectPage(page)} 
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

        <main className="w-full md:w-3/4">
          {selectedPage ? (
            <article className="rounded-lg bg-white p-6 md:p-8 lg:p-12 shadow-xl printable-area">
              
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