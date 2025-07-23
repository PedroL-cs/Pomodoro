import { useEffect } from 'react';
import { Container } from '../../components/Container';
import { GenericHtml } from '../../components/GenericHtml';
import { Heading } from '../../components/Heading';
import { MainTemplate } from '../../templates/MainTemplate';

export function NotFound() {
   useEffect(() => {
      document.title = 'Não encontrado';
   }, []);

   return (
      <MainTemplate>
         <Container>
            <GenericHtml>
               <Heading>404 - Página não encontrada </Heading>
               <p>
                  Opa! Parece que a página que você está tentando acessar não
                  existe.
               </p>
               <p>
                  Mas calma, você não está perdido no espaço (ainda). Dá pra
                  voltar em segurança para a <a href='/'>página principal</a> ou{' '}
                  <a href='/history'>para o histórico</a>.
               </p>
            </GenericHtml>
         </Container>
      </MainTemplate>
   );
}
