<Table stripe  border  highlight-row ref="currentRowTable" :columns="header" :data="eaData">
    <template slot-scope="{ row }" slot="name">
        <strong>{{ row.name }}</strong>
    </template>
    <template slot-scope="{ row, index }" slot="action">
        <Button type="primary" size="small" style="margin-right: 5px" @click="show(index)">查看</Button>
        <Button type="warning" size="small" style="margin-right: 5px" @click="edit(index)">编辑</Button>
        <Button type="error" size="small" @click="remove(index)">删除</Button>
    </template>
</Table>