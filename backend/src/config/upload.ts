import multer from 'multer';
import path from 'path' // melhor para trabalhar com caminhos relativos no node

export default {
  storage: multer.diskStorage({
    destination: path.join(__dirname, '..', '..', 'uploads'), //Caminho absoluto para aonde o caminho vai ao fazer upload
    filename: (request, file, cb) => {
      const fileName = `${Date.now()}-${file.originalname}`;

      cb(null, fileName);
    },
  })
}