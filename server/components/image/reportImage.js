const express = require('express')
const aws = require('aws-sdk')
const multerS3 = require('multer-s3')
const multer = require('multer')
const path = require('path')
const url = require('url')
const pool = require('../../config/db')

const s3 = new aws.S3({
  accessKeyId: 'AKIAXJRA2B7AQOMFSQ6H',
  secretAccessKey: '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',
  bucket: 'upload-siab',
})

/**
 * Single Upload
 */
// Multiple File Uploads ( max 4 )
const uploadsBusinessGallery = multer({
  storage: multerS3({
    s3: s3,
    bucket: 'upload-siab',
    acl: 'public-read',
    key: function (req, file, cb) {
      cb(
        null,
        path.basename(file.originalname, path.extname(file.originalname)) +
          '-' +
          Date.now() +
          path.extname(file.originalname),
      )
    },
  }),
  limits: { fileSize: 2000000 }, // In bytes: 2000000 bytes = 2 MB
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb)
  },
}).array('galleryImage', 4)

/**
 * Check File Type
 * @param file
 * @param cb
 * @return {*}
 */
function checkFileType(file, cb) {
  // Allowed ext
  const filetypes = /jpeg|jpg|png|gif/
  // Check ext
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase())
  // Check mime
  const mimetype = filetypes.test(file.mimetype)

  if (mimetype && extname) {
    return cb(null, true)
  } else {
    cb('Error: Images Only!')
  }
}

const imageUpload = (req, res) => {
  const { id } = req.session

  uploadsBusinessGallery(req, res, async (error) => {
    const { comments, loc } = req.body
    console.log('files', req.files)
    console.log(req)
    if (error) {
      console.log('errors', error)
      res.json({ error: error })
    } else {
      // If File not found
      if (req.files === undefined) {
        console.log('Error: No File Selected!')
        res.json('Error: No File Selected')
      } else {
        // If Success
        let fileArray = req.files,
          fileLocation
        const galleryImgLocationArray = []
        for (let i = 0; i < fileArray.length; i++) {
          fileLocation = fileArray[i].location
          console.log('filenm', fileLocation)
          galleryImgLocationArray.push(fileLocation)
        }
        // Save the file name into database

        try {
          const response = await pool.query(
            `
            INSERT INTO reports(user_id, uri, comments, loc)
            VALUES ($1, $2, $3, $4)
          `,
            [id, galleryImgLocationArray, comments, loc],
          )

          if (response) {
            res.json({
              message: 'Upload success!',
              filesArray: fileArray,
              locationArray: galleryImgLocationArray,
            })
          }
        } catch (error) {
          res.status(400).json({
            message: error.message,
          })
        }
      }
    }
  })
}

module.exports = imageUpload
