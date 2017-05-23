
// 主体应用依赖 路由模块 和自定义的控制器管理模块,指令模块
var Yike = angular.module( 'Yike', ['ngRoute','Controllers','Directives']);

// 配置路由
Yike.config([ '$routeProvider', function ( $routeProvider ) {
    $routeProvider.when( '/today', {
        templateUrl : './views/today.html',
        controller : 'TodayController'
    })
    .when( '/older', {
        templateUrl : './views/older.html',
        controller : 'OlderController'
    })
    .when( '/author', {
        templateUrl : './views/author.html',
        controller : 'AuthorController'
    })
    .when( '/category', {
        templateUrl : './views/category.html',
        controller : 'CategoryController'
    })
    .when( '/favourite', {
        templateUrl : './views/favourite.html',
        controller : 'FavouriteController'
    })
    .when( '/settings', {
        templateUrl : './views/settings.html'
    })
    .otherwise({
        redirectTo : '/today',
        controller : 'SettingsController'
    })
}])

// 运行模块
Yike.run( [ '$rootScope', function ( $rootScope ) {
    // 设置类名的初始值
    $rootScope.collapsed = false;
    
    // 定义切换的全局方法
    $rootScope.toggle = function () {
        // 调用方法 改变类名
        $rootScope.collapsed = !$rootScope.collapsed;
        // 获取所有导航
        var navs = document.querySelectorAll( '.navs dd' );
        // console.log( navs );
        if ( $rootScope.collapsed ) {
            // 打开导航
            // 遍历 navs 移动并过渡
            for (var i = 0; i < navs.length; i++) {
                navs[i].style.transform = 'translate(0)';
                navs[i].style.transition = 'all 0.2s ' + ( i + 1 )*0.12 +'s';
             } 
            
        }else {
            // 关闭导航
            for (var j = navs.length - 1; j >= 0; j--) {
                navs[j].style.transform = 'translate(-100%)';
                navs[j].style.transition = 'all '+ ( navs.length - j )*0.12 +'s';
            }
        }
    }
}])