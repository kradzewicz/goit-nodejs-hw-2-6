const express = require('express')

const { uploadMiddleware, validateAndTransformImage } = require('../middleware/imageUpload')

const router = express.Router()

router.post('/', uploadMiddleware.single('picture'), validateAndTransformImage)

router.get("/:imgPath", (req, res) => {
    const { imgPath } = req.params;
    res.render("uploaded", { imgPath: imgPath })
   
})

module.exports = router