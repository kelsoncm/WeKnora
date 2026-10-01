import enUSConfig from 'tdesign-vue-next/esm/locale/en_US'

const ptBRConfig = {
  ...enUSConfig,
  pagination: {
    ...enUSConfig.pagination,
    itemsPerPage: '{size} / página',
    jumpTo: 'Ir para',
    page: '',
    total: 'nenhum item | 1 item | {count} itens',
  },
  popconfirm: {
    confirm: {
      content: 'OK',
    },
    cancel: {
      content: 'Cancelar',
    },
  },
  dialog: {
    confirm: 'Confirmar',
    cancel: 'Cancelar',
  },
  empty: {
    titleText: {
      maintenance: 'Em manutenção',
      success: 'Sucesso',
      fail: 'Falha',
      empty: 'Sem dados',
      networkError: 'Erro de rede',
    },
  },
  table: {
    ...enUSConfig.table,
    empty: 'Sem dados',
    loadingText: 'carregando...',
    loadingMoreText: 'carregando mais',
    filterInputPlaceholder: '',
    sortAscendingOperationText: 'clique para ordenar crescente',
    sortCancelOperationText: 'clique para cancelar ordenação',
    sortDescendingOperationText: 'clique para ordenar decrescente',
    clearFilterResultButtonText: 'Limpar',
    columnConfigButtonText: 'Configurar colunas',
    columnConfigTitleText: 'Configuração de colunas da tabela',
    columnConfigDescriptionText: 'Selecione as colunas para exibi-las na tabela',
    confirmText: 'Confirmar',
    cancelText: 'Cancelar',
    resetText: 'Redefinir',
    selectAllText: 'Selecionar tudo',
    searchResultText: 'Busca por "{result}". Nenhum item encontrado. | Busca por "{result}". 1 item encontrado. | Busca por "{result}". {count} itens encontrados.',
  },
  upload: {
    ...enUSConfig.upload,
    sizeLimitMessage: 'O arquivo é grande demais para enviar. {sizeLimit}',
    cancelUploadText: 'Cancelar',
    triggerUploadText: {
      fileInput: 'Enviar',
      image: 'Clique para enviar',
      normal: 'Enviar',
      reupload: 'Reenviar',
      continueUpload: 'Continuar envio',
      delete: 'Excluir',
      uploading: 'Enviando',
    },
    dragger: {
      dragDropText: 'Solte aqui',
      draggingText: 'Arraste o arquivo para esta área para enviar',
      clickAndDragText: 'Clique em "Enviar" ou arraste o arquivo para esta área',
    },
    file: {
      fileNameText: 'nome do arquivo',
      fileSizeText: 'tamanho',
      fileStatusText: 'status',
      fileOperationText: 'operação',
      fileOperationDateText: 'data',
    },
    progress: {
      uploadingText: 'Enviando',
      waitingText: 'Aguardando',
      failText: 'Falha',
      successText: 'Sucesso',
    },
  },
  form: {
    ...enUSConfig.form,
    errorMessage: {
      date: 'Por favor, insira uma data válida',
      url: 'Por favor, insira uma URL válida',
      required: '{name} é obrigatório',
      max: '{name} não pode ter mais de {validate} caracteres',
      min: '{name} não pode ter menos de {validate} caracteres',
      len: '{name} deve ter exatamente {validate} caracteres',
      enum: '{name} deve ser um dos valores: {validate}',
      idcard: 'Por favor, insira um documento válido',
      telnumber: 'Por favor, insira um telefone válido',
      pattern: 'Por favor, insira um valor válido para {name}',
      validator: '{name} inválido',
      boolean: '{name} deve ser booleano',
      number: '{name} deve ser um número',
    },
  },
  cascader: {
    empty: 'Sem dados',
    loadingText: 'carregando...',
    placeholder: 'Selecione',
  },
  select: {
    empty: 'Sem dados',
    loadingText: 'carregando...',
    placeholder: 'Selecione',
  },
  tree: {
    empty: 'Sem dados',
  },
  treeSelect: {
    empty: 'Sem dados',
    loadingText: 'carregando...',
    placeholder: 'Selecione',
  },
  datePicker: {
    ...enUSConfig.datePicker,
    placeholder: {
      date: 'Selecione a data',
      month: 'Selecione o mês',
      year: 'Selecione o ano',
      quarter: 'Selecione o trimestre',
      week: 'Selecione a semana',
    },
  },
  timePicker: {
    ...enUSConfig.timePicker,
    placeholder: 'Selecione o horário',
  },
  calendar: {
    ...enUSConfig.calendar,
    yearSelection: '{year} ano',
    monthSelection: '{month} mês',
    yearRadio: 'Ano',
    monthRadio: 'Mês',
    hideWeekend: 'Ocultar fim de semana',
    showWeekend: 'Mostrar fim de semana',
    today: 'Hoje',
    thisMonth: 'Este mês',
    backToToday: 'Voltar para hoje',
  },
  alert: {
    collapse: 'Recolher',
    expand: 'Expandir',
  },
  guide: {
    finish: 'Concluir',
    next: 'Próximo',
    back: 'Voltar',
    skip: 'Pular',
  },
  imageViewer: {
    loadFailureText: 'Falha ao carregar a imagem',
  },
}

export default ptBRConfig
