<template>
  <div>
    <el-row :gutter="24">
      <el-col :span="8" style="margin-top: 20px">
        <el-card shadow="hover">
          <div class="user">
            <img :src="userImg" alt="" />
            <div class="userinfo">
              <p class="name">Admin</p>
              <p class="access">超级管理员</p>
            </div>
          </div>
          <div class="login-info">
            <p>上次登录时间: <span>2022-8-19</span></p>
            <p>上次登录地点: <span>广东</span></p>
          </div>
        </el-card>
        <el-card style="margin-top: 20px; height: 300px">
          <el-table :data="tableData">
            <el-table-column v-for="(item, index) in tableLabel" :key="index" :prop="index" :label="item"></el-table-column>
          </el-table>
        </el-card>
      </el-col>
      <el-col :span="16">
        <div class="num">
          <el-card v-for="item in countData" :key="item.name" :body-style="{ display: 'flex', padding: 0 }">
            <i class="icon" :class="`el-icon-${item.icon}`" :style="{ background: item.color }"></i>
            <div class="detail">
              <p class="num">¥{{ item.value }}</p>
              <p class="txt">{{ item.name }}</p>
            </div>
          </el-card>
        </div>
        <el-card style="height: 240px; margin-top: 20px" class="echarts1"> </el-card>
        <div class="graph">
          <el-card style="height: 200px" class="echarts2"></el-card>
          <el-card style="height: 200px" class="echarts3"></el-card>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { getData } from '@/api/data.js'
import * as echarts from 'echarts'
export default {
  name: 'index',
  data() {
    return {
      userImg: require('@/assets/xiao.jpg'),
      tableData: [
        {
          name: 'oppo',
          todayBuy: 100,
          monthBuy: 300,
          totalBuy: 800
        },
        {
          name: 'vivo',
          todayBuy: 100,
          monthBuy: 300,
          totalBuy: 800
        },
        {
          name: '苹果',
          todayBuy: 100,
          monthBuy: 300,
          totalBuy: 800
        },
        {
          name: '小米',
          todayBuy: 100,
          monthBuy: 300,
          totalBuy: 800
        },
        {
          name: '三星',
          todayBuy: 100,
          monthBuy: 300,
          totalBuy: 800
        },
        {
          name: '魅族',
          todayBuy: 100,
          monthBuy: 300,
          totalBuy: 800
        }
      ],
      tableLabel: {
        name: '机型',
        todayBuy: '今日购买',
        monthBuy: '本月购买',
        totalBuy: '总购买'
      },
      countData: [
        {
          name: '今日支付订单',
          value: 1234,
          icon: 'success',
          color: '#2ec7c9'
        },
        {
          name: '今日收藏订单',
          value: 210,
          icon: 'star-on',
          color: '#ffb980'
        },
        {
          name: '今日未支付订单',
          value: 1234,
          icon: 's-goods',
          color: '#5ab1ef'
        },
        {
          name: '本月支付订单',
          value: 1234,
          icon: 'success',
          color: '#2ec7c9'
        },
        {
          name: '本月收藏订单',
          value: 210,
          icon: 'star-on',
          color: '#ffb980'
        },
        {
          name: '本月未支付订单',
          value: 1234,
          icon: 's-goods',
          color: '#5ab1ef'
        }
      ]
    }
  },
  mounted() {
    getData().then((res) => {
      const { code, data } = res.data
      if (code === 20000) {
        this.tableData = data.tableData
        const order = data.orderData
        const xData = order.date
        const keyArray = Object.keys(order.data[0])
        const series = []
        keyArray.forEach((key) => {
          series.push({
            name: key,
            data: order.data.map((item) => item[key]),
            type: 'line'
          })
        })
        const option = {
          xAxis: {
            data: xData
          },
          yAxis: {},
          legend: {
            data: keyArray
          },
          series
        }

        const E = echarts.init(document.querySelector('.echarts1'))
        E.setOption(option)

        const userOption = {
          legend: {
            // 图例文字颜色
            textStyle: {
              color: '#333'
            }
          },
          grid: {
            left: '20%'
          },
          // 提示框
          tooltip: {
            trigger: 'axis'
          },
          xAxis: {
            type: 'category', // 类目轴
            data: data.userData.map((item) => item.date),
            axisLine: {
              lineStyle: {
                color: '#17b3a3'
              }
            },
            axisLabel: {
              interval: 0,
              color: '#333'
            }
          },
          yAxis: [
            {
              type: 'value',
              axisLine: {
                lineStyle: {
                  color: '#17b3a3'
                }
              }
            }
          ],
          color: ['#2ec7c9', '#b6a2de'],
          series: [
            {
              name: '新增用户',
              data: data.userData.map((item) => item.new),
              type: 'bar'
            },
            {
              name: '活跃用户',
              data: data.userData.map((item) => item.active),
              type: 'bar'
            }
          ]
        }
        const U = echarts.init(document.querySelector('.echarts2'))
        U.setOption(userOption)
        const videoOption = {
          tooltip: {
            trigger: 'item'
          },
          color: ['#0f78f4', '#dd536b', '#9462e5', '#a6a6a6', '#e1bb22', '#39c362', '#3ed1cf'],
          series: [
            {
              data: data.videoData,
              type: 'pie'
            }
          ]
        }
        const P = echarts.init(document.querySelector('.echarts3'))
        P.setOption(videoOption)
      }
    })
  }
}
</script>

<style lang="less" scoped>
div {
  max-width: 1400px;
}
.user {
  display: flex;
  padding-bottom: 20px;
  border-bottom: 1px solid #ccc;
  img {
    height: 40%;
    width: 40%;
    margin-right: 20px;
  }
  .name {
    font-size: 40px;
    height: 20px;
  }
}
.num {
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  .el-card {
    width: 250px;
    height: 60px;
    margin-top: 20px;
  }
  .detail {
    margin-left: 20px;
    p:nth-child(1) {
      font-size: 18px;
      line-height: 6px;
    }
    p:nth-child(2) {
      font-size: 1px;
      line-height: 7px;
    }
  }
  .icon {
    height: 60px;
    width: 70px;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 40px;
    color: #fff;
  }
}
.graph {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
  .el-card {
    width: 400px;
  }
}
</style>
