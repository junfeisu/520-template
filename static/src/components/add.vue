<template>
  <div id="add">
    <div class="add-container">
      <img class="top-flower" src="./.././assets/image/top-flower.png" alt="">
      <div class="user-message">
        <div class="message-left">
          <label class="username">
            我的名字<input type="text" name="username"/>
          </label>
          <label class="lovername">
            Ta的名字<input type="text" name="lovername"/>
          </label>
        </div>
        <div class="love-photo">
          <upload></upload>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import upload from './../520/upload.vue'
  import axios from 'axios'
  export default {
    name: 'add',
    data () {
      return {}
    },
    components: {
      upload
    },
    methods: {
      addTemplate () {
        axios.put('/api/template/add', {
          template_id: 0,
          username: '苏俊飞',
          lover_name: '靳晶晶',
          photo: '123',
          experiences: {
            date_start: '2016-02-14',
            date_end: 'forever',
            recalls: ['1']
          }
        })
          .then(template => {
            console.log(template)
          })
          .catch(error => {
            console.log(error)
          })
      },
      getTemplate (templateId) {
        axios.get('/api/template?template_id=' + templateId)
          .then(template => {
            console.log(template.data)
          })
          .catch(err => {
            console.log(err)
          })
      },
      updateTemplate () {
        axios.post('/api/template/update', {
          template_id: 1,
          username: '苏俊飞',
          lover_name: '靳晶晶',
          photo: '234',
          experiences: {
            date_start: '2016-02-14',
            date_end: 'forever',
            recalls: ['1']
          }
        })
          .then(result => {
            console.log(result.data)
          })
          .catch(err => {
            console.log(err)
          })
      }
    }
  }
</script>

<style lang="scss" scoped>
  #add {
    display: flex;
    align-items: center;
    justify-content: center;
    .top-flower {
      width: 7.986667rem;
      height: 1.546667rem;
      margin-bottom: 0.733333rem;
    }
    .user-message {
      display: flex;
      flex-wrap: nowrap;
    }
    .message-left {
      flex: 1 1 auto;
      color: #eb7b7b;
      font-size: 0.56rem;
      label {
        display: flex;
        align-items: center;
        justify-content: center;
        margin-bottom: 0.52rem;
        &:last-child {
          margin-bottom: 0;
        }
      }
      input {
        width: 2.133333rem;
        height: 0.533333rem;
        background: #fff;
        border: 2px solid #eb7b7b;
        border-radius: 0.186667rem;
        outline: none;
        padding-left: 0.133333rem;
        margin-left: 0.48rem;
      }
    }
    .love-photo {
      flex: 0 0 auto;
    }
  }

  .add-container {
    position: absolute;
    height: calc(100% - 1.28rem);
    width: calc(100% - 2.48rem);
    left: 1.24rem;
    top: 0.586667rem;
  }
</style>
