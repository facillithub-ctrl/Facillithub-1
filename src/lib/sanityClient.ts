// src/lib/sanityClient.ts
import { createClient } from 'next-sanity'

// Pega as variáveis do .env.local
const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET!
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION!

// Documentação:
// Criamos o cliente de conexão que o nosso site usará
// para buscar dados (fetch) do Sanity.
export const sanityClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true, // `false` se quiser dados sempre frescos, `true` para cache (mais rápido)
})