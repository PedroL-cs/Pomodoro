import { useTaskContext } from '../../contexts/TaskContext/useTaskContext';
import { getNextCycle } from '../../utils/getNextCycle';
import { getNextCycleType } from '../../utils/getNextCycleType';

export function Tips() {
   const { state } = useTaskContext();

   const nextCycle = getNextCycle(state.currentCycle);
   const nextCycleType = getNextCycleType(nextCycle);

   const tipsForWhenActiveTasks = {
      workTime: <span>foque por {state.config.workTime} minutos</span>,
      shortBreakTime: <span>Descanse</span>,
      longBreakTime: <span>Descanse</span>,
   };

   const tipsForNoActiveTasks = {
      workTime: <span>Próximo ciclo é de {state.config.workTime} minutos</span>,
      shortBreakTime: (
         <span>
            Próximo descanso é de {state.config.shortBreakTime} minutos
         </span>
      ),
      longBreakTime: (
         <span>Próximo descanso é de {state.config.longBreakTime} minutos</span>
      ),
   };
   return (
      <>
         {!!state.activeTask && tipsForWhenActiveTasks[state.activeTask.type]}
         {!state.activeTask && tipsForNoActiveTasks[nextCycleType]}
      </>
   );
}
