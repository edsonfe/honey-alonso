import React from 'react';

export function Footer() {
  const anoAtual = new Date().getFullYear();

  return (
    <footer>
      © {anoAtual} Todos os direitos reservados · 
      Desenvolvido por <strong>Colégio Audaz</strong>
    </footer>
  );
}
