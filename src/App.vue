/* eslint-disable max-len */
<!--
 * @Description: This is a description
 * @Author: Ask
 * @LastEditors: Ask
 * @Date: 2019-09-21 15:11:06
 * @LastEditTime: 2019-09-29 22:13:28
 -->
<template>
  <div id="app">
    app
    <button
      v-for="(item,$key) in data"
      @click="start(item.start,item.duration)"
      :key="$key"
    >{{'start'+item.key}}</button>
  </div>
</template>

<script>
import { music } from './music';

console.log(music);
export default {
  data() {
    return {
      audioPlay: {
        1: 0,
        2: 4.524,
        3: 15.414,
        4: 25.538,
        5: 44.741,
        6: 56.397,
        7: 69.354,
        8: 78.921,
        9: 96.429,
        10: 109.571,
        11: 123.999,
      },
      data: [],
    };
  },
  mounted() {
    this.dealData();
  },
  methods: {
    dealData() {
      const data = [];
      for (const key in this.audioPlay) {
        data.push({
          key,
          start: this.audioPlay[key],
          duration: this.audioPlay[key * 1 + 1]
            ? this.audioPlay[key * 1 + 1] - this.audioPlay[key]
            : '',
        });
      }
      this.data = data;
    },
    start(a, b) {
      console.log(a, b);
      music.start(a, b);
    },
  },
};
</script>
<style lang="scss">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
