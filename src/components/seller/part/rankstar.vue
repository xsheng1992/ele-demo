<template>
  <ul class="rank-star" :class="type">
    <li v-for="(item, index) of Array.apply(null, {length: 5})"
        :class="{full: seller.score>=(index+1), off: seller.score<=index}"
    ></li>
  </ul>
</template>

<script type="text/ecmascript-6">
import {mapGetters} from 'vuex'
import * as types from '../../../store/mutation-types'

export default {
  props: ['type'],
  computed: {
    ...mapGetters({
      seller: 'getSellerInfo',
      detailPage: 'getSellerInfoState'
    })
  },
  methods: {
    hideDetail() {
      this.$store.commit(types.HIDE_FDETAIL);
    }
  }
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
  .rank-star.small>li+li { margin-left: 12px;}
</style>
