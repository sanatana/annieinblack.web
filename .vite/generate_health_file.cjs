const fs = require('fs');

const output = {
  status: 200,
  version: `${Date.now()}`,
  date: new Date().toISOString(),
};

fs.writeFileSync('build/version.json', JSON.stringify(output, null, 2));
