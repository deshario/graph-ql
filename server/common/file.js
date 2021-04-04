import fs from 'fs-extra';
import path from 'path';

const ROOT = path.normalize(`${__dirname}`)

export async function uploadFile(file, type = 'pic', dir = 'uploads', size = '') {
  if (file) {
    if (Array.isArray(file)) {
      return await Promise.all(file.map(async (e) => {
        return await createFile(e, type, dir, size);
      }));
    } else {
      return await createFile(file, type, dir, size);
    }
  } else {
    return '';
  }
}

function createDirectory(dir) {
  return new Promise((resolve) => {
    const upDir = path.join(ROOT, '/client/public/uploads/', dir);
    fs.exists(upDir, function (exists) {
      if (!exists) {
        fs.mkdirp(upDir, function () {
          resolve(upDir);
        })
      } else {
        resolve(upDir);
      }
    });
  });
}

async function createFile(file, type, dir, size) {
  return 'creating File';
}