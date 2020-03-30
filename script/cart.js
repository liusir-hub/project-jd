define(['jquery','./jscookie'],function(jquery,cookie){
    return {
        
        cart:function(){
            console.log(111);
            //物流数据。
            $.ajax({
                type:'get',
                url:'http://localhost/program/script/city.json',
                dataType:'json'
            }).done(function(d){
                console.log(d)
            })
            //商品信息。
            $.ajax({
                type:'get',
                url:'http://localhost/program/php/goodlist.php',
                dataType:'json'
            }).done(function(d1){
                console.log(d1)
                //封装输入单个sid和数量，渲染界面结构。
                function getgood(sid,num){
                    let str=''
                    if(sid && num){
                        $.each(d1,function(index,value){
                            if(sid ==value.sid){
                                str=`
                                <div class='good-items'>
                                    <div class="g-check cell"><input type='checkbox'></div>
                                    <div class="g-item cell">
                                        <div class="g-pic">
                                            <a href="#"><img src="${value.url}" alt=""></a>
                                        </div>
                                        <div class="g-title">
                                            <a href="#">${value.title}</a>
                                        </div>
                                    </div>
                                    <div class="g-type cell"></div>
                                    <div class="g-price cell">￥${value.price}</div>
                                    <div class="g-num cell">${num}</div>
                                    <div class="g-sum cell">￥${(value.price*num).toFixed(2)}</div>
                                    <div class="g-del cell"><button>删除</button></div>
                                </div>
                                `
                            }
                        })
                        $('.good-detail').append(str);
                    }else{
                        str=`
                        <p class='hint'><span>您购物车无商品</span><a href='http://localhost/program/html/shouye.html' class='lktojd'>去购物</a></p>
                        `
                        $('.good-detail').html(str);
                    }
                    
                }
                //针对cookie得到的多cookie数据进行渲染。
                
                let arrsid = [];
                let arrnum=[];
                if(cookie.get('sid')&&cookie.get('num')){
                    arrsid=cookie.get('sid').split(',');
                    arrnum=cookie.get('num').split(',');
                }else{
                    arrsid=[];
                    arrnum=[];
                    getgood();
                }
                $.each(arrsid,function(index,value){
                    getgood(value,arrnum[index]);
                })
                
                //该计算总价方面以及复选框了。
            })
        }
    }
})