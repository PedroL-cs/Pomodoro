import { TrashIcon } from 'lucide-react';
import { Container } from '../../components/Container';
import { DefaultButton } from '../../components/DefaultButton';
import { Heading } from '../../components/Heading';
import { MainTemplate } from '../../templates/MainTemplate';

import styles from './styles.module.css';
import { useTaskContext } from '../../contexts/TaskContext/useTaskContext';
import { formatDate } from '../../utils/formatDate';
import { getTaskStatus } from '../../utils/getTaskStatus';

export function Historico() {
   const { state } = useTaskContext();
   const sortedTasks = [...state.tasks].sort((a, b) => {
      return b.startDate - a.startDate;
   });

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
                     {sortedTasks.map(task => {
                        const taskTypeDict = {
                           workTime: 'Foco',
                           shortBreakTime: 'Descanso curto',
                           longBreakTime: 'Descanso longo',
                        };

                        return (
                           <tr key={task.id}>
                              <td>{task.name}</td>
                              <td>{task.duration}min</td>
                              <td>{formatDate(task.startDate)}</td>
                              <td>{getTaskStatus(task, state.activeTask)}</td>
                              <td>{taskTypeDict[task.type]}</td>
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
