const SHEET_NAME = 'Resultados';

function doPost(e) {
  try {
    const dados = JSON.parse(e.postData.contents);
    const planilha = SpreadsheetApp.getActiveSpreadsheet();
    const aba =
      planilha.getSheetByName(SHEET_NAME) || planilha.insertSheet(SHEET_NAME);

    // Cria os cabeçalhos se a aba estiver vazia
    if (aba.getLastRow() === 0) {
      aba.appendRow([
        'Data/Hora',
        'Nome',
        'E-mail',
        'WhatsApp',
        'Ativo',
        'Reflexivo',
        'Teórico',
        'Pragmático',
        'Estilo Dominante',
        'Autorização de envio por e-mail',
      ]);
    }

    const p = dados.pontuacao || dados;
    const nome = dados.nome || '';
    const email = dados.email || '';
    const whatsapp = dados.whatsapp || '';
    const autorizacao = dados.autorizacaoEmail ? 'Sim' : 'Não';
    const ultimaLinha = aba.getLastRow();

    // Trava de duplicidade: verifica se a última linha tem o mesmo nome/e-mail
    if (ultimaLinha > 1) {
      const UltimoNome = aba.getRange(ultimaLinha, 2).getValue();
      const ultimoEmail = aba.getRange(ultimaLinha, 3).getValue();

      if (UltimoNome === nome && ultimoEmail === email) {
        // Se for uma duplicata imediata, apenas atualiza a coluna de autorização (coluna 9)
        aba.getRange(ultimaLinha, 10).setValue(autorizacao);
        return ContentService.createTextOutput(
          JSON.stringify({ sucesso: true, mensagem: 'Registro atualizado' }),
        ).setMimeType(ContentService.MimeType.JSON);
      }
    }

    // Se for um registro novo, insere normalmente
    aba.appendRow([
      new Date(),
      nome,
      email,
      whatsapp,
      p.ativo !== undefined ? p.ativo : dados.ativo || 0,
      p.reflexivo !== undefined ? p.reflexivo : dados.reflexivo || 0,
      p.teorico !== undefined ? p.teorico : dados.teorico || 0,
      p.pragmatico !== undefined ? p.pragmatico : dados.pragmatico || 0,
      dados.estiloDominante || '',
      autorizacao,
    ]);

    return ContentService.createTextOutput(
      JSON.stringify({ sucesso: true }),
    ).setMimeType(ContentService.MimeType.JSON);
  } catch (erro) {
    return ContentService.createTextOutput(
      JSON.stringify({ sucesso: false, erro: erro.message }),
    ).setMimeType(ContentService.MimeType.JSON);
  }
}
