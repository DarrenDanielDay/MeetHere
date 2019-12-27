<template>
  <div>
    <editor @checked="submit" ref="news-editor" id="news-editor" title="新闻编辑器">
      <el-form status-icon :model="newsCopy" ref="news-editor-form" :rules="newsRules">
        <el-form-item label="新闻标题" prop="title">
          <el-input placeholder="请输入新闻标题" v-model="newsCopy.title"></el-input>
        </el-form-item>
        <el-form-item label="新闻内容" prop="content">
          <el-input
            placeholder="请输入新闻内容"
            type="textarea"
            v-model="newsCopy.content"
            :rows="8"
            :maxlength="500"
            show-word-limit
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-upload
            :file-list="imgs"
            action="https://jsonplaceholder.typicode.com/posts/"
            list-type="picture-card"
            :on-preview="handlePreviewImage"
            :on-change="handleImagesChange"
            :on-remove="handleRemoveImage"
            :auto-upload="false"
            :before-remove="confirmRemoveImage"
            :limit="9"
          >
            <i class="el-icon-plus"></i>
          </el-upload>
          <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt />
          </el-dialog>
        </el-form-item>
      </el-form>
    </editor>
    <confirm
      ref="delete-news-image-confirm"
      id="image-remove-confirm"
      title="确认删除新闻图片"
      message="确认删除该图片吗？"
    ></confirm>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";

import Confirm from "../common/Confirm.vue";
import Editor from "../common/Editor.vue";
import { Prop } from "vue-property-decorator";
import { News } from "../../model/entity/news";
import { ChainAction } from "../../util/action";
import { ElFormRule } from "../../util/element-ui-types";
import { NewsBean } from "../../model/bean/news-bean";
import { ElUploadInternalFileDetail } from "element-ui/types/upload";

@Component({
  components: {
    Confirm,
    Editor
  }
})
class NewsEditor extends Vue {
  private newsCopy: News = News._default();
  private dialogImageUrl: string = "";
  private dialogVisible: boolean = false;
  private imgs!: Array<{ name: string; url: string }>;
  private k: number;
  private newsRules: { [NewsProp in keyof NewsBean]?: ElFormRule[] } = {
    title: [{ required: true, message: "标题不可为空" }],
    content: [{ required: false }]
  };

  constructor() {
    super();
    this.k = 0;
    this.imgs = [];
  }
  public copy(news: News): News {
    this.imgs = []
    for (let i in news.imgs) {
      if (i) {
        this.imgs.push({ name: `${this.k++}`, url: this.newsCopy.imgs[i] });
      }
    }
    return news.clone();
  }

  public show(news: News) {
    this.newsCopy = this.copy(news);
    const editor = this.$refs["news-editor"];
    if (editor instanceof Editor) {
      editor.show();
    }
  }

  public submit(action: ChainAction, modal: News) {
    // todo handle submit edit news
    setTimeout(() => {
      action.notify();
    }, 1000);
  }

  private confirmRemoveImage() {
    const confirm = this.$refs["delete-news-image-confirm"];
    if (confirm instanceof Confirm) {
      return confirm.show();
    }
  }

  private handleRemoveImage(file: ElUploadInternalFileDetail) {
    let position = this.imgs.length - 1;
    while (position >= 0) {
      if (this.imgs[position].name === file.name) {
        break;
      }
      position--;
    }
    this.imgs.splice(position, 1);
    // todo delete news image
    this.$emit("delete-news-image")
  }

  private handlePreviewImage(file: ElUploadInternalFileDetail) {
    this.dialogImageUrl = file.url!;
    console.log(file.url);
    this.dialogVisible = true;
  }

  private handleImagesChange(file: ElUploadInternalFileDetail, fileList: Array<{ name: string; url: string }>) {
      console.log(file)
      let s = URL.createObjectURL(file.raw)
      console.log(file.raw)
      fileList.push({ name: `${this.k++}`, url: s })
      this.imgs.push({ name: `${this.k++}`, url: s })
    }
}

export default NewsEditor;
export { NewsEditor };
</script>

<style scoped>
</style>
