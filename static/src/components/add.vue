<template>
  
</template>

<script>
  import axios from 'axios'
  export default {
    name: 'add',
    data () {
      return {}
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
</style>
