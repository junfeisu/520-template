<template>
  <div id="upload">
    <button type="button" id="pickerfiles"　v-text="text"></button>
  </div>
</template>

<style lang="scss" scoped>
  
</style>

<script>
  import Qiniu from '../../lib/qiniu.min.js'
  import axios from 'axios'
  export default {
    name: 'upload',
    data () {
      return {
        text: '上传图片',
        upToken: '',
        access_key: 'Mnlo7G1Xa5PiY-Oxw_D9vzVIEqjRXKmB4n1uxPg-'
      }
    },
    methods: {
      init () {
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
            BeforeUpload () {
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
              res.key = window.btoa(res.key)
              let sourceLink = 'http://' + domain + '/' + res.key + '?e=' + Date.now()
              self.$parent.photo = sourceLink
            },
            Error (up, err, errTip) {
              console.log('err is' + err)
            },
            Key (up, file) {
              var key = new Date().getTime() + '-' + file.name
              return key
            }
          }
        })
      },
      getToken () {
        axios.get('/api/token')
          .then(result => {
            this.upToken = result.data
            this.init()
          })
          .catch(err => {
            console.log(err)
          })
      }
    },
    mounted () {
      this.getToken()
    }
  }
</script>
