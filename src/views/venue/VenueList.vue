<template>
  <div class="outside">
    <div class="page">
      <div class="venue-list">
        <el-row v-for="(venue,index) in pager.currentPageElements" :key="index">
          <el-col>
            <VenueCard :venue="venue" style="margin: 10px 0" :detailed="true"></VenueCard>
          </el-col>
        </el-row>
      </div>
      <el-pagination
        layout="prev, pager, next, jumper"
        :current-page.sync="pager.currentPage"
        :page-size="pager.pageSize"
        :total="pager.totalCount"
        @current-change="changePage"
      ></el-pagination>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Pager, SearchVenuePager, AllVenuePager } from "../../util/pager";
import { Venue } from "../../model/entity/venue";
import { Prop, Component } from "vue-property-decorator";
import { VenueBean } from "../../model/bean/venue-bean";
import { VenueCard } from "../../components/venue/VenueCard.vue";

@Component({
  components: {
    VenueCard: VenueCard
  }
})
class VenueList extends Vue {
  @Prop({
    required: false
  })
  public keyword?: string;

  public pager!: Pager<VenueBean>;

  constructor() {
    super();
    if (this.keyword) {
      this.pager = new SearchVenuePager(5);
      if (this.pager instanceof SearchVenuePager) {
        this.pager.keyword = this.keyword;
      }
    } else {
      this.pager = new AllVenuePager(5);
    }
    console.log("NOOOOOOOOOO")
    this.pager.onPageChange()
  }

  public created() {
    this.changePage();    
  }

  public changePage() {
    this.pager
      .onPageChange()
      .then(() => {})
      .catch(() => {});
  }

  public mounted() {
    this.changePage();
  }
}

export { VenueList };
export default VenueList;
</script>

<style scoped>
.venue-list {
  padding: 5%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  width: 1440px;
}
</style>