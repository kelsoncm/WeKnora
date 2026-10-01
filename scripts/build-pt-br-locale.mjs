import { readFileSync, writeFileSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { writeLocaleModule } from '../frontend/src/i18n/localeSerialize.ts'
import enUS from '../frontend/src/i18n/locales/en-US.ts'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = join(__dirname, '..')

// Common dictionary for exact text replacements
const EXACT_TRANSLATIONS = new Map([
  ['OK', 'OK'],
  ['Cancel', 'Cancelar'],
  ['Confirm', 'Confirmar'],
  ['Save', 'Salvar'],
  ['Delete', 'Excluir'],
  ['Edit', 'Editar'],
  ['Add', 'Adicionar'],
  ['Create', 'Criar'],
  ['Update', 'Atualizar'],
  ['Close', 'Fechar'],
  ['Copy', 'Copiar'],
  ['Copied', 'Copiado'],
  ['Loading...', 'Carregando...'],
  ['Loading', 'Carregando'],
  ['Search', 'Buscar'],
  ['Filter', 'Filtrar'],
  ['Reset', 'Redefinir'],
  ['Submit', 'Enviar'],
  ['Send', 'Enviar'],
  ['Success', 'Sucesso'],
  ['Failed', 'Falha'],
  ['Error', 'Erro'],
  ['Warning', 'Aviso'],
  ['Info', 'Informação'],
  ['Details', 'Detalhes'],
  ['Back', 'Voltar'],
  ['Next', 'Próximo'],
  ['Previous', 'Anterior'],
  ['Finish', 'Concluir'],
  ['Done', 'Pronto'],
  ['All', 'Todos'],
  ['None', 'Nenhum'],
  ['Enabled', 'Ativado'],
  ['Disabled', 'Desativado'],
  ['Status', 'Status'],
  ['Action', 'Ação'],
  ['Actions', 'Ações'],
  ['Operation', 'Operação'],
  ['Operations', 'Operações'],
  ['Name', 'Nome'],
  ['Description', 'Descrição'],
  ['Title', 'Título'],
  ['Type', 'Tipo'],
  ['Role', 'Função'],
  ['User', 'Usuário'],
  ['Password', 'Senha'],
  ['Email', 'E-mail'],
  ['Phone', 'Telefone'],
  ['Created at', 'Criado em'],
  ['Updated at', 'Atualizado em'],
  ['Created At', 'Criado em'],
  ['Updated At', 'Atualizado em'],
  ['Time', 'Hora'],
  ['Date', 'Data'],
  ['Language', 'Idioma'],
  ['Theme', 'Tema'],
  ['Settings', 'Configurações'],
  ['General', 'Geral'],
  ['General Settings', 'Configurações Gerais'],
  ['System Settings', 'Configurações do Sistema'],
  ['Workspace', 'Espaço de Trabalho'],
  ['Workspaces', 'Espaços de Trabalho'],
  ['Members', 'Membros'],
  ['Overview', 'Visão Geral'],
  ['Chat', 'Conversa'],
  ['New Chat', 'Nova Conversa'],
  ['Knowledge Base', 'Base de Conhecimento'],
  ['Knowledge Bases', 'Bases de Conhecimento'],
  ['Agents', 'Agentes'],
  ['Agent', 'Agente'],
  ['Tools', 'Ferramentas'],
  ['Models', 'Modelos'],
  ['Model', 'Modelo'],
  ['Providers', 'Provedores'],
  ['Provider', 'Provedor'],
  ['Help', 'Ajuda'],
  ['Documentation', 'Documentação'],
  ['Preview', 'Pré-visualização'],
  ['Download', 'Baixar'],
  ['Upload', 'Enviar'],
  ['Import', 'Importar'],
  ['Export', 'Exportar'],
  ['Refresh', 'Atualizar'],
  ['Retry', 'Tentar novamente'],
  ['Remove', 'Remover'],
  ['Clear', 'Limpar'],
  ['Select', 'Selecionar'],
  ['Select all', 'Selecionar tudo'],
  ['Select All', 'Selecionar tudo'],
  ['Required', 'Obrigatório'],
  ['Optional', 'Opcional'],
  ['Yes', 'Sim'],
  ['No', 'Não'],
  ['On', 'Ativado'],
  ['Off', 'Desativado'],
  ['Open', 'Abrir'],
  ['View', 'Visualizar'],
  ['More', 'Mais'],
  ['Default', 'Padrão'],
  ['Custom', 'Personalizado'],
  ['Unknown', 'Desconhecido'],
  ['Empty', 'Vazio'],
  ['No data', 'Sem dados'],
  ['No Data', 'Sem dados'],
  ['Nothing to show', 'Nada a exibir'],
  ['Under Construction', 'Em construção'],
  ['Network Error', 'Erro de rede'],
  ['Failure', 'Falha'],
  ['Online', 'Online'],
  ['Offline', 'Offline'],
  ['Active', 'Ativo'],
  ['Inactive', 'Inativo'],
  ['Pending', 'Pendente'],
  ['In Progress', 'Em andamento'],
  ['Completed', 'Concluído'],
  ['Ready', 'Pronto'],
  ['Unavailable', 'Indisponível'],
  ['Thinking...', 'Pensando...'],
  ['Thinking', 'Pensando'],
  ['Stop Generation', 'Parar Geração'],
  ['Stop', 'Parar'],
  ['Regenerate', 'Regenerar'],
  ['Reference', 'Referência'],
  ['References', 'Referências'],
  ['Sources', 'Fontes'],
  ['Source', 'Fonte'],
  ['Web Search', 'Busca na Web'],
  ['Documents', 'Documentos'],
  ['Document', 'Documento'],
  ['Files', 'Arquivos'],
  ['File', 'Arquivo'],
  ['Chunks', 'Fragmentos'],
  ['Chunk', 'Fragmento'],
  ['FAQ', 'FAQ'],
  ['Wiki', 'Wiki'],
  ['Graph', 'Grafo'],
  ['Memory', 'Memória'],
  ['Sandbox', 'Sandbox'],
  ['Skills', 'Habilidades'],
  ['Skill', 'Habilidade'],
  ['Audit Log', 'Log de Auditoria'],
  ['Audit Logs', 'Logs de Auditoria'],
  ['Version', 'Versão'],
  ['Version history', 'Histórico de versões'],
  ['Auto', 'Automático'],
  ['Light', 'Claro'],
  ['Dark', 'Escuro'],
  ['System', 'Sistema'],
  ['Follow system', 'Seguir o sistema'],
  ['Select Language', 'Selecionar Idioma'],
  ['Language settings saved', 'Configurações de idioma salvas'],
  ['Select interface display language', 'Selecione o idioma de exibição da interface'],
  ['Operation successful', 'Operação realizada com sucesso'],
  ['Operation failed', 'Falha na operação'],
  ['Saved successfully', 'Salvo com sucesso'],
  ['Deleted successfully', 'Excluído com sucesso'],
  ['Updated successfully', 'Atualizado com sucesso'],
  ['Created successfully', 'Criado com sucesso'],
  ['Copied to clipboard', 'Copiado para a área de transferência'],
  ['Copy failed', 'Falha ao copiar'],
  ['Please enter', 'Por favor, insira'],
  ['Please select', 'Por favor, selecione'],
  ['Are you sure?', 'Tem certeza?'],
  ['Are you sure you want to delete?', 'Tem certeza de que deseja excluir?'],
  ['This action cannot be undone.', 'Esta ação não pode ser desfeita.'],
  ['Notice', 'Aviso'],
  ['Tip', 'Dica'],
  ['Search model ID or name', 'Buscar ID ou nome do modelo'],
  ['All providers', 'Todos os provedores'],
  ['All types', 'Todos os tipos'],
  ['Modified only', 'Apenas modificados'],
  ['Parameters', 'Parâmetros'],
  ['Full parameter definition', 'Definição completa dos parâmetros'],
  ['Show more', 'Mostrar mais'],
  ['Show less', 'Mostrar menos'],
  ['Expand', 'Expandir'],
  ['Collapse', 'Recolher'],
  ['Result', 'Resultado'],
  ['Results', 'Resultados'],
])

// Prefix / phrase replacements
const PHRASE_REPLACEMENTS = [
  // Workspace / Tenant replacements
  [/\bthe workspace\b/gi, 'o espaço de trabalho'],
  [/\ba workspace\b/gi, 'um espaço de trabalho'],
  [/\bthis workspace\b/gi, 'este espaço de trabalho'],
  [/\bcurrent workspace\b/gi, 'espaço de trabalho atual'],
  [/\bworkspaces\b/gi, 'espaços de trabalho'],
  [/\bworkspace\b/gi, 'espaço de trabalho'],
  [/\btenants\b/gi, 'espaços de trabalho'],
  [/\btenant\b/gi, 'espaço de trabalho'],

  // Common UI phrases
  [/\bplease try again later\b/gi, 'por favor, tente novamente mais tarde'],
  [/\bplease try again\b/gi, 'por favor, tente novamente'],
  [/\btry again\b/gi, 'tentar novamente'],
  [/\bfailed to load\b/gi, 'falha ao carregar'],
  [/\bfailed to create\b/gi, 'falha ao criar'],
  [/\bfailed to update\b/gi, 'falha ao atualizar'],
  [/\bfailed to delete\b/gi, 'falha ao excluir'],
  [/\bfailed to save\b/gi, 'falha ao salvar'],
  [/\bsuccessfully created\b/gi, 'criado com sucesso'],
  [/\bsuccessfully updated\b/gi, 'atualizado com sucesso'],
  [/\bsuccessfully deleted\b/gi, 'excluído com sucesso'],
  [/\bsuccessfully saved\b/gi, 'salvo com sucesso'],
  [/\bno matching records found\b/gi, 'nenhum registro correspondente encontrado'],
  [/\bno results found\b/gi, 'nenhum resultado encontrado'],
  [/\bno data available\b/gi, 'nenhum dado disponível'],
  [/\bno documents found\b/gi, 'nenhum documento encontrado'],
  [/\bknowledge base\b/gi, 'base de conhecimento'],
  [/\bknowledge bases\b/gi, 'bases de conhecimento'],
  [/\bweb search\b/gi, 'busca na web'],
  [/\bsearch results\b/gi, 'resultados da busca'],
  [/\bapi key\b/gi, 'chave de API'],
  [/\bapi keys\b/gi, 'chaves de API'],
  [/\bcontext window\b/gi, 'janela de contexto'],
  [/\breasoning support\b/gi, 'suporte a raciocínio'],
  [/\bmodel picker\b/gi, 'seletor de modelos'],
  [/\bvector dimension\b/gi, 'dimensão vetorial'],
  [/\bembedding model\b/gi, 'modelo de embedding'],
  [/\bchat model\b/gi, 'modelo de chat'],
  [/\brerank model\b/gi, 'modelo de rerank'],
  [/\bdeep thinking\b/gi, 'raciocínio profundo'],
  [/\bdeep thinking completed\b/gi, 'raciocínio profundo concluído'],
  [/\bdeep thinking finished\b/gi, 'raciocínio profundo finalizado'],
  [/\bthinking in progress\b/gi, 'pensando...'],
  [/\bpreparing answer\b/gi, 'preparando resposta…'],
  [/\bwaiting for answer\b/gi, 'aguardando resposta…'],
  [/\bsummarizing answer\b/gi, 'resumindo resposta…'],
  [/\bsession excerpt\b/gi, 'trecho da sessão'],
  [/\bno messages\b/gi, 'nenhuma mensagem'],
  [/\bnew conversation\b/gi, 'nova conversa'],
  [/\bnew chat\b/gi, 'nova conversa'],
  [/\bdocument sources\b/gi, 'fontes de documentos'],
  [/\bweb sources\b/gi, 'fontes da web'],
  [/\btool results\b/gi, 'resultados de ferramentas'],
  [/\bno sources available\b/gi, 'nenhuma fonte disponível'],
  [/\bview document details\b/gi, 'ver detalhes do documento'],
  [/\bview document\b/gi, 'ver documento'],
  [/\bcopy content\b/gi, 'copiar conteúdo'],
  [/\bcopy code\b/gi, 'copiar código'],
  [/\bcopy token\b/gi, 'copiar token'],
  [/\btoken copied\b/gi, 'token copiado'],
  [/\bcode copied\b/gi, 'código copiado'],
  [/\brotate token\b/gi, 'rotacionar token'],
  [/\btoken rotated\b/gi, 'token rotacionado'],
  [/\bembed channel\b/gi, 'canal de incorporação'],
  [/\bembed channels\b/gi, 'canais de incorporação'],
  [/\bdebug preview\b/gi, 'pré-visualização de depuração'],
  [/\bwidget position\b/gi, 'posição do widget'],
  [/\bwidget preview\b/gi, 'pré-visualização do widget'],
  [/\bpage title\b/gi, 'título da página'],
  [/\bprimary color\b/gi, 'cor primária'],
  [/\bwelcome message\b/gi, 'mensagem de boas-vindas'],
  [/\ballowed origins\b/gi, 'origens permitidas'],
  [/\brate limit\b/gi, 'limite de taxa'],
  [/\brate limit per minute\b/gi, 'limite de taxa por minuto'],
  [/\brequests per minute\b/gi, 'requisições por minuto'],
  [/\bupload file\b/gi, 'enviar arquivo'],
  [/\bupload image\b/gi, 'enviar imagem'],
  [/\bfile size\b/gi, 'tamanho do arquivo'],
  [/\bfile name\b/gi, 'nome do arquivo'],
  [/\bdrag and drop\b/gi, 'arraste e solte'],
  [/\bdrop here\b/gi, 'solte aqui'],
  [/\bclick to upload\b/gi, 'clique para enviar'],
  [/\ball rights reserved\b/gi, 'todos os direitos reservados'],
  [/\bterms of service\b/gi, 'termos de serviço'],
  [/\bprivacy policy\b/gi, 'política de privacidade'],
  [/\bsign in\b/gi, 'entrar'],
  [/\bsign out\b/gi, 'sair'],
  [/\blog in\b/gi, 'entrar'],
  [/\blog out\b/gi, 'sair'],
  [/\blogged in\b/gi, 'conectado'],
  [/\blogin successful\b/gi, 'login realizado com sucesso'],
  [/\blogin failed\b/gi, 'falha no login'],
  [/\binvalid username or password\b/gi, 'usuário ou senha inválidos'],
  [/\buser not found\b/gi, 'usuário não encontrado'],
  [/\bpermission denied\b/gi, 'permissão negada'],
  [/\bunauthorized\b/gi, 'não autorizado'],
  [/\bforbidden\b/gi, 'acesso proibido'],
  [/\bnot found\b/gi, 'não encontrado'],
  [/\binternal server error\b/gi, 'erro interno do servidor'],
  [/\bservice unavailable\b/gi, 'serviço indisponível'],
  [/\bconnection timeout\b/gi, 'tempo limite de conexão esgotado'],
  [/\bconnection failed\b/gi, 'falha na conexão'],
]

// Specific path overrides for high-touch UI areas
const PATH_OVERRIDES = {
  'language.zhCN': '简体中文',
  'language.enUS': 'English',
  'language.ruRU': 'Русский',
  'language.koKR': '한국어',
  'language.jaJP': '日本語',
  'language.ptBR': 'Português (Brasil)',
  'language.selectLanguage': 'Selecionar idioma',
  'language.language': 'Idioma',
  'language.languageDescription': 'Selecione o idioma de exibição da interface',
  'language.languageSaved': 'Configurações de idioma salvas',

  'theme.theme': 'Tema',
  'theme.themeDescription': 'Escolha o tema de cores da interface',
  'theme.light': 'Claro',
  'theme.dark': 'Escuro',
  'theme.system': 'Seguir o sistema',
  'theme.themeSaved': 'Tema salvo com sucesso',

  'font.font': 'Fonte',
  'font.fontDescription': 'Selecione a família de fontes da interface',
  'font.fontSaved': 'Configurações de fonte salvas',

  'general.title': 'Configurações Gerais',
  'general.allSettings': 'Todas as Configurações',
  'general.personalSettings': 'Configurações Pessoais',
  'general.helpAndDocs': 'Ajuda e Documentação',
  'general.description': 'Configure idioma, aparência e outras opções básicas',
  'general.settings': 'Configurações',
  'general.close': 'Fechar configurações',

  'menu.overview': 'Visão Geral',
  'menu.chat': 'Conversa',
  'menu.knowledge': 'Base de Conhecimento',
  'menu.agent': 'Agentes',
  'menu.model': 'Modelos',
  'menu.settings': 'Configurações',
  'menu.system': 'Sistema',
  'menu.systemSettings': 'Configurações do Sistema',
  'menu.systemAudit': 'Log de Auditoria',
  'menu.members': 'Membros',
  'menu.tools': 'Ferramentas',
  'menu.wiki': 'Wiki',
  'menu.datasource': 'Fontes de Dados',

  'auth.login': 'Entrar',
  'auth.logout': 'Sair',
  'auth.username': 'Usuário',
  'auth.password': 'Senha',
  'auth.rememberMe': 'Lembrar-me',
  'auth.forgotPassword': 'Esqueci minha senha',
  'auth.loginSuccess': 'Login realizado com sucesso',
  'auth.logoutSuccess': 'Desconectado com sucesso',
  'auth.sessionExpired': 'Sessão expirada. Faça login novamente.',

  'common.confirm': 'Confirmar',
  'common.cancel': 'Cancelar',
  'common.save': 'Salvar',
  'common.delete': 'Excluir',
  'common.edit': 'Editar',
  'common.add': 'Adicionar',
  'common.create': 'Criar',
  'common.update': 'Atualizar',
  'common.close': 'Fechar',
  'common.copy': 'Copiar',
  'common.copied': 'Copiado',
  'common.loading': 'Carregando...',
  'common.finish': 'Concluir',
  'common.back': 'Voltar',
  'common.next': 'Próximo',
  'common.success': 'Sucesso',
  'common.failed': 'Falha',
  'common.error': 'Erro',
  'common.warning': 'Aviso',
  'common.info': 'Informação',
  'common.on': 'Ativado',
  'common.off': 'Desativado',

  'chat.title': 'Conversa',
  'chat.newChat': 'Nova Conversa',
  'chat.inputPlaceholder': 'Digite sua mensagem...',
  'chat.send': 'Enviar',
  'chat.thinking': 'Pensando...',
  'chat.regenerate': 'Regenerar',
  'chat.copy': 'Copiar',
  'chat.delete': 'Excluir',
  'chat.reference': 'Referência',
  'chat.noMessages': 'Nenhuma mensagem',
  'chat.waitingForAnswer': 'Aguardando resposta...',
  'chat.cannotAnswer': 'Desculpe, não posso responder a esta pergunta.',
  'chat.summarizingAnswer': 'Resumindo resposta...',
  'chat.loading': 'Carregando...',
  'chat.referencedContent': '{count} materiais relacionados utilizados',
  'chat.deepThinking': 'Raciocínio profundo concluído',
  'chat.knowledgeBaseQandA': 'P&R da Base de Conhecimento',
  'chat.askKnowledgeBase': 'Perguntar à base de conhecimento',
  'chat.sourcesCount': '{count} fontes',

  'chat.conversationTime.today': 'Hoje {time}',
  'chat.conversationTime.yesterday': 'Ontem {time}',
  'chat.conversationTime.thisYear': '{day}/{month} {time}',
  'chat.conversationTime.otherYear': '{day}/{month}/{year} {time}',

  'chat.referencesDrawerTitle': 'Fontes',
  'chat.referencesDrawerTitleWeb': 'Fontes da web',
  'chat.referencesDrawerTitleDocs': 'Fontes de documentos',
  'chat.referencesDrawerTitleTools': 'Resultados de ferramentas',
  'chat.referencesDrawerTitleMixed': 'Fontes',
  'chat.referencesDrawerWebSection': 'Web',
  'chat.referencesDrawerDocsSection': 'Documentos',
  'chat.referencesDrawerToolsSection': 'Ferramentas',
  'chat.referencesDrawerEmpty': 'Nenhuma fonte disponível',

  'settings.sandbox.installCommandRunning': 'Executando comando de instalação...',
  'settings.sandbox.installCommandWaiting': 'Aguardando conclusão do comando de instalação...',
  'inviteRegister.bannerTitle': 'Você foi convidado para participar de "{tenant}"',
  'inviteRegister.subtitle': 'Você foi convidado para participar de “{tenant}”',
  'resourceOrigin.spaceTooltipWithTenant': 'Compartilhado via espaço "{space}" · de {tenant}',
  'tenantInvitation.myInbox.acceptSuccess': 'Entrou em "{tenant}".',
}

function translateString(val, keyPath) {
  if (PATH_OVERRIDES[keyPath]) {
    return PATH_OVERRIDES[keyPath]
  }

  const trimmed = val.trim()
  if (EXACT_TRANSLATIONS.has(trimmed)) {
    const translated = EXACT_TRANSLATIONS.get(trimmed)
    // Preserve leading/trailing whitespace
    const leading = val.match(/^\s*/)[0]
    const trailing = val.match(/\s*$/)[0]
    return leading + translated + trailing
  }

  // Mask out curly-brace tokens like {tenant}, {name}, {count}, etc.
  const tokens = []
  let masked = val.replace(/\{[^{}]+\}/g, (match) => {
    tokens.push(match)
    return `__TOKEN_${tokens.length - 1}__`
  })

  // Apply phrase replacements on masked
  for (const [pattern, replacement] of PHRASE_REPLACEMENTS) {
    masked = masked.replace(pattern, replacement)
  }

  // Ensure workspace terminology
  masked = masked.replace(/\btenants?\b/gi, (match) => {
    return match.toLowerCase().endsWith('s') ? 'espaços de trabalho' : 'espaço de trabalho'
  })

  // Restore tokens
  masked = masked.replace(/__TOKEN_(\d+)__/g, (_, idx) => tokens[Number(idx)])
  return masked
}

function translateTree(node, keyPath = '') {
  if (typeof node === 'string') {
    return translateString(node, keyPath)
  }

  if (Array.isArray(node)) {
    return node.map((item, idx) => translateTree(item, `${keyPath}[${idx}]`))
  }

  if (node && typeof node === 'object') {
    const result = {}
    for (const [key, child] of Object.entries(node)) {
      const childPath = keyPath ? `${keyPath}.${key}` : key
      result[key] = translateTree(child, childPath)
    }
    return result
  }

  return node
}

console.log('Generating pt-BR bundle from en-US source of truth...')
const ptBR = translateTree(enUS)

const targetFile = join(ROOT, 'frontend/src/i18n/locales/pt-BR.ts')
writeLocaleModule(targetFile, ptBR)
console.log(`Saved pt-BR locale to ${targetFile}`)
