<template>
  <div>
      <venue-ranking></venue-ranking>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import VenueRanking from '../../components/statistics/VenuesRanking.vue'

@Component({
    components: {
        VenueRanking
    }
})
export default class StatisticsVue extends Vue {
    constructor() {
        super()
    }
}
</script>

<style>

</style>