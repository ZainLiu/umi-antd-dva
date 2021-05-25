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
                }
            ]
        }
    ],
    proxy: {
        '/dev': {
            target: 'http://localhost:3005',
            changeOrigin: true,
            },
  },
};