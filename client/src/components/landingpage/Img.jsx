import React, { Component } from 'react'
import axios from 'axios'
import TextField from '@material-ui/core/TextField'
import css from './Img.module.css'
import $ from 'jquery'
import { Button } from '@material-ui/core'
import { Alert } from '@material-ui/lab'

class Img extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedFile: null,
      selectedFiles: null,
      selectedImages: [],
      comments: '',
      loc: '',
      phonenumb: '',
      data: [],
      isError: false,
      isLoading: false,
      errorMsg: 'Maksimal mengupload 4 gambar',
      isSuccess: false,
    }
  }

  // singleFileChangedHandler = (event) => {
  //   console.log('event.target', event.target.files)
  //   this.setState({
  //     selectedFile: event.target.files[0],
  //   })
  // }

  multipleFileChangedHandler = (event) => {
    if (event.target.files) {
      const fileArray = Array.from(event.target.files).map((file) =>
        URL.createObjectURL(file),
      )
      console.log('fileArray', fileArray)
      // const selectedImages = selectedImages.concat(fileArray)
      this.setState({
        selectedImages: this.state.selectedImages.concat(fileArray),
        selectedFiles: event.target.files,
      })
      Array.from(event.target.files).map((file) => URL.revokeObjectURL(file))
      console.log(event.target.files)
    }
  }

  renderPhotos = (source) => {
    if (source.length <= 5) {
      console.log('source', source)
      var filtered = source.filter(function (el) {
        return el != null
      })
      return filtered.map((photo) => {
        return (
          <img
            src={photo}
            alt={photo}
            key={photo}
            className={css.singlepreview}
          />
        )
      })
    } else {
      return (
        <Alert className={css.error__con} severity="error">
          {this.state.errorMsg}
        </Alert>
      )
    }
  }

  // singleFileUploadHandler = (event) => {
  //   const data = new FormData()
  //   // If file selected
  //   if (this.state.selectedFile) {
  //     data.append(
  //       'profileImage',
  //       this.state.selectedFile,
  //       this.state.selectedFile.name,
  //     )
  //     axios
  //       .post(`${process.env.REACT_APP_BASE_URL}/v1/profileImage`, data, {
  //         headers: {
  //           accept: 'application/json',
  //           'Accept-Language': 'en-US,en;q=0.8',
  //           'Content-Type': `multipart/form-data; boundary=${data._boundary}`,
  //         },
  //       })
  //       .then((response) => {
  //         if (200 === response.status) {
  //           // If file size is larger than expected.
  //           if (response.data.error) {
  //             if ('LIMIT_FILE_SIZE' === response.data.error.code) {
  //               this.ocShowAlert('Max size: 2MB', 'red')
  //             } else {
  //               console.log(response.data)
  //               // If not the given file type
  //               this.ocShowAlert(response.data.error, 'red')
  //             }
  //           } else {
  //             // Success
  //             let fileName = response.data
  //             console.log('filedata', fileName)
  //             this.ocShowAlert('File Uploaded', '#3089cf')
  //           }
  //         }
  //       })
  //       .catch((error) => {
  //         // If another error
  //         this.ocShowAlert(error, 'red')
  //       })
  //   } else {
  //     // if file not selected throw error
  //     this.ocShowAlert('Please upload file', 'red')
  //   }
  // }

  multipleFileUploadHandler = () => {
    const data = new FormData()
    data.append('comments', '') //append the values with key, value pair
    data.append('loc', '')
    let selectedFiles = this.state.selectedFiles
    // If file selected
    if (selectedFiles.length <= 4) {
      for (let i = 0; i < selectedFiles.length; i++) {
        data.append('galleryImage', selectedFiles[i], selectedFiles[i].name)
      }
      axios
        .post(`${process.env.REACT_APP_BASE_URL}/v1/reportImage`, data, {
          headers: {
            accept: 'application/json',
            'Accept-Language': 'en-US,en;q=0.8',
            'Content-Type': `multipart/form-data; boundary=${data._boundary}`,
            Authorization: 'Bearer ' + localStorage.getItem('_s_t'),
          },
          timeout: 5000,
          timeoutErrorMessage: 'Koneksi timeout, periksa kembali koneksi anda!',
        })
        .then((response) => {
          if (200 === response.status) {
            // If file size is larger than expected.
            if (response.data.error) {
              if ('LIMIT_FILE_SIZE' === response.data.error.code) {
                this.ocShowAlert('Max size: 2MB', 'red')
              } else if ('LIMIT_UNEXPECTED_FILE' === response.data.error.code) {
                this.ocShowAlert('Max 4 images allowed', 'red')
              } else {
                // If not the given ile type
                this.ocShowAlert(response.data.error, 'red')
              }
            } else {
              // Success
              let fileName = response.data
              console.log('fileName', fileName)
              this.ocShowAlert('File Uploaded', '#3089cf')
            }
          }
        })
        .catch((error) => {
          // If another error
          this.ocShowAlert(error, 'red')
        })
    } else {
      // if file not selected throw error
      this.ocShowAlert('Maksimum 4 gambar yang bisa diupload', 'red')
    }
  }

  fetchData = async () => {
    try {
      this.setState({
        isLoading: true,
        isError: false,
        errorMsg: '',
      })

      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/v1/users`,
        {
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('_s_t'),
          },
        },
        {
          timeout: 5000,
          timeoutErrorMessage: 'Koneksi timeout, periksa kembali koneksi anda!',
        },
      )

      if (response) {
        const { region, prov } = response.data

        this.setState({
          region,
          prov,
          isLoading: false,
        })
      }
    } catch (error) {
      if (error.code === 'ECONNABORTED') {
        this.setState({
          errorMsg: error.message,
        })
      } else {
        this.setState({
          errorMsg: 'Ada yang salah, coba beberapa saat lagi!',
        })
      }
      this.setState({
        isLoading: false,
        isError: true,
      })
    }
  }

  // ShowAlert Function
  ocShowAlert = (message, background = '#3089cf') => {
    let alertContainer = document.querySelector('#oc-alert-container'),
      alertEl = document.createElement('div'),
      textNode = document.createTextNode(message)
    alertEl.setAttribute('class', 'oc-alert-pop-up')
    $(alertEl).css('background', background)
    alertEl.appendChild(textNode)
    alertContainer.appendChild(alertEl)
    setTimeout(function () {
      $(alertEl).fadeOut('slow')
      $(alertEl).remove()
    }, 3000)
  }

  render() {
    return (
      <div className={css.img__container}>
        {/* For Alert box*/}
        <div id="oc-alert-container"></div>
        <h3>Ingin tahu kualitas air yang anda konsumsi ?</h3>
        <div className={css.line}></div>
        <p>
          Kirimkan foto dan keterangan mengenai kualitas air anda agar dapat
          kita berikan solusi terbaik meningkatkan kualitas air anda
        </p>
        <div align="center">
          <input
            className={css.input__images}
            type="file"
            multiple
            id="file"
            onChange={this.multipleFileChangedHandler}
            onClick={() => {
              this.setState({
                selectedFile: null,
                selectedFiles: null,
                selectedImages: [null],
              })
            }}
          />
          {/* <button onClick={this.multipleFileUploadHandler}>Upload!</button> */}
          <div className={css.preview__container}>
            {this.renderPhotos(this.state.selectedImages)}
          </div>
        </div>
        <div className={css.text__container}>
          <div className={css.textfield__container}>
            <TextField
              style={{
                width: '100%',
              }}
              label="Keterangan kualitas air anda"
              value={this.state.comments || ''}
              onChange={(event) =>
                this.setState({
                  comments: event.target.value,
                })
              }
            />
          </div>
          <div className={css.textfield__container}>
            <TextField
              style={{
                width: '100%',
              }}
              label="Lokasi anda"
              value={this.state.loc || ''}
              onChange={(event) =>
                this.setState({
                  loc: event.target.value,
                })
              }
            />
          </div>
          <div className={css.textfield__container}>
            <TextField
              style={{
                width: '100%',
              }}
              label="Nomor HP anda"
              value={this.state.phonenumb || ''}
              onChange={(event) =>
                this.setState({
                  phonenumb: event.target.value,
                })
              }
            />
          </div>
        </div>
        <div className={css.button__container}>
          <Button
            variant="contained"
            color="primary"
            type="submit"
            onClick={this.multipleFileUploadHandler}
          >
            Submit
          </Button>
        </div>
        {/* <TextField
          style={{
            width: '95%',
          }}
          label="Harga Air SIAB"
          value={x1}
          onChange={(e) => setX1(e.target.value)}
        /> */}
      </div>
    )
  }
}

export default Img
