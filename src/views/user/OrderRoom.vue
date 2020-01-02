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
                <el-button size="mini" type="warning">取消订单</el-button>
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
