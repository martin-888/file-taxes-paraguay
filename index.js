const path = require('path');
const { spawn } = require('child_process');

function fileTaxes() {
  const scriptPath = path.join(__dirname, 'file-taxes.sh');

  return new Promise((resolve, reject) => {
    const child = spawn('bash', [scriptPath]);

    child.stdout.on('data', (data) => {
      process.stdout.write(data);
    });
    child.stderr.on('data', (data) => {
      process.stderr.write(data);
    });
    child.on('close', (code) => {
      if (code === 0) {
        resolve();
      } else {
        reject(new Error(`Process exited with code ${code}`));
      }
    });
    child.on('error', (err) => {
      reject(err);
    });
  });
}

module.exports = { fileTaxes };