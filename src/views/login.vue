<template>
  <div class="main-box">
    <div class="bg">
      <img height="60%" src="@/assets/login_bg.svg" />
    </div>
    <div class="form">
      <h1>欢迎来到chd123</h1>
      <SignForm></SignForm>
    </div>
  </div>
</template>

<script lang="ts" setup>
import SignForm from "@/components/signForm.vue";
</script>
<style lang="css" scoped>
.main-box {
  display: flex;
  height: 100vh;
  background: linear-gradient(rgba(161, 196, 253, 1), rgb(193, 238, 241));
}
.bg {
  height: 100%;
  flex: 1;
  margin-bottom: 0;
  display: flex;
}
h2 {
  margin: auto;
}
.form {
  background-color: #fff;
  margin: 20px;
  border-radius: 20px;
  width: 300px;
  padding: 50px;
  height: max-content;
  align-items: center;
  justify-content: center;
  justify-items: center;
}
img {
  margin: auto;
}
</style>
