const express = require('express')

const { uploadMiddleware, validateAndTransformImage } = require('../middleware/imageUpload')

const router = express.Router()

router.post('/', uploadMiddleware.single('picture'), validateAndTransformImage)

router.get("/:imgPath", (req, res) => {
    const { imgPath } = req.params;
    res.render("../views/uploaded.ejs", { imgPath })
})

module.exports = router