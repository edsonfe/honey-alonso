export const URL_APPS_SCRIPT =
  'https://script.google.com/macros/s/AKfycbwXrr4B831D99LR-ZclLsFPUH3M3c-CgKSACzY1gvmiXBDd0yQArG9Tv_Xgtes_Rv-9EQ/exec';

export async function enviarResultado(
  nome,
  email,
  whatsapp,
  resultado,
  autorizacaoEmail = false,
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
