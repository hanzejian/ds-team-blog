<template>
  <header>
    <div class="center">
      <div class="header-inner">
        <img src="../assets/images/indexlogo.png" alt="">
        <ul>
          <li class="active">首页</li>
          <li>热点</li>
          <li>课程</li>
          <li>待开发</li>
        </ul>
      </div>
      <el-input
        v-if="$route.path === '/index'"
        placeholder="搜索文章"
      >
        <el-button slot="append" icon="el-icon-search"></el-button>
      </el-input>
    </div>
  </header>
</template>

<script>
export default {
  name: 'BlogHeader',
  data: function() {
    return {
    }
  }
};
</script>

<style lang="scss" scoped>
ul {
  list-style-type: none;
  padding: 0;
  margin: 0;
}
.center {
  width: 1311px;
  margin: 0 auto;
}
.active {
  color: #2B7DE1 !important;
}
header {
  height: 87px;
  background-color: white;
  // overflow: hidden;
  .header-inner {
    float: left;
    display: flex;
    height: 100%;
    width: 500px;
    align-items: center;
    justify-content: space-between;
    margin-right: 300px;
    ul {
      display: flex;
      align-items: center;
      justify-content: space-between;        
      width: 300px;
      li {
        height: 89px;
        width: 75px;
        cursor: pointer;
        text-align: center;
        line-height: 89px;
        color: #C1C1C1;
        font-size: 20px;
      }
    }
  }
  .el-input {
    float: left;
    width: 200px;
    margin-top: 25px;
  }
}
</style>