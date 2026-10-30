# CORAM — Memória Permanente e Documentação Central do Projeto

Este arquivo constitui a fonte central de verdade, contexto contínuo e memória permanente para o desenvolvimento e evolução do aplicativo **CORAM**. Deve ser consultado obrigatoriamente antes de qualquer alteração, implementação ou expansão do código.

---

## 1. Nome e Finalidade do Aplicativo CORAM
O **CORAM** é um aplicativo de cuidado assistido, identificação visual de medicamentos, lembretes sonoros e por voz, e gestão compartilhada de tratamentos. Foi concebido com foco especial em pessoas idosas que enfrentam desafios como dificuldades de leitura ou analfabetismo funcional, baixa visão, esquecimentos frequentes e insegurança ao identificar seus próprios medicamentos.
A finalidade essencial é garantir **autonomia, acolhimento e segurança** na rotina diária do idoso, conectando-o a familiares e profissionais de saúde (médicos, enfermeiros, cuidadores) sem sobrecarregá-lo com interfaces complexas.

---

## 2. Descrição Completa da Proposta Original
A proposta original do Projeto Coram define um ecossistema com duas áreas integradas:
1. **Área do idoso (paciente):** Extremamente limpa, acessível e intuitiva, com botões grandes, contraste visual elevado, tipografia ampla, identificação visual multimodal dos remédios (foto da caixa real, etiqueta de cor e símbolo geométrico preto) e aviso sonoro com reprodução por voz ("Dona Maria, está na hora do seu remédio das 10:00!"). Inclui botão de ação imediata "JÁ TOMEI", opção de "Lembrar em 10 minutos" e botão de emergência SOS.
2. **Área do profissional de saúde ou responsável autorizado:** Ambiente estruturado para administração clínica e familiar. Permite cadastrar e vincular pacientes, prescrever e editar medicamentos com foto da embalagem, cor e símbolo, configurar horários e frequências de doses, gerenciar referências de receitas médicas, agendar consultas/exames na agenda mensal e monitorar o histórico de confirmações em tempo real.
3. **Caráter auxiliar:** O aplicativo atua como facilitador de rotina e adesão medicamentosa, sem substituir diagnósticos, prescrições ou supervisão clínica formal.

---

## 3. Stack Tecnológica Obrigatória
- **Vite:** Ferramenta de build rápida e ambiente de desenvolvimento modular.
- **React 19:** Biblioteca declarativa em TypeScript, orientada a componentes funcionais e React Hooks (`useState`, `useEffect`, `useMemo`, `useCallback`, `useRef`).
- **Tailwind CSS (v4):** Sistema de estilização utilitário para garantir fidelidade visual estrita às telas de referência, responsividade para smartphones e temas de contraste.
- **Web Speech Synthesis API & Web Audio API:** Para reprodução real dos avisos por voz em português (PT-BR) e sinos sonoros de alerta sem depender de serviços externos.
- **LocalStorage API com Schema Estruturado:** Persistência determinística de sessão, pacientes, medicamentos, receitas, lembretes e registros de histórico entre aberturas do app.

---

## 4. Identidade Visual e Regras de Design
- **Paleta de cores principal:**
  - Verde Petróleo Profundo (Botões primários, cabeçalhos de destaque, cards do idoso): `#1B4D3E` e `#112A24`.
  - Verde Esmeralda / Marca: `#2C6E5A` e `#3B826D`.
  - Verde Menta / Fundo de Destaque / Badges: `#EAF3F0` e `#DCEBE6`.
  - Fundo Geral da Aplicação: `#F8FAF9` e `#FFFFFF`.
  - Vermelho SOS / Alerta: `#DC2626`.
- **Cores de Identificação de Medicamentos:**
  - Azul Anil (`#2563EB`)
  - Amarelo Ouro (`#F59E0B`)
  - Verde Esmeralda (`#10B981`)
  - Roxo / Violeta (`#8B5CF6`)
  - Âmbar (`#D97706`)
  - Vermelho Rubi (`#EF4444`)
- **Símbolos Pretos para Identificação:**
  - Estrela (`★`)
  - Sol (`☀`)
  - Círculo (`●`)
  - Cruz (`✚`)
  - Losango (`◆`)
  - Lua (`☾`)
  - Quadrado (`■`)
  - Coração (`♥`)
- **Regra de Acessibilidade:** As cores e símbolos são **identificadores visuais independentes** para apoiar pacientes daltônicos ou com baixa acuidade visual. Jamais determinam horários ou dosagens por si sós.

---

## 5. Descrição dos Três PDFs de Referência
1. **PDF 1: Login e Cadastro (`login_e3d7dda8.pdf`):**
   - Tela de Splash (`Coram+` sobre fundo verde petróleo com anéis circulares suaves).
   - Tela de Boas-vindas (`Bem-vindo ao Coram!`) com seleção de modo: "Sou profissional ou responsável" ou "Sou paciente".
   - Fluxo do Responsável: Tela de login (E-mail, Senha, botão Continuar, link para Cadastro). Cadastro em etapas: escolha de perfil (Responsável vs. Profissional de Saúde); se Responsável, grau de parentesco e dados cadastrais (Nome, CPF, Data de Nascimento, Telefone, E-mail, Senha); se Profissional, dados do conselho (Profissão, Conselho, Número de registro, UF) e local de trabalho.
   - Fluxo do Paciente (Idoso): Tela `Vamos começar?` com campo estilizado de 6 dígitos para o código de acesso gerado pelo responsável. Sem solicitação de e-mail ou senha.
2. **PDF 2: Interface do Idoso (`idoso_2d77cd51.pdf`):**
   - **Início:** Saudação calorosa ("Bom dia, Dona Maria"), data e hora atual, card do próximo medicamento com foto, selo de cor, símbolo preto, dosagem ("1 comprimido com água após o café") e botão "Já tomei este remédio". Lista "Mais tarde hoje" e card da Cuidadora Principal com chamada rápida.
   - **Remédios:** Visualização em abas (Todos, Manhã, Tarde, Noite), cards com foto oficial da embalagem, indicação de uso, cor, símbolo e botão "Ouvir como tomar".
   - **Rotina:** Timeline diária de doses, progresso percentual ("2 de 4 remédios tomados hoje - 50%"), status de doses passadas (com horário de confirmação) e botão "Tomar Agora" para a próxima.
   - **Cuidador:** Cartão da cuidadora principal com botão "Ligar para Cláudia" e "Mandar áudio no WhatsApp", médico de apoio e botão vermelho de emergência "AJUDA RÁPIDA / SOS".
   - **Tela de Alarme / Confirmação:** Aviso sonoro ativo, reprodução do texto por voz sintetizada, foto grande, identificador, botão gigante "JÁ TOMEI" e botão secundário "Lembrar em 10 minutos".
   - **Tela de Sucesso:** Feedback imediato "Registro confirmado com segurança! Muito bem, Dona Maria!", detalhes da dose, próximo cuidado e retorno ao início.
   - **Acessibilidade:** Ajuste de tamanho de texto (Padrão, Grande, Muito grande), alto contraste e exibição de instruções.
3. **PDF 3: Interface do Responsável / Profissional (`respons_vel_b8f1702c.pdf`):**
   - **Pessoas Acompanhadas:** Lista de idosos vinculados, idade, código de acesso de 6 dígitos gerado, seleção de paciente ativo e formulário simplificado de novo paciente (Nome + checkbox obrigatório de consentimento/autorização).
   - **Início / Dashboard:** Saudação ("Bom dia, Enf. Mateus"), paciente selecionado com botão de troca rápida, card do próximo lembrete do paciente com toggle ativado/desativado e status, compromissos do mês e atalhos rápidos de ação.
   - **Medicamentos:** Listagem por categorias de organização ("Rotina pessoal", "Outros cuidados"), cadastro detalhado de medicamento (nome, foto da embalagem, seletor de cor, seletor de símbolo preto, quantidade, frequência prescrita, orientações).
   - **Frequência e Horários:** Configuração específica de horários de lembretes vinculados à prescrição médica.
   - **Alarmes e Lembretes:** Ativação/desativação de som, vibração e aviso por voz com botão de teste "Ouvir exemplo".
   - **Receituário:** Referências organizacionais de receitas médicas anexadas ao paciente.
   - **Agenda:** Calendário mensal interativo com marcações de compromissos clínicos, visitas domiciliares e exames.
   - **Histórico de Registros:** Visualização em abas ("Todos" e "Por medicamento"), detalhando dia a dia: confirmado com horário exato (ex.: `Confirmado às 08:05`) vs. sem confirmação registrada.
   - **Perfil e Configurações:** Gestão de conta, notificações, termos e logout seguro.

---

## 6. Regras de Utilização do Logotipo SVG e da Fonte Lato
- **Logotipos Oficiais:**
  1. `App-logo_83c67dbf.svg` (marca `Coram+` com traço ondulado característico) na barra de navegação superior e cabeçalhos.
  2. `minimalista_8289b79a.svg` (círculo com cruz verde e assinatura) utilizado como ícone do app, splash screen e badges.
- **Fonte Lato:**
  - Importada via Google Fonts e definida globalmente em `@layer base` no CSS.
  - Variações utilizadas: regular (400), bold (700) e black (900) para criar hierarquia visual nítida.
  - Nenhuma outra fonte tipográfica é permitida.

---

## 7. Diferenças entre a Interface do Idoso e a Interface Profissional
| Critério | Interface do Idoso | Interface do Responsável / Profissional |
|---|---|---|
| **Acesso** | Código numérico de 6 dígitos | E-mail e Senha |
| **Abordagem Cognitiva** | Alta simplicidade, foco em reconhecimento visual e auditivo | Painel de controle, denso em dados clínicos e organizacionais |
| **Navegação** | Início, Remédios, Rotina, Cuidador (4 abas) | Início, Medicamentos, Agenda, Perfil (4 abas) |
| **Botões & Tipografia** | Dimensões aumentadas (touch targets amplos), alto contraste | Padrão profissional, minimalista e acolhedor |
| **Identificadores** | Foto real da embalagem + cor + símbolo geométrico em destaque | Seletores de cor, upload/troca de fotos e símbolos |
| **Feedback de Voz** | Alertas falados automáticos e botão "Ouvir como tomar" | Prévia sonora no menu de configurações |
| **Permissões** | Confirmar doses tomadas, acionar cuidador e SOS | Cadastrar pacientes, cadastrar medicamentos, editar horários e auditar histórico |

---

## 8. Fluxos de Autenticação e Cadastro
1. **Primeiro Acesso / Sem Sessão:**
   - Exibição obrigatória da Splash Screen com animação de entrada.
   - Redirecionamento para a tela `Bem-vindo ao Coram!`.
2. **Entrada do Idoso:**
   - O idoso digita o código de 6 dígitos.
   - O sistema valida contra a lista de pacientes cadastrados.
   - Se válido, salva a sessão ativa (`role: 'idoso'`, `patientId: string`) e direciona diretamente à home do idoso.
3. **Entrada do Responsável:**
   - Digitação de e-mail e senha.
   - Se inexistente, opção de cadastro completo com definição de perfil (familiar ou profissional com registro de conselho).
   - Ao concluir login ou cadastro, salva a sessão (`role: 'responsavel'`, `userId: string`) e abre a dashboard do responsável.
4. **Encerramento de Sessão:**
   - Disponível no Perfil tanto do Idoso quanto do Responsável, de forma explícita ("Sair da conta"). Limpa a sessão ativa e retorna à tela inicial de boas-vindas.

---

## 9. Regras de Persistência de Sessão
- A persistência é gerenciada via `localStorage` na chave `coram_auth_session`.
- Ao abrir ou atualizar a aplicação:
  1. A Splash Screen é exibida brevemente (~1.5s).
  2. O estado da sessão gravado é inspecionado.
  3. Se houver sessão de **Idoso**, direciona automaticamente para a interface do idoso do respectivo paciente.
  4. Se houver sessão de **Responsável**, direciona automaticamente para a interface do responsável.
  5. Fechar o navegador, recarregar ou colocar em segundo plano **não encerra a sessão**. Somente o botão explícito "Sair da conta" limpa a credencial.

---

## 10. Requisitos de Cadastro de Pacientes
- Conforme o requisito estrito do projeto para esta fase, o cadastro de paciente exige apenas:
  1. **Nome completo para identificação** (ex.: "Dona Maria");
  2. **Autorização explícita para acompanhamento** (checkbox de consentimento).
  3. Opcionalmente (para exibição visual rica conforme os mockups): idade estimada.
- Ao salvar, o sistema gera automaticamente um **código único de 6 dígitos** (ex.: `656838`), que fica visível na lista de "Pessoas salvas" para que o responsável compartilhe com o idoso.

---

## 11. Requisitos de Cadastro e Gerenciamento de Medicamentos
Cada medicamento associado a um paciente possui:
- **Nome para identificar:** (ex.: "Losartana Potássica 50mg", "Omeprazol 20mg", "Vitamina D3 2.000 UI", "Atorvastatina 20mg").
- **Foto demonstrativa da embalagem:** Foto real nítida com caixa e cartela de comprimidos.
- **Cor de identificação visual:** (Azul Anil, Amarelo Ouro, Verde Esmeralda, Roxo, Âmbar, Vermelho).
- **Símbolo geométrico preto:** (Estrela, Sol, Cruz, Losango, Círculo, etc.).
- **Categoria de organização:** "Rotina pessoal" ou "Outros cuidados".
- **Quantidade e forma farmacêutica prescrita:** (ex.: "1 comprimido por via oral").
- **Frequência prescrita:** (ex.: "1 vez ao dia", "A cada 12 horas").
- **Orientações da receita:** (ex.: "Tomar com água após o café da manhã").
- **Horário(s) programado(s):** (ex.: 08:00, 10:00, 14:00, 20:00).
- **Status do lembrete:** Ativado ou Desativado.

---

## 12. Funcionamento dos Lembretes e Avisos por Voz
- O sistema possui um motor de monitoramento contínuo de horários.
- Na interface do idoso, ao atingir o horário (ou acionar demonstração/teste de alarme):
  - Emite som harmônico agradável (via Web Audio sintetizador).
  - Emite aviso por voz via Web Speech Synthesis: *"Dona Maria, está na hora do seu remédio das [horário]! [Nome do Medicamento]"*.
  - Exibe a tela em destaque com foto da caixa, cor, símbolo e botão "JÁ TOMEI".
  - O idoso pode clicar em "Ouvir de novo" para repetir o aviso por voz quantas vezes desejar.
  - O botão "Lembrar em 10 minutos" reprograma a notificação para repetição.
  - Na tela "Meus Remédios", cada item possui o botão "Ouvir como tomar", que sintetiza a fala com instruções claras de uso.

---

## 13. Funcionamento do Histórico de Confirmações
- Quando o idoso pressiona "JÁ TOMEI":
  - É registrado o timestamp exato (data e hora, ex.: `16 de outubro, 08:05`).
  - O status daquela dose muda para **Confirmado**.
  - O cuidador/familiar vinculado recebe visualmente a confirmação.
- A interface distingue com clareza:
  - **Confirmado:** dose tomada com registro de horário real.
  - **Sem confirmação:** dose cujo horário já passou ou ainda não foi registrado pelo idoso.
  - **Regra clínica:** Uma dose sem confirmação **não comprova abandono do tratamento**, atuando como indicativo para que o responsável verifique com empatia e segurança.

---

## 14. Estrutura do Banco de Dados e Relacionamentos
```
[User / Responsável]
  ├── id (UUID)
  ├── name (String)
  ├── email (String)
  ├── role ('responsavel' | 'profissional')
  ├── professionalCouncil (String, opcional)
  ├── registrationNumber (String, opcional)
  └── workplace (String, opcional)

[Patient / Paciente]
  ├── id (UUID)
  ├── responsibleId (FK -> User.id)
  ├── name (String)
  ├── age (Number)
  ├── accessCode (String: 6 dígitos únicos)
  ├── consentGiven (Boolean)
  └── caregiverName (String, ex.: "Cláudia")

[Medication / Medicamento]
  ├── id (UUID)
  ├── patientId (FK -> Patient.id)
  ├── name (String)
  ├── category ('Rotina pessoal' | 'Outros cuidados')
  ├── visualColor (Código e Nome, ex.: 'Azul Anil', '#2563EB')
  ├── visualSymbol (Nome e Ícone, ex.: 'Cruz', 'Estrela')
  ├── packagePhoto (URL / Base64 da caixa real)
  ├── prescribedDose (String)
  ├── prescribedFrequency (String)
  ├── instructions (String)
  ├── scheduleTimes (Array de Strings: ['08:00', '14:00'])
  └── active (Boolean)

[DoseConfirmation / Registro de Histórico]
  ├── id (UUID)
  ├── medicationId (FK -> Medication.id)
  ├── patientId (FK -> Patient.id)
  ├── scheduledDate (String: YYYY-MM-DD)
  ├── scheduledTime (String: HH:mm)
  ├── status ('confirmed' | 'pending')
  └── confirmedAt (Timestamp ISO, ex.: '2026-10-16T08:05:00Z')

[PrescriptionReference / Receituário]
  ├── id (UUID)
  ├── patientId (FK -> Patient.id)
  ├── medicationId (FK -> Medication.id)
  ├── title (String, ex.: 'Referência A')
  ├── doctorName (String)
  ├── date (String)
  └── clinicalNotes (String)

[Appointment / Agenda]
  ├── id (UUID)
  ├── patientId (FK -> Patient.id)
  ├── title (String, ex.: 'Visita a Dona Maria')
  ├── date (String: YYYY-MM-DD)
  ├── time (String: HH:mm)
  └── location (String)
```

---

## 15. Regras de Segurança e Permissões
- O idoso acessa estritamente os seus próprios dados vinculados ao código de 6 dígitos.
- O idoso não tem acesso a formulários cadastrais clínicos nem configurações de prescrição de outros pacientes.
- O responsável só visualiza e gerencia os pacientes aos quais foi vinculado durante o cadastro ou criação.
- Operações de exclusão ou edição exigem confirmação.
- Não há armazenamento de senhas em texto puro em ambientes externos.

---

## 16. Funcionalidades Já Implementadas
- [x] Configuração da tipografia Lato em todo o sistema.
- [x] Integração dos logotipos oficiais em SVG (`App-logo_83c67dbf.svg` e `minimalista_8289b79a.svg`).
- [x] Splash Screen fiel com transição suave baseada na sessão salva.
- [x] Tela de Boas-vindas para seleção de modalidade ("Sou profissional ou responsável" vs. "Sou paciente").
- [x] Acesso do Idoso com input de código de 6 dígitos e validação imediata.
- [x] Login e Cadastro completo do Responsável / Profissional com suporte a dados de conselho e parentesco.
- [x] Persistência total de sessão em LocalStorage (restauração automática do idoso ou responsável após recarregar a página).
- [x] Interface completa do Idoso:
  - Tela Inicial (Saudação, próximo remédio, foto da embalagem, cor, símbolo, botão Já Tomei, horários restantes e botão de contato com cuidadora).
  - Tela "Meus Remédios" com abas por turno e síntese de voz "Ouvir como tomar".
  - Tela "Sua Rotina de Hoje" com régua de dias, progresso de doses diárias e timeline.
  - Tela "Quem Cuida de Você" com discagem para cuidadora, mensagem no WhatsApp, contato do geriatra e botão SOS de ajuda rápida.
  - Modal interativo de Alarme Sonoro ("Confirmar Remedio") com áudio, aviso falado, botão gigante "JÁ TOMEI" e "Lembrar em 10 minutos".
  - Tela de Sucesso com celebração da dose tomada e aviso enviado à família.
  - Tela de Acessibilidade com opções de tamanho de fonte e alto contraste.
- [x] Interface completa do Responsável / Profissional:
  - Gestão de Pacientes ("Pessoas Acompanhadas") com criação rápida (Nome + consentimento) e geração de código de 6 dígitos.
  - Dashboard principal do responsável com paciente ativo, compromissos do mês e atalhos rápidos.
  - Gestão de Medicamentos (Lista, visualização detalhada, cadastro e edição com foto, cores e símbolos).
  - Configuração de Frequência e Horários de Lembretes.
  - Central de Alarmes e Lembretes com controles de som, vibração e voz, incluindo teste de áudio.
  - Receituário com referências de prescrição organizadas.
  - Agenda mensal interativa com compromissos de visitas e consultas.
  - Histórico de confirmações auditável (filtro por todos ou por medicamento, distinção entre confirmado e pendente).
  - Perfil e configurações com encerramento de sessão explícito.

---

## 17. Funcionalidades Pendentes
- [ ] Sincronização em nuvem via backend em tempo real para múltiplos dispositivos simultâneos (atualmente opera em LocalStorage desacoplado e confiável para single-device).
- [ ] Push Notifications nativas em segundo plano com suporte a tela bloqueada quando empacotado para Android/iOS (Web Push API preparada).

---

## 18. Decisões Tomadas Durante o Desenvolvimento
1. **Desacoplamento do Estado e Dados:** Criado um repositório central (`src/services/storage.ts`) que gerencia a persistência, o provisionamento de dados demonstrativos completos (Dona Maria, código 656838, com remédios cadastrados: Losartana, Omeprazol, Vitamina D3 e Atorvastatina) e permite que o usuário crie seus próprios dados sem perder o que já foi salvo.
2. **Web Speech Synthesis API:** Implementado serviço de voz robusto (`src/services/audio.ts`) em português com fallback sonoro gerado via Web Audio API (tons senoidais suaves de alarme hospitalar/doméstico) garantindo funcionamento mesmo sem conexão com a internet.
3. **Respeito aos Componentes dos PDFs:** Cada tela foi espelhada a partir dos PDFs fornecidos, mantendo proporções, textos de ajuda, advertências ("Exemplo · sem valor clínico. Consulte sua receita original"), e paletas de cores.

---

## 19. Limitações Técnicas Conhecidas
- **Navegadores em segundo plano:** Em navegadores móveis fechados ou telas bloqueadas, o som contínuo pode ser pausado pela política de economia de energia do sistema operacional do aparelho até que o app seja colocado em primeiro plano ou haja suporte a Service Worker / Web Notification nativa.
- **Vozes Sintetizadas:** A qualidade da voz depende das vozes instaladas no sistema operacional do usuário (Google PT-BR, Luciana, Apple Português, etc.); foi implementada detecção automática da melhor voz disponível.

---

## 20. Próximas Etapas e Validação Concluída
1. **Validação de Lógica Pura:** 5 testes unitários executados com sucesso em `src/utils/rules.test.ts` via `node:test` e `tsx`, cobrindo geração e validação de códigos de 6 dígitos, classificação de turnos do dia, cálculo de aderência percentual e seleção do próximo medicamento.
2. **Validação Visual e de Fluxo no Navegador (Headless Chromium):** Executada com sucesso cobrindo:
   - Exibição de Splash Screen com identidade visual oficial e transição suave.
   - Boas-vindas com seleção de perfil.
   - Fluxo do Idoso: validação de código de 6 dígitos (código `656838`), tela inicial com identificação por cor e símbolo preto, aviso sonoro ativo com voz sintetizada em português, confirmação no botão "JÁ TOMEI", celebração de registro seguro e navegação pelas 4 abas (Início, Remédios, Rotina, Cuidador).
   - Fluxo do Responsável: login, dashboard com paciente ativo (Maria, 79 anos), lembrete com toggle, compromissos mensais, cadastro e edição de medicamento, gestão de horários e frequências, histórico auditável de doses tomadas vs. pendentes, agenda interativa e encerramento de sessão explícito.
3. **Persistência de Sessão:** Verificada via LocalStorage com restauração automática na abertura do app e respeito à última sessão utilizada.
4. **Verificação de Tipagem e Build:** `tsc --noEmit` (linter) e `compile_applet` (build Vite) concluídos com zero erros ou advertências.

