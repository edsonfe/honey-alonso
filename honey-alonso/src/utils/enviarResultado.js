const URL_APPS_SCRIPT =
  'https://script.google.com/macros/s/AKfycbz1CG2zF1o1uzUCdRYq5JCN8VA411lsGTN199GJpquJpv4aALwhJghi2qt8riyBHBjvbg/exec';

export async function enviarResultado(nome, email, resultado) {
  try {
    const resposta = await fetch(URL_APPS_SCRIPT, {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: JSON.stringify({ nome, email, ...resultado }),
    });
    return await resposta.json();
  } catch (erro) {
    console.error('Erro ao enviar resultado:', erro);
    return { sucesso: false };
  }
}
