import styles from './styles.module.css';
import { useTaskContext } from '../../contexts/TaskContext/useTaskContext';
import { getNextCycle } from '../../utils/GetNextCycle';
import { getNextCycleType } from '../../utils/getNextCycleType';

export function Cycles() {
   const { state } = useTaskContext();

   const cycleStep = Array.from({ length: state.currentCycle });

   const cycleDescriptionMap = {
      workTime: 'Foco',
      shortBreakTime: 'Descanso curto',
      longBreakTime: 'Descanso longo',
   };

   return (
      <div className={styles.cycles}>
         <span>Ciclos:</span>

         <div className={styles.cycleDots}>
            {cycleStep.map((_, index) => {
               const nextCycle = getNextCycle(index);
               const nextCycleType = getNextCycleType(nextCycle);
               return (
                  <span
                     key={nextCycle}
                     className={`${styles.cycleDot} ${styles[nextCycleType]}`}
                     aria-label={`Ciclo de ${cycleDescriptionMap[nextCycleType]}`}
                     title={`Ciclo de ${cycleDescriptionMap[nextCycleType]}`}
                  ></span>
               );
            })}
            {/* getNextCycleType(getNextCycle(index)) */}
         </div>
      </div>
   );
}
