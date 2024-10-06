import { Worker } from "worker_threads";
import os from "os";
import path from "path";
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const performCalculations = async () => {
  const numCores = os.cpus().length;
  const workers = [];
  const results = [];

  // create promises for each worker and send data to them
  for (let i = 0; i < numCores; i++) {
    const workerData = 10 + i;
    const worker = new Worker(path.join(__dirname, 'worker.js'));

    workers.push(
      new Promise((resolve) => {
        worker.postMessage(workerData);

        worker.on('message', (message) => {
          results.push(message);
          resolve();
        });

        worker.on('error', () => {
          results.push({ status: 'error', data: null });
          resolve();
        });

        worker.on('exit', (code) => {
          if (code !== 0) {
            results.push({ status: 'error', data: null });
            resolve();
          }
        });
      })
    );
  }

  // waiting for all workers to complete
  await Promise.all(workers);

  console.log(results);
};

await performCalculations();
