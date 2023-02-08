<template>
  <div>
    <el-row>
      <el-col :span="12">
        <p class="sale_description_box description">已售出</p>
        <el-table :data="catIsSoldListArr" border>
          <!-- <el-table-column type="selection" /> -->
          <el-table-column
            label="猫猫编号"
            prop="catId"
            width="60px"
            align="center"
          />
          <el-table-column label="猫图" width="130px" align="center">
            <template slot-scope="scope">
              <el-image
                :src="$host + scope.row.pictures"
                fit="cover"
                style="width: 100px; height: 100px"
              ></el-image>
            </template>
          </el-table-column>
          <el-table-column
            label="昵称"
            prop="catNickname"
            align="center"
            width="100px"
          />
          <el-table-column
            label="出租价格(元)"
            prop="rentPrice"
            align="center"
            width="100px"
          />
          <el-table-column
            label="出售价格(元)"
            prop="salePrice"
            align="center"
            width="100px"
          />
          <el-table-column
            label="买家昵称"
            prop="userNickname"
            align="center"
            width="100px"
          />
          <el-table-column label="订单问题" align="center">
            <el-button type="text" @click="handleComplaint">投诉</el-button>
          </el-table-column>
        </el-table>
      </el-col>
      <el-col :span="12">
        <p class="not_sale_description_box description">未售出</p>
        <el-table :data="catNotSaleListArr" border>
          <!-- <el-table-column type="selection" /> -->
          <el-table-column
            label="猫猫编号"
            prop="id"
            width="60px"
            align="center"
          />
          <el-table-column label="猫图" width="130px" align="center">
            <template slot-scope="scope">
              <el-image
                :src="$host + scope.row.pictures"
                fit="cover"
                style="width: 100px; height: 100px"
              ></el-image>
            </template>
          </el-table-column>
          <el-table-column
            label="昵称"
            prop="nickname"
            align="center"
            width="100px"
          />
          <el-table-column
            label="出租价格(元)"
            prop="rentPrice"
            align="center"
            width="120px"
          />
          <el-table-column
            label="出售价格(元)"
            prop="salePrice"
            align="center"
            width="120px"
          />
          <el-table-column label="操作" align="center">
            <template slot-scope="scope">
              <el-button
                icon="el-icon-edit"
                @click="EditCat(scope.row)"
                size="big"
                :loading="loading"
                >编辑</el-button
              >
              <el-button
                icon="el-icon-delete"
                @click="openDeleteConfirm(scope.row)"
                size="big"
                >删除</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
    <el-dialog
      :title="catDetail.catNickname + '🍗'"
      :visible.sync="dialogFormVisible"
    >
      <!-- TODO: 树状图更新猫猫信息 -->
      <update-form :catUpdateForm="catUpdateForm" :isRent="catDetail.isRent" />
    </el-dialog>
  </div>
</template>

<script>
import api from "@/api";
import UpdateForm from "@/components/UpdateForm.vue";
export default {
  components: { UpdateForm },
  name: "myCat",
  data() {
    return {
      userId: 2,
      catNotSaleListArr: [],
      catIsSoldListArr: [],
      dialogFormVisible: false,
      loading: false,
      catDetail: {},
      catUpdateForm: {},
    };
  },
  methods: {
    initNotSoldList() {
      api
        .catNotSaleList(localStorage.getItem("userId"))
        .then((res) => {
          this.catNotSaleListArr = res.data;
        })
        .catch((err) => {
          console.log("错误信息如下：");
          console.log(err);
        });
    },
    initIsSoldList() {
      api
        .catSoldList(localStorage.getItem("userId"))
        .then((res) => {
          this.catIsSoldListArr = res.data;
          console.log(res);
        })
        .catch((err) => {
          console.log("错误信息如下：");
          console.log(err);
        });
    },
    EditCat(cat) {
      this.loading = true;
      api.catDetail(cat.id).then((res) => {
        this.catDetail = res.data;
        this.catUpdateForm.id = this.catDetail.id;
        this.dialogFormVisible = true;
        this.loading = false;
      });
    },
    handleDelete(id) {
      this.$message.success(id);
    },
    openDeleteConfirm(cat) {
      this.$confirm(
        "此操作将永久删除【" + cat.nickname + "】猫猫，是否继续？",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      )
        .then(() => {
          this.handleDelete(cat.id);
        })
        .catch(() => {});
    },
    handleComplaint() {
      this.$message.error("投诉请拨打226447转7");
    },
  },
  mounted() {
    // 初始化猫猫列表
    this.initNotSoldList();
    this.initIsSoldList();
  },
};
</script>

<style>
.description {
  text-align: center;
}
.sale_description_box {
  background: #f99057;
}
.not_sale_description_box {
  background: #7bc0fc;
}
</style>