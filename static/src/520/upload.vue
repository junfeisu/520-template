<template>
  <div id="upload">
    <!-- <button type="button" id="pickerfiles"　v-text="text"></button> -->
    <img v-if="!photo" src="../assets/image/together.png" id="pickerfiles">
    <img class="uploaded-photo" v-if="photo" :src="photo" alt="合照">
  </div>
</template>

<style lang="scss" scoped>
  #upload {
    display: flex;
    align-items: center;
    width: 1.893333rem;
    height: 1.893333rem;
    img {
      width: 100%;
    }
    .uploaded-photo {
      width: 1.893333rem;
      height: 1.893333rem;
    }
  }
</style>

<script>
  import Qiniu from '../../lib/qiniu.min.js'
  import axios from 'axios'
  export default {
    name: 'upload',
    data () {
      return {
        text: '',
        upToken: '',
        access_key: 'Mnlo7G1Xa5PiY-Oxw_D9vzVIEqjRXKmB4n1uxPg-'
      }
    },
    props: {
      photo: {
        type: String,
        default: ''
      }
    },
    methods: {
      init () {
        window.URL = window.URL || window.webkitURL
        let self = this
        Qiniu.uploader({
          runtimes: 'html5,flash,html4',
          browse_button: 'pickerfiles',
          uptoken: self.upToken,
          container: 'upload',
          domain: 'opzuvzih3.bkt.clouddn.com',
          max_file_size: '5mb',
          max_retries: 3,
          auto_start: true,
          multi_selection: false,
          save_key: false,
          unique_names: false,
          init: {
            FilesAdded (up, files) {
              console.log('fileAdded')
            },
            BeforeUpload (up, file) {
              console.log('beforeUpload')
            },
            UploadProgress (up, file) {
              console.log('uploading')
              self.text = '上传中'
            },
            UploadComplete () {
              console.log('upload success')
              self.text = '上传成功'
            },
            FileUploaded (up, file, info) {
              console.log('upload completed')
              let res = JSON.parse(info)
              let domain = up.getOption('domain')
              let sourceLink = 'http://' + domain + '/'
              let name = res.key
              self.getDownToken(sourceLink, name)
            },
            Error (up, err, errTip) {
              this.$parent.$parent.$children[0].addRemind({type: 'error', msg: err})
            },
            Key (up, file) {
              var key = new Date().getTime() + '-' + file.name
              return key
            }
          }
        })
      },
      getUpToken () {
        axios.get('/api/token/up')
          .then(result => {
            this.upToken = result.data
            this.init()
          })
          .catch(err => {
            this.$parent.$parent.$children[0].addRemind({type: 'error', msg: err.response.data.message})
          })
      },
      getDownToken (baseUrl, name) {
        axios.post('/api/token/down', {
          url: baseUrl + name
        })
          .then(result => {
            this.$parent.template.photo = result.data
          })
          .catch(err => {
            this.$parent.$parent.$children[0].addRemind({type: 'error', msg: err.response.data.message})
          })
      }
    },
    mounted () {
      this.getUpToken()
    }
  }
</script>
