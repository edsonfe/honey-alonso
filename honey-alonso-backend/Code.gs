// honey-alonso-backend/Code.gs

function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents);
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();

    // Se for a primeira vez e a planilha estiver vazia, cria os cabeçalhos
    if (sheet.getLastRow() === 0) {
      sheet.appendRow([
        'Data/Hora',
        'Identificação',
        'Estilo Dominante',
        'Ativo',
        'Reflexivo',
        'Teórico',
        'Pragmático',
      ]);
    }

    sheet.appendRow([
      data.data || new Date().toLocaleString(),
      data.identificacao,
      data.estiloDominante,
      data.ativo,
      data.reflexivo,
      data.teorico,
      data.pragmatico,
    ]);

    return ContentService.createTextOutput('Sucesso').setMimeType(
      ContentService.MimeType.TEXT,
    );
  } catch (err) {
    return ContentService.createTextOutput(
      'Erro: ' + err.toString(),
    ).setMimeType(ContentService.MimeType.TEXT);
  }
}
