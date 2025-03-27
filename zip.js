import fs from 'fs';
import archiver from 'archiver';

const output = fs.createWriteStream('mathsnap-v1.0.0.zip');
const archive = archiver('zip', { zlib: { level: 9 } }); // Maximum compression

output.on('close', () => console.log('Zip created successfully!'));
archive.on('error', (err) => { throw err; });

archive.pipe(output);
archive.directory('dist/', false); // Add all files from 'dist' folder
archive.finalize();
