const aws = require('aws-sdk')
const express = require('express')
const multer = require('multer')
const multerS3 = require('multer-s3')

// aws.config.update=({
//   secretAccessKey="KC0V+dATqbOqsiYB64sICsFzD4VW6qWeK4FD71lW",
//   AWSAccessKeyId=AKIAJEAR3OCO5QR6I7GA
// AWSSecretKey=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
// Bucket=camer
// })

const s3 = new.aws.S3({})

module.exports = {
  uploadImageToS3: (req, res) => {},
}
