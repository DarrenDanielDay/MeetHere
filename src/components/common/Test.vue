<template>
  <div>{{testValue}}</div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Prop, Component } from 'vue-property-decorator'

@Component({})
class Test extends Vue {
    @Prop({
        type: Boolean,
        default: true
    })
    private testValue!: boolean;
}

export default Test;
export { Test };

</script>

<style>

</style>