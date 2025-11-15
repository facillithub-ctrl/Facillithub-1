// src/components/Header.tsx
"use client";

import React, { useState, Fragment } from 'react'; // Adicione Fragment
import { Transition } from '@headlessui/react'; // Adicione esta linha
import Link from 'next/link';
// Documentação: Importando ícones da 'lucide-react'
import {
  Menu, X, ChevronDown, Rocket, UserCircle,
  PenTool, ClipboardCheck, PlayCircle, Gamepad2, Library, Wand2, // Students
  School, Beaker, // Schools
  KeyRound, Users, CreditCard, // Enterprise
  Database, Waypoints, // Startups
  Calendar, Landmark, // Global
  FileText, Shield, Briefcase, Rss, // Recursos
  MessageSquare, HelpCircle, Phone, // Suporte
  ArrowRight
} from 'lucide-react';

// --- ESTRUTURAS DE DADOS (COM ÍCONES E DESCRIÇÕES) ---

// Documentação: Dados do Mega Menu
// Agora cada item tem um ícone e uma descrição (puxada dos seus PDFs)
const ecosystemLinks = {
  students: [
    { name: 'Facillit Write', desc: 'Produção textual e escrita com IA.', icon: PenTool, href: '/write' },
    { name: 'Facillit Test', desc: 'Avaliações e simulados personalizados.', icon: ClipboardCheck, href: '/test' },
    { name: 'Facillit Play', desc: 'Streaming educacional e aulas.', icon: PlayCircle, href: '/play' },
    { name: 'Facillit Games', desc: 'Aprendizado gamificado e adaptativo.', icon: Gamepad2, href: '/games' },
    { name: 'Facillit Library', desc: 'Biblioteca digital e portfólio.', icon: Library, href: '/library' },
    { name: 'Facillit Create', desc: 'Criação visual de mapas e slides.', icon: Wand2, href: '/create' },
  ],
  schools: [
    { name: 'Facillit Edu', desc: 'Gestão escolar e acadêmica completa.', icon: School, href: '/edu' },
    { name: 'Facillit Lab', desc: 'Laboratório virtual e simulações 3D.', icon: Beaker, href: '/lab' },
  ],
  enterprise: [
    { name: 'Facillit Access', desc: 'Controle de acesso e permissões.', icon: KeyRound, href: '/access' },
    { name: 'Facillit People', desc: 'Recursos humanos e gestão de talentos.', icon: Users, href: '/people' },
    { name: 'Facillit Card', desc: 'Cartão de benefícios corporativos.', icon: CreditCard, href: '/card' },
  ],
  startups: [
    { name: 'Facillit Center', desc: 'Gestão de negócios e dashboards.', icon: Database, href: '/center' },
    { name: 'Facillit API', desc: 'Controle e monetização de APIs.', icon: Waypoints, href: '/api' },
  ],
  global: [
    { name: 'Facillit Day', desc: 'Produtividade e rotina pessoal.', icon: Calendar, href: '/day' },
    { name: 'Facillit Finances', desc: 'Finanças pessoais integradas.', icon: Landmark, href: '/finances' },
  ],
};

const recursosLinks = [
  { name: 'Avisos Legais', href: '/legal', icon: FileText },
  { name: 'Acessibilidade', href: '/acessibilidade', icon: Shield },
  { name: 'Trabalhe conosco', href: '/carreiras', icon: Briefcase },
  { name: 'Blog', href: '/blog', icon: Rss },
];

const suporteLinks = [
  { name: 'Fale conosco', href: '/suporte/contato', icon: MessageSquare },
  { name: 'FAQ', href: '/suporte/faq', icon: HelpCircle },
  { name: 'Equipe de vendas', href: '/suporte/vendas', icon: Phone },
];


// --- COMPONENTE DO HEADER ---

const Header = () => {
  // Estado para o menu mobile
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  // Estado para os dropdowns (controla qual está aberto)
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  // Estado para o accordion mobile (controla qual seção está aberta)
  const [mobileAccordion, setMobileAccordion] = useState<string | null>(null);

  // Documentação: Funções de controle de menu
  // Controlam a abertura e fechamento, garantindo que apenas um abra por vez
  const handleDropdown = (menu: string) => {
    setOpenDropdown(openDropdown === menu ? null : menu);
  };

  const handleMobileAccordion = (menu: string) => {
    setMobileAccordion(mobileAccordion === menu ? null : menu);
  };
  
  const closeAllMenus = () => {
    setOpenDropdown(null);
    setIsMobileMenuOpen(false);
    setMobileAccordion(null);
  }

  // --- COMPONENTE DE ITEM DO MEGA MENU (REUTILIZÁVEL) ---
  const MegaMenuItem = ({ item }: { item: typeof ecosystemLinks.students[0] }) => (
    <Link
      href={item.href}
      className="group -m-3 p-3 flex items-start rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-150"
      onClick={closeAllMenus}
    >
      <div className="flex-shrink-0 p-2 bg-gradient-to-br from-brand-primary to-brand-secondary rounded-lg">
        <item.icon className="w-6 h-6 text-white" />
      </div>
      <div className="ml-4">
        <p className="text-sm font-medium text-gray-900 dark:text-white group-hover:text-brand-primary transition-colors">
          {item.name}
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          {item.desc}
        </p>
      </div>
    </Link>
  );

  return (
    <>
      <header className="w-full bg-white shadow-md dark:bg-gray-900 sticky top-0 z-40">
        <div className="container mx-auto flex justify-between items-center h-20 px-6">
          
          {/* 1. Logo (Esquerda) */}
          <div className="flex-shrink-0">
            <Link href="/" className="text-2xl font-bold" onClick={closeAllMenus}>
              <span className="bg-gradient-to-r from-brand-primary to-brand-secondary bg-clip-text text-transparent">
                Facillit Hub
              </span>
            </Link>
          </div>

          {/* 2. Navegação Principal (Centralizada) */}
          {/* Documentação: Esta é a nova estrutura de layout
              'absolute left-1/2 -translate-x-1/2' centraliza perfeitamente o menu
          */}
          <nav className="hidden md:flex items-center gap-8 absolute left-1/2 -translate-x-1/2">
            <Link href="/" className="text-gray-700 font-medium hover:text-brand-primary dark:text-gray-300 dark:hover:text-brand-secondary transition-colors">
              INÍCIO
            </Link>

            {/* --- Mega Menu Ecossistema --- */}
            <div className="relative">
              <button
                onClick={() => handleDropdown('eco')}
                className={`flex items-center font-medium hover:text-brand-primary dark:hover:text-brand-secondary transition-colors
                  ${openDropdown === 'eco' ? 'text-brand-primary dark:text-brand-secondary' : 'text-gray-700 dark:text-gray-300'}`}
              >
                ECOSSISTEMA <ChevronDown className={`w-5 h-5 ml-1 transition-transform ${openDropdown === 'eco' ? 'rotate-180' : ''}`} />
              </button>
              
              {/* Documentação: Usando 'Fragment' e 'transition' para animar
                  opacity-0 -> opacity-100
                  scale-95 -> scale-100
              */}
              <Transition
                show={openDropdown === 'eco'}
                enter="transition ease-out duration-200"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="transition ease-in duration-150"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <div 
                  className="absolute -left-72 top-full mt-4 w-screen max-w-5xl z-50"
                  onMouseLeave={() => setOpenDropdown(null)} // Fecha ao tirar o mouse
                >
                  <div className="shadow-2xl rounded-lg bg-white dark:bg-gray-800 p-6 grid grid-cols-5 gap-x-6 gap-y-4">
                    <div className="space-y-2 col-span-2">
                      <h5 className="font-bold text-gray-900 dark:text-white uppercase tracking-wider text-sm">For Students</h5>
                      {ecosystemLinks.students.map((item) => <MegaMenuItem key={item.name} item={item} />)}
                    </div>
                    <div className="space-y-2">
                      <h5 className="font-bold text-gray-900 dark:text-white uppercase tracking-wider text-sm">For Schools</h5>
                      {ecosystemLinks.schools.map((item) => <MegaMenuItem key={item.name} item={item} />)}
                    </div>
                    <div className="space-y-2">
                      <h5 className="font-bold text-gray-900 dark:text-white uppercase tracking-wider text-sm">For Enterprise</h5>
                      {ecosystemLinks.enterprise.map((item) => <MegaMenuItem key={item.name} item={item} />)}
                    </div>
                    <div className="space-y-2">
                      <h5 className="font-bold text-gray-900 dark:text-white uppercase tracking-wider text-sm">For Startups</h5>
                      {ecosystemLinks.startups.map((item) => <MegaMenuItem key={item.name} item={item} />)}
                      <h5 className="font-bold text-gray-900 dark:text-white uppercase tracking-wider text-sm mt-4">Global</h5>
                      {ecosystemLinks.global.map((item) => <MegaMenuItem key={item.name} item={item} />)}
                    </div>
                  </div>
                </div>
              </Transition>
            </div>

            <Link href="/precos" className="text-gray-700 font-medium hover:text-brand-primary dark:text-gray-300 dark:hover:text-brand-secondary transition-colors">
              PREÇOS
            </Link>

            {/* --- Dropdown Recursos --- */}
            <div className="relative">
              <button
                onClick={() => handleDropdown('rec')}
                className={`flex items-center font-medium hover:text-brand-primary dark:hover:text-brand-secondary transition-colors
                  ${openDropdown === 'rec' ? 'text-brand-primary dark:text-brand-secondary' : 'text-gray-700 dark:text-gray-300'}`}
              >
                RECURSOS <ChevronDown className={`w-5 h-5 ml-1 transition-transform ${openDropdown === 'rec' ? 'rotate-180' : ''}`} />
              </button>
              <Transition
                show={openDropdown === 'rec'}
                enter="transition ease-out duration-100" enterFrom="opacity-0" enterTo="opacity-100"
                leave="transition ease-in duration-75" leaveFrom="opacity-100" leaveTo="opacity-0"
              >
                <div className="absolute left-0 top-full mt-4 w-64 bg-white dark:bg-gray-800 shadow-lg rounded-lg py-2 z-50 overflow-hidden">
                  {recursosLinks.map((link) => (
                    <Link key={link.name} href={link.href} className="flex items-center gap-3 px-4 py-3 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                      <link.icon className="w-5 h-5 text-brand-primary" />
                      <span>{link.name}</span>
                    </Link>
                  ))}
                </div>
              </Transition>
            </div>
            
            {/* --- Dropdown Suporte --- */}
            <div className="relative">
              <button
                onClick={() => handleDropdown('sup')}
                className={`flex items-center font-medium hover:text-brand-primary dark:hover:text-brand-secondary transition-colors
                  ${openDropdown === 'sup' ? 'text-brand-primary dark:text-brand-secondary' : 'text-gray-700 dark:text-gray-300'}`}
              >
                SUPORTE <ChevronDown className={`w-5 h-5 ml-1 transition-transform ${openDropdown === 'sup' ? 'rotate-180' : ''}`} />
              </button>
              <Transition
                show={openDropdown === 'sup'}
                enter="transition ease-out duration-100" enterFrom="opacity-0" enterTo="opacity-100"
                leave="transition ease-in duration-75" leaveFrom="opacity-100" leaveTo="opacity-0"
              >
                <div className="absolute left-0 top-full mt-4 w-64 bg-white dark:bg-gray-800 shadow-lg rounded-lg py-2 z-50 overflow-hidden">
                  {suporteLinks.map((link) => (
                    <Link key={link.name} href={link.href} className="flex items-center gap-3 px-4 py-3 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                      <link.icon className="w-5 h-5 text-brand-secondary" />
                      <span>{link.name}</span>
                    </Link>
                  ))}
                </div>
              </Transition>
            </div>
          </nav>

          {/* 3. Área do Usuário (Direita) */}
          <div className="hidden md:flex items-center gap-4">
            <Link href="/account" className="flex items-center gap-2 text-gray-700 font-medium hover:text-brand-primary dark:text-gray-300 dark:hover:text-brand-secondary transition-colors">
              <UserCircle className="w-5 h-5" />
              Facillit Account
            </Link>
            <Link href="/signup" className="
              flex items-center gap-2
              bg-gradient-to-r from-brand-primary to-brand-secondary text-white 
              font-semibold py-2 px-5 rounded-btn
              hover:opacity-90 shadow-lg hover:shadow-brand-primary/30
              transition-all duration-300
            ">
              <Rocket className="w-5 h-5" />
              Começar Agora
            </Link>
          </div>

          {/* 4. Menu Mobile (Hamburguer) */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="text-gray-700 dark:text-gray-300"
            >
              <Menu className="w-7 h-7" />
            </button>
          </div>
        </div>
      </header>

      {/* 5. Overlay e Painel do Menu Mobile */}
      <Transition show={isMobileMenuOpen}>
        {/* Overlay (fundo escuro) */}
        <Transition.Child
          enter="transition-opacity ease-linear duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity ease-linear duration-300"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
            onClick={closeAllMenus}
          ></div>
        </Transition.Child>

        {/* Painel do Menu */}
        <Transition.Child
          as="div"
          className="fixed top-0 right-0 w-4/5 max-w-sm h-full bg-white dark:bg-gray-900 z-50 shadow-lg p-6 md:hidden overflow-y-auto"
          enter="transition ease-in-out duration-300 transform"
          enterFrom="translate-x-full"
          enterTo="translate-x-0"
          leave="transition ease-in-out duration-300 transform"
          leaveFrom="translate-x-0"
          leaveTo="translate-x-full"
        >
          <div className="flex justify-between items-center mb-6">
            <span className="text-xl font-bold bg-gradient-to-r from-brand-primary to-brand-secondary bg-clip-text text-transparent">
              Menu
            </span>
            <button onClick={closeAllMenus} className="text-gray-700 dark:text-gray-300">
              <X className="w-7 h-7" />
            </button>
          </div>
          
          {/* Links do Menu Mobile (com Accordion) */}
          <nav className="flex flex-col gap-2">
            <Link href="/" className="text-lg font-medium text-gray-700 dark:text-gray-300 p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800" onClick={closeAllMenus}>INÍCIO</Link>
            <Link href="/precos" className="text-lg font-medium text-gray-700 dark:text-gray-300 p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800" onClick={closeAllMenus}>PREÇOS</Link>
            
            {/* Accordion Ecossistema */}
            <div>
              <button onClick={() => handleMobileAccordion('eco')} className="w-full flex justify-between items-center text-lg font-medium text-gray-700 dark:text-gray-300 p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800">
                ECOSSISTEMA <ChevronDown className={`w-5 h-5 transition-transform ${mobileAccordion === 'eco' ? 'rotate-180' : ''}`} />
              </button>
              {mobileAccordion === 'eco' && (
                <div className="pl-4 mt-2 space-y-1 border-l-2 border-brand-primary/50">
                  {Object.values(ecosystemLinks).flat().map(item => (
                    <Link key={item.name} href={item.href} className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800" onClick={closeAllMenus}>
                      <item.icon className="w-5 h-5 text-brand-primary" />
                      <span className="text-sm font-medium">{item.name}</span>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Accordion Recursos */}
            <div>
              <button onClick={() => handleMobileAccordion('rec')} className="w-full flex justify-between items-center text-lg font-medium text-gray-700 dark:text-gray-300 p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800">
                RECURSOS <ChevronDown className={`w-5 h-5 transition-transform ${mobileAccordion === 'rec' ? 'rotate-180' : ''}`} />
              </button>
              {mobileAccordion === 'rec' && (
                <div className="pl-4 mt-2 space-y-1 border-l-2 border-brand-primary/50">
                  {recursosLinks.map(item => (
                    <Link key={item.name} href={item.href} className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800" onClick={closeAllMenus}>
                      <item.icon className="w-5 h-5 text-brand-primary" />
                      <span className="text-sm font-medium">{item.name}</span>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Accordion Suporte */}
            <div>
              <button onClick={() => handleMobileAccordion('sup')} className="w-full flex justify-between items-center text-lg font-medium text-gray-700 dark:text-gray-300 p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800">
                SUPORTE <ChevronDown className={`w-5 h-5 transition-transform ${mobileAccordion === 'sup' ? 'rotate-180' : ''}`} />
              </button>
              {mobileAccordion === 'sup' && (
                <div className="pl-4 mt-2 space-y-1 border-l-2 border-brand-primary/50">
                  {suporteLinks.map(item => (
                    <Link key={item.name} href={item.href} className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800" onClick={closeAllMenus}>
                      <item.icon className="w-5 h-5 text-brand-secondary" />
                      <span className="text-sm font-medium">{item.name}</span>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <hr className="my-4 border-gray-200 dark:border-gray-700" />
            
            <Link href="/account" className="flex items-center gap-3 text-lg font-medium text-gray-700 dark:text-gray-300 p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800" onClick={closeAllMenus}>
              <UserCircle className="w-6 h-6" />
              Facillit Account
            </Link>
            <Link href="/signup" className="
              flex items-center justify-center gap-2
              bg-gradient-to-r from-brand-primary to-brand-secondary text-white 
              font-semibold py-3 px-6 rounded-btn text-center
              hover:opacity-90 transition-opacity mt-2
            " onClick={closeAllMenus}>
              <Rocket className="w-5 h-5" />
              Começar Agora
            </Link>
          </nav>
        </Transition.Child>
      </Transition>
    </>
  );
};

// Documentação: Importando o 'Fragment' para as Transições
// Tivemos que importar o 'Fragment' do React para que a biblioteca
// de transição (Headless UI, que o Next.js usa) funcione corretamente.
export default Header;