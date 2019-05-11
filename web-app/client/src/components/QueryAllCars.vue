<template>
  <div class="posts">
    <legend>查询所有车辆信息</legend>
    <!-- <div v-bind:key="carEntry.Key" v-for="carEntry in response" >
      <p> {{ carEntry.Key }} | {{ carEntry.Record }}  </p>
    </div>-->
    <div>
      <template v-if="response && response.length > 0">
        <div class="row">
          <div
            class="col-md-2 col-sm-3 col-xs-6"
            v-bind:key="carEntry.Key"
            v-for="carEntry in response"
          >
            <div class="carInfo">
              <p>ID：{{ carEntry.Key }}</p>
              <p class="carInfoItem">品牌：{{ carEntry.Record.make }}</p>
              <p class="carInfoItem">型号：{{ carEntry.Record.model }}</p>
              <p class="carInfoItem">颜色：{{ carEntry.Record.color }}</p>
              <p class="carInfoItem">车主：{{ carEntry.Record.owner }}</p>
            </div>
          </div>
        </div>
      </template>
      <template v-else>
        <div class="alert alert-info">
          <p>无车辆信息</p>
        </div>
        <router-link to="/createCar">点击此处</router-link>增加车辆.
      </template>
    </div>
  </div>
</template>

<script>
import PostsService from "@/services/apiService";
export default {
  name: "response",
  data() {
    return {
      response: {}
    };
  },
  mounted() {
    this.load();
  },
  methods: {
    async load() {
      const apiResponse = await PostsService.queryAllCars();
      this.response = apiResponse.data;
    }
  }
};
</script>
