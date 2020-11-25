<template>
  <header>
    <div class="center">
      <div class="header-inner">
        <img src="../assets/images/indexlogo.png" alt="">
        <ul>
          <li
            class="active"
            @click="handleToIndex"
          >首页</li>
          <!-- <li>热点</li>
          <li>课程</li>
          <li>待开发</li> -->
        </ul>
      </div>
      <el-input
        v-if="$route.path === '/index'"
        :disabled="disabled"
        v-model="keyword"
        placeholder="搜索文章"
        @keyup.enter.native="search"
      >
        <el-button
          :disabled="disabled"
          slot="append"
          icon="el-icon-search"
          @click="search"
        ></el-button>
      </el-input>
    </div>
  </header>
</template>

<script>
export default {
  name: 'BlogHeader',
  props: {
    disabled: {
      type: Boolean,
      default: true
    }
  },
  data: function() {
    return {
      keyword: ''
    }
  },
  methods: {
    handleToIndex () {
      if (this.$route.path !== '/index') {
        this.$router.push({path: 'index'})
      }
    },
    search () {
      if (!this.keyword.trim()) {
        this.$message.error('搜索内容不能为空')
        return
      }
      let params = {
        keyword: this.keyword,
        pageNo: 1,
        pageSize: 5
      }
      console.log(this.$parent.loadingTarget)
      console.log(this.$parent)
      this.$parent.loadingInstance = this.$loading({
        target: this.$parent.loadingTarget,
        text: '加载中...'
      })
      this.$parent.disabled = true
      this.axios.post("http://120.79.115.240:5000/articles/search", params).then((res) => {
        if (res.data.success) {
          this.$emit('handleArticleSearch', res.data.data)
          this.$parent.disabled = false
        } else {
          this.$message.error('搜索文章失败')
        }
      }).catch(err => {
        if (err) {
          this.$message.error('服务器异常')
        }
      }).finally(() => {
        this.$parent.loadingInstance.close()
      })
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
    // justify-content: space-between;
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