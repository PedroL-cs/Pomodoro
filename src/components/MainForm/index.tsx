import styles from './styles.module.css';
import { PlayCircleIcon, StopCircleIcon } from 'lucide-react';
import { Cycles } from '../Cycles';
import { DefaultButton } from '../DefaultButton';
import { DefaultInput } from '../DefaultInput';
import { useState } from 'react';
import type { TaskModel } from '../../models/TaskModel';
import { useTaskContext } from '../../contexts/TaskContext/useTaskContext';
import { getNextCycle } from '../../utils/GetNextCycle';
import { getNextCycleType } from '../../utils/getNextCycleType';
import { TaskActionTypes } from '../../contexts/TaskContext/taskActions';
import { Tips } from '../Tips';
import { showMessage } from '../../adapters/showMessage';

export function MainForm() {
   const { state, dispatch } = useTaskContext();
   const [taskName, setTaskName] = useState('');
   const lastTaskName = state.tasks[state.tasks.length - 1]?.name || '';

   const nextCycle = getNextCycle(state.currentCycle);
   const nextCycleType = getNextCycleType(nextCycle);

   function handleCreateNewTask(event: React.FormEvent<HTMLFormElement>) {
      event.preventDefault();
      showMessage.dismiss();

      if (taskName === null) return;

      if (!taskName) {
         showMessage.warn('Digite um nome para a tarefa!');
         return;
      }

      const newTask: TaskModel = {
         id: Date.now().toString(),
         name: taskName,
         startDate: Date.now(),
         completeDate: null,
         interruptDate: null,
         duration: state.config[nextCycleType],
         type: nextCycleType,
      };

      dispatch({ type: TaskActionTypes.START_TASK, payload: newTask });

      showMessage.sucess('Tarefa iniciada!');
   }

   function handleInterruptTask() {
      showMessage.dismiss();
      dispatch({ type: TaskActionTypes.INTERRUPT_TASK });
      showMessage.error('Tarefa interrompida!');
   }

   return (
      <form onSubmit={handleCreateNewTask} className={styles.form} action=''>
         <div className={styles.formRow}>
            <DefaultInput
               labelText='Task'
               id='meuInput'
               type='text'
               placeholder='Digite algo'
               onChange={e => setTaskName(e.target.value)}
               disabled={!!state.activeTask}
               defaultValue={lastTaskName}
            />
         </div>

         <div className={styles.formRow}>
            <Tips />
         </div>

         {state.currentCycle > 0 && (
            <div className={styles.formRow}>
               <Cycles />
            </div>
         )}

         <div className={styles.formRow}>
            {!state.activeTask && (
               <DefaultButton
                  aria-label='Iniciar nova tarefa'
                  title='Iniciar nova tarefa'
                  type='submit'
                  icon={<PlayCircleIcon />}
                  key='botao_submit'
               />
            )}

            {!!state.activeTask && (
               <DefaultButton
                  aria-label='Interromper tarefa atual'
                  title='Interromper tarefa atual'
                  type='button'
                  color='red'
                  icon={<StopCircleIcon />}
                  onClick={handleInterruptTask}
                  key='botao_button'
               />
            )}
         </div>
      </form>
   );
}
