<template>
    <div id="pay">
   支付页面
    </div>
</template>

<script>
    export default {
        name: "pay",
        mounted(){

            $("#pay").html('http://phlwq.mynatapp.cc/yuxinfang/authc/recharge/rechargePaidForOrder?orderId='+sessionStorage.pam)
        }
    }
</script>

<style scoped>

</style>
