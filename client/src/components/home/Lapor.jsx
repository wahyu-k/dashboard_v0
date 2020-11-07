// import React, { Component } from 'react'
// import earth from './../../img/earth.png'
// import css from './lapor.module.css'

// export class Lapor extends Component {
//   state = {
//     profileImg: earth,
//   }
//   imageHandler = (e) => {
//     if (e.target.files) {
//       const filesAmount = e.target.files.length
//       for (let i = 0; i < filesAmount; i++) {
//         const reader = new FileReader()
//         reader.onload = () => {
//           if (reader.readyState === 2) {
//             this.setState({ profileImg: reader.result })
//           }
//         }
//         reader.readAsDataURL(e.target.files[i])
//       }
//     }
//   }
//   render() {
//     const { profileImg } = this.state
//     return (
//       <div className={css.lapor__container}>
//         <h2>Ingin tahu kualitas air yang anda konsumsi ?</h2>
//         <div className={css.line}></div>
//         <p>
//           Kirimkan foto dan keterangan mengenai kualitas air anda agar dapat
//           kita berikan solusi terbaik untuk meningkatkan kualitas air anda
//         </p>
//         <div className={css.img__container}>
//           <img
//             src={profileImg}
//             alt=""
//             id="img"
//             width="100%"
//             className={css.grey__container}
//           />
//         </div>
//         <div className={css.img__container}>
//           <img
//             src={profileImg}
//             alt=""
//             id="img"
//             width="100%"
//             className={css.grey__container}
//           />
//         </div>
//         <div className={css.upload__container}>
//           <input
//             className={css.file__upload__container}
//             type="file"
//             name="image-upload"
//             id="input"
//             accept="image/*"
//             multiple
//             onChange={this.imageHandler}
//           />
//         </div>
//       </div>
//     )
//   }
// }

// export default Lapor

import React, { Component } from 'react'
import css from './lapor.module.css'

export class Lapor extends Component {
  fileObj = []
  fileArray = []

  constructor(props) {
    super(props)
    this.state = {
      file: [null],
    }
    this.uploadMultipleFiles = this.uploadMultipleFiles.bind(this)
    this.uploadFiles = this.uploadFiles.bind(this)
  }

  uploadMultipleFiles(e) {
    this.fileObj.push(e.target.files)
    for (let i = 0; i < this.fileObj[0].length; i++) {
      this.fileArray.push(URL.createObjectURL(this.fileObj[0][i]))
    }
    this.setState({ file: this.fileArray })
  }

  uploadFiles(e) {
    e.preventDefault()
    console.log(this.state.file)
  }

  render() {
    return (
      <div className={css.lapor__container}>
        <h2>Ingin tahu kualitas air yang anda konsumsi ?</h2>
        <div className={css.line}></div>
        <div className={css.align}>
          <p>
            Kirimkan foto dan keterangan mengenai kualitas air anda agar dapat
            kita berikan solusi terbaik untuk meningkatkan kualitas air anda
          </p>
          <form className={css.img__container}>
            <div>
              {(this.fileArray || []).map((url) => (
                <img
                  src={url}
                  alt="..."
                  height="100%"
                  width="50%"
                  className={css.grey__container}
                />
              ))}
            </div>

            <div className={css.upload__container}>
              <input
                type="file"
                className={css.file__upload__container}
                onChange={this.uploadMultipleFiles}
                multiple
              />
              <button
                type="button"
                className="btn btn-danger btn-block"
                onClick={this.uploadFiles}
              >
                Upload
              </button>
            </div>
          </form>
        </div>
        <h2>Solusi kualitas air anda :</h2>
        <div className={css.line}></div>
        <div className={css.align}>
          <p className={css.grey__container}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea unde et
            impedit voluptatem ipsum deserunt, eos exercitationem, a quaerat
            eius in vitae quas culpa molestiae reiciendis consequuntur sequi
            quasi dignissimos.Lorem ipsum dolor sit amet consectetur adipisicing
            elit. Ea unde et impedit voluptatem ipsum deserunt, eos
            exercitationem, a quaerat eius in vitae quas culpa molestiae
            reiciendis consequuntur sequi quasi dignissimos. Lorem ipsum dolor
            sit amet consectetur adipisicing elit. Ea unde et impedit voluptatem
            ipsum deserunt, eos exercitationem, a quaerat eius in vitae quas
            culpa molestiae reiciendis consequuntur sequi quasi dignissimos.
          </p>
        </div>
      </div>
    )
  }
}

export default Lapor
