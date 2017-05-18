<template>
  <div id="upload">
    <!-- <button type="button" id="pickerfiles"　v-text="text"></button> -->
    <img src="../assets/image/together.png" id="pickerfiles">
  </div>
</template>

<style lang="scss" scoped>
  #upload {
    width: 1.893333rem;
    height: 1.586667rem;
    img {
      width: 100%;
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
          filters: {
            mime_types: [{
              title: 'Image files',
              extensions: 'jpg,jpeg,png,gif'
            }]
          },
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
              this.$root.add({type: 'error', msg: err})
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
            this.$root.add({type: 'error', msg: err.data})
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
            this.$root.add({type: 'error', msg: err.data})
          })
      }
    },
    mounted () {
      this.getUpToken()
    }
  }
</script>
