<template>
    <div class="login-container">
        <div class="">
            <Form ref="formInline" :model="formInline" :rules="ruleInline" inline>
                <FormItem prop="adminId">
                    <Input type="text" v-model="formInline.adminId" placeholder="adminIdname">
                        <Icon type="ios-person-outline" slot="prepend"></Icon>
                    </Input>
                </FormItem>
                <br/>
                <FormItem prop="adminPassword">
                    <Input type="adminPassword" v-model="formInline.adminPassword" placeholder="password">
                        <Icon type="ios-lock-outline" slot="prepend"></Icon>
                    </Input>
                </FormItem>
                <br/>
                <FormItem>
                    <Button type="primary" @click="handleSubmit('formInline')">Signin</Button>
                </FormItem>
            </Form>
        </div>
        

    </div>
    
</template>
<script>
    import GLOBAL from '@/api/global_variable'
    export default {
        data () {
            return {
                formInline: {
                    adminId: '',
                    adminPassword: ''
                },
                ruleInline: {
                    adminId: [
                        { required: true, message: 'Please fill in the adminId name', trigger: 'blur' }
                    ],
                    adminPassword: [
                        { required: true, message: 'Please fill in the adminPassword.', trigger: 'blur' },
                        { type: 'string', min: 6, message: 'The adminPassword length cannot be less than 6 bits', trigger: 'blur' }
                    ]
                }
            }
        },
        created() {
            // console.log(GLOBAL)
            console.log(this.$server)
        },
        methods: {
            handleSubmit(name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        // console.log(this.formInline.adminId)
                        // console.log(this.formInline.adminPassword)
                        console.log(GLOBAL.apiURL+'admin')
                        axios.post(GLOBAL.apiURL+'admin', this.formInline)
                        .then(function (response) {
                            console.log(response);
                        })
                        .catch(function (error) {
                            console.log(error);
                        });
                        this.$router.push('/admin');
                        this.$Message.success('Success!');
                    } else {
                        this.$Message.error('Fail!');
                    }
                })
            }
        }
    }
</script>

<style scoped>
    /* 背景 */
.login-container {
    width: 100%;
    height: 100%;
  position: absolute;
  position: absolute;
	z-index: -100;
	left: 0px;
	top: 0px;
	right: 0px;
	bottom: 0px;
	margin: 0px;
	padding: 0px;
  /* background-size: 100% auto;
  background-repeat: no-repeat;   */
  /* background-size: 100% 100%;; */
  background: url("../assets/background/01.jpg");
}
</style>