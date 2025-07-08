import styles from './styles.module.css';
import { PlayCircleIcon } from 'lucide-react';
import { Cycles } from '../Cycles';
import { DefaultButton } from '../DefaultButton';
import { DefaultInput } from '../DefaultInput';
import { useState } from 'react';
import type { TaskModel } from '../../models/TaskModel';
import { useTaskContext } from '../../contexts/TaskContext/useTaskContext';
import { getNextCycle } from '../../utils/GetNextCycle';
import { getNextCycleType } from '../../utils/getNextCycleType';
import { formatSecondsToMinutes } from '../../utils/formatSecondsToMinutes';

export function MainForm() {
   const { state, setState } = useTaskContext();
   const [taskName, setTaskName] = useState('');

   const nextCycle = getNextCycle(state.currentCycle);
   const nextCycleType = getNextCycleType(nextCycle);

   function handleCreateNewTask(event: React.FormEvent<HTMLFormElement>) {
      event.preventDefault();

      if (taskName === null) return;

      if (!taskName) {
         alert('Digite um nome para a tarefa!');
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

      const secondsRemaining = newTask.duration * 60;

      setState(prevState => {
         return {
            ...prevState,
            config: { ...prevState.config },
            activeTask: newTask,
            currentCycle: nextCycle,
            secondsRemaining,
            formattedSecondsRemaining: formatSecondsToMinutes(secondsRemaining),
            tasks: [...prevState.tasks, newTask],
         };
      });
   }

   return (
      <form onSubmit={handleCreateNewTask} className={styles.form} action=''>
         <div className={styles.formRow}>
            <DefaultInput
               labelText='Task'
               id='meuInput'
               type='text'
               placeholder='Digite algo'
               value={taskName}
               onChange={e => setTaskName(e.target.value)}
            />
         </div>

         <div className={styles.formRow}>
            <p>Lorem ipsum dolor sit amet.</p>
         </div>

         {state.currentCycle > 0 && (
            <div className={styles.formRow}>
               <Cycles />
            </div>
         )}

         <div className={styles.formRow}>
            <DefaultButton icon={<PlayCircleIcon />} />
         </div>
      </form>
   );
}
