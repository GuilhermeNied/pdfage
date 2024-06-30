import fs from 'node:fs/promises'
import PDFDocument from 'pdfkit'
import { createWriteStream, createReadStream } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const imgDirPath = path.join(fileURLToPath(import.meta.url), '../../images')
const destinationDirectoryPath = path.join(fileURLToPath(import.meta.url), '../../pdfs')


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


async function imageToPdf() {
  const pathFiles = await getImagesFiles(imgDirPath)
  pathFiles.forEach((file) => {
    const sourceFile = path.join(imgDirPath, file)
    const pdfFileName = `${path.basename(file, path.extname(file))}.pdf`
    const destinationFile = path.join(destinationDirectoryPath, pdfFileName)
    const doc = new PDFDocument()
    const writableStream = createWriteStream(destinationFile)
    doc.pipe(writableStream)
   
    doc.image(sourceFile, 0, 0, {
      width: 595.28,
      height: 811.89
    });

    doc.end()

    writableStream.on('error', error => console.error(`Error reading file ${file}`, error))
    writableStream.on('finish',  () => console.log(`Generated PDF in: ${destinationFile}`))


  })
}

imageToPdf()