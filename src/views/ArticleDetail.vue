<template>
  <div class="article-detail">
    <blog-Header></blog-Header>
    <main id="loadingTarget" class="center">
      <div v-if="article.creator" class="author-info">
        <div class="info-left">
          <img :src="article.creator.avatar_url" alt="" />
        </div>
        <div class="info-right">
          <div class="name">{{ article.creator.name }}</div>
          <div class="other">
            <span class="time">{{ article.created_at }}</span>
            <span>阅读量：{{ article.hits }}</span>
          </div>
        </div>
      </div>
      <h1
        style="
           {
            textalign: 'center';
          }
        "
      >
        {{ article.title }}
      </h1>
      <div class="content134" v-html="article.body_html"></div>
    </main>
  </div>
</template>

<script>
import BlogHeader from "../components/BlogHeader";
import moment from "moment";
export default {
  name: "ArticleDetail",
  components: {
    BlogHeader,
  },
  data: function () {
    return {
      article: {},
      loadingInstance: null,
      loadingTarget: null,
    };
  },
  mounted() {
    this.loadingTarget = document.getElementById("loadingTarget");
    this.getDetail();
  },
  methods: {
    getDetail() {
      this.loadingInstance = this.$loading({
        target: this.loadingTarget,
        text: "加载中...",
      });
      this.axios
        .get(
          "http://120.79.115.240:5000/articles/article?id=" +
            this.$route.query.id
        )
        .then((res) => {
          if (res.data.success) {
            this.article = res.data.data;
            this.article.created_at = moment(this.article.created_at).format(
              "YYYY年MM月DD日"
            );
          } else {
            this.$message.error("获取文章列表失败！");
          }
        })
        .catch((err) => {
          if (err) {
            this.$message.error("服务器异常");
          }
        })
        .finally(() => {
          this.loadingInstance.close();
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.article-detail {
  background-color: #f3f3f3;
  padding-bottom: 20px;

  .center {
    width: 1311px;
    margin: 0 auto;
  }

  main {
    background-color: white;
    margin-top: 20px !important;
    min-height: 85vh;

    .author-info {
      padding: 31px 0 0 34px;
      overflow: hidden;
      .info-left {
        float: left;
        width: 58px;
        height: 58px;
        margin-right: 15px;
        cursor: pointer;
        img {
          width: 100%;
          border-radius: 50%;
        }
      }
      .info-right {
        float: left;
        height: 58px;
        display: flex;
        flex-flow: column;
        justify-content: space-between;
        .name {
          font-size: 22px;
          font-weight: 400;
          text-align: left;
        }
        .other {
          .time {
            margin-right: 15px;
          }
        }
      }
    }

    .content {
      // width: 100%;
      display: flex;
      justify-content: center;
    }
  }
}
</style>