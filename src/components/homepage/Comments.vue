<template>
  <div
    @mouseenter="touch = true"
    @mouseleave="touch = false"
    :style="commentmode.textcontainterclass"
  >
    <transition :style="commentmode.class" name="slide" mode="out-in">
      <p
        style="margin-bottom:20px;color:white"
        data-toggle="tooltip"
        :title="text.tooltip"
        :key="text.id"
        id="comment"
      >{{text.val}}</p>
    </transition>
    <transition :style="commentmode.class" name="slide" mode="out-in">
      <p
        style="margin-bottom:20px;color:white"
        data-toggle="tooltip"
        :title="text.tooltip1"
        :key="text.id"
      >{{text.val1}}</p>
    </transition>
    <transition :style="commentmode.class" name="slide" mode="out-in">
      <p
        style="margin-bottom:20px;color:white"
        data-toggle="tooltip"
        :title="text.tooltip2"
        :key="text.id"
      >{{text.val2}}</p>
    </transition>
  </div>
</template>
<!--
text-container {
    width: 500px;
    height: 30px;
    line-height: 30px;
    margin: 10px auto;
    border: 1px solid cornflowerblue;
    overflow: hidden;
  }
-->
<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
import { CommentBean } from "../../model/bean/comment-bean";

@Component({})
class Comments extends Vue {
  private show: boolean = true;
  private index: number = 0;
  private touch: boolean = true;
  private totaltime: number = 0;

  @Prop({
    default() {
      return {
        textcontainterclass: {
          "height": "120px",
          "line-height": "20px",
          "margin": "10px auto",
          "overflow": "hidden",
          "border-radius": "15px",
          "background": "#24292e",
          "padding": "10px"
        },
        class: { margin: "0px" },
        translate: "20px"
      };
    }
  })
  private commentmode: any;

  public get comment() {
    let realcomments = [];
    let length = 15;
    // parseInt(this.commentmode.textcontainterclass.width) / 20 - 5
    for (let item of this.comments) {
      // realcomments.push(this.comments[comment1])
      const content = item.content;
      realcomments.push(
        content.substring(0, length) + (content.length >= length ? "..." : "")
      );
    }
    return {
      realcomments
    };
  }

  public get text() {
    return {
      id: this.index,
      val: this.comment.realcomments[this.index],
      tooltip: this.comments[this.index].content,
      val1: this.comment.realcomments[(this.index + 1) % this.comments.length],
      tooltip1: this.comments[(this.index + 1) % this.comments.length].content,
      val2: this.comment.realcomments[(this.index + 2) % this.comments.length],
      tooltip2: this.comments[(this.index + 2) % this.comments.length].content
    };
  }

  @Prop({
    type: Array,
    required: true
  })
  private comments!: CommentBean[];

  constructor() {
    super();
  }

  public created() {
    this.startMove();
    document.documentElement.style.setProperty(
      "--translatey",
      this.commentmode.translate
    );
  }
  private startMove() {
    setTimeout(() => {
      if (this.touch === false) {
        if (this.index === this.comments.length - 1) {
          this.index = 0;
        } else {
          this.index++;
        }
      }
      this.startMove();
    }, 2000);
  }
}

export { Comments };
export default Comments;
</script>

<style>
:root {
  --translatey: 20px;
}
.slide-enter-active,
.slide-leave-active {
  transition: all 0.5s linear;
}
.slide-leave-to {
  transform: translateY(-20px);
}
.slide-enter {
  transform: translateY(20px);
}
</style>
