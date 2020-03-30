require.config({
    paths:{
        'jquery':'https://cdn.bootcss.com/jquery/1.12.4/jquery'//注意一定要省略扩展名！！
    }
})
require(['jquery'],function(){//判定当前是第几页使用script。
    if($('#l2').attr('sid')==1){
        require(['./index'],function(index){
            index.address();
            index.qiye();
            index.kill();
            index.list();
        });
    }else if($('#l2').attr('sid')==2){
        require(['./goodlist','./jquery.pagination'],function(goods){
            goods.goods();
            
        })
    }else if($('#l2').attr('sid')==3){
        require(['./detail'],function(detail){
            detail.detail();
        })
    }else if($('#l2').attr('sid')==4){
        require(['./cart','./nav'],function(cart,nav){
            cart.cart();
            nav.address();
            nav.qiye();
        })
    }

})




