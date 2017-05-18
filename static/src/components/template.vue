<template>
  <div id="template">
    <div class="template-content">
      <img class="template-heart" src="../assets/image/template-heart.png" height="99" width="357">
      <div class="user-message">
        <div class="user-info">
          <div class="username">姓名: {{template.username}}</div>
          <div class="lovername">在职岗位: 最爱{{template.lover_name}}的人</div>
          <div class="experience">
            <span>项目经历: {{template.experiences.date_start}}—永远</span>
            <div class="recalls" v-for="item in template.experiences.recalls">
              <p class="recall-item">{{item}}</p>
            </div>
          </div>
          <div class="self-evaluate">
            <div class="evaluate-title">自我评价:</div>
            <p>{{template.profess}}</p>
          </div>
        </div>
        <div class="right-photo">
          <img class="love-photo" :src="template.photo" alt="">
        </div>
      </div>
      <img class="qzb-photo" src="../assets/image/qzb.jpg" alt="">
      <img class="template-flower" src="../assets/image/template-flower.png">
      <img class="tap-longtime" src="../assets/image/tap-longtime.png" alt="">
    </div>
    <div class="template-operate" v-if="template.template_id">
      <button type="button" @click="reWrite()">重新写</button>
    </div>
    <img class="template-footer" src="./.././assets/image/template-footer.png" alt="">
  </div>
</template>

<script>
  import axios from 'axios'
  export default {
    name: 'template',
    data () {
      return {
        template: {}
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
            this.$parent.$children[0].addRemind({type: 'error', msg: err.response.data.message})
          })
      },
      reWrite () {
        this.$router.push({
          name: 'add',
          query: {
            template_id: this.template.template_id
          }
        })
      }
    },
    mounted () {
      this.getTemplate(this.$route.query.template_id)
    }
  }
</script>

<style lang="scss" scoped>
  #template {
    flex: 1 0 auto;
    text-align: center;
    .template-content {
      position: relative;
      width: 7.400004rem;
      min-height: 10.906667rem;
      margin: 0 auto;
      margin-top: 0.973333rem;
      padding: 0 0.533333rem;
      background: #fff;
      text-align: center;
      .template-heart {
        width: 4.76rem;
        height: 1.32rem;
        margin-top: -0.333333rem;
      }
      .user-message {
        display: flex;
        flex-wrap: nowrap;
        align-items: center;
        color: #eb7b7b;
        font-size: 0.44rem;
        .user-info {
          flex: 1 1 auto;
          width: 0;
          text-align: left;
          div {
            margin-bottom: 0.266667rem;
            &:last-child {
              margin-bottom: 0;
            }
          }
          .experience {
            font-size: 0.4rem;
            p {
              margin: 0;
              line-height: 0.6rem;
              word-break: break-all;
            }
          }
          .self-evaluate {
            p {
              line-height: 0.6rem;
              margin: 0;
            }
          }
        }
        .right-photo {
          flex: 0 0 auto;
          width: 2.226667rem;
          display: flex;
          flex-wrap: wrap;
          align-self: stretch;
        }
        .love-photo {
          width: 2.226667rem;
          height: 2.226667rem;
          align-self: flex-start;
        }
      }
      .qzb-photo {
        width: 2.226667rem;
        height: 2.226667rem;
        align-self: flex-end;
        position: absolute;
        right: 0.533333rem;
        bottom: 1.533333rem;
      }
      .template-flower {
        position: absolute;
        bottom: 0;
        left: 0.64rem;
        height: 1.4rem;
        width: 7.186667rem;
      }
      .tap-longtime {
        position: absolute;
        bottom: -0.566667rem;
        left: 2.466667rem;
        width: 3.533333rem;
        height: 1.293333rem;
      }
    }
    .template-operate {
      margin-top: 0.64rem;
      display: flex;
      justify-content: space-around;
      button {
        width: 2.52rem;
        height: 1.133333rem;
        border-radius: 0.533333rem;
        background: #fff;
        border: none;
        outline: none;
        color: #eb7b7b;
        font-size: 0.56rem;
      }
    }
    .template-footer {
      width: 4.986667rem;
      height: 0.813333rem;
      margin-top: 0.1rem;
    }
  }
</style>
