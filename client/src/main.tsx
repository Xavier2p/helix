import { createRoot } from 'react-dom/client';
import { disableReactDevTools } from '@fvilers/disable-react-devtools';
import Helix from './helix';

// disable console.log in production
if (import.meta.env.PROD) {
    disableReactDevTools();
    console.log = () => {};
    console.error = () => {};
    console.warn = () => {};
}

const root = createRoot(document.getElementById('root') as HTMLElement);
root.render(<Helix />);
