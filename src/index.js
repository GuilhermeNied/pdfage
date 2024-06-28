import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
const imgDirPath = path.join(fileURLToPath(import.meta.url), '../../images')
function getImagesFiles(path) {
  const files = fs.readdir(path)
  return files
}

getImagesFiles(imgDirPath).then(data => {
  console.log(data)
})
