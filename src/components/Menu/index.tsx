import {
   HistoryIcon,
   HouseIcon,
   MoonIcon,
   SettingsIcon,
   SunIcon,
} from 'lucide-react';
import styles from './styles.module.css';
import { useState, useEffect } from 'react';
import { RouterLink } from '../RouterLink';

type AvailableThemes = 'dark' | 'light';

export function Menu() {
   const [theme, setTheme] = useState<AvailableThemes>(() => {
      const storageTheme =
         (localStorage.getItem('theme') as AvailableThemes) || 'dark';
      return storageTheme;
   });

   function handleThemeChange(
      event: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
   ) {
      event.preventDefault();

      setTheme(prevTheme => {
         const nextTheme = prevTheme === 'dark' ? 'light' : 'dark';
         return nextTheme;
      });
   }

   useEffect(() => {
      document.documentElement.setAttribute('data-theme', theme);
      localStorage.setItem('theme', theme);
   }, [theme]);

   return (
      <nav className={styles.menu}>
         <RouterLink
            className={styles.menuLink}
            href='/'
            aria-label='Home'
            title='Home'
         >
            <HouseIcon />
         </RouterLink>

         <RouterLink
            className={styles.menuLink}
            href='/historico'
            aria-label='Histórico'
            title='Histórico'
         >
            <HistoryIcon />
         </RouterLink>

         <RouterLink
            className={styles.menuLink}
            href='/opcoes'
            aria-label='Configurações'
            title='Configurações'
         >
            <SettingsIcon />
         </RouterLink>

         <a
            className={styles.menuLink}
            href='#'
            aria-label='Mudar tema'
            title='Mudar tema'
            onClick={handleThemeChange}
         >
            {theme === 'light' ? <MoonIcon /> : <SunIcon />}
         </a>
      </nav>
   );
}
