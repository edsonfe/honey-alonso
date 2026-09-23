const URL_APPS_SCRIPT =
  'https://script.google.com/macros/s/AKfycbxQmIuzpBRjJ4wTCo_c19DB-EH1OZATVuHRMAW4_sSvKgbZNkx18hCuCrnpz1dyMMH4uA/exec';

export async function enviarResultado(
  nome,
  email,
  resultado,
  autorizacaoEmail,
) {
  try {
    const resposta = await fetch(URL_APPS_SCRIPT, {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: JSON.stringify({ nome, email, autorizacaoEmail, ...resultado }),
    });
    return await resposta.json();
  } catch (erro) {
    console.error('Erro ao enviar resultado:', erro);
    return { sucesso: false };
  }
}
