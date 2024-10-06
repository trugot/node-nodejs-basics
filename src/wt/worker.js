import { parentPort } from "worker_threads";

// n should be received from main thread
const nthFibonacci = (n) => n < 2 ? n : nthFibonacci(n - 1) + nthFibonacci(n - 2);

// This function sends result of nthFibonacci computations to main thread
const sendResult = (n) => {
  const result = nthFibonacci(n);
  parentPort.postMessage({ status: 'resolved', data: result });
};

// Processing messages from the main thread (receive n and send the result)
parentPort.on('message', (n) => {
  try {
    sendResult(n);
  } catch (error) {
    parentPort.postMessage({ status: 'error', data: null });
  } finally {
    process.exit();
  }
});
