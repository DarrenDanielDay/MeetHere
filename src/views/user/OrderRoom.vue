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
            layout="prev, pager, next, jumper"
            :page-size="pager.pageSize"
            :current-page.sync="pager.currentPage"
            :total="pager.totalCount"
            @current-change="onPageChange"
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
import { OrderPager, UserOrderPager } from "../../util/pager";
import { Order } from '../../model/entity/order';
import noop from '../../util/no-operation';
import { userverification } from '../../store/user-verification';
import backend from '../../logic/backend';

@Component({
  components: {
    OrderInfoCard
  }
})
class OrderRoom extends Vue {
  public pager: OrderPager;

  constructor() {
    super();
    this.pager = new UserOrderPager(8, userverification.getCurrentUser());
    this.pager.onPageChange()
  }

  public onPageChange() {
    this.pager.onPageChange().then(noop).catch(noop)
  }

  public created() {
    console.log('order room created!')
  }

  public confirmCancel(order: Order) {
    this.$confirm("确认删除订单吗?").then(v => {
      backend.post("/cancel", {
        userId: userverification.getCurrentUser().id,
        reservationId: order.id
      }).then(rs => {
        if (rs.data.code === 200) {
          this.$message({
            message: "取消成功",
            type: "success"
          })
        } else {
          throw new Error(rs.data.message)
        }
      }).catch(e => {
        this.$message({
          message: e,
          type: "error"
        })
      })
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
