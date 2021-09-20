<template>
  <div class="goods-img">
    <el-upload
      class="upload-demo"
      action="http://127.0.0.1:8888/api/private/v1/upload/"
      :file-list="fileList"
      list-type="picture"
      ref="upload"
      :auto-upload="false"
      :on-preview="handlePreview"
      :on-success="a"
      :limit="3"
    >
      <el-button slot="trigger" size="small" type="primary">点击上传</el-button>
    </el-upload>
    <el-dialog
      :visible.sync="imgDialogVisible"
      size="full"
      :modal="false"
      title="查看大图片"
    >
      <img width="100%" :src="dialogImageUrl" alt="" />
    </el-dialog>
  </div>
</template>

 <script>
export default {
  data() {
    return {
      dialogImageUrl: "",
      imgDialogVisible: false,
      fileList: [],
      number: false,
    };
  },
  methods: {
    handlePreview(file) {
      this.$refs.upload.submit();
      console.log(this.fileList);
      if (this.number) {
        this.dialogImageUrl = file.url;
        this.imgDialogVisible = true;
      }
    },
    a(response, file, fileList) {
      const { name, url } = file;
      this.fileList = [];
      this.fileList.push({ name, url });
      this.number = true;
      console.log(this.fileList);
    },
  },
};
</script>

<style>
.goods-img {
  padding: 10px;
}
</style>