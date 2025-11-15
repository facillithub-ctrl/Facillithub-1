// src/app/avisos-legais/page.tsx
import { Suspense } from 'react';
import LegalPageClient from './LegalPageClient'; // Importa o nosso novo componente
import { Loader2 } from 'lucide-react';

// Este é o "Loading" que o Suspense vai mostrar
// enquanto espera o 'LegalPageClient' (que usa useSearchParams) carregar.
const LoadingFallback = () => {
  return (
    <div className="flex h-[70vh] items-center justify-center">
      <Loader2 className="h-12 w-12 animate-spin text-brand-primary" />
    </div>
  );
};

// Esta é a página do servidor
export default function AvisosLegaisPage() {
  return (
    // O Suspense "embrulha" o componente de cliente
    <Suspense fallback={<LoadingFallback />}>
      <LegalPageClient />
    </Suspense>
  );
}