export default {
    routes: [
        {
            path: '/',
            name: 'root',
            component: () => import('@/views/Camera1')
        },
        {
            path: '/home',
            name: 'home',
            component: () => import('@/views/Home'),
            children: [
            {
                path: 'info',
                component: () => import('@/views/Info'),
            }, {
                path: 'otherpage',
                component: () => import('@/views/OtherPage'),
            }, {
                path: 'operationlog',
                component: () => import('@/views/OperationLog'),
            }, {
                path: 'user',
                component: () => import('@/views/User'),
            }
            ]
        }
    ]
}