<template>
  <nav class="navbar navbar-default">
    <div class="container-fluid">
      <div class="navbar-header">
        <router-link to="/" class="navbar-brand">主页</router-link>
      </div>
      <ul class="nav navbar-nav">
        <li>
          <router-link to="/queryAllCars">查询车辆</router-link>
        </li>
        <li>
          <router-link to="/createCar">新增车辆</router-link>
        </li>
        <li>
          <router-link to="/changeCarOwner">交易车辆</router-link>
        </li>
        <li>
          <router-link to="/showBlockchain">查看区块信息</router-link>
        </li>
      </ul>
    </div>
  </nav>
</template>

<style>
.navbar {
  border-radius: 0;
}

.navbar-brand {
  font-weight: bold;
}

@media only screen and (max-width: 768px) {
  .navbar .pull-right {
    float: left !important;
    text-align: left !important;
  }
}
</style>