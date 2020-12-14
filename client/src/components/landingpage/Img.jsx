import React, { Component } from 'react'
import axios from 'axios'
import TextField from '@material-ui/core/TextField'
import css from './Img.module.css'
import $ from 'jquery'
import { Button } from '@material-ui/core'
import { Alert } from '@material-ui/lab'
import CircularProgress from '@material-ui/core/CircularProgress'
import BackupIcon from '@material-ui/icons/Backup'
class Img extends Component {
  constructor(props) {
    super(props)
    this.state = {
      phonenumb: '',
      // selectedFile: null,
      selectedFiles: null,
      selectedImages: [],
      comments: '',
      loc: '',
      data: [],
      isError: false,
      isLoading: false,
      errorMsg: 'Maksimal mengupload 4 gambar',
      isSuccess: false,
    }
  }

  getUserData = async () => {
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
        const { phone } = response.data

        this.setState({
          phonenumb: phone,
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

  componentDidMount() {
    this.getUserData()
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
      this.setState({
        selectedImages: this.state.selectedImages.concat(fileArray),
        selectedFiles: event.target.files,
      })
      Array.from(event.target.files).map((file) => URL.revokeObjectURL(file))
    }
  }

  renderPhotos = (source) => {
    if (source.length <= 5) {
      var filtered = source.filter(function (el) {
        return el != null
      })
      return filtered.map((photo) => {
        return (
          <img
            // placeholder={siab_logo}
            src={photo}
            alt={photo}
            key={photo}
            className={css.singlepreview}
          />
        )
      })
      // } else if (source.length <= 1) {
      //   return (
      //     <img
      //       src={siab_logo}
      //       alt={siab_logo}
      //       key={siab_logo}
      //       className={css.singlepreview}
      //     />
      //   )
    } else {
      return (
        <Alert className={css.error__con} severity="error">
          Maksimal 4 foto!
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

  multipleFileUploadHandler = (event) => {
    event.preventDefault()
    this.setState({
      isLoading: true,
      isError: false,
      errorMsg: '',
    })
    const data = new FormData()
    data.append('comments', this.state.comments) //append the values with key, value pair
    data.append('loc', this.state.loc)
    data.append('phoneNum', this.state.phonenumb)
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
          timeout: 60000,
          timeoutErrorMessage: 'Koneksi timeout, periksa kembali koneksi anda!',
        })
        .then((response) => {
          if (200 === response.status) {
            // If file size is larger than expected.
            if (response.data.error) {
              if ('LIMIT_FILE_SIZE' === response.data.error.code) {
                this.ocShowAlert('Max size: 2MB', '#992222')
              } else if ('LIMIT_UNEXPECTED_FILE' === response.data.error.code) {
                this.ocShowAlert('Max 4 images allowed', '#992222')
              } else {
                // If not the given ile type
                this.ocShowAlert(response.data.error, '#992222')
              }
              this.setState({
                isLoading: false,
                isError: false,
                errorMsg: '',
              })
            } else {
              // Success
              this.ocShowAlert('Foto telah berhasil di-upload!', '#3089cf')

              this.setState({
                phonenumb: '',
                selectedFiles: null,
                selectedImages: [],
                comments: '',
                loc: '',
                data: [],
                isError: false,
                isLoading: false,
                errorMsg: 'Maksimal mengupload 4 gambar',
                isSuccess: false,
              })
            }
          }
        })
        .catch((error) => {
          // If another error
          this.ocShowAlert(error, '#992222')
          this.setState({
            isLoading: false,
            isError: false,
            errorMsg: '',
          })
        })
    } else {
      // if file not selected throw error
      this.ocShowAlert('Maksimum 4 gambar yang bisa diupload', '#992222')
      this.setState({
        isLoading: false,
        isError: false,
        errorMsg: '',
      })
    }
  }

  // fetchData = async () => {
  //   try {
  //     this.setState({
  //       isLoading: true,
  //       isError: false,
  //       errorMsg: '',
  //     })

  //     const response = await axios.get(
  //       `${process.env.REACT_APP_BASE_URL}/v1/users`,
  //       {
  //         headers: {
  //           Authorization: 'Bearer ' + localStorage.getItem('_s_t'),
  //         },
  //       },
  //       {
  //         timeout: 5000,
  //         timeoutErrorMessage: 'Koneksi timeout, periksa kembali koneksi anda!',
  //       },
  //     )

  //     if (response) {
  //       const { region, prov } = response.data

  //       this.setState({
  //         region,
  //         prov,
  //         isLoading: false,
  //       })
  //     }
  //   } catch (error) {
  //     if (error.code === 'ECONNABORTED') {
  //       this.setState({
  //         errorMsg: error.message,
  //       })
  //     } else {
  //       this.setState({
  //         errorMsg: 'Ada yang salah, coba beberapa saat lagi!',
  //       })
  //     }
  //     this.setState({
  //       isLoading: false,
  //       isError: true,
  //     })
  //   }
  // }

  // ShowAlert Function
  ocShowAlert = (message, background = '#3089cf') => {
    let alertContainer = document.querySelector('#oc-alert-container'),
      alertEl = document.createElement('div'),
      textNode = document.createTextNode('   ' + message)
    alertEl.setAttribute('class', 'oc-alert-pop-up')
    $(alertEl).css('background', background)
    $(alertEl).css('color', '#fff')
    $(alertEl).css('margin-bottom', '10px')
    alertEl.appendChild(textNode)
    alertContainer.appendChild(alertEl)
    setTimeout(function () {
      $(alertEl).fadeOut('slow')
      $(alertEl).remove()
    }, 5000)
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
        <form onSubmit={this.multipleFileUploadHandler}>
          <div>
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
              required
            />
            <div className={css.preview__container}>
              <img
                src={
                  'https://s3.us-east-2.amazonaws.com/assets.siagaairbersih.com/siab_logo.png'
                }
                alt={'siab_logo'}
                key={
                  'https://s3.us-east-2.amazonaws.com/assets.siagaairbersih.com/siab_logo.png'
                }
                className={css.singlepreview}
              />
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
                required
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
                required
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
                required
              />
            </div>
            <div className={css.textfield__container}>
              <TextField
                style={{
                  width: '100%',
                }}
                label="Referral"
                // value={this.state.phonenumb || ''}
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
              disabled={this.state.isLoading}
            >
              {this.state.isLoading ? (
                <CircularProgress
                  color="inherit"
                  size={18}
                  style={{ marginRight: '10px' }}
                />
              ) : (
                <BackupIcon color="inherit" style={{ marginRight: '10px' }} />
              )}
              Upload
            </Button>
            <br />
            {/* <Button
              variant="contained"
              style={{
                background: '#25D366',
                color: '#fff',
                marginTop: '20px',
              }}
              onClick={() => {
                window.open('https://api.whatsapp.com/send?phone=085878036981')
              }}
            >
              <WhatsAppIcon style={{ marginRight: '10px', color: '#fff' }} />
              Konsultasi lewat WA
            </Button> */}
          </div>
        </form>
        <br />
        <br />
        <br />
        <br />
        <br />
      </div>
    )
  }
}

export default Img
