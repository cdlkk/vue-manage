<template>
  <div class="header-container">
    <div class="i-content">
      <el-button plain icon="el-icon-menu" size="mini" @click="handelMenu"></el-button>
      <h3 style="color: #fff">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item v-for="item in tags" :key="item.path" :to="{ path: item.path }">{{ item.label }}</el-breadcrumb-item>
        </el-breadcrumb>
      </h3>
    </div>
    <div class="f-content">
      <el-dropdown trigger="click" szie="mini">
        <span>
          <img :src="userImg" class="user" />
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>个人中心</el-dropdown-item>
          <el-dropdown-item @click.native="logOut">退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import eventBus from '@/eventBus/eventBus.js'
import { mapState } from 'vuex'
export default {
  data() {
    return {
      userImg: require('@/assets/xiao.jpg')
      // isCollapse: false
    }
  },
  methods: {
    handelMenu() {
      // console.log(this.$route)
      // this.isCollapse = !this.isCollapse
      // eventBus.$emit('bol', this.isCollapse)
      this.$store.commit('collapseMenu')
    },
    logOut() {
      this.$store.commit('clearToken')
      this.$store.commit('clearMenu')
      this.$router.push('/login')
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
.header-container {
  display: flex;
  height: 100%;
  justify-content: space-between;
  align-items: center;
  .i-content {
    h3 {
      /deep/ span {
        color: white;
        font-weight: 100;
      }
    }
  }
}

.i-content {
  display: flex;
  align-items: center;
  .el-button {
    margin-left: 20px;
    margin-right: 20px;
  }
}
.f-content {
  .user {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    margin-right: 20px;
  }
}
</style>
