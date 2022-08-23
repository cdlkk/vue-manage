<template>
  <el-menu default-active="1-4-1" class="el-menu-vertical-demo" text-color="#fff" active-text-color="#ffd04b" background-color="#545c64" @open="handleOpen" @close="handleClose" :collapse="isCollapse">
    <h3>{{ isCollapse ? '后台' : '后台管理系统' }}</h3>
    <el-menu-item @click="clickMenu(item)" v-for="(item, i) in noChildren" :key="i" :index="item.path + ''">
      <i :class="'el-icon-' + item.icon"></i>
      <span slot="title">{{ item.label }}</span>
    </el-menu-item>
    <el-submenu v-for="item in hasChildren" :key="item.path" :index="item.path + ''">
      <template slot="title">
        <i :class="'el-icon-' + item.icon"></i>
        <span slot="title">{{ item.label }}</span>
      </template>
      <el-menu-item-group v-for="p in item.children" :key="p.path">
        <el-menu-item :index="p.path" @click="clickMenu(p)">{{ p.label }}</el-menu-item>
      </el-menu-item-group>
    </el-submenu>
  </el-menu>
</template>

<script>
import eventBus from '@/eventBus/eventBus.js'
export default {
  data() {
    return {
      // isCollapse: false,
      menu: [
        // {
        //   path: '/',
        //   name: 'home',
        //   label: '首页',
        //   icon: 's-home',
        //   url: 'Home/Home'
        // },
        // {
        //   path: '/mall',
        //   name: 'mall',
        //   label: '商品管理',
        //   icon: 'video-play',
        //   url: 'MallManage/MallManage'
        // },
        // {
        //   path: '/users',
        //   name: 'users',
        //   label: '用户管理',
        //   icon: 'user',
        //   url: 'UserManage/UserManage'
        // },
        // {
        //   label: '其他',
        //   icon: 'location',
        //   children: [
        //     {
        //       path: '/page1',
        //       name: 'page1',
        //       label: '页面1',
        //       icon: 'setting',
        //       url: 'Other/PageOne'
        //     },
        //     {
        //       path: '/page2',
        //       name: 'page2',
        //       label: '页面2',
        //       icon: 'setting',
        //       url: 'Other/PageTwo'
        //     }
        //   ]
        // }
      ]
    }
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath)
    },
    clickMenu(item) {
      this.$router.push({
        name: item.name
      })
      this.$store.commit('selectMenu', item)
    }
  },
  computed: {
    noChildren() {
      return this.asyncMenu.filter((item) => !item.children)
    },
    hasChildren() {
      return this.asyncMenu.filter((item) => item.children)
    },
    isCollapse() {
      return this.$store.state.tab.isCollapse
    },
    asyncMenu() {
      return this.$store.state.tab.menu
    }
  },
  mounted() {
    // eventBus.$on('bol', (val) => {
    //   this.isCollapse = val
    // })
    console.log(this.$store)
  }
}
</script>

<style lang="less" scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
.el-menu {
  height: 100vh;
  border: none;
  h3 {
    color: #fff;
    text-align: center;
    line-height: 48px;
  }
}
</style>
