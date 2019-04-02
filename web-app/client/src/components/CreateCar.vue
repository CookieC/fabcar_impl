<template>
  <div class="row">
    <div class="col-lg-offset-3 col-lg-6">
    <legend>增加车辆信息</legend>
    <!--span><b>{{ response }}</b></span><br /-->
    <form class="form-horizontal" v-on:submit="addCar">
      <fieldset>
      <div class="form-group">
        <label class="col-lg-3 control-label">品牌</label>
        <div class="col-lg-9">
          <input type="text" class="form-control" placeholder="请输入“品牌”" v-model="newCar.make">
        </div>
      </div>
      <div class="form-group">
        <label class="col-lg-3 control-label">型号</label>
        <div class="col-lg-9">
          <input type="text" class="form-control" placeholder="请输入“型号”" v-model="newCar.model">
        </div>
      </div>
      <div class="form-group">
        <label class="col-lg-3 control-label">颜色</label>
        <div class="col-lg-9">
          <input type="text" class="form-control" placeholder="请输入“颜色”" v-model="newCar.color">
        </div>
      </div>
      <div class="form-group">
        <label class="col-lg-3 control-label">车主</label>
        <div class="col-lg-9">
          <input type="text" class="form-control" placeholder="请输入“车主”" v-model="newCar.owner">
        </div>
      </div>
      <div class="form-group">
        <div class="col-lg-9 col-lg-offset-2">
          <button type="submit" class="btn btn-primary" >提交</button>
        </div>
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
      newCar: {},
      response: null
    };
  },
  methods: {
    async addCar() {
      const apiResponse = await PostsService.createCar(
        this.newCar.make,
        this.newCar.model,
        this.newCar.color,
        this.newCar.owner
      );
      this.response = apiResponse.data;

      console.log("add car");
      console.log(this.newCar);
    }
  }
};
</script>
