<template>
  <div class="outside">
    <div class="page">
      <div class="flex-container">
        <el-row v-for="(order, index) in pager.currentPageElements" :key="index">
          <el-col>
            <order-info-card
              :order="order"
              style="display: flex; min-width: 500px; max-width: 600px;margin: 10px;"
            >
              <span
                v-if="order.status === 0"
                style="flex-grow: 1;display: flex;justify-content: flex-end;"
              >
                <el-button size="mini" type="warning" @click="confirmCancel(order)">取消订单</el-button>
              </span>
            </order-info-card>
          </el-col>
        </el-row>
      </div>
      <el-row>
        <el-col>
          <el-pagination
            :page-size="pager.pageSize"
            :current-page.sync="pager.currentPage"
            :total="pager.totalCount"
          ></el-pagination>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import OrderInfoCard from "../../components/order/OrderInfoCard.vue";
import { OrderPager } from "../../util/pager";
import { Order } from '../../model/entity/order';
import noop from '../../util/no-operation';

@Component({
  components: {
    OrderInfoCard
  }
})
class OrderRoom extends Vue {
  public pager!: OrderPager;

  constructor() {
    super();
  }

  public created() {
    this.pager = new OrderPager(8);
    console.log('order room created!')
  }

  public confirmCancel(order: Order) {
    this.$confirm("确认删除订单吗?").then(v => {
      // todo cancel order
    }).catch(noop)
  }
}

export { OrderRoom };
export default OrderRoom;
</script>

<style>
.flex-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}
</style>
