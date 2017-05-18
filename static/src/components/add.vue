<template>
  <div id="add">
    <div class="add-container">
      <img class="top-flower" src="./.././assets/image/top-flower.png" alt="">
      <div class="user-message">
        <div class="message-left">
          <label class="username">
            我的名字<input type="text" v-model="template.username" name="username"/>
          </label>
          <label class="lovername">
            Ta的名字<input type="text" v-model="template.lover_name" name="lovername"/>
          </label>
        </div>
        <div class="love-photo">
          <upload v-if="!template.photo"></upload>
          <img v-if="template.photo" :src="template.photo" alt="合照">
        </div>
      </div>
      <div class="together-time">
        <div>我们在这一天成为男女朋友</div>
        <input type="text" class="together-time-value" v-model="template.experiences.date_start" placeholder="如:2016-02-14">
      </div>
      <img class="separate" src="./../assets/image/separate.png"></img>
      <div class="recalls">
        <div class="recall-title">我们拥有这些回忆:</div>
        <div class="recall-content" v-show="template.experiences.recalls.length">
          <div class="recall-item" v-for="(recall, index) in template.experiences.recalls">
            <span>{{recall}}</span>
            <div class="operate">
              <img @click="editRecall(index)" class="edit" src="./../assets/image/edit.png">
              <img class="delete" @click="deleteRecall(index)" src="./../assets/image/delete.png">
            </div>
          </div>
        </div>
        <div class="add-recall" v-show="!showEdit" @click="showEdit=true">
          <span class="add-icon">+</span>
          <span class="add-desc">{{template.experiences.recalls.length ? '继续添加' : '恋爱大事件'}}</span>
        </div>
        <div class="write-recall" v-show="showEdit">
          <textarea name="recall" v-model="currentRecall"></textarea>
          <div class="write-operate">
            <button type="button" class="cancel" @click="cancel()">取消</button>
            <button type="button"　class="ensure" @click="ensure()">确认</button>
          </div>
          <div class="clear"></div>
        </div>
      </div>
      <div class="profess" :class="{'small-top': showEdit}">
        <div class="profess-title">致恋人，你有什么爱的告白</div>
        <textarea name="profess" v-model="template.profess"></textarea>
      </div>
      <div class="add-operate">
        <button type="button" class="submit" @click="submit()">
          提交
          <img class="add-btn-heart" src="../assets/image/add-btn-heart.png">
        </button>
        <!-- <button v-if="addSuccess" type="button" class="show-affection" @click="showAffection()">
          秀恩爱
          <img class="add-btn-heart" src="../assets/image/add-btn-heart.png">
        </button> -->
      </div>
      </div>
      <div class="share-modal" v-if="showModal"></div>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'
  export default {
    name: 'add',
    data () {
      return {
        template: {
          template_id: 0,
          photo: '',
          username: '',
          lover_name: '',
          experiences: {
            date_start: '',
            recalls: []
          },
          profess: ''
        },
        showEdit: false,
        isEdit: false,
        currentIndex: '',
        currentRecall: '',
        showModal: false
      }
    },
    methods: {
      getTemplate (templateId) {
        axios.get('/api/template?template_id=' + templateId)
          .then(template => {
            this.template = template.data
            this.template.experiences.date_start = this.template.experiences.date_start.split('T')[0]
          })
          .catch(err => {
            this.$root.add({type: 'error', msg: err.data})
          })
      },
      addTemplate () {
        axios.put('/api/template/add', this.template)
          .then(template => {
            this.$root.add({type: 'success', msg: '添加简历成功，点击秀恩爱按钮分享至朋友圈即可查看简历'})
            this.showModal = true
          })
          .catch(err => {
            this.$root.add({type: 'error', msg: err.data})
          })
      },
      updateTemplate () {
        axios.post('/api/template/update', this.template)
          .then(result => {
            this.addSuccess = true
            this.$root.add({type: 'success', msg: '修改简历成功'})
          })
          .catch(err => {
            this.$root.add({type: 'error', msg: err.data})
          })
      },
      cancel () {
        this.showEdit = false
        this.currentRecall = ''
        this.currentIndex = ''
        this.isEdit = false
      },
      ensure () {
        if (this.currentRecall.trim()) {
          if (this.isEdit && this.currentIndex !== '') {
            this.template.experiences.recalls[this.currentIndex] = this.currentRecall
            this.isEdit = false
            this.currentIndex = ''
          } else {
            let recallsLen = this.template.experiences.recalls.length
            this.template.experiences.recalls.push(1 + recallsLen + '.' + this.currentRecall)
          }
          this.currentRecall = ''
        }
      },
      editRecall (index) {
        this.currentRecall = this.template.experiences.recalls[index]
        this.showEdit = true
        this.currentIndex = index
        this.isEdit = true
      },
      deleteRecall (index) {
        this.template.experiences.recalls.splice(index, 1)
      },
      // showAffection () {
      //   this.showModal = true
      // },
      submit () {
        if (this.$route.query.template_id) {
          this.updateTemplate()
        } else {
          this.addTemplate()
        }
      }
    },
    mounted () {
      if (this.$route.query.template_id) {
        this.getTemplate(this.$route.query.template_id)
      }
    }
  }
</script>

<style lang="scss" scoped>
  #add {
    display: flex;
    .top-flower {
      width: 7.986667rem;
      height: 1.546667rem;
      margin-bottom: 0.733333rem;
    }
    .user-message {
      display: flex;
      flex-wrap: nowrap;
      align-items: center;
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
      margin-left: 0.266667rem;
      img {
        width: 1.893333rem;
        height: 1.893333rem;
      }
    }
    .together-time {
      margin-top: 0.48rem;
      color: #eb7b7b;
      text-align: center;
      div {
        font-size: 0.56rem;
      }
      .together-time-value {
        font-size: 0.44rem;
        border: 0;
        background: #f4dddd;
        outline: none;
        margin-top: 0.2rem;
        color: #eb7b7b;
        text-align: center;
        &::-webkit-input-placeholder {
          color: #eb7b7b;
          text-align: center;
        }
      }
    }
    .separate {
      height: 0.52rem;
      width: 7.52rem;
    }
    .recalls {
      color: #eb7b7b;
      text-align: center;
      font-size: 0.56rem;
      .recall-content {
        margin-top: 0.2rem;
        font-size: 0.44rem;
        .recall-item {
          display: flex;
          align-items: center;
          justify-content: center;
          span {
            flex: 1 1 auto;
            text-align: left;
          }
          .operate {
            margin-left: 0.133333rem;
            flex: 0 0 auto;
          }
          img {
            width: 0.44rem;
            height: 0.44rem;
            cursor: pointer;
            margin-left: 0.066667rem;
          }
        }
      }
      .add-recall {
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 0.44rem;
        margin-top: 0.2rem;
        cursor: pointer;
        .add-icon {
          width: 0.44rem;
          height: 0.44rem;
          background: #eb7b7b;
          color: #fff;
          border-radius: 100%;
          text-align: center;
          line-height: 0.44rem;
          margin-right: 0.066667rem;
        }
      }
      .write-recall {
        font-size: 0.44rem;
        margin-top: 0.2rem;
        .write-operate {
          float: right;
        }
        button {
          border: none;
          border-radius: 0.213333rem;
          width: 1.053333rem;
          height: 0.56rem;
          font-size: 0.3rem;
          background: #fff;
          color: #eb7b7b;
          outline: none;
        }
        .cancel {
          color: #b1b1b1;
        }
      }
    }
    .profess {
      margin-top: 2.2rem;
      color: #eb7b7b;
      font-size: 0.44rem;
      .profess-title {
        font-size: 0.56rem;
        margin-bottom: 0.2rem;
      }
    }
    .small-top {
      margin-top: 0.3rem;
    }
    .add-operate {
      display: flex;
      align-items: center;
      justify-content: center;
      margin-top: 0.2rem;
      button {
        width: 2.56rem;
        height: 0.946667rem;
        box-shadow: 0 0.173333rem 0.76rem 0.026667rem rgba(0, 0, 0, .14);
        color: #eb7b7b;
        background: #fff;
        position: relative;
        border: none;
        outline: none;
        line-height: 0.94rem;
        border-radius: 0.586667rem;
        font-size: 0.56rem;
        .add-btn-heart {
          position: absolute;
          left: -0.493333rem;
          top: -0.393333rem;
          width: 1.186667rem;
          height: 1.266667rem;
        }
      }
    }
  }

  textarea {
    border-radius: 0.506667rem;
    width: 7.206667rem;
    height: 1.693333rem;
    outline: none;
    padding-left: 0.233333rem;
    padding-top: 0.133333rem;
  }

  .add-container {
    position: absolute;
    height: calc(100% - 1.28rem);
    width: calc(100% - 2.48rem);
    text-align: center;
    left: 1.24rem;
    top: 0.586667rem;
    img {
      width: 100%;
    }
  }

  .share-modal {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background: rgba(0, 0, 0, .7);
    background-image: url('./../assets/image/share-modal.png');
    background-size: 7.773333rem 5.373333rem;
    background-repeat: no-repeat;
    background-position: 50% 10%;
    z-index: 999;
  }

  .clear {
    width: 0;
    height: 0;
    border: 0;
    float: none;
    clear: both;
  }
</style>
