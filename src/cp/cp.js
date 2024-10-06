import { spawn } from 'child_process';
import path from 'path';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const spawnChildProcess = async (args) => {

  const scriptPath = path.join(__dirname, 'files', 'script.js');

  // Create a child process by passing arguments to it
  const childProcess = spawn('node', [scriptPath, ...args], {
    stdio: ['pipe', 'pipe', 'inherit'],
  });

  // Redirect stdin of the parent process to stdin of the child
  process.stdin.pipe(childProcess.stdin);

  // Redirect stdout of the child process to stdout of the parent
  childProcess.stdout.pipe(process.stdout);

  // process completion
  childProcess.on('close', (code) => {
    console.log(`Child process exited with code ${code}`);
  });
};

spawnChildProcess(['arg1', 'arg2']);
