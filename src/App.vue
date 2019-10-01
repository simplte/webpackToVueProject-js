<template>
  <div>
    <div class="App">Hello World</div>
    <div>
      <router-link to="/Home">go Home</router-link>
      <router-link to="/About">go About</router-link>
    </div>
    <router-view></router-view>
    <div>
      <p>{{getCounter}}</p>
      <button @click="add">add</button>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  name: "App",
  data() {
    return {};
  },
  computed: {
    ...mapGetters(["getCounter"])
  },
  methods: {
    ...mapActions(["add"])
  }
};
</script>
<style lang="scss">
.App {
  color: skyblue;
}
</style>