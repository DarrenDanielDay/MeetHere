<template>
  <div>
    <editor id="site-editor" title="场地编辑器" ref="editor" @checked="submit">
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
        <el-upload
          :auto-upload="false"
          :limit="1"
          action
          list-type="picture-card"
          :file-list="fileList"
          :on-change="onSelectImage"
          :on-remove="onRemoveImage"
          :on-exceed="()=>this.$message({message:'超过上限',type:'error'})"
        >
          <i v-if="!imageSelected" class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form>
    </editor>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Site } from "../../model/entity/site";
import { Prop, Component } from "vue-property-decorator";
import { ElFormRule } from "../../util/element-ui-types";
import Editor from "../common/Editor.vue";
import { ChainAction } from "../../util/action";
import { SiteBean, defaultSiteBean, emptySiteBean } from "../../model/bean/site-bean";
import {
  FileListItem,
  ElUploadInternalFileDetail
} from "element-ui/types/upload";
import Axios from "axios";
@Component({
  components: {
    Editor
  }
})
class SiteEditor extends Vue {
  private imageSelected: boolean = false;
  private imageFile?: File;
  private fileList: FileListItem[] = [];

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
    this.imageSelected = site.image !== defaultSiteBean.image;
    this.siteCopy = site.clone();
    const editor = this.$refs["editor"];
    if (editor instanceof Editor) {
      editor.show();
    }
  }

  public onSelectImage(
    a: ElUploadInternalFileDetail,
    b: ElUploadInternalFileDetail[]
  ) {
    console.log("select!")
    this.imageFile = a.raw;
    console.log(this.imageFile)
    this.imageSelected = true;
  }

  public onRemoveImage() {
    this.imageSelected = false;
    this.imageFile = undefined;
  }

  public submit(action: ChainAction, model: SiteBean) {
    console.log(model)
    if (model.id === emptySiteBean.id) {
      // new
      console.log("new!")
      if (this.imageSelected && this.imageFile) {
        const formData = new FormData();
        formData.append("image", this.imageFile);
        console.log("POST http://ecnuer996.cn/MeetHere/api/add-site");
        Axios({
          method: "POST",
          url: "http://ecnuer996.cn/MeetHere/api/add-site",
          params: {
            introduction: this.siteCopy.introduction,
            name: this.siteCopy.name,
            price: this.siteCopy.price,
            venueId: this.siteCopy.venueID
          },
          headers: { "Content-Type": "multipart/form-data" },
          data: formData
        })
          .then(rs => {
            if (rs.data) {
              if (rs.data.code === 200) {
                this.$message({
                  message: "添加场地成功",
                  type: "success"
                });
                action.notify()
              } else {
                throw new Error(rs.data.message);
              }
            }
          })
          .catch(e => {
            this.$message({
              message: e,
              type: "error"
            });
            action.abort(e)
          });
      } else {
        this.$message({
          message: "请选择图片!",
          type: "error"
        });
      }
    } else {
      // update
      console.log("update!")
      action.notify()
    }
  }
}

export default SiteEditor;
export { SiteEditor };
</script>

<style scoped>
</style>
