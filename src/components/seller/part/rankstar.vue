<template>
  <ul class="rank-star" :class="type">
    <li v-for="(item, index) of Array.apply(null, {length: 5})"
        :class="{full: score>=(index+1), off: score<=index}"
    ></li>
  </ul>
</template>

<script type="text/ecmascript-6">
export default {
  props: ['type','score']
}
</script>

<style scoped>
.rank-star {
  display: inline-block;
  height: 48px;
  list-style: none;
  text-align: center;
  margin-bottom: 56px;
}
  .rank-star>li {
    display: inline-block;
    width: 48px;
    height: 48px;
    background: url(../../../assets/images/icons/star48_half@3x.png) no-repeat;
    background-size: 100%;
  }
  .rank-star>li+li { margin-left: 35px;}
  .rank-star>li.full {
    background: url(../../../assets/images/icons/star48_on@3x.png) no-repeat;
    background-size: 100%;
  }
  .rank-star>li.off {
    background: url(../../../assets/images/icons/star48_off@3x.png) no-repeat;
    background-size: 100%;
  }

  .rank-star.small { 
    margin-bottom: 0;
    height: 36px;
    vertical-align: middle;
  }
  .rank-star.small>li {
    width: 36px;
    height: 36px;
    background-size: 100%;
  }
  .rank-star.small>li+li { margin-left: 10px;}

  .rank-star.vsmall { 
    margin-bottom: 0;
    height: 24px;
    vertical-align: middle;
  }
  .rank-star.vsmall>li {
    width: 24px;
    height: 24px;
    background-size: 100%;
  }
  .rank-star.vsmall>li+li { margin-left: 7px;}
</style>
