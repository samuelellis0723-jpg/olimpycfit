import 'dotenv/config';
import {closeSync,mkdirSync,openSync} from 'node:fs';
import {dirname,isAbsolute,resolve} from 'node:path';
export function prepareDatabase() {
  const url=process.env.DATABASE_URL;
  if(!url?.startsWith('file:'))throw new Error('Configura DATABASE_URL como archivo SQLite local.');
  const location=url.slice(5).split('?')[0];
  if(!location||location===':memory:')return;
  const file=isAbsolute(location)?location:resolve(process.cwd(),'prisma',location);
  mkdirSync(dirname(file),{recursive:true});
  // Append mode creates a missing SQLite file without truncating an existing database.
  closeSync(openSync(file,'a'));
}
prepareDatabase();
