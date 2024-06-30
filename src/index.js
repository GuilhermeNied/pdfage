import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
const imgDirPath = path.join(fileURLToPath(import.meta.url), '../../images')
async function getImagesFiles(filePath) {
  const files = await fs.readdir(filePath)
  files.map((file) => {
    const fileExtension = path.extname(file).split('.')[1]
    if (fileExtension !== 'jpg' && fileExtension!== 'png' && fileExtension!== 'jpeg') {
      throw new Error('Invalid image file extension')
    }
  })
  
  return files
}

getImagesFiles(imgDirPath).then(data => {
  console.log(data) 
})
