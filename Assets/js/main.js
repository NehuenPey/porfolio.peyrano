const progressBar = document.getElementById("scrollProgress");
const navToggle = document.getElementById("navToggle");
const navMenu = document.getElementById("navMenu");
const currentYear = document.getElementById("currentYear");

if (currentYear) currentYear.textContent = new Date().getFullYear();

function updateScrollProgress() {
  if (!progressBar) return;
  const scrollableHeight =
    document.documentElement.scrollHeight - window.innerHeight;
  const progress =
    scrollableHeight > 0 ? (window.scrollY / scrollableHeight) * 100 : 0;
  progressBar.style.width = `${Math.min(progress, 100)}%`;
}

let scrollTicking = false;
window.addEventListener(
  "scroll",
  () => {
    if (scrollTicking) return;
    scrollTicking = true;
    window.requestAnimationFrame(() => {
      updateScrollProgress();
      scrollTicking = false;
    });
  },
  { passive: true },
);
updateScrollProgress();

function closeMenu() {
  if (!navToggle || !navMenu) return;
  navToggle.setAttribute("aria-expanded", "false");
  navToggle.setAttribute("aria-label", "Abrir menú");
  navMenu.classList.remove("is-open");
}

if (navToggle && navMenu) {
  navToggle.addEventListener("click", () => {
    const isExpanded = navToggle.getAttribute("aria-expanded") === "true";
    navToggle.setAttribute("aria-expanded", String(!isExpanded));
    navToggle.setAttribute(
      "aria-label",
      isExpanded ? "Abrir menú" : "Cerrar menú",
    );
    navMenu.classList.toggle("is-open", !isExpanded);
  });

  navMenu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeMenu();
  });

  document.addEventListener("click", (event) => {
    if (!navMenu.contains(event.target) && !navToggle.contains(event.target))
      closeMenu();
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 760) closeMenu();
  });
}

const revealItems = document.querySelectorAll(
  ".skill-card, .project-card, .secondary-card, .about-summary, .about-details",
);
if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.12 },
  );

  revealItems.forEach((item) => {
    item.classList.add("reveal-item");
    revealObserver.observe(item);
  });
}


// Multilingual interface: Spanish is the default language.
const languageStorageKey = "nehuen-portfolio-language";
const languageButtons = document.querySelectorAll("[data-language]");
const languageTranslations = {"es":{},"en":{"Saltar al contenido":"Skip to content","Navegación principal":"Main navigation","Abrir menú":"Open menu","Cerrar menú":"Close menu","Stack":"Stack","Proyectos":"Projects","Sobre mí":"About","Contacto":"Contact","Ver CV":"View CV","Desarrollador de Software · Rosario, Argentina":"Software Developer · Rosario, Argentina","Desarrollo aplicaciones web y APIs REST con foco en la lógica de negocio, la integración de bases de datos y la construcción de soluciones mantenibles. Trabajo principalmente con C# y ASP.NET Core, además de JavaScript, Node.js y Angular.":"I build web applications and REST APIs, focusing on business logic, database integration, and maintainable solutions. I mainly work with C# and ASP.NET Core, as well as JavaScript, Node.js, and Angular.","Ver proyectos":"View projects","Consultar CV":"View résumé","Perfiles profesionales":"Professional profiles","Aprendiendo continuamente.":"Always learning.","Actualmente trabajando en":"Currently working on","Aplicaciones web":"Web applications","Trabajo colaborativo":"Collaborative work","01 / Stack técnico":"01 / Tech stack","Herramientas para":"Tools to","construir soluciones.":"build solutions.","Tecnologías y herramientas que utilizo en proyectos académicos y personales.":"Technologies and tools I use in academic and personal projects.","Desarrollo de servicios, lógica de negocio e integración de APIs.":"Service development, business logic, and API integration.","Interfaces web, componentes y experiencias responsive.":"Web interfaces, components, and responsive experiences.","Bases de datos":"Databases","Modelado, consultas y persistencia de información.":"Data modeling, queries, and persistence.","Herramientas y prácticas":"Tools and practices","Control de versiones, documentación y organización del trabajo.":"Version control, documentation, and workflow organization.","02 / Proyectos seleccionados":"02 / Selected projects","Trabajo aplicado,":"Practical work,","más allá de la teoría.":"beyond theory.","Una selección de desarrollos en los que trabajé con distintas tecnologías, responsabilidades y desafíos.":"A selection of projects where I worked with different technologies, responsibilities, and challenges.","Proyecto grupal":"Team project","En desarrollo":"In progress","Plataforma de comercio electrónico para muebles artesanales. Participación en el desarrollo del backend, APIs REST, gestión de productos e integración con MongoDB dentro de un equipo de trabajo con metodología Scrum.":"E-commerce platform for handcrafted furniture. Contributed to backend development, REST APIs, product management, and MongoDB integration as part of a Scrum team.","Ver repositorio":"View repository","Proyecto personal":"Personal project","API REST para administrar propiedades inmobiliarias. Incluye operaciones CRUD, validaciones, persistencia con Entity Framework Core y autenticación basada en JWT.":"REST API for managing real estate properties. Includes CRUD operations, validation, persistence with Entity Framework Core, and JWT-based authentication.","Proyecto web":"Web project","Implementado":"Implemented","Rediseño responsive de un sitio de transporte, con secciones de horarios, tarifas, recorridos y navegación orientada a facilitar el acceso a la información.":"Responsive redesign of a transportation website, with schedules, fares, routes, and navigation designed to make information easier to access.","Otros proyectos":"Other projects","Desarrollos académicos y personales":"Academic and personal projects","Aplicación móvil":"Mobile application","Gestión de tareas con categorías, notificaciones e interacción mediante componentes.":"Task management with categories, notifications, and component-based interactions.","Sistema de gestión":"Management system","CRUD de clientes y mascotas con persistencia en una base de datos relacional.":"Customer and pet CRUD operations with relational database persistence.","Programación funcional":"Functional programming","Juego de memoria desarrollado aplicando lógica y conceptos de programación funcional.":"Memory game built using functional programming concepts and logic.","Desarrollo de videojuegos":"Game development","Experiencias académicas de videojuegos con mecánicas de interacción y diseño de niveles.":"Academic game projects featuring interaction mechanics and level design.","03 / Perfil":"03 / About","Formación técnica,":"Technical background,","aprendizaje constante.":"continuous learning.","Soy Técnico Superior en Desarrollo de Software y me enfoco en crear aplicaciones web, servicios backend y soluciones conectadas a bases de datos.":"I hold a Higher Technical Degree in Software Development and focus on building web applications, backend services, and database-driven solutions.","En mis proyectos trabajé con distintos lenguajes y frameworks, desde el desarrollo de interfaces hasta la implementación de APIs, autenticación y persistencia. Me interesa escribir código claro, entender el problema antes de resolverlo y construir funcionalidades que puedan mantenerse y evolucionar.":"Across my projects, I have worked with different languages and frameworks, from interface development to API implementation, authentication, and data persistence. I value clear code, understanding the problem before solving it, and building features that can be maintained and evolved.","Actualmente continúo ampliando mi experiencia práctica mediante proyectos personales y colaborativos, con especial interés en backend y desarrollo full stack.":"I continue to expand my hands-on experience through personal and collaborative projects, with a particular interest in backend and full stack development.","Resolución de problemas":"Problem solving","Aprendizaje continuo":"Continuous learning","Trabajo en equipo":"Teamwork","Responsabilidad":"Accountability","Formación":"Education","Finalizado · 2023":"Completed · 2023","Técnico Superior en Desarrollo de Software":"Higher Technical Degree in Software Development","Instituto Gral. Manuel Belgrano":"Instituto Gral. Manuel Belgrano","En curso":"In progress","Licenciatura en Corretaje Inmobiliario":"Bachelor's Degree in Real Estate Brokerage","Facultad de Derecho · Universidad Nacional de Rosario":"School of Law · National University of Rosario","Idiomas":"Languages","Nativo":"Native","Inglés":"English","Intermedio":"Intermediate","Portugués":"Portuguese","Básico–intermedio":"Elementary–intermediate","04 / Contacto":"04 / Contact","¿Tenés un proyecto":"Have a project","o una oportunidad?":"or an opportunity?","Estoy abierto a conversar sobre oportunidades profesionales, proyectos de desarrollo y colaboraciones.":"I am open to discussing professional opportunities, development projects, and collaborations.","Escribirme por email":"Email me","Perfil profesional":"Professional profile","Repositorios y proyectos":"Repositories and projects","Currículum":"Résumé","Consultá o descargá mi CV actualizado.":"View or download my updated résumé.","Abrir CV":"Open résumé","Desarrollador de Software":"Software Developer","Volver":"Back to top"},"pt":{"Saltar al contenido":"Pular para o conteúdo","Navegación principal":"Navegação principal","Abrir menú":"Abrir menu","Cerrar menú":"Fechar menu","Stack":"Tecnologias","Proyectos":"Projetos","Sobre mí":"Sobre mim","Contacto":"Contato","Ver CV":"Ver currículo","Desarrollador de Software · Rosario, Argentina":"Desenvolvedor de Software · Rosário, Argentina","Desarrollo aplicaciones web y APIs REST con foco en la lógica de negocio, la integración de bases de datos y la construcción de soluciones mantenibles. Trabajo principalmente con C# y ASP.NET Core, además de JavaScript, Node.js y Angular.":"Desenvolvo aplicações web e APIs REST com foco na lógica de negócios, integração de bancos de dados e criação de soluções de fácil manutenção. Trabalho principalmente com C# e ASP.NET Core, além de JavaScript, Node.js e Angular.","Ver proyectos":"Ver projetos","Consultar CV":"Consultar currículo","Perfiles profesionales":"Perfis profissionais","Aprendiendo continuamente.":"Aprendendo continuamente.","Actualmente trabajando en":"Trabalhando atualmente em","Aplicaciones web":"Aplicações web","Trabajo colaborativo":"Trabalho colaborativo","01 / Stack técnico":"01 / Tecnologias","Herramientas para":"Ferramentas para","construir soluciones.":"construir soluções.","Tecnologías y herramientas que utilizo en proyectos académicos y personales.":"Tecnologias e ferramentas que utilizo em projetos acadêmicos e pessoais.","Desarrollo de servicios, lógica de negocio e integración de APIs.":"Desenvolvimento de serviços, lógica de negócios e integração de APIs.","Interfaces web, componentes y experiencias responsive.":"Interfaces web, componentes e experiências responsivas.","Bases de datos":"Bancos de dados","Modelado, consultas y persistencia de información.":"Modelagem, consultas e persistência de informações.","Herramientas y prácticas":"Ferramentas e práticas","Control de versiones, documentación y organización del trabajo.":"Controle de versão, documentação e organização do trabalho.","02 / Proyectos seleccionados":"02 / Projetos selecionados","Trabajo aplicado,":"Trabalho aplicado,","más allá de la teoría.":"além da teoria.","Una selección de desarrollos en los que trabajé con distintas tecnologías, responsabilidades y desafíos.":"Uma seleção de projetos nos quais trabalhei com diferentes tecnologias, responsabilidades e desafios.","Proyecto grupal":"Projeto em equipe","En desarrollo":"Em desenvolvimento","Plataforma de comercio electrónico para muebles artesanales. Participación en el desarrollo del backend, APIs REST, gestión de productos e integración con MongoDB dentro de un equipo de trabajo con metodología Scrum.":"Plataforma de comércio eletrônico de móveis artesanais. Participação no desenvolvimento do backend, APIs REST, gerenciamento de produtos e integração com MongoDB em uma equipe que utiliza a metodologia Scrum.","Ver repositorio":"Ver repositório","Proyecto personal":"Projeto pessoal","API REST para administrar propiedades inmobiliarias. Incluye operaciones CRUD, validaciones, persistencia con Entity Framework Core y autenticación basada en JWT.":"API REST para gerenciar imóveis. Inclui operações CRUD, validações, persistência com Entity Framework Core e autenticação baseada em JWT.","Proyecto web":"Projeto web","Implementado":"Implementado","Rediseño responsive de un sitio de transporte, con secciones de horarios, tarifas, recorridos y navegación orientada a facilitar el acceso a la información.":"Redesign responsivo de um site de transporte, com seções de horários, tarifas, trajetos e navegação voltada a facilitar o acesso às informações.","Otros proyectos":"Outros projetos","Desarrollos académicos y personales":"Projetos acadêmicos e pessoais","Aplicación móvil":"Aplicativo móvel","Gestión de tareas con categorías, notificaciones e interacción mediante componentes.":"Gerenciamento de tarefas com categorias, notificações e interação por meio de componentes.","Sistema de gestión":"Sistema de gestão","CRUD de clientes y mascotas con persistencia en una base de datos relacional.":"CRUD de clientes e animais de estimação com persistência em banco de dados relacional.","Programación funcional":"Programação funcional","Juego de memoria desarrollado aplicando lógica y conceptos de programación funcional.":"Jogo da memória desenvolvido com lógica e conceitos de programação funcional.","Desarrollo de videojuegos":"Desenvolvimento de jogos","Experiencias académicas de videojuegos con mecánicas de interacción y diseño de niveles.":"Projetos acadêmicos de jogos com mecânicas de interação e design de níveis.","03 / Perfil":"03 / Perfil","Formación técnica,":"Formação técnica,","aprendizaje constante.":"aprendizado contínuo.","Soy Técnico Superior en Desarrollo de Software y me enfoco en crear aplicaciones web, servicios backend y soluciones conectadas a bases de datos.":"Sou Técnico Superior em Desenvolvimento de Software e meu foco é criar aplicações web, serviços backend e soluções conectadas a bancos de dados.","En mis proyectos trabajé con distintos lenguajes y frameworks, desde el desarrollo de interfaces hasta la implementación de APIs, autenticación y persistencia. Me interesa escribir código claro, entender el problema antes de resolverlo y construir funcionalidades que puedan mantenerse y evolucionar.":"Nos meus projetos, trabalhei com diferentes linguagens e frameworks, desde o desenvolvimento de interfaces até a implementação de APIs, autenticação e persistência. Valorizo código claro, compreender o problema antes de resolvê-lo e criar funcionalidades que possam ser mantidas e evoluir.","Actualmente continúo ampliando mi experiencia práctica mediante proyectos personales y colaborativos, con especial interés en backend y desarrollo full stack.":"Continuo ampliando minha experiência prática por meio de projetos pessoais e colaborativos, com especial interesse em backend e desenvolvimento full stack.","Resolución de problemas":"Resolução de problemas","Aprendizaje continuo":"Aprendizado contínuo","Trabajo en equipo":"Trabalho em equipe","Responsabilidad":"Responsabilidade","Formación":"Formação","Finalizado · 2023":"Concluído · 2023","Técnico Superior en Desarrollo de Software":"Técnico Superior em Desenvolvimento de Software","Instituto Gral. Manuel Belgrano":"Instituto Gral. Manuel Belgrano","En curso":"Em andamento","Licenciatura en Corretaje Inmobiliario":"Bacharelado em Corretagem Imobiliária","Facultad de Derecho · Universidad Nacional de Rosario":"Faculdade de Direito · Universidade Nacional de Rosário","Idiomas":"Idiomas","Nativo":"Nativo","Inglés":"Inglês","Intermedio":"Intermediário","Portugués":"Português","Básico–intermedio":"Básico–intermediário","04 / Contacto":"04 / Contato","¿Tenés un proyecto":"Você tem um projeto","o una oportunidad?":"ou uma oportunidade?","Estoy abierto a conversar sobre oportunidades profesionales, proyectos de desarrollo y colaboraciones.":"Estou aberto a conversar sobre oportunidades profissionais, projetos de desenvolvimento e colaborações.","Escribirme por email":"Enviar um e-mail","Perfil profesional":"Perfil profissional","Repositorios y proyectos":"Repositórios e projetos","Currículum":"Currículo","Consultá o descargá mi CV actualizado.":"Consulte ou baixe meu currículo atualizado.","Abrir CV":"Abrir currículo","Desarrollador de Software":"Desenvolvedor de Software","Volver":"Voltar ao topo"}};
const languageMeta = {
  es: { title: "Nehuén Peyrano | Desarrollador de Software", description: "Portfolio de Nehuén Peyrano, desarrollador de software enfocado en aplicaciones web, APIs REST y soluciones full stack con C#, ASP.NET Core, Node.js y Angular.", ogDescription: "Proyectos, stack tecnológico y perfil profesional de Nehuén Peyrano." },
  en: { title: "Nehuén Peyrano | Software Developer", description: "Nehuén Peyrano's portfolio. Software developer focused on web applications, REST APIs, and full stack solutions with C#, ASP.NET Core, Node.js, and Angular.", ogDescription: "Projects, technology stack, and professional profile of Nehuén Peyrano." },
  pt: { title: "Nehuén Peyrano | Desenvolvedor de Software", description: "Portfólio de Nehuén Peyrano, desenvolvedor de software com foco em aplicações web, APIs REST e soluções full stack com C#, ASP.NET Core, Node.js e Angular.", ogDescription: "Projetos, tecnologias e perfil profissional de Nehuén Peyrano." }
};

function setLanguage(language) {
  const selected = languageTranslations[language] ? language : "es";
  const dictionary = languageTranslations[selected];

  document.querySelectorAll("body *").forEach((element) => {
    if (element.children.length !== 0) return;
    const original = element.textContent;
    const normalized = original.trim().replace(/\\s+/g, " ");
    if (!normalized || !Object.prototype.hasOwnProperty.call(dictionary, normalized)) return;
    const leading = original.match(/^\\s*/)?.[0] || "";
    const trailing = original.match(/\\s*$/)?.[0] || "";
    element.textContent = leading + dictionary[normalized] + trailing;
  });

  const meta = languageMeta[selected];
  document.documentElement.lang = selected;
  document.title = meta.title;
  const description = document.getElementById("metaDescription");
  const ogDescription = document.getElementById("ogDescription");
  if (description) description.content = meta.description;
  if (ogDescription) ogDescription.content = meta.ogDescription;

  languageButtons.forEach((button) => {
    const active = button.dataset.language === selected;
    button.classList.toggle("is-active", active);
    button.setAttribute("aria-pressed", String(active));
  });
  try { localStorage.setItem(languageStorageKey, selected); } catch (error) { /* Storage is optional. */ }
}

languageButtons.forEach((button) => button.addEventListener("click", () => setLanguage(button.dataset.language)));
let savedLanguage = "es";
try { savedLanguage = localStorage.getItem(languageStorageKey) || "es"; } catch (error) { /* Spanish is the fallback. */ }
if (savedLanguage !== "es") setLanguage(savedLanguage);
