export default {
    singular: true,
    dva: {},
    antd: {},
    // plugins: [
    //     ['umi-plugin-react', {
    //         antd: true
    //     }]],
    routes: [
        {
            path: '/',
            component: '../layout',
            routes: [
                {
                    path: '/helloworld',
                    component: './HelloWorld'
                },
                {
                    path: 'puzzlecards',
                    component: './puzzlecards'
                },
                {
                    path: '/dashboard',
                    routes: [
                        { path: '/dashboard/analysis',component: 'Dashboard/Analysis'},
                        { path: '/dashboard/monitor',component: 'Dashboard/Monitor'},
                        { path: '/dashboard/workplace',component: 'Dashboard/Workplace'},
                    ]
                },
                {
                    path: 'list',
                    component: '../page/list'
                }
            ]
        }
    ],
    proxy: {
        '/api': {
            target: 'http://127.0.0.1:8080',
            changeOrigin: true,
            },
  },
};