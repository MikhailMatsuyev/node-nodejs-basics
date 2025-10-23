import path from 'node:path';
import { release, version } from 'node:os';
import { createServer as createServerHttp } from 'node:http';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';
import './files/c.cjs';

// Создадим функцию для ESM контекста
const require = createRequire(import.meta.url);

const random = Math.random();

// Dynamic imports for conditional JSON loading
const unknownObject = random > 0.5 ? require('./files/a.json') : require('./files/b.json');

// Get __filename and __dirname equivalents in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log(`Release ${release()}`);
console.log(`Version ${version()}`);
console.log(`Path segment separator is "${path.sep}"`);

console.log(`Path to current file is ${__filename}`);
console.log(`Path to current directory is ${__dirname}`);

const myServer = createServerHttp((_, res) => {
    res.end('Request accepted');
});

const PORT = 3000;

console.log(unknownObject);

myServer.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
    console.log('To terminate it, use Ctrl+C combination');
});

// Named exports
export {
    unknownObject,
    myServer,
};