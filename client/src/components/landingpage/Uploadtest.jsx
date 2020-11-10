import React, { Component } from 'react'
import ReactDom from 'react-dom'
import ReactS3 from 'react-s3'
import { aws } from '../../keys'

const config = {
  bucketName: 'camer',
  dirName: 'image' /* optional */,
  region: 'us-east-2',
  accessKeyId: 'AKIAJEAR3OCO5QR6I7GA',
  secretAccessKey: '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',
}

class Uploadtest extends Component {
  constructor() {
    super()
  }
  upload(e) {
    console.log('e.target.files', e.target.files)
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
