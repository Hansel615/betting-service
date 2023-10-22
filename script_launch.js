const { exec } = require('child_process');
const program = require('commander');

program
  .option('--instances <number>', 'Number of worker instances')
  .parse(process.argv);

// eslint-disable-next-line no-underscore-dangle
const instances = program._optionValues.instances || 1;
const apiCommand = 'cd api && yarn start';
const workerCommand = `cd worker && node src/index.js ${instances}`;

const startChildProcess = (command, description) => {
  console.log(`Starting ${description}...`);
  const childProcess = exec(command);

  childProcess.stdout.on('data', (data) => {
    console.log(`${description} - stdout: ${data}`);
  });

  childProcess.stderr.on('data', (data) => {
    console.error(`${description} - stderr: ${data}`);
  });

  childProcess.on('close', (code) => {
    if (code === 0) {
      console.log(`${description} has started successfully.`);
    } else {
      console.error(`${description} failed to start. Exit code: ${code}`);
    }
  });
};

startChildProcess(apiCommand, 'API');
startChildProcess(workerCommand, 'Worker');
