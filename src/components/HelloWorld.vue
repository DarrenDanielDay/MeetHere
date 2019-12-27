<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <p>
      For a guide and recipes on how to configure / customize this project,<br>
      check out the
      <a href="https://cli.vuejs.org" target="_blank" rel="noopener">vue-cli documentation</a>.
    </p>
    <h3>Installed CLI Plugins</h3>
    <ul>
      <li><a href="https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-babel" target="_blank" rel="noopener">babel</a></li>
      <li><a href="https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-typescript" target="_blank" rel="noopener">typescript</a></li>
      <li><a href="https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-pwa" target="_blank" rel="noopener">pwa</a></li>
    </ul>
    <h3>Essential Links</h3>
    <ul>
      <li><a href="https://vuejs.org" target="_blank" rel="noopener">Core Docs</a></li>
      <li><a href="https://forum.vuejs.org" target="_blank" rel="noopener">Forum</a></li>
      <li><a href="https://chat.vuejs.org" target="_blank" rel="noopener">Community Chat</a></li>
      <li><a href="https://twitter.com/vuejs" target="_blank" rel="noopener">Twitter</a></li>
      <li><a href="https://news.vuejs.org" target="_blank" rel="noopener">News</a></li>
    </ul>
    <h3>Ecosystem</h3>
    <!-- <editor ref="a" id="asdasd" :submitAction="submitAction" @checked="onSubmit">
      <el-form :rules="rules" :model="form">
        <el-form-item label="num" prop="num">
          <el-input v-model.number="form.num"></el-input>
        </el-form-item>
      </el-form>
    </editor> -->
    <!-- <news-editor ref="news-editor" @checked="mtd"></news-editor> -->
    <b-modal id="login-modal" hide-footer title="登录">

    <!-- <login v-on:login="onLoginSuccess" ref="login"></login> -->
    <!-- <register v-on:register="onLoginSuccess" ref="login"></register> -->
    </b-modal>
    <!-- <report ref="report"></report> -->
    <el-button @click="alt">c</el-button>
    <!-- <b-button v-b-modal.login-modal>d</b-button> -->
    <!-- <make-order-card :pickedSite="site"></make-order-card> -->
    <!-- <comment-editor ref="comment-editor"></comment-editor> -->
    <!-- <venue-editor ref="venue-editor"></venue-editor> -->
    <!-- <site-editor ref="$site-editor"></site-editor> -->
    <!-- <comments :comments="comments"></comments> -->
    <!-- <news-card :detailed="true"></news-card> -->
    <!-- <venue-ranking></venue-ranking> -->
    <!-- <test :testValue="binded"></test> -->
    <!-- <news-room></news-room> -->
    <order></order>
    <ul>
      <li><a href="https://router.vuejs.org" target="_blank" rel="noopener">vue-router</a></li>
      <li><a href="https://vuex.vuejs.org" target="_blank" rel="noopener">vuex</a></li>
      <li><a href="https://github.com/vuejs/vue-devtools#vue-devtools" target="_blank" rel="noopener">vue-devtools</a></li>
      <li><a href="https://vue-loader.vuejs.org" target="_blank" rel="noopener">vue-loader</a></li>
      <li><a href="https://github.com/vuejs/awesome-vue" target="_blank" rel="noopener">awesome-vue</a></li>
    </ul>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { User } from '../model/entity/user';
import { Site } from '../model/entity/site';
import Editor from '../components/common/Editor.vue';
import { Action, SimpleAction, AlwaysAction, ChainAction } from '../util/action';
import { ElFormRule } from '../util/element-ui-types';
import NewsEditor from './admin/NewsEditor.vue';
import { News } from '../model/entity/news';
import Login from './user/Login.vue';
import Register from './user/Register.vue';
import Comments from './homepage/Comments.vue';
import { Comment } from "../model/entity/comment"
import NewsCard from './news/NewsCard.vue';
import MakeOrderCard from './order/MakeOrderCard.vue';
import Report from './common/Report.vue';
import CommentEditor from './user/CommentEditor.vue';
import SiteEditor from './admin/SiteEditor.vue';
import VenueEditor from './admin/VenueEditor.vue';
import { Venue } from '../model/entity/venue';
import VenueRanking from './statistics/VenuesRanking.vue';
import NewsRoom from '../views/admin/NewsRoom.vue';
import Test from './common/Test.vue';
import OrderInfoCard from './order/OrderInfoCard.vue';

interface Modal  {num: number}

const testComments = [
  Comment._default(),
  Comment._default(),
  Comment._default(),
  Comment._default(),
]


@Component({
  components: {
    Editor,
    NewsEditor,
    login: Login,
    register: Register,
    Comments,
    newsCard: NewsCard,
    MakeOrderCard,
    Report,
    CommentEditor,
    VenueRanking,
    SiteEditor,
    VenueEditor,
    NewsRoom,
    Test:Test,
    order: OrderInfoCard
  }
})
export default class HelloWorld extends Vue {
  public site = Site._default();
  public comments = testComments;
  public binded: boolean = false;
  public rules: { [k: string]: ElFormRule[] } = {
    num: [{
      required: true,
      type: "number",
      message: "请输入正确的数字"
    }]
  };
  public form: Modal = {
    num: 0
  };
  public submitAction: Action;
  @Prop() private msg!: string;
  constructor() {
    super();
    this.submitAction = new ChainAction();
    console.log(new User());
    console.log(new Site());
  }

  public alt() {
    // const editor = this.$refs['a'];
    // if (editor instanceof Editor) {
    //   editor.show();
    // }
    // const editor = this.$refs['news-editor'];
    // if (editor instanceof NewsEditor) {
    //   editor.show(News._default());
    // }
    // const login = this.$refs["login"];
    // if (login instanceof Login) {
    //   console.log("login.show()!")
    //   login.show();
    // }
    // this.$bvModal.show("login-modal");
    // const report = this.$refs["report"];
    // if (report instanceof Report) {
    //   report.show();
    // }
    // const editor = this.$refs["venue-editor"];
    // if (editor instanceof VenueEditor) {
    //   editor.show(Venue._default());
    // }
    this.binded = !this.binded;
  }

  public mtd() {
    alert("checked caught!")
  }

  public onSubmit(chain: ChainAction, modal: Modal) {
    console.log("emited!");
    // console.log(chain);
    console.log(modal);
    setTimeout(() => {
      if (modal.num === 0) {
        console.log("finally, we abort it...")
        chain.abort("outer abort");
      } else {
        console.log("finally, we accept it!");
        chain.notify();
      }
    },5000);
  }

  public onLoginSuccess() {
    console.log("hide!");
    this.$bvModal.hide("login-modal");
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
