import { execSync } from 'child_process';
process.chdir('E:/Web/kurose-networking');
execSync('node ./node_modules/next/dist/bin/next dev', { stdio: 'inherit' });
