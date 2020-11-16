import React, { Component } from 'react'
import ReactDom from 'react-dom'
import ReactS3 from 'react-s3'

const aws = require('aws-sdk')

const config = {
  bucketName: 'siabupload',
  region: 'us-east-2',
  accessKeyId: 'AKIAXJRA2B7A6J5HSXNB',
  secretAccessKey: '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',
}

class Uploadtest extends Component {
  constructor() {
    super()
  }
  upload(e) {
    console.log('e.target.files', e.target.files[0])
    ReactS3.upload(e.target.files[0], config)
      .then((data) => {
        console.log('data', data.location)
      })
      .catch((err) => {
        alert(err)
      })
  }
  render() {
    return (
      <div>
        <h1>aws s3 upload</h1>
        <input type="file" onChange={this.upload} />
      </div>
    )
  }
}

export default Uploadtest
