import styles from './styles.module.css';

import { TrashIcon } from 'lucide-react';
import { Container } from '../../components/Container';
import { DefaultButton } from '../../components/DefaultButton';
import { Heading } from '../../components/Heading';
import { MainTemplate } from '../../templates/MainTemplate';
import { useTaskContext } from '../../contexts/TaskContext/useTaskContext';
import { formatDate } from '../../utils/formatDate';
import { getTaskStatus } from '../../utils/getTaskStatus';
import { type SortTaskOptions, sortTasks } from '../../utils/sortTasks';
import { useEffect, useState } from 'react';
import { TaskActionTypes } from '../../contexts/TaskContext/taskActions';
import { GenericHtml } from '../../components/GenericHtml';

export function Historico() {
   const { state, dispatch } = useTaskContext();
   const hasTasks = state.tasks.length > 0;

   const [sortTasksOptions, setSortTaskOptions] = useState<SortTaskOptions>(
      () => {
         return {
            tasks: sortTasks({ tasks: state.tasks }),
            field: 'startDate',
            direction: 'desc',
         };
      },
   );

   useEffect(() => {
      setSortTaskOptions(prevState => ({
         ...prevState,
         tasks: sortTasks({
            tasks: state.tasks,
            direction: prevState.direction,
            field: prevState.field,
         }),
      }));
   }, [state.tasks]);

   function handleSortTasks({ field }: Pick<SortTaskOptions, 'field'>) {
      const newDirection =
         sortTasksOptions.direction === 'desc' ? 'asc' : 'desc';

      setSortTaskOptions({
         tasks: sortTasks({
            direction: newDirection,
            tasks: sortTasksOptions.tasks,
            field,
         }),
         direction: newDirection,
         field,
      });
   }

   useEffect(() => {
      document.title = 'Histórico';
   }, []);

   function handleResetHistory() {
      if (!confirm('Tem certeza que deseja excluir seu histórico de ciclos?'))
         return;

      dispatch({ type: TaskActionTypes.RESET_STATE });
   }

   return (
      <MainTemplate>
         <Container>
            <Heading>
               <span>Histórico</span>
               {hasTasks && (
                  <span className={styles.buttonContainer}>
                     <DefaultButton
                        icon={<TrashIcon />}
                        color='red'
                        aria-label='Apagar histórico'
                        title='Apagar histórico'
                        onClick={handleResetHistory}
                     />
                  </span>
               )}
            </Heading>
         </Container>

         <Container>
            {hasTasks && (
               <div className={styles.responsiveTable}>
                  <table>
                     <thead>
                        <tr>
                           <th
                              onClick={() => handleSortTasks({ field: 'name' })}
                              className={styles.thSort}
                           >
                              Tarefa &#8597;
                           </th>
                           <th
                              onClick={() =>
                                 handleSortTasks({ field: 'duration' })
                              }
                              className={styles.thSort}
                           >
                              Duração &#8597;
                           </th>
                           <th
                              onClick={() =>
                                 handleSortTasks({ field: 'startDate' })
                              }
                              className={styles.thSort}
                           >
                              Data &#8597;
                           </th>
                           <th>Status</th>
                           <th>Tipo</th>
                        </tr>
                     </thead>
                     <tbody>
                        {sortTasksOptions.tasks.map(task => {
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
                                 <td>
                                    {getTaskStatus(task, state.activeTask)}
                                 </td>
                                 <td>{taskTypeDict[task.type]}</td>
                              </tr>
                           );
                        })}
                     </tbody>
                  </table>
               </div>
            )}

            <GenericHtml>
               {!hasTasks && (
                  <p>
                     Ainda não há nenhum ciclo iniciado. Tente{' '}
                     <a href='/'>iniciar</a> um novo ciclo para que ele apareça
                     aqui!
                  </p>
               )}
            </GenericHtml>
         </Container>
      </MainTemplate>
   );
}
