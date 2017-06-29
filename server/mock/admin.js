module.exports = {
    $router: '',
    '/admin/fetchcategory': [
        {id: 1, name: '服装'},
        {id: 2, name: '鞋类'},
        {id: 3, name: '体用'},
        {id: 4, name: '箱包'}
    ],
    '/admin/fetchshoplist': [
        {
            shopName: '母婴之家',
            shopUrl: 'http://muying.com',
            fetchType: {
                search: true,
                shop: true
            }
        },
        {
            shopName: '母婴之家2',
            shopUrl: 'http://muying2.com',
            fetchType: {
                search: false,
                shop: false
            }
        },
        {
            shopName: '母婴之家3',
            shopUrl: 'http://muying3.com',
            fetchType: {
                search: false,
                shop: true
            }
        }
    ]
}