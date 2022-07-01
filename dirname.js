// Workaround porque no funcionaba __dirname al trabajar en módulos
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

export default __dirname;
