<template>
  <div class="row">
    <div class="col-lg-offset-3 col-lg-6">
      <form class="form-horizontal">
        <fieldset>
          <legend>更改车主</legend>
          <!--span><b>{{ response }}</b></span><br /-->
          <div class="form-group">
            <label class="col-lg-3 control-label" >车辆</label>
            <div class="col-lg-9">
            <select class="form-control" v-model="changeOwner.carKey">
              <option v-bind:key="carEntry.Key" v-for="carEntry in carKeys">{{ carEntry.Key }}</option>
            </select>
            </div>
          </div>
          <div class="form-group">
            <label class="col-lg-3 control-label">车主</label>
            <div class="col-lg-9">
              <input
                type="text"
                class="form-control"
                placeholder="请输入“新车主”"
                v-model="changeOwner.newOwner"
              >
            </div>
          </div>
          <div class="col-lg-9 col-lg-offset-2">
            <button class="btn btn-primary" v-on:click="changeCarOwner()">更改车主</button>
          </div>
        </fieldset>
      </form>
      <br>
      <span v-if="response">
        <b>{{ response }}</b>
      </span>
      <br>
    </div>
  </div>
</template>

<script>
import PostsService from "@/services/apiService";
export default {
  name: "response",
  data() {
    return {
      changeOwner: {},
      carKeys: [],
      selectedOption: null,
      response: null
    };
  },
  mounted() {
    this.load(), (this.selectedOption = this.value);
  },
  methods: {
    async load() {
      const apiResponse = await PostsService.queryAllCars();
      this.carKeys = apiResponse.data;
    },
    async changeCarOwner() {
      const apiResponse = await PostsService.changeCarOwner(
        this.changeOwner.carKey,
        this.changeOwner.newOwner
      );
      this.response = apiResponse.data;

      console.log("changeOwner");
      console.log(this.changeOwner);
    }
  }
};
</script>
