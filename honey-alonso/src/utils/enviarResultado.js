const URL_APPS_SCRIPT = 'https://script.google.com/macros/s/AKfycbzfM03MgiNRy0GutFf7Fnn05N7vM1UPByUZsAzpylAbdMEaGLRizGc8WN-uxJRuRxbj/exec'
export async function enviarResultado(identificacao, resultado) {
  try {
    const resposta = await fetch(URL_APPS_SCRIPT, {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain;charset=utf-8' }, // evita bloqueio de CORS
      body: JSON.stringify({ identificacao, ...resultado }),
    });
    return await resposta.json();
  } catch (erro) {
    console.error('Erro ao enviar resultado:', erro);
    return { sucesso: false };
  }
}
