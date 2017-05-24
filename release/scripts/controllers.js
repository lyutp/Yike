
// 实例一个控制器管理的应用
angular.module( 'Controllers', [] )
//导航菜单控制器
.controller( 'NavController', [ '$scope', function ( $scope ) {
    // 导航数据
    $scope.navs = [
        {
            link : '#/today',
            text : '今日一刻',
            icon : 'icon-home'
        },
        {
            link : '#/older',
            text : '往期内容',
            icon : 'icon-file-empty'
        },
        {link: '#/author', text: '热门作者', icon: 'icon-pencil'},
        {link: '#/category', text: '栏目浏览', icon: 'icon-menu'},
        {link: '#/favourite', text: '我的喜欢', icon: 'icon-heart'},
        {link: '#/settings', text: '设置', icon: 'icon-cog'}
    ];
}])

// 今日一刻 控制器
.controller( 'TodayController', [ '$scope', '$http', '$filter', '$rootScope', function ( $scope, $http, $filter, $rootScope ) {
    // 获取当日时期
    var today = $filter( 'date' )( new Date, 'yyyy-MM-dd');
    // 设置 对标题等信息
    $rootScope.title = '今日一刻';
    $rootScope.index = 0;
    $rootScope.loaded = false;

    // 发送 异步请求
    $http({
        url : './api/today.php',
        params : { today : today }
    }).success( function ( info ) {
        $rootScope.loaded = true;
        // console.log( info );
        $scope.posts = info.posts;
        // 数据的日期
        $scope.date = info.date;
    });
}])
// 往期  控制器
.controller( 'OlderController', [ '$scope', '$http', '$rootScope', function ( $scope, $http, $rootScope ) {
    $rootScope.title = '往期内容';
    $rootScope.index = 1;
    $rootScope.loaded = false;

    // 发送 异步请求
    $http({
        url : './api/older.php'
    }).success( function ( info ) {
        // console.log( info );
        $rootScope.loaded = true;
        $scope.posts = info.posts;
        // 数据的日期
        $scope.date = info.date;
    });
}])
// 热门作者 控制器
.controller( 'AuthorController', [ '$scope', '$http', '$rootScope', function ( $scope, $http, $rootScope ) {
    $rootScope.title = '热门作者';
    $rootScope.index = 2;
    $rootScope.loaded = false;
    $http({
        url : './api/author.php'
    }).success( function ( info ) {
        $rootScope.loaded = true;
        // 推荐作者
        $scope.rec = info.rec.authors;
        // 热门作者
        $scope.hot = info.hot.authors;
    })
}])
// 栏目浏览 控制器
.controller( 'CategoryController', [ '$scope', '$http', '$rootScope', function ( $scope, $http, $rootScope ) {
    $rootScope.title = '栏目浏览';
    $rootScope.index = 3;
    $rootScope.loaded = false;
    $http({
        url : './api/category.php'
    }).success( function ( info ) {
        $rootScope.loaded = true;
        // console.log( info );
        $scope.columns = info.columns;
    })
}])
// 我的喜欢 控制器
.controller( 'FavouriteController', [ '$scope', '$http', '$rootScope', function ( $scope, $http, $rootScope) {
    $rootScope.title = '我的喜欢';
    $rootScope.index = 4;
    $rootScope.loaded = true;
    // $http({
    //     url : './api/favourite.php'
    // }).success( function ( info ) {
    //     $rootScope.loaded = true;
    //     console.log( info );
    // })
}])
.controller( 'SettingsController', '$rootScope', function ( $rootScope ) {
    $rootScope.title = '设置';
    $rootScope.index = 4;
    $rootScope.loaded = true;
})