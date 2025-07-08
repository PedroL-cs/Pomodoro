import { PlayCircleIcon } from 'lucide-react';
import { Cycles } from '../Cycles';
import { DefaultButton } from '../DefaultButton';
import { DefaultInput } from '../DefaultInput';
import { useState } from 'react';
import styles from './styles.module.css';

export function MainForm() {
   const [taskName, setTaskName] = useState('');

   function handleCreateNewTask(event: React.FormEvent<HTMLFormElement>) {
      event.preventDefault();
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

         <div className={styles.formRow}>
            <Cycles />
         </div>

         <div className={styles.formRow}>
            <DefaultButton icon={<PlayCircleIcon />} />
         </div>
      </form>
   );
}
