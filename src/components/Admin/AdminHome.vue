<template>
    <div style="padding:10px;">
        <h1>管理员首页</h1>
        <div class="Container">
            <div style="margin: 20px 0;">
                <h2>管理人员</h2>
                <Row>
                    <Col span="6">
                        <mycard icon="md-contacts" title="管理员数量" count="1" bgcolor="#d1d8e0"></mycard>
                    </Col>
                    <Col span="6">
                        <mycard icon="md-home" title="管理教务数量" :count="jiaowuNum" bgcolor="#778ca3"></mycard>
                    </Col>
                    <Col span="6">
                        <mycard icon="md-people" title="管理教师数量" :count="teacherNum" bgcolor="#d1d8e0"></mycard>
                    </Col>
                    <Col span="6">
                        <mycard icon="md-person" title="管理学生数量" :count="studentNum" bgcolor="#778ca3"></mycard>
                    </Col>
                </Row>
            </div>
            <div style="margin: 20px 0;">
                <h2>备份数量</h2>
                <Row>
                    <Col span="6">
                        <mycard icon="md-copy" title="备份数量" :count="backup.length" bgcolor="#d1d8e0"></mycard>
                    </Col>
                    <Col span="6">
                        <mycard icon="md-time" title="最近一次的备份时间" :count="backup[0].title.split('_')[0]+':'+backup[0].title.split('_')[1]" bgcolor="#778ca3"></mycard>
                    </Col>
                </Row>
            </div>
            <div style="margin: 20px 0;">
                <h2>近期登录日志</h2>
                <Row>
                    <Col span="24">
                        <template>
                            <Table :loading="tablelaoding" :columns="columns" :data="showlog"></Table>
                        </template>
                    </Col>
                </Row>
            </div>
        
    </div>
    </div>
  
</template>

<script>

import mycard from '@/components/card/mycard'
import GLOBAL from '@/api/global_variable'
import moment from 'moment'

const url = GLOBAL.apiURL
    export default {
        components:{
            mycard
        },
        data () {
            return {
                tablelaoding:true,
                num: 0,
			    numTween: 0,
                percent: 0,
                backup:[],
                log:[],
                showlog:[],
                jiaowuNum:0,
                teacherNum:0,
                studentNum:0,
                columns: [
                    {
                        type: 'index',
                        width: 60,
                        align: 'center'
                    },
                    {
                        title: '登录账户',
                        key: 'userId',
                        align: 'center'
                    },
                    {
                        title: '用户类型',
                        key: 'userType',
                        align: 'center'
                    },
                    {
                        title: '登录IP',
                        key: 'ip',
                        align: 'center'

                    },
                    {
                        title: '进行操作',
                        key: 'operation',
                        align: 'center'
                    },
                    {
                        title: '登陆时间',
                        key: 'time',
                        align: 'center',
                        render: (h, params) => {
                            let time = moment(params.row.time).format('YYYY-MM-DD HH:mm:ss')
                            return h('div', time);
                        }
                    },
                ],
                
                
            }
        },
        created() {
            const _this = this
            axios.get(url+'Database/backup').then(function (resp){
                _this.backup = resp.data.data
            })
            axios.get(url+'jiaowu/1').then(function (resp){
                _this.jiaowuNum = resp.data.data.totalElements
            })
            axios.get(url+'teacher/sunNum').then(function (resp){
                _this.teacherNum = resp.data.data
            })
            axios.get(url+'student/sunNum').then(function (resp){
                _this.studentNum = resp.data.data
            })
            axios.get(url+'slogs/1').then(function (resp){
                _this.log = resp.data.data.content
                console.log(_this.log)
                _this.showlog.push(_this.log[0])
                _this.showlog.push(_this.log[1])
                _this.showlog.push(_this.log[2])
                _this.showlog.push(_this.log[3])
                _this.tablelaoding = false
            })


        },
        computed: {

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

.flex{
    display: flex;
}

.flex-col{
    flex-direction: column;
}

.j-center{
    justify-content: center;
}

.a-center{
    align-items: center;
}

.j-bt{
    justify-content: space-between;
}

.flex-1{
    flex:1;
}

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