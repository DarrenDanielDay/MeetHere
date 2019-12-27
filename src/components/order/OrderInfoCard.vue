<template>
  <div :style="status">
    <el-card shadow="hover" :body-style="{background: '#ffffff'}" :style="status">
      <div slot="header" style="display: flex;align-items: center;">
        <span>
          <span>订单</span>
          <span class="id">#{{order.id}}</span>
        </span>
        <slot></slot>
      </div>
      <el-row>
        <el-col :span="6">
          <el-image :src="order.site.image"></el-image>
        </el-col>
        <el-col :span="18">
          <el-row v-for="(value, attr, index) in info" :key="index">
            <el-col :span="6" class="left">{{attr}}</el-col>
            <el-col :span="18" class="left">{{value}}</el-col>
          </el-row>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Prop } from "vue-property-decorator";
import { Order } from "../../model/entity/order";
import { OrderStatusEnum } from "../../model/bean/order-bean";


const statuses: { [k in OrderStatusEnum]: string } = {
  0: "background: #ccffcc",
  1: "background: #cccccc",
  2: "background: #cccccc",
  3: "background: #ffcccc"
};

@Component({})
class OrderInfoCard extends Vue {
  @Prop({
    type: Order,
    default() {
      return Order._default();
    }
  })
  private order!: Order;

  private info = {
    场地名称: this.order.site.name,
    开始时间: this.order.startTime,
    结束时间: this.order.endTime
  };

  public get status() {
    return statuses[this.order.status];
  }

  constructor() {
    super();
  }
}

export { OrderInfoCard };
export default OrderInfoCard;

</script>

<style scoped>
.id {
  color: dodgerblue;
}
.left {
  display: flex;
  align-self: flex-start;
  padding: 0 0 0 20px;
}
.right {
  display: flex;
  align-self: flex-end;
}
.el-card__header {
  padding: 0;
  color: red;
}
span {
  font-size: 20px;
}
</style>