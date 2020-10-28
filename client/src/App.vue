<template>
  <div>
    <Navbar />
    <router-view/>
  </div>
</template>

<script>
export default {
  components:{
    Navbar:() => import('./components/Navbar')
  }
  
}
</script>
<style>

</style>
