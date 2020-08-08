#!/usr/bin/env node

/* Copyright (c) 2019-2020 Digital Dream Labs. See LICENSE file for details. */

var commander = require('commander');
const { version } = require('./package.json');
const program = new commander.Command();

program
  .version(version, '-v, --version')
  .description(
    `
    __      ________  ____ ______ ____  _____   
    \\ \\    / /  ___| / ___|__  __/ __ \\|  __ \\ 
     \\ \\  / /| |__  | |     | | | |  | | |__) | 
      \\ \\/ / |  __| | |     | | | |  | |  _  /  
       \\  /  | |___ | |___  | | | |__| | | \\ \\  
        \\/   |_____| \\____| |_|  \\____/|_|  \\_\\ 
         N E U R R A L           S Y S T E M S 

      `
  )
  .addCommand(require('./tools/configure.js'))
  .addCommand(require('./tools/ota.js').otaAdd)
  .addCommand(require('./tools/ota.js').otaSync)
  .addCommand(require('./tools/ota.js').otaApprove)
  .exitOverride(() => {
    process.exit(0);
  });

program
  .command('serve')
  .description('Serve the vector websetup')
  .option('-p, --port <number>', 'port to serve the setup on', 8000)
  .option(
    '-ip, --ip-address <addr>',
    'address to serve the setup on',
    '0.0.0.0'
  )
  .action((options) => {
    try {
      require('./tools/run.js')(options.port, options.ipAddress);
    } catch (err) {
      console.log(err);
    }
  });

program.parse(process.argv);
