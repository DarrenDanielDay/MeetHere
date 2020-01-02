<template>
  <div>
    <editor id="venue-editor" ref="venue-editor" title="场馆编辑器">
      <el-form status-icon :model="venueCopy" :rules="rules">
        <el-form-item label="场馆ID">
          <el-input v-model="venueCopy.id" placeholder="ID将自动生成" disabled></el-input>
        </el-form-item>
        <el-form-item label="场馆名称" prop="name">
          <el-input v-model="venueCopy.name" placeholder="在此输入场馆名称"></el-input>
        </el-form-item>
        <el-form-item label="场馆地点" prop="address">
          <el-input v-model="venueCopy.address" placeholder="在此输入场馆地点"></el-input>
        </el-form-item>
        <el-form-item label="场馆简介" prop="introduction">
          <el-input
            v-model="venueCopy.introduction"
            placeholder="在此输入场馆简介"
            type="textarea"
            rows="2"
            maxlength="15"
            show-word-limit
          ></el-input>
        </el-form-item>
        <el-form-item label="场地">
          <el-tag
            v-for="(site, index) in venueCopy.sites"
            :key="site.id"
            closable
            :close-transition="false"
            @close="confirmDelete(index)"
          >
            <el-popover trigger="hover">
              <site-card :site="site" :detailed="true">
                <el-button type="info" circle icon="el-icon-edit" @click="showEditor(site)"></el-button>
              </site-card>
              <span slot="reference">{{site.name+site.id}}</span>
            </el-popover>
          </el-tag>
          <el-tag type="success" @click="showEditor(Site._empty())">
            <i class="el-icon-plus"></i>
          </el-tag>
        </el-form-item>
      </el-form>
    </editor>
    <site-editor title="场地编辑器" id="site-editor" ref="site-editor"></site-editor>
    <confirm
      ref="delete-site-confirm"
      id="delete-site-confirm"
      title="确认删除场地"
      message="你确定要删除该场地吗？"
    ></confirm>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import SiteEditor from "./SiteEditor.vue";
import { Component } from "vue-property-decorator";
import Confirm from "../common/Confirm.vue";
import { Venue } from "../../model/entity/venue";
import { ElFormRule } from "../../util/element-ui-types";
import { Site } from "../../model/entity/site";
import Editor from "../common/Editor.vue";
import { Constructor } from "vue/types/options";
import SiteCard from "../venue/SiteCard.vue";
import backend from "../../logic/backend";
import noop from "../../util/no-operation";
import { emptyVenueBean } from '../../model/bean/venue-bean';

const introMaxWords = 15;

@Component({
  components: {
    Confirm,
    Editor,
    SiteEditor,
    SiteCard
  }
})
class VenueEditor extends Vue {
  private rules: { [k in keyof Venue]?: ElFormRule[] } = {
    introduction: [
      { required: false },
      { min: 0, max: introMaxWords, message: "简介不可超过15字" }
    ],
    name: [{ required: true, message: "场馆名称不可为空" }],
    address: [{ required: true, message: "场馆地址不可为空" }]
  };
  private Site: Constructor = Site;
  private introMaxWords: number = introMaxWords;
  private venueCopy: Venue = Venue._default();
  public show(venue: Venue) {
    if (venue.id !== emptyVenueBean.id) {
      this.venueCopy = Venue.fromID(venue.id);
    } else {
      this.venueCopy = Venue._empty()
    }
    const venueEditor = this.$refs["venue-editor"];
    if (venueEditor instanceof Editor) {
      venueEditor.show();
    }
  }
  private showEditor(site: Site) {
    const siteEditor = this.$refs["site-editor"];
    if (siteEditor instanceof SiteEditor) {
      siteEditor.show(site);
    }
  }
  private confirmDelete(index: number) {
    const confirm = this.$refs["delete-site-confirm"];
    if (confirm instanceof Confirm) {
      confirm
        .show()
        .then(() => {
          this.handleDelete(index);
        })
        .catch(() => {});
    }
  }
  private handleDelete(index: number) {
    // todo delete site
    backend
      .delete("/delete-site", {
        id: this.venueCopy.sites[index].id
      })
      .then(rs => {
        if (rs.data.code === 200) {
          this.$message({
            type: "success",
            message: `删除${index}成功！`
          });
          this.venueCopy.sites.splice(index, 1);
        } else {
          this.$message({
            message: rs.data.message,
            type: "error"
          });
        }
      })
      .catch(noop);
  }
}
export default VenueEditor;
export { VenueEditor };
</script>