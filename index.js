const path = require('path');
const { spawn } = require('child_process');

function processDataChunk(arr, data) {
  return [...arr, ...data.toString().split('\n').filter(line => line.length > 0)];
}

function fileTaxes() {
  const scriptPath = path.join(__dirname, 'file-taxes.sh');

  return new Promise((resolve, reject) => {
    const child = spawn('bash', [scriptPath]);
    let stdout = [];
    let stderr = [];

    child.stdout.on('data', (data) => {
      stdout = processDataChunk(stdout, data);
      process.stdout.write(data);
    });
    child.stderr.on('data', (data) => {
      stderr = processDataChunk(stderr, data);
      process.stderr.write(data);
    });
    child.on('close', (code) => {
      if (code === 0) {
        resolve({ stdout, stderr });
      } else {
        reject({ error: new Error(`Process exited with code ${code}`), stdout, stderr });
      }
    });
    child.on('error', (err) => {
      reject({ error: err, stdout, stderr });
    });
  });
}

module.exports = { fileTaxes };