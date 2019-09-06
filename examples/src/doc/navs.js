export default [
    {
        title: '快速上手',
        url: '/pages/use'
    },

    {
        title: '配置相关',
        url: '/pages/config'
    },

    {
        title: '基础组件',
        subs: [
            {
                title: 'Button',
                description: '按钮',
                url: '/pages/base/button',
                demo: 'components/button'
            }
        ]
    },

    {
        title: '布局组件',
        subs: [
            {
                title: 'Page',
                description: '基础3层布局',
                url: '/pages/layout/page',
                demo: 'components/page'
            },

            {
                title: 'Topbar',
                description: '顶部组件',
                url: '/pages/layout/topbar',
                demo: 'components/topbar'
            },

            {
                title: 'Box & Row',
                description: '',
                url: '/pages/layout/box~row',
                demo: 'components/layout'
            }
        ]
    }
];