
<template>
  <div>
    <el-card>
      <div slot="header">
        <SiteCard :site="pickedSite" :detailed="true"></SiteCard>
      </div>
      <div class="ordering-body">
        <el-row>
          <el-col>
            <el-divider>预约卡</el-divider>
          </el-col>
        </el-row>
        <el-row>
          <el-steps :active="currentStep" finish-status="success" align-center>
            <el-step title="选择日期" icon="el-icon-date"></el-step>
            <el-step title="选择时间段" icon="el-icon-time"></el-step>
            <el-step title="订单支付" icon="el-icon-shopping-cart-2"></el-step>
            <el-step title="订单完成" icon="el-icon-finished"></el-step>
          </el-steps>
        </el-row>
        <el-row>
          <el-col>
            <div v-show="currentStep==0" :key="0">
              <el-divider>选择日期</el-divider>
              <el-row>请选择一个日期。我们会根据所选日期在下一步中给出可选时间段。</el-row>
              <el-row>
                <el-col>
                  <el-date-picker v-model="date"></el-date-picker>
                </el-col>
              </el-row>
            </div>
            <div v-show="currentStep==1" :key="1">
              <el-divider>选择时间段</el-divider>
              <!-- <el-row>
                <el-col
                  :span="6"
                  v-for="(style,name) in gridstyle"
                  :key="name"
                  :class="style.css"
                >color</el-col>
              </el-row>-->
              <!-- <el-row>
                <el-col
                  :span="6"
                  v-for="(style,name) in gridstyle"
                  :key="name"
                  :class="defaultstyle"
                >{{style.expression}}</el-col>
              </el-row>-->
              <el-row v-for="row in 4" :key="row">
                <el-row>
                  <el-col :span="2" v-for="col in 12" :key="col">{{timePiece(row,col)}}</el-col>
                </el-row>
                <el-row>
                  <el-col :span="2" v-for="col in 12" :key="col">
                    <el-button
                      :type="typemapper[buttons[(row-1)*12+(col-1)].buttonstyle].buttonType"
                      :disabled="buttons[(row-1)*12+(col-1)].disabled"
                      @click="handleClick((row-1)*12+(col-1))"
                    ></el-button>
                  </el-col>
                </el-row>
              </el-row>
            </div>
            <div v-show="currentStep==2" :key="2">
              <el-divider>订单支付</el-divider>
              <el-row>
                <el-col :span="6">
                  <el-image :src="handmoney"></el-image>
                </el-col>
                <el-col :span="18">
                  <el-button type="warning" @click="pay">点我支付</el-button>
                </el-col>
              </el-row>
            </div>
            <div v-show="currentStep==3" :key="3">
              <el-divider>订单完成</el-divider>
            </div>
          </el-col>
        </el-row>
        <el-divider></el-divider>
        <el-row>
          <el-col :span="12">
            <el-button 
            icon="el-icon-back"
            :disabled="lastStatus" 
            @click="lastStep"
            >上一步</el-button>
          </el-col>
          <el-col :span="12">
            <el-button
              icon="el-icon-right"
              :disabled="nextStatus"
              @click="nextStep"
              type="primary"
            >下一步</el-button>
          </el-col>
        </el-row>
      </div>
    </el-card>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Prop } from "vue-property-decorator";
import { Site } from "../../model/entity/site";
import { SiteCard } from "../venue/SiteCard.vue";
import { TimePiece } from "../../model/entity/peroid";
import {
  StatusExpression,
  StatusClass,
  ButtonState,
  TimeTable,
  statusmapper
} from "../../logic/time-table";
import { handmoney } from '../../util/images';

const testTable: StatusClass[] = [];
let i = 0;
while (i < 8) {
  testTable.push("inavailable");
  i++;
}
while (i < 16) {
  testTable.push("available");
  i++;
}
while (i < 24) {
  testTable.push("occupied");
  i++;
}
while (i < 32) {
  testTable.push("inavailable");
  i++;
}
while (i < 40) {
  testTable.push("available");
  i++;
}
while (i < 48) {
  testTable.push("occupied");
  i++;
}

@Component({
  components: {
    SiteCard
  }
})
class MakeOrderCard extends Vue {
  @Prop({
    required: true,
    type: Site
  })
  private pickedSite!: Site;

  private currentStep: number;
  private date: Date = new Date();
  private buttons: ButtonState[];
  private typemapper = statusmapper;
  private buttonTable: TimeTable;
  private handmoney = handmoney;
  /**
   * 总共的步骤数，0~3
   * 选择日期->选择时间段->支付->确认
   */
  private totalSteps = 4;
  private lastStatus: boolean = true;
  private nextStatus: boolean = false;

  constructor() {
    super();
    this.buttons = [];
    for (let j = 0; j < 48; j++) {
      this.buttons.push(new ButtonState(false, "available"));
    }
    this.currentStep = 0;
    this.disableLastNextStep();
    this.buttonTable = new TimeTable(testTable);
  }

  public lastStep() {
    if (this.currentStep > 0) {
      this.currentStep--;
    }
    this.disableLastNextStep();
  }
  public nextStep() {
    if (this.currentStep === 0) {
      // todo get /site-time-list
    }
    if (this.currentStep < this.totalSteps - 1) {
      this.currentStep++;
    }
    this.disableLastNextStep();
  }
  public timePiece(row: number, col: number) {
    return new TimePiece((row - 1) * 12 + (col - 1)).beginTime;
  }

  public handleClick(id: number) {
    this.buttonTable.handleClick(id);
    this.updateButtons();
  }

  public updateButtons() {
    this.buttons.forEach((value, index) => {
      value.disabled = this.buttonTable.current[index].disabled;
      value.buttonstyle = this.buttonTable.current[index].buttonstyle;
    });
  }

  public pay() {
    this.$message({
      message: "支付成功！",
      type: "success"
    });
  }

  public created() {
    this.updateButtons();
  }

  private disableLastNextStep() {
    this.lastStatus = this.currentStep === 0;
    this.nextStatus = this.currentStep + 1 === this.totalSteps;
  }
}

export { MakeOrderCard };
export default MakeOrderCard;
</script>

<style scoped>
.ordering-body {
  float: inline-end;
}
.inavailable {
  background-color: gray;
}
.available {
  background-color: lightgreen;
}
.occupied {
  background-color: crimson;
}
.selected {
  background-color: cornflowerblue;
}
</style>