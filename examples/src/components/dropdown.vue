<template>
    <vm-page>
        <vm-topbar slot="header">dropdown</vm-topbar>
        <div style="display: flex; flex: 1;">
            <vm-dropdown style="width: 50%;">
                <template v-slot:label="visible">
                    <span>
                        筛选
                        <span :class="['t', visible ? 'ts' : '']">∨</span>
                    </span>
                </template>
                <vm-scroll style="width: 100px; height: 300px; background: #fff" slot="box">
                    <div v-for="(item, a) of 100" :key="a">{{item}}</div>
                </vm-scroll>
            </vm-dropdown>
            <vm-dropdown style="width: 50%;">
                筛选
                <vm-scroll axis="x" style="background: #fff;" slot="box">
                    <div style="display: inline-block" v-for="(item, a) of 100">{{item}}</div>
                </vm-scroll>
            </vm-dropdown>
        </div>
    </vm-page>
</template>

<style>
.t {
    transition: transform, -webkit-transform 1s ease;
    display: inline-block;
}

.ts {
    -webkit-transform: rotate(180deg); 
}
</style>