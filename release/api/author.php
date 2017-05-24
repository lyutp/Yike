<?php 
    
    $recommendUrl = 'https://moment.douban.com/api/auth_authors/rec?alt=json&apikey=0bcf52793711959c236df76ba534c0d4&app_version=1.7.4&count=20&douban_udid=d623045db9fcb0d5243174c1bf1a675f887047c0&start=0&udid=9a34d8b038ff38971050199b0c5ee9c60c6d1ca3&version=6';

    $hotUrl = 'https://moment.douban.com/api/auth_authors/all?alt=json&apikey=0bcf52793711959c236df76ba534c0d4&app_version=1.7.4&count=20&douban_udid=d623045db9fcb0d5243174c1bf1a675f887047c0&start=20&udid=9a34d8b038ff38971050199b0c5ee9c60c6d1ca3&version=6';
    
    $recommendAuthor = file_get_contents( $recommendUrl );
    $hotAuthor = file_get_contents( $hotUrl );

    // 将请求到的数据转换为 数组并 合并

    $recommendAuthor = json_decode( $recommendAuthor, true );
    $hotAuthor = json_decode( $hotAuthor, true );

    $allAuthor = array( 'rec'=>$recommendAuthor, 'hot'=>$hotAuthor );
    echo json_encode( $allAuthor );

 ?>