import './styles/theme.css';
import './styles/global.css';
import { Heading } from './components/Heading';
import { TimerIcon } from 'lucide-react';

export function App() {
    return (
        <div>
            <Heading>
                Olá mundo!
                <button>
                    <TimerIcon />
                </button>
            </Heading>
            <p>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                Nesciunt, harum quos aut soluta possimus atque fugiat ipsum nemo
                architecto eaque rem, aspernatur voluptatum vero maxime modi
                dolore in dicta unde.
            </p>
        </div>
    );
}
