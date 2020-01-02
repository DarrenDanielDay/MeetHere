<template>
  <div>
      News
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { Prop } from 'vue-property-decorator'
import { News } from '../../model/entity/news'

@Component({})
class NewsList extends Vue {
    @Prop({})
    public newses!: News[];
    
    constructor() {
        super()
    }
}

export { NewsList }
export default NewsList;

</script>

<style>

</style>