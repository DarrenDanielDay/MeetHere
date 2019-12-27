<template>
  <div>
    <div class="flex-container">
      <order-card
        v-for="(order, index) in pager.currentPageElements"
        :key="index"
        :order="order"
        style="display: flex; min-width: 500px; max-width: 600px;margin: 10px;"
      >
        <span style="flex-grow: 1;display: flex;justify-content: flex-end;">
          <el-button @click="confirmReject(order)" size="mini" type="warning">拒绝订单</el-button>
        </span>
      </order-card>
    </div>
    <confirm
      id="order-reject-confirm"
      title="确认拒绝"
      message="确认拒绝该订单吗？该操作不可逆！"
      confirmStyle="danger"
      ref="reject-confirm"
    ></confirm>
    <el-pagination
      :current-page.sync="pager.currentPage"
      :page-size="pager.pageSize"
      :total="pager.totalCount"
    ></el-pagination>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { OrderPager } from '../../util/pager';
import Component from 'vue-class-component';
import OrderInfoCard from '../../components/order/OrderInfoCard.vue';
import { Order } from '../../model/entity/order';
import Confirm from '../../components/common/Confirm.vue';
import { noop } from 'vue-class-component/lib/util';

@Component({
  components: {
    OrderCard: OrderInfoCard
  }
})
class OrderRoom extends Vue {
    public pager: OrderPager = new OrderPager(8);
    constructor() {
        super();
    }
    public confirmReject(order: Order) {
      const confirm = this.$refs["reject-order-confirm"];
      if (confirm instanceof Confirm) {
        confirm.show().then(() => {
          this.handleReject(order);
        }).catch(noop);
      }
    }

    public handleReject(order: Order) {
      // todo handle reject 
      this.$message({
        message: "取消成功！",
        type: "success"
      })
    }
}

export { OrderRoom };
export default OrderRoom;

</script>

<style scoped>
.flex-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}
</style>