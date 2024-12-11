const fs = require('fs').promises
const path = require('path')
const multer = require('multer')
const { nanoid } = require('nanoid');
const { isImageAndTransform } = require('./helpers');

const tempDir = path.join(__dirname, "../public/temp");
const storageImgDir = path.join(__dirname, "../public/images")

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, tempDir)
    },
    filename: (req, file, cb) => {
        cb(null, `${nanoid()}${file.originalname}`)       
    }
})

const extensionWhiteList = [".jpg", ".jpeg", ".png", ".gif"]
const mimetypeWhiteList = ["image/jpg", "image/jpeg", "image/png", "image/gif"]

const uploadMiddleware = multer({
    storage,
    fileFilter: async (req, file, cb) => {
        const extension = path.extname(file.originalname).toLowerCase(); 
        const mimetype = file.mimetype
        if (
            !extensionWhiteList.includes(extension) || !mimetypeWhiteList.includes(mimetype)
        ) {
            return cb(null, false)
        }
        return cb(null, true)
    },
    limits: {
        fileSize: 1024*1024*5,
    }
})

const validateAndTransformImage = async (req, res, next) => {

    if (!req.file) {
        return res.status(400).json({message: "File isn't a photo"})
    }
    const { path: tempFilePath } = req.file;
    const extension = path.extname(tempFilePath);
    const fileName = `${nanoid()}${extension}`;
    const filePath = path.join(storageImgDir, fileName);


    try {
        await fs.rename(tempFilePath, filePath);
    } catch (error) {
    await fs.unlink(tempFilePath);
    return next(error);
    }
    
    const isValidAndTransform = await isImageAndTransform(filePath);
    
    if (!isValidAndTransform) {
        await fs.unlink(filePath)
        return res.status(400).json({ message: "Image's validation failed" })
    }

    next()
    // res.redirect(`/upload/${fileName}`)
}
    module.exports = {
        uploadMiddleware,
        validateAndTransformImage
    }