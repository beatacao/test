<template>
    <div>
        <div id='topBar' class="lc-title">
            <div class="h-icon"></div>
            <div class="h-text">
                品类站点管理 <span class="sub-title">可配置各品类需爬取站点相关信息</span>
            </div>
            <span class='btn btn-info'>关联品类</span>
        </div>

        <div v-show='!isEdit'>
            <div class='grayBar' id='cateSelect'>
                <label>品类选择</label>
                <select @change='categoryChange' v-model="currentCategoryId" name="category">
                    <option value="">请选择分类</option>
                    <option v-for="item in category" :value="item.id">{{ item.name }}</option>
                </select>
                <span id='edit' @click='editCate'>编辑品类</span>
            </div>

            <table id='shopList' class='table table-bordered table-hover table-grey'>
                <thead><th>序号</th><th>站点名称</th><th>站点url</th><th>站点设置</th></thead>
                <tbody>
                    <tr v-show='shoplist.length>0' v-for='(shop, index) in shoplist'>
                        <td>{{index+1}}</td>
                        <td>{{shop.shopName}}</td>
                        <td>{{shop.shopUrl}}</td>
                        <td>
                            <input type='checkbox' id='search' v-model='shop.fetchType.search'/><label for='search'>search</label>
                            <input type='checkbox' id='searchShop' v-model='shop.fetchType.shop' /><label for='searchShop'>定向店铺抓取</label>
                        </td>
                    </tr>
                    <tr v-show='shoplist.length==0'>暂无站点</tr>
                </tbody>
            </table>
        </div>

        <div v-show='isEdit'>
            <div class='grayBar' id='cateSelect'>
                <label>填写品类</label>
                <input type='text' name='categoryName' :value='currentCategoryName'/>
            </div>

            <table id='shopList' class='table table-bordered table-hover table-grey'>
                <thead><th>操作</th><th>站点名称</th><th>站点url</th><th>站点设置</th></thead>
                <tbody>
                    <tr v-for='(shop, index) in shoplist'>
                        <td><input type='checkbox' v-model='shop.fetchType.all'></td>
                        <td>{{shop.shopName}}</td>
                        <td>{{shop.shopUrl}}</td>
                        <td>
                            <input type='checkbox' id='search' v-model='shop.fetchType.search'/><label for='search'>search</label>
                            <input type='checkbox' id='searchShop' v-model='shop.fetchType.shop' /><label for='searchShop'>定向店铺抓取</label>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            'isEdit': false
        }
    },
    created() {
        this.fetchCategory()
        this.fetchShoplist()
    },
    computed: {
        isALL(index) {
            console.log(index)
        },
        category() {
            return this.$store.state.backend.shopmanage.category
        },
        shoplist() {
            return this.$store.state.backend.shopmanage.shoplist
        },
        currentCategoryId() {
            return this.$store.state.backend.shopmanage.currentCategoryId
        },
        currentCategoryName() {
            var self = this
            var currentCate = this.$store.state.backend.shopmanage.category.find(function(cate, index){
                return (cate.id === self.$store.state.backend.shopmanage.currentCategoryId)
            })
            return (currentCate ? currentCate.name : '')
        }
    },
    methods: {
        categoryChange() {
            this.fetchShoplist()
        },
        fetchCategory() {
            this.$store.dispatch('backend/fetchCategory')
        },
        fetchShoplist() {
            this.$store.dispatch('backend/fetchShoplist', {category: this.currentCategoryId})
        },
        editCate() {
            this.isEdit = true
        }
    }

}
</script>

<style lang='less'>
#admin{
    #topBar{
        .btn-info{
            float:right; margin:6px 20px;
            padding:4px 25px;
        }
    }
    .btn-info{
            text-shadow: none;
            background: rgba(22, 155, 213, 1);
            box-shadow: none;
            border: none;
    }
    #shopList{
        label{
            display:inline; margin:0 10px 0 2px;
        }
    }
    #cateSelect{
        margin: 15px 0; height:50px; background:rgba(242, 242, 242, 1); line-height:50px; padding:0 30px;
        label{
            display:inline; margin-right:5px;
        }
        select{
            margin:0; width:120px; height:26px; line-height:26px;
        }
        #edit{
            background:#fff; border:1px solid rgba(22, 155, 213, 1); padding:6px 30px;
            border-radius: 5px; color:#169BD5; margin-left:10px; cursor:pointer;
        }
    }
}
</style>