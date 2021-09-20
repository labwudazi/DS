<template>
  <div class="goods-content">
    <Editor
      api-key="9mieih2cqsubf30b1omff3w107ojvjfvzhmb7haq4giiy754"
      :init="{
        height: 500,
        branding: false,
        elementpath: false,
        menubar: false,
        language: 'zh_CN',
        statusbar: false,
        height: 300,
        plugins: [
          'advlist autolink lists link image charmap print preview anchor',
          'searchreplace visualblocks code fullscreen',
          'insertdatetime media table paste code help wordcount',
        ],
        toolbar:
          'bold italic backcolor|undo redo | formatselect | bold italic backcolor | \
           alignleft aligncenter alignright alignjustify | \
           bullist numlist outdent indent | removeformat | help',
      }"
    />
    <el-button @click="handlebtn" class="tinybtn" type="primary"
      >添加商品</el-button
    >
  </div>
</template>

<script>
import Editor from "@tinymce/tinymce-vue";
export default {
  components: {
    Editor,
  },
  methods: {
    handlebtn() {
      this.$router.push("/goods");
    },
  },
};
</script>

<style>
.goods-content {
  padding: 20px 20px 0 20px;
}
.tinybtn {
  margin-top: 20px;
}
</style>