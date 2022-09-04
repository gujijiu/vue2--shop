<template>
  <div class="pagination">
    <button @click="$emit('currentPage',pageNo - 1)">上一页</button>
    <button v-if="startNumAndEndNum.start > 1" @click="$emit('currentPage',1)" :class="{active:pageNo==1}" :disabled="pageNo==1">1</button>
    <button v-if="startNumAndEndNum.start >= 2">.....</button>
    <button v-for="(page,index) in startNumAndEndNum.arr" :key="index" @click="$emit('currentPage',page)" :class="{active:pageNo==page}">{{ page }}</button>
    <button v-if="startNumAndEndNum.end >= continues">......</button>
    <button v-if="startNumAndEndNum.end >= continues" @click="$emit('currentPage',totalPages)" :class="{active:pageNo==totalPages}">{{ totalPages }}</button>
    <button @click="$emit('currentPage',pageNo + 1)" :disabled="pageNo==totalPages">下一页</button>
    <button style="margin-left: 30px">共 {{ total }} 条</button>
  </div>
</template>

<script>
export default {
    name:'Pagination',
    props:['pageNo','pageSize','total','totalPages','continues'],
    computed:{
        //计算出连续页码的起始数字与结束数字
        startNumAndEndNum(){
            const {continues,pageNo,totalPages} = this;
            let start,end = 0;
            let arr = [];
            if(continues > totalPages){
                start = 1;
                end = totalPages;
            }else{
               start = pageNo - Math.floor(continues / 2);
               end = pageNo + Math.floor(continues / 2);
               if(start < 1){
                   start = 1;
                   end = continues;
               }
               if(end > totalPages){
                   start = totalPages - continues + 1;
                   end = totalPages;
               }
            }
            for(let i = start;i <= end;i++ ){
                arr.push(i);
            }
            return { start, end, arr };
        },
    },
}
</script>

<style lang="less" scoped>
.pagination {
  button {
    margin: 0 5px;
    background-color: #f4f4f5;
    color: #606266;
    outline: none;
    border-radius: 2px;
    padding: 0 4px;
    vertical-align: top;
    display: inline-block;
    font-size: 13px;
    min-width: 35.5px;
    height: 28px;
    line-height: 28px;
    cursor: pointer;
    box-sizing: border-box;
    text-align: center;
    border: 0;

    &[disabled] {
      color: #c0c4cc;
      cursor: not-allowed;
    }

    &.active {
      cursor: not-allowed;
      background-color: #409eff;
      color: #fff;
    }
  }
}
</style>