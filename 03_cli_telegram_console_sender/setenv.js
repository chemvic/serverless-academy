const fs = require('fs');

const env = fs.readFileSync('.env', 'utf-8').split('\n');
env.forEach((line) => {
  const [key, value] = line.split('=');
  process.env[key] = value;
});

