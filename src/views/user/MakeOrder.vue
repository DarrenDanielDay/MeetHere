<template>
  <div style="padding: 0 5%">
    <make-order-card :pickedSite="site"></make-order-card>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import MakeOrderCard from "../../components/order/MakeOrderCard.vue";
import { Prop } from "vue-property-decorator";
import { Site } from "../../model/entity/site";

@Component({
  components: {
    MakeOrderCard
  }
})
class MakeOrder extends Vue {
  @Prop({
    required: true,
  })
  public siteID!: number;

  public site!: Site;

  constructor() {
    super();
    this.site = Site.fromID(this.siteID)
  }
}

export { MakeOrder };
export default MakeOrder;
</script>