<template>
  <div id="app">

        <router-view/>
      </div>

</template>



<script>

export default {
  name: 'App',
  data(){
    return{

    }
  },
  components:{

  },
  mounted(){
      if(sessionStorage.realName!=""||sessionStorage.realName!=undefined){
        if(sessionStorage.info){
          var  info=JSON.parse(sessionStorage.info)
          this.$store.commit('changeLogin', info)
        }
      }
  }
}
</script>

<style>


  :root{
    overflow-x: hidden;
  }
  *{
    margin: 0;
    padding: 0;
  }

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /*margin-top: 60px;*/
}

  #app{
    width:100%;
    /*border: 1px solid  red;*/
    margin:  0  auto;
  }

  a{
    text-decoration: none;
    color: black;
  }
  input{
    outline: none;
  }

</style>
