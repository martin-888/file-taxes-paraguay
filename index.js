const path = require('path');
const { spawn } = require('child_process');

function fileTaxes() {
  const scriptPath = path.join(__dirname, 'file-taxes.sh');

  return new Promise((resolve, reject) => {
    const child = spawn('bash', [scriptPath]);
    let stdout = [];
    let stderr = [];

    child.stdout.on('data', (data) => {
      stdout = [...stdout, data.toString()];
      process.stdout.write(data);
    });
    child.stderr.on('data', (data) => {
      stderr = [...stderr, data.toString()];
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