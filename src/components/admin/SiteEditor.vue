<template>
  <div>
    <editor id="site-editor" title="场地编辑器" ref="editor">
      <el-form :model="siteCopy" status-icon ref="site-editor-form" :rules="siteRules">
        <el-form-item label="场地ID" prop="id">
          <el-input placeholder="场馆ID将自动生成" disabled v-model="siteCopy.id"></el-input>
        </el-form-item>
        <el-form-item label="场地名称" prop="name">
          <el-input v-model="siteCopy.name" placeholder="请输入场地名称"></el-input>
        </el-form-item>
        <el-form-item label="所属场馆ID" prop="venueId">
          <el-input placeholder="未绑定" disabled v-model="siteCopy.venueID"></el-input>
        </el-form-item>
        <el-form-item label="场地简介" prop="introduction">
          <el-input placeholder="在此输入场地简介" v-model="siteCopy.introduction" show-word-limit></el-input>
        </el-form-item>
        <el-form-item label="场地单价" prop="price">
          <el-input type placeholder="请输入场地单价" v-model.number="siteCopy.price"></el-input>
        </el-form-item>
      </el-form>
    </editor>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Site } from "../../model/entity/site";
import { Prop, Component } from "vue-property-decorator";
import { ElFormRule } from "../../util/element-ui-types";
import Editor from '../common/Editor.vue';
@Component({
  components: {
    Editor
  }
})
class SiteEditor extends Vue {
  private siteCopy: Site = Site._default();
  private siteRules: { [k in keyof Site]?: ElFormRule[] } = {
    id: [{ required: false }],
    name: [{ required: true, message: "场地名称不能为空" }],
    venueID: [{ required: true, message: "检测到前端逻辑错误" }],
    introduction: [{ required: false }],
    price: [{ required: true, type: "number", message: "价格必须为数字" }]
  };
  constructor() {
    super();
  }

  public show(site: Site) {
    this.siteCopy = site.clone();
    const editor = this.$refs["editor"];
    if (editor instanceof Editor) {
      editor.show();
    }
  }
}

export default SiteEditor;
export { SiteEditor };
</script>

<style scoped>
</style>
