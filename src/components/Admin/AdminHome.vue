<template>
    <div style="padding:10px;">
        <h1>管理员首页</h1>
        <div class="Container">
            <div class="topContainer">
                <div class="eaNum">

                    <div class="textCard">
                        <p>当前管理</p>
                        <h2>教务个数</h2>
                    </div>
                    <div class="ColorCard"><div class="NumBox">19</div></div>
                </div>
                <div class="eaNum">

                    <div class="textCard">
                        <p>当前日志</p>
                        <h2>记录条数</h2>
                    </div>
                    <div class="ColorCard"><div class="NumBox">1564</div></div>
                </div>
                <Row>
                    <Col span="11">
                        <Card class="eaNum">
                            <div class="textCard">
                                <p>当前管理</p>
                                <h2>教务个数</h2>
                            </div>
                            <div class="ColorCard"><div class="NumBox">19</div></div>
                        </Card>
                    </Col>
                    <Col span="11" offset="2">
                        <Card dis-hover>
                            <p slot="title">Disable card with hover shadows</p>
                            <p>Content of card</p>
                            <p>Content of card</p>
                            <p>Content of card</p>
                        </Card>
                    </Col>
                </Row>


            </div>

        

        <div class="p">
            <div style="background:#eee;margin:20px;padding: 20px;border-radius:10px;">
                <Card :bordered="false">
                    <p slot="title">近期公告</p>
                    <p>公告1 [2020/06/07] </p>
                    <p>公告1 [2020/06/07] </p>
                </Card>
            </div>

            <Card style="margin:20px;background:#eee;border-radius:10px;width:600px">
                <h3 >管理下的教务</h3>
                <i-table :row-class-name="rowClassName" :columns="columns1" :data="data1" :style="{width:'500px',margin:'20px'}"></i-table>
            </Card>

        </div>
        
        
    </div>
    </div>
  
</template>

<script>
    export default {
        data () {
            return {
                columns1: [
                    {
                        title: '姓名',
                        key: 'name'
                    },
                    {
                        title: '年龄',
                        key: 'age'
                    },
                    {
                        title: '地址',
                        key: 'address'
                    }
                ],
                
                data1: [
                    {
                        name: '王小明',
                        age: 18,
                        address: '北京市朝阳区芍药居'
                    },
                    {
                        name: '张小刚',
                        age: 25,
                        address: '北京市海淀区西二旗'
                    },
                    {
                        name: '李小红',
                        age: 30,
                        address: '上海市浦东新区世纪大道'
                    },
                    {
                        name: '周小伟',
                        age: 26,
                        address: '深圳市南山区深南大道'
                    }
                ],
            }
        },
        methods: {
            rowClassName (row, index) {
                if (index === 1) {
                    return 'demo-table-info-row';
                } else if (index === 3) {
                    return 'demo-table-error-row';
                }
                return '';
            }
        }
    }
</script>

<style>
    .eaNum{
        height: 100px;
        border-radius: 20px;
        width: auto;
        /* border: 1px solid #515A6E; */
        background: #F5F7F9;
        margin-top: 0px;
        display: flex;
        margin: 0px 50px 0px 0px;
        min-width: 200px;
    }
    .textCard{
        padding: 25px 10px ;
        text-align: right;
        width:60%;
    }
    .ColorCard{
        background: #515A6E;
        width:auto;
        min-width: 40%;
        height:100%;
        border-radius:0  20px  20px 0;
        display: flex;

    }
    .NumBox{
        color: #fff;
        font-size: 35px;
        margin: 0 auto;
        align-self: center;
        /* position: relative;
        top:50%;
        transform: translateY(-50%); */
    }
    .topContainer{
        margin: 20px 0px 20px;
        display: flex;
        width: auto;
    }


    .ivu-table .demo-table-info-row td{
        background-color: #2db7f5;
        color: #fff;
    }
    .ivu-table .demo-table-error-row td{
        background-color: #ff6600;
        color: #fff;
    }
    .ivu-table td.demo-table-info-column{
        background-color: #2db7f5;
        color: #fff;
    }
    .ivu-table .demo-table-info-cell-name {
        background-color: #2db7f5;
        color: #fff;
    }
    .ivu-table .demo-table-info-cell-age {
        background-color: #ff6600;
        color: #fff;
    }
    .ivu-table .demo-table-info-cell-address {
        background-color: #187;
        color: #fff;
    }
</style>