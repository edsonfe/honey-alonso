export const URL_APPS_SCRIPT =
  'https://script.google.com/macros/s/AKfycbxccxsC3kW5eF-cFw_AHR7CvkljdyoNMYoMbec2WpsxRH7tUI-1AY5XDeMANllK4TVUCg/exec';
export async function enviarResultado(
  nome,
  email,
  whatsapp,
  resultado,
  autorizacaoEmail,
) {
  try {
    const resposta = await fetch(URL_APPS_SCRIPT, {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: JSON.stringify({
        nome,
        email,
        whatsapp,
        autorizacaoEmail,
        ...resultado,
      }),
    });
    return await resposta.json();
  } catch (erro) {
    console.error('Erro ao enviar resultado:', erro);
    return { sucesso: false };
  }
}
