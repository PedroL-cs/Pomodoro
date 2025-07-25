import { BrowserRouter, Route, Routes, useLocation } from 'react-router';
import { Home } from '../../pages/Home';
import { SobrePomodoro } from '../../pages/SobrePomodoro';
import { NotFound } from '../../pages/NotFound';
import { useEffect } from 'react';
import { Historico } from '../../pages/Historico';
import { Configuracoes } from '../../pages/Configuracoes';

function ScrollToTop() {
   const { pathname } = useLocation();

   useEffect(() => {
      window.scrollTo({ top: 0 });
   }, [pathname]);

   return null;
}

export function MainRouter() {
   return (
      <BrowserRouter>
         <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/historico' element={<Historico />} />
            <Route path='/configuracoes' element={<Configuracoes />} />
            <Route path='/sobre-pomodoro/' element={<SobrePomodoro />} />

            <Route path='*' element={<NotFound />} />
         </Routes>
         <ScrollToTop />
      </BrowserRouter>
   );
}
