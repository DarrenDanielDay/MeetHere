<template>
  <div>
    <div class="venue-list">
      <venue-card
        v-for="(venue,index) in pager.currentPageElements"
        :venue="venue"
        :key="index"
        style="margin: 10px 0"
      >
        <el-button circle icon="el-icon-edit" type="info" @click="showEditor(venue)"></el-button>
        <el-button circle icon="el-icon-delete" type="danger" @click="confirmDelete(venue)"></el-button>
      </venue-card>
    </div>
    <el-pagination
      layout="prev, pager, next, total"
      :current-page.sync="pager.currentPage"
      :size="pager.pageSize"
      :total="pager.totalCount"
    ></el-pagination>
    <venue-editor ref="venue-editor" @checked="handleSubmit"></venue-editor>
    <confirm
      id="delete-venue-confirm"
      ref="delete-venue-confirm"
      title="确认删除场馆"
      message="确认删除该场馆吗？该操作不可逆！"
      confirmStyle="danger"
      cancelStyle="info"
    ></confirm>
    <el-popover trigger="hover" content="创建场馆" placement="left">
      <el-button
        slot="reference"
        icon="el-icon-plus"
        type="info"
        @click="showEditor(editorData.emptyVenue)"
      ></el-button>
    </el-popover>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component';
import VenueCard from '@/components/venue/VenueCard.vue';
import { VenuePager } from '../../util/pager';
import { VenueBean } from '../../model/bean/venue-bean';
import VenueEditor from '../../components/admin/VenueEditor.vue';
import { Venue } from '@/model/entity/venue';
import Confirm from '../../components/common/Confirm.vue';
import noop from '../../util/no-operation';


@Component({
    components: {
        VenueCard: VenueCard,
        VenueEditor: VenueEditor
    }
})
class VenueRoom extends Vue {

    private pager: VenuePager = new VenuePager(8);

    constructor() {
        super();
    }

    public showEditor(venue: Venue) {
        const editor = this.$refs["venue-editor"];
        if (editor instanceof VenueEditor) {
            editor.show(venue);
        }
    }

    public handleSubmit(venue: Venue) {
        // todo submit edit/create venue
    }

    public confirmDelete(venue: Venue) {
        const confirm = this.$refs["delete-venue-confirm"];
        if (confirm instanceof Confirm) {
            confirm.show().then(() => {
                this.handleDelete(venue);
            }).catch(noop);
        }
    }

    public handleDelete(venue: Venue) {
        // todo delete venue
    }
}

export { VenueRoom };
export default VenueRoom;

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