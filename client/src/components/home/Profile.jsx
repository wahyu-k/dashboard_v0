import React, { Component } from 'react'
import ImageUploader from 'react-images-upload'
import axios from 'axios'

class Profile extends Component {
  constructor(props) {
    super(props)
    this.state = { pictures: [] }
    this.onDrop = this.onDrop.bind(this)
  }

  onDrop(picture) {
    console.log(this.state.pictures.concat(picture))
    this.setState({
      pictures: this.state.pictures.concat(picture),
    })
  }

  uploadImages() {
    console.log('this.state.pictures', this.state.pictures)
    let uploadPromises = this.state.pictures.map((image) => {
      let data = new FormData()
      data.append(image, image.name)
      return axios.post(
        `${process.env.REACT_APP_BASE_URL}/api/uploadImage`,
        data,
      )
    })
    axios
      .all(uploadPromises)
      .then((results) => {
        console.log('server response:')
        console.log('results', results)
      })
      .catch((e) => {
        console.log('e', e)
      })
  }

  render() {
    return (
      <div>
        <ImageUploader
          withIcon={true}
          buttonText="Choose images"
          onChange={this.onDrop}
          imgExtension={['.jpg', '.gif', '.png', '.gif']}
          maxFileSize={5242880}
        />
        <button onClick={this.uploadImages}>Upload Image</button>
      </div>
    )
  }
}
export default Profile
