<template>
  <div style="width: 100%; display: flex; justify-content: center">
    <div :id="chartID" class="venue-ranking-chart"></div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import echarts, { ECharts } from "echarts";
import { Prop } from "vue-property-decorator";
import { Venue } from "../../model/entity/venue";
import backend from "../../logic/backend";
import noop from "../../util/no-operation";
let venues: Array<{ venue: Venue; orders: number }> = [];
for (let i = 0; i < 9; i++) {
  venues.unshift({ venue: Venue._default(), orders: i });
}
@Component({})
class VenueRanking extends Vue {
  public get chartID(): string {
    return `venue-ranking${this.id}`;
  }

  @Prop({
    default() {
      return venues;
    }
  })
  private orderedVenueList!: Array<{ venue: Venue; orders: number }>;

  @Prop({
    type: Number,
    default: -1
  })
  private id!: number;

  private chart!: ECharts;

  constructor() {
    super();
  }

  public updateChart(seriesData: Array<{ value: number; name: string }>) {
    const names = seriesData.map(v => v.name);
    this.chart.setOption({
      title: {
        text: `MeetHere 场馆Top${seriesData.length}`,
        // textAlign: "center",
        x: "center"
      } as {},
      tooltip: {
        trigger: "item",
        formatter: "{a} <br/>{b} : {c} ({d}%)"
      },
      legend: {
        orient: "vertical",
        left: "left",
        data: names
      },
      color: [
        "#c23531",
        "#2f4554",
        "#61a0a8",
        "#d48265",
        "#91c7ae",
        "#749f83",
        "#ca8622",
        "#bda29a",
        "#6e7074",
        "#546570",
        "#c4ccd3"
      ],
      series: [
        {
          name: "订单总数",
          type: "pie",
          radius: "55%",
          center: ["50%", "60%"],
          data: seriesData,
          itemStyle: {
            emphasis: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: "rgba(0, 0, 0, 0.5)"
            },
            normal: {
              color: (params: { dataIndex: any }) => {
                // 自定义颜色
                let colorList = [
                  "#C1232B",
                  "#B5C334",
                  "#FCCE10",
                  "#E87C25",
                  "#27727B",
                  "#FE8463",
                  "#9BCA63",
                  "#FAD860",
                  "#F3A43B",
                  "#60C0DD",
                  "#D7504B",
                  "#C6E579",
                  "#F4E001",
                  "#F0805A",
                  "#26C0C0"
                ];
                return colorList[params.dataIndex];
              }
            }
          }
        }
      ]
    });
  }

  public mounted() {
    let node = document.getElementById(this.chartID);
    if (!(node instanceof HTMLDivElement)) {
      // always false
      return;
    }
    this.chart = echarts.init(node);
    let names = this.orderedVenueList.map(item => item.venue.name);
    let seriesData: Array<{ value: number; name: string }> = [];
    backend
      .get("/topNVenues", { n: 10 })
      .then(rs => {
        if (rs.data.code === 200) {
          seriesData.splice(0, seriesData.length);
          rs.data.result.venues.forEach(v => {
            backend
              .get("/venue-detail", {
                id: v.venueId
              })
              .then(r => {
                seriesData.push({
                  value: v.times,
                  name: `#${v.rank}: ${r.data.result.name}`
                });
                seriesData.sort();
                this.updateChart(seriesData);
              });
          });
        } else {
          throw new Error(rs.data.message);
        }
      })
      .catch(noop);
    // seriesData = this.orderedVenueList.map(item => {
    //   return { value: item.orders, name: item.venue.name };
    // });
  }
}

export { VenueRanking };
export default VenueRanking;
</script>

<style scoped>
.venue-ranking-chart {
  width: 400px;
  height: 400px;
  position: fixed;
}
</style>