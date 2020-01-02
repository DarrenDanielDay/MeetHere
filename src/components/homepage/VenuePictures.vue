<template>
  <div>
    <el-carousel indicator-position="outside" height="600px">
      <el-carousel-item v-for="i in imgs.length" :key="i" style="display:flex;">
        <div style="display:flex;">
          <el-image :src="imgs[i-1]" fit="scale-down"></el-image>
        </div>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';
import { defaultImages } from '../../util/images';

@Component({})
class VenuePicture extends Vue {
    @Prop({
        type: Array,
        default() {
            return defaultImages
        }
    })
    public imgs!: string[];

    constructor() {
        super()
    }
}

export { VenuePicture };
export default VenuePicture;

</script>