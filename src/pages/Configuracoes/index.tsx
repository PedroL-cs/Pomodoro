import { SaveIcon } from 'lucide-react';
import { Container } from '../../components/Container';
import { DefaultButton } from '../../components/DefaultButton';
import { DefaultInput } from '../../components/DefaultInput';
import { Heading } from '../../components/Heading';
import { MainTemplate } from '../../templates/MainTemplate';
import { useRef } from 'react';
import { useTaskContext } from '../../contexts/TaskContext/useTaskContext';
import { showMessage } from '../../adapters/showMessage';

export function Configuracoes() {
   const { state } = useTaskContext();
   const workTimeInput = useRef<HTMLInputElement>(null);
   const shortBreakTimeInput = useRef<HTMLInputElement>(null);
   const longBreakTimeInput = useRef<HTMLInputElement>(null);

   function handleSaveSettings(e: React.FormEvent<HTMLFormElement>) {
      e.preventDefault();
      showMessage.dismiss();

      const workTime = Number(workTimeInput.current?.value);
      const shortBreakTime = Number(shortBreakTimeInput.current?.value);
      const longBreakTime = Number(longBreakTimeInput.current?.value);

      if (isNaN(workTime) || isNaN(shortBreakTime) || isNaN(longBreakTime)) {
         showMessage.error(
            'Por favor, utilize apenas números em todos os campos!',
         );
         return;
      }

      const isInvalidRange = (value: number) => value < 1 || value > 99;

      if (
         isInvalidRange(workTime) ||
         isInvalidRange(shortBreakTime) ||
         isInvalidRange(longBreakTime)
      ) {
         showMessage.warn('Por favor, utilize apenas valores entre 1 e 99');
         return;
      }
   }

   return (
      <MainTemplate>
         <Container>
            <Heading>Configurações</Heading>

            <Container>
               <p style={{ textAlign: 'center' }}>
                  Modifique as configurações para tempo de foco e descanso curto
                  e longo
               </p>
            </Container>

            <Container>
               <form onSubmit={handleSaveSettings} action='' className='form'>
                  <div className='formRow'>
                     <DefaultInput
                        id='workTime'
                        labelText='Foco'
                        ref={workTimeInput}
                        defaultValue={state.config.workTime}
                     />
                  </div>
                  <div className='formRow'>
                     <DefaultInput
                        id='shortBreakTime'
                        labelText='Descanso curto'
                        ref={shortBreakTimeInput}
                        defaultValue={state.config.shortBreakTime}
                     />
                  </div>
                  <div className='formRow'>
                     <DefaultInput
                        id='longBreakTime'
                        labelText='Descanso longo'
                        ref={longBreakTimeInput}
                        defaultValue={state.config.longBreakTime}
                     />
                  </div>
                  <div className='formRow'>
                     <DefaultButton
                        icon={<SaveIcon />}
                        aria-label='Salvar configurações'
                        title='Salvar configurações'
                     />
                  </div>
               </form>
            </Container>
         </Container>
      </MainTemplate>
   );
}
