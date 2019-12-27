<template>
  <div>
    <b-modal id="report-modal" hide-footer title="举报">
      <el-row>
        <el-col>举报理由</el-col>
      </el-row>
      <el-row>
        <el-col>
          <el-checkbox-group v-model="reasons">
            <el-checkbox :label="reason" v-for="(reason, index) in allReasons" :key="index" name="reasons"></el-checkbox>
          </el-checkbox-group>
        </el-col>
      </el-row>
      <el-row>
        <el-col style="display: flex; flex-direction: row-reverse;">
          <submit-button :action="reportAction" type="warning" icon="el-icon-warning">举报</submit-button>
        </el-col>
      </el-row>
    </b-modal>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component';
import SubmitButton from './SubmitButton.vue';
import { ChainAction } from '../../util/action';

@Component({
    components: {
        SubmitButton
    }
})
class Report extends Vue {
    public allReasons: string[];
    private reasons: string[];
    private reportAction: ChainAction;
    private targetID?: number;
    constructor() {
        super();
        this.reasons = [];
        this.allReasons = ["含色情暴力内容","含有政治敏感内容","含有不文明词汇","其他"];
        this.reportAction = new ChainAction();
    }

    public created() {
        this.reportAction.next(() => {
            this.$message({
                message: "举报成功！",
                type: "warning"
            })
        }).next(() => {
            this.hide();
        })
    }

    public show(id?: number) {
        this.targetID = id;
        this.$bvModal.show("report-modal");
    }

    public hide() {
        this.$bvModal.hide("report-modal");
    }

}

export { Report };
export default Report;
</script>

<style>
</style>