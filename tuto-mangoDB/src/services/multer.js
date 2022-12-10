import multer from "multer"

const MB = 1048576

const maxSize = 10
const RegexFormatAccept = /\.(jpg|jpeg|png)$/

const storage = multer.memoryStorage()

export const upload = multer(
    {
    storage,
    limits: {
        fileSize: maxSize * MB
        
    },
    fileFilter(req, file, cb) {
        if (!file.originalname.match(RegexFormatAccept)) {
            return cb(new Error('Seul les formats jpg, jpeg et png sont autorisé'), false)
        }
        cb(undefined, true)
    }
})