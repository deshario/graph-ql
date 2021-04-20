import { createWriteStream } from 'fs';
import path from 'path';

export interface UploadInterface{
  fileName:string
}

const uploadFile = async ({ attachment }):Promise<UploadInterface> => {
  const { createReadStream, filename } = await attachment;
  const randomStr = Math.random().toString(20).substr(2, 20)+Math.random().toString(20).substr(2, 20);
  const fileName = `${randomStr}.${filename.split('.').pop()}`;
  const filePath = path.join(__dirname, "../../client/public/uploads/posts/", fileName);
  return await new Promise((resolve,reject) => 
    createReadStream()
    .pipe(createWriteStream(filePath))
    .on('finish', () => resolve({ fileName }))
    .on('error', error => reject(error))
  );
}

export default uploadFile;