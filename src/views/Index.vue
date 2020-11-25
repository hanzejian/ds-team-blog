<template>
  <div class="index">
    <blog-header
      :disabled="disabled"
      @handleArticleSearch="handleArticleSearch"
    ></blog-header>
    <main
      id="loadingTarget"
      class="center">
      <ul class="tabList">
        <li class="active">全部</li>
        <!-- <li>最新</li>
        <li>热榜</li> -->
      </ul>
      <ul
        v-if="articleList.length !== 0"
        id="articleList"
        class="articleList"
      >
        <li
          v-for="item in articleList"
          :key="item.id"
        >
          <a :href="`${articleUrl}${item._id}`" target="_blank">
            <div class="art-info">
              <div class="tip">{{`${item.creator.name} · ${item.created_at}`}}</div>
              <div class="title">{{ item.title }}</div>
            </div>
            <div
              v-if="item.cover"
              class="art-img"
            >
              <img data-role="image" :src="item.cover" class="image lake-drag-image" alt="image.png" title="image.png" style="visibility: visible;">
            </div>
          </a>
        </li>
      </ul>
      <el-pagination
        v-if="!disabled && articleList.length !== 0"
        background
        layout="prev, pager, next"
        :total="totalCount"
        :page-size="pageObj.pageSize"
        :current-page="pageObj.pageNo"
        @current-change="handleChange"
        @prev-click="handleChange"
        @next-click="handleChange"
      >
      </el-pagination>
      <div
        v-if="articleList.length === 0"
        class="no-result">
        <i class="el-icon-document"></i>
        <span>暂无搜索结果~</span>
      </div>
    </main>
  </div>
</template>

<script>
import BlogHeader from '../components/BlogHeader'
import moment from 'moment'
export default {
  name: 'Index',
  components: {
    BlogHeader
  },
  data: function() {
    return {
      articleList: [],
      pageObj: {
        pageNo: 1,
        pageSize: 5
      },
      totalCount: 0,
      keyWord: '',
      loadingInstance: null,
      loadingTarget: null,
      disabled: true,
      articleUrl: 'http://localhost:8080/articleDetail?id='
    }
  },
  mounted () {
    this.loadingTarget = document.getElementById('loadingTarget')
    this.getArticle()
  },
  methods: {
    getArticle () {
      this.loadingInstance = this.$loading({
        target: this.loadingTarget,
        text: '加载中...'
      })
      this.disabled = true
      this.axios.post("http://120.79.115.240:5000/articles", this.pageObj).then((res) => {
        if (res.data.success) {
          this.articleList = res.data.data.list
          this.totalCount = res.data.data.totalCount
          this.articleList.forEach(item => {
            item.created_at = moment(item.created_at).format('YYYY-MM-DD')
          })
        this.disabled = false
        } else {
          this.$message.error('获取文章列表失败！')
        }
      }).catch(err => {
        if (err) {
          this.$message.error('服务器异常')
        }
      }).finally(() => {
        this.loadingInstance.close()
      })
    },
    handleChange (curPage) {
      this.pageObj.pageNo = curPage
      this.getArticle()
    },
    handleArticleSearch (data) {
      this.articleList = data.list
      this.totalCount = data.totalCount
    }
  },
};
</script>

<style lang="scss" scoped>
ul {
  list-style-type: none;
  padding: 0;
  margin: 0;
}
.index {
  background-color: #F3F3F3;
  padding-bottom: 20px;
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
  main {
    // height: 500px;
    background-color: white;
    margin-top: 20px !important;
    padding-bottom: 20px;
    min-height: 85vh;

    ul.tabList {
      padding-left: 32px;
      overflow: hidden;
      border-bottom: 1px solid #f6f6f6;
      li {
        float: left;
        height: 62px;
        line-height: 62px;
        margin-right: 45px;
        color: #C1C1C1;
        cursor: pointer;
        font-size: 18px;
      }
    }

    ul.articleList {
      box-sizing: border-box;
      width: 1311px;
      li {
        a {
          display: block;
          text-decoration: none;
          color: black;
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-bottom: 1px solid #F6F6F6;
          padding: 29px 54px 21px 33px;
          text-align: left;
          cursor: pointer;
        }
        .art-info {
          height: 106px;
          .tip {
            font-size: 18px;
            color: #D4D4D4;
            max-width: 1100px;
            text-overflow: ellipsis;
            overflow: hidden;
            white-space: nowrap;
            margin-bottom: 10px;
          }
          .title {
            font-size: 26px;
            font-weight: 600;
            max-width: 1100px;
            text-overflow: ellipsis;
            overflow: hidden;
            white-space: nowrap;
          }
        }
        .art-img {
          width: 100px;
          height: 106px;
          img {
            width: 100%;
          }
        }
      }
    }

    .el-pagination {
      display: flex;
      justify-content: center;
      margin-top: 20px;
    }

    .no-result {
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;

      i {
        margin-right: 10px;
      }
    }
  }
}
</style>