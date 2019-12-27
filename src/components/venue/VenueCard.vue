<template>
  <div class="venue-card">
    <el-card shadow="hover">
      <el-row>
        <el-col :span="24">
          <el-row>
            <el-col>
              <!-- <img :src="venue.cover" /> -->
              <el-image fit="scale-down" :src="venue.cover" style="height: 200px;width: 100%"></el-image>
            </el-col>
          </el-row>
          <el-row>
            <el-col>
              <table>
                <tr>
                  <th>场馆名称</th>
                  <td class="ellipsis" :title="venue.introduction">{{venue.name}}</td>
                </tr>
                <tr>
                  <th>场馆地址</th>
                  <td class="ellipsis" :title="venue.address">{{venue.address}}</td>
                </tr>
                <tr>
                  <th>场馆简介</th>
                  <td class="ellipsis" :title="venue.introduction">{{venue.introduction}}</td>
                </tr>
              </table>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
      <div style="display: flex; flex-direction:row-reverse;justify-content:space-between;">
        <slot></slot>
        <el-button @click.stop="toDetail">详情</el-button>
      </div>
    </el-card>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Prop } from 'vue-property-decorator'
import { Venue } from '../../model/entity/venue'
import router from '@/router';

@Component({})
class VenueCard extends Vue {

    @Prop({
        type: Venue,
        required: true
    })
    public venue!: Venue;

    constructor() {
        super()
    }

    public toDetail() {
        router.push({
        name: 'venue-detail',
        params: {
          venue_id: this.venue.id.toString()
        }
      })
    }

}

export default VenueCard;
export { VenueCard }
</script>

<style scoped>
th {
  text-align: right;
}
td {
  text-align: left;
}
td {
  width: 200px;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  display: block;
}
.venue-card {
  text-align: left;
  /* min-width: 200px;
  max-width: 350px; */
  width: 350px;
}
</style>