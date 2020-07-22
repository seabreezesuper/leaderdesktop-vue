<template>
  <div class="lang">
    <el-dropdown>
      <el-button type="primary" plain>
        {{langtitlevalue}}
        <i class="el-icon-arrow-down el-icon--right"></i>
      </el-button>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item @click.native="changeLanguage('zh')">简体中文</el-dropdown-item>
        <el-dropdown-item @click.native="changeLanguage('en')">English</el-dropdown-item>
        <el-dropdown-item @click.native="changeLanguage('ja')">日本語</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script>
export default {
  //   name: "esl-language",
  data() {
    return {
      langtitlevalue:''
    };
  },
  methods: {
    changeLanguage(type) {
      this.$i18n.locale = type;
      if (type === "zh") {
        this.langtitlevalue = "简体中文";
      } else if (type === "en") {
        this.langtitlevalue = "English";
      } else if (type === "ja") {
        this.langtitlevalue = "日本語";
      }
      
      window.localStorage.setItem("language", type);
    }
  },
  mounted() {
    this.$i18n.locale = window.localStorage.getItem("language") === null ? "zh" : window.localStorage.getItem("language");
    this.changeLanguage(this.$i18n.locale);
  }
};
</script>

// <!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
* {
  font-size: 16px;
  text-align: left;
}
.el-dropdown {
  vertical-align: top;
}
.el-dropdown + .el-dropdown {
  margin-left: 15px;
}
.el-icon-arrow-down {
  font-size: 12px;
}
</style>
