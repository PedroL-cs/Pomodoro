import { TrashIcon } from 'lucide-react';
import { Container } from '../../components/Container';
import { DefaultButton } from '../../components/DefaultButton';
import { Heading } from '../../components/Heading';
import { MainTemplate } from '../../templates/MainTemplate';

import styles from './styles.module.css';

export function Historico() {
   return (
      <MainTemplate>
         <Container>
            <Heading>
               <span>Histórico</span>
               <span className={styles.buttonContainer}>
                  <DefaultButton
                     icon={<TrashIcon />}
                     color='red'
                     aria-label='Apagar histórico'
                     title='Apagar histórico'
                  />
               </span>
            </Heading>
         </Container>

         <Container>
            <div className={styles.responsiveTable}>
               <table>
                  <thead>
                     <tr>
                        <th>Tarefa</th>
                        <th>Duração</th>
                        <th>Data</th>
                        <th>Status</th>
                        <th>Tipo</th>
                     </tr>
                  </thead>
                  <tbody>
                     {Array.from({ length: 10 }).map(() => {
                        return (
                           <tr>
                              <td>Estudar</td>
                              <td>25min</td>
                              <td>18/07/2025 16:00</td>
                              <td>Completa</td>
                              <td>Foco</td>
                           </tr>
                        );
                     })}
                  </tbody>
               </table>
            </div>
         </Container>
      </MainTemplate>
   );
}
