<template>
  <div class="tabs">
    <el-tag size="small" v-for="(tag, index) in tags" :key="tag.name" :closable="tag.name !== 'home'" :effect="$route.name === tag.name ? 'dark' : 'plain'" @click="changeMenu(tag)" @close="handelClose(tag, index)">{{ tag.label }}</el-tag>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
export default {
  name: 'CommonTag',
  methods: {
    ...mapMutations({
      close: 'closeTag'
    }),
    changeMenu(tag) {
      this.$router.push({ name: tag.name })
    },
    handelClose(tag, i) {
      const length = this.tags.length - 1
      this.close(tag)
      if (tag.name !== this.$route.name) {
        return
      }
      if (i === this.tags.length) {
        this.$router.push({ name: this.tags[length - 1].name })
      } else {
        this.$router.push({
          name: this.tags[i].name
        })
      }
    }
  },
  computed: {
    ...mapState({
      tags: (state) => state.tab.tabsList
    })
  }
}
</script>

<style lang="less" scoped>
.tabs {
  padding: 20px;
  .el-tag {
    margin-right: 15px;
    cursor: pointer;
  }
}
</style>
