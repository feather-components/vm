<template>
    <vm-page>
        <vm-topbar slot="header">dropdown</vm-topbar>
        <div style="display: flex; text-align:center;background: #f1f1f1;height:40px;line-height:40px">
            <vm-dropdown style="flex: 1;">
                <template v-slot:label="visible">
                    <span>
                        筛选
                        <span :class="['t', visible ? 'ts' : '']">∨</span>
                    </span>
                </template>
                <vm-scroll style="width: 50%; height: 300px; background: #fff" slot="box">
                    <a style="display:block" v-for="(item, a) of 100" :key="a">{{item}}</a>
                </vm-scroll>
            </vm-dropdown>
            <vm-dropdown style="flex: 1;">
                筛选
                <vm-scroll axis="x" style="background: #fff;" slot="box">
                    <a v-for="(item, a) of 100" :key="a">{{item}}</a>
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