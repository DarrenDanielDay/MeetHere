<template>
  <div :style="box">
    <el-card shadow="hover">
      <el-row>
        <el-col :span="12">
          <el-image style="height: 160px;" :src="site.image"></el-image>
        </el-col>
        <el-col :span="12">
          <table>
            <tr>
              <th class="info-th" v-if="detailed">场地名称</th>
              <td class="info-td">
                <i class="el-icon-location ic"></i>
                <span>{{site.name}}</span>
              </td>
            </tr>
            <tr v-if="detailed">
              <th class="info-th" v-if="detailed">预约价格</th>
              <td class="info-td">{{site.price+'$'}}</td>
            </tr>
            <tr>
              <th class="info-th" v-if="detailed">场地简介</th>
              <td class="info-td">{{site.introduction}}</td>
            </tr>
            <tr>
              <th class="info-th" v-if="detailed"></th>
              <td class="info-td">
                <slot></slot>
              </td>
            </tr>
            <tr v-if="!detailed">
              <el-button @click="toMakeOrder">预约</el-button>
            </tr>
          </table>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
import { Site } from "../../model/entity/site";
import router from "@/router";

@Component({})
class SiteCard extends Vue {
  @Prop({
    type: Site,
    required: true
  })
  public site!: Site;

  @Prop({
    type: Boolean,
    default: true
  })
  public detailed!: boolean;

  get box() {
    if (!this.detailed) {
      return {
        "min-width": "300px",
        "max-width": "500px"
      };
    } else {
      return {
        "min-width": "300px"
      };
    }
  }

  constructor() {
    super();
  }

  public toMakeOrder() {
    router.push({
      name: "make-order",
      params: {
        site_id: this.site.id.toString()
      }
    });
  }
}

export default SiteCard;
export { SiteCard };
</script>

<style  scoped>
.info-td {
  padding: 5px 20px;
  text-align: right;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  display: block;
}
.info-th {
  padding: 5px 20px;
  text-align: right;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}
.ic {
  color: cornflowerblue;
}
</style>