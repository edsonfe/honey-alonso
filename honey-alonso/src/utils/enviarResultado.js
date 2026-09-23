export const URL_APPS_SCRIPT =
  'https://script.google.com/macros/s/AKfycbw0DIvcjB69JIY1sN-oGB4PqUE3ib9vkObyczmYZ-BH_yuwuPD_2g2KToOG1cRm4vNNtg/exec';
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
