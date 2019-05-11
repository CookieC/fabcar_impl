<template>
  <div class="posts">
    <legend>查看区块信息</legend>
    <!-- <div id="blockchain" class="col-lg-9 col-lg-offset-2">
      <button class="btn btn-primary" v-on:click="show()">blocks</button>
    </div>-->

    <div>
      <template v-if="response && response.length>0">
        <div class="row">
          <div v-bind:key="block.number" v-for="block in response">
            <div class="carInfo">
              <p>Block number：{{ block.number }}</p>
              <p class="carInfoItem">Data hash：{{ block.data_hash }}</p>
              <p class="carInfoItem">Transaction number：{{ block.num_transactions }}</p>
              <div v-bind:key="tx.id" v-for="tx in block.transactions">
                <p class="carInfoItem">Transaction ID：{{ tx.id }}</p>
                <p class="carInfoItem">Timestamp：{{ tx.timestamp }}</p>
                <p class="carInfoItem">RWsets：{{ tx.ns_rwsets }}</p>
              </div>
            </div>
          </div>
        </div>
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
      const apiResponse = await PostsService.showBlockchain();
      this.response = apiResponse.data;
    }
  }
};

/* 
//和button合用，但调用post("/fabric/getBlockchain", options))不成功，点击按钮无反应; --->改为和queryAllcars同样的显示方式
export default {
  el: "blockchain",
  methods: {
    show: function showBlockchain() {
      $("#body").empty();
      let options = {};
      showLoad();
      $.when($.post("/fabric/getBlockchain", options)).done(function(_results) {
        hideLoad();
        if (_results.result === "Success") {
          console.log("success");
          console.log("_results");
          console.log(_results);
          $("#body").append("<h2>Blockchain</h2>");
          $("#body").append("<br><br>");

          if (_results.returnBlockchain && _results.returnBlockchain.length) {
            var displayBlockchain = _results.returnBlockchain;
            var displayBlockchainLength = displayBlockchain.length;
            for (var l = displayBlockchainLength - 1; l >= 0; l--) {
              var str =
                '<div class="showBlock"><p><b>Block Number:</b> ' +
                displayBlockchain[l].number +
                "</p>";
              str +=
                "<p><b>Data Hash:</b> " +
                displayBlockchain[l].data_hash +
                "</p>";
              str +=
                "<p><b>Number of Transactions:</b> " +
                displayBlockchain[l].num_transactions +
                "</p>";

              if (
                displayBlockchain[l].transactions &&
                displayBlockchain[l].transactions.length
              ) {
                str +=
                  '<div class="showTransactions"><p><b>Transactions:</b></p>';
                for (
                  var k = 0;
                  k < displayBlockchain[l].transactions.length;
                  k++
                ) {
                  str +=
                    "<p><b>tx_id:</b> " +
                    displayBlockchain[l].transactions[k].id +
                    "</p>";
                  str +=
                    "<p><b>timestamp:</b> " +
                    displayBlockchain[l].transactions[k].timestamp +
                    "</p>";
                  str += "<p><b>writes</b></p>";
                  if (
                    displayBlockchain[l].transactions[k].ns_rwsets &&
                    displayBlockchain[l].transactions[k].ns_rwsets.length
                  ) {
                    var rwsets = displayBlockchain[l].transactions[k].ns_rwsets;
                    for (var j = 0; j < rwsets.length; j++) {
                      if (rwsets[j].writes && rwsets[j].writes.length) {
                        for (var i = 0; i < rwsets[j].writes.length; i++) {
                          str += '<div class="showWrites">';
                          str += "<p>key: " + rwsets[j].writes[i].key + "</p>";
                          str +=
                            "<p>value: " + rwsets[j].writes[i].value + "</p>";
                          str += "</div>";
                        }
                      }
                    }
                  }

                  //str += '<p>----]</p>' ;
                  str += "</div><br>";
                }
              }

              //str += '<p>]</p></div><br>';
              str += "</div><br>";
              $("#body").append(str);
            }
          }
        } else {
          console.log("error");
          console.log(_results);
          $("#body").append("<h4>" + _results.error + "</h4>");
        }
      });
    }
  }
};
*/
</script>
