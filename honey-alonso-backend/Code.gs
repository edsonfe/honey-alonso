const SPREADSHEET_ID = '1RTiem-rb8-IsuxUF4l6OXNjgq1IkSpWAKXF5RlTFKJU'
const SHEET_NAME = 'Resultados'

function doPost(e) {
  try {
    const dados = JSON.parse(e.postData.contents)
    const planilha = SpreadsheetApp.openById(SPREADSHEET_ID)
    const aba = planilha.getSheetByName(SHEET_NAME) || planilha.insertSheet(SHEET_NAME)

    if (aba.getLastRow() === 0) {
      aba.appendRow(['Data/Hora', 'Nome', 'E-mail', 'Ativo', 'Reflexivo', 'Teórico', 'Pragmático', 'Estilo Dominante'])
    }

    aba.appendRow([
      new Date(),
      dados.nome,
      dados.email,
      dados.pontuacao.ativo,
      dados.pontuacao.reflexivo,
      dados.pontuacao.teorico,
      dados.pontuacao.pragmatico,
      dados.estiloDominante,
    ])

    return ContentService
      .createTextOutput(JSON.stringify({ sucesso: true }))
      .setMimeType(ContentService.MimeType.JSON)
  } catch (erro) {
    return ContentService
      .createTextOutput(JSON.stringify({ sucesso: false, erro: erro.message }))
      .setMimeType(ContentService.MimeType.JSON)
  }
}