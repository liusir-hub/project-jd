define(['jquery'],function(){
    return {
        goods:function(){
            let array_default = [];//排序前的li数组
                let array = [];//排序中的数组
                let prev = null;
                let next = null;
            // function getLiarr(){
            //     let array_default = [];//排序前的li数组
            //     let array = [];//排序中的数组
            //     let prev = null;
            //     let next = null;
            //     $('.container ul li').each(function(index,value){
            //         array[index]=$(this);
            //         array_default[index]=$(this);
            //     })
            // }

            $.ajax({
                url:'http://localhost/program/php/reallist.php',
                type:'get',
                dataType:'json',
            }).done(function(d){
                console.log(d)
                let strhtml='';
                $.each(d,function(index,value){
                    strhtml+=`
                    <li>
                        <a href="http://localhost/program/html/detail.html?sid=${value.sid}" target="_blank">
                            <img src=${value.url} sid=${value.sid}/>
                            <p>${value.title}</p>
                            <p class='price'>￥${value.price}</p>
                            <span>${value.sailnumber}</span>
                            </a>
                            <button>加入购物车</button>
                    </li>
                    `
                })
                $('.container ul').append(strhtml);
                
                //渲染的外部无法获取内部的元素对象，通过事件委托实现。
                array_default = [];//排序前的li数组
                array = [];//排序中的数组
                prev = null;
                next = null;
                
                $('.container ul li').each(function(index,value){
                    array[index]=$(this);
                    array_default[index]=$(this);
                })
                console.log(array)//这里可以访问到数组。
            })
            console.log(array);//同步的显示数组为空。

            //分页思路，
            //告知后端当前是第几页。
            $('.page').pagination({
                pageCount: 3,//总的页数
                jump: true,//是否开启跳转到指定的页数，布尔值。
                coping: true,//是否开启首页和尾页，布尔值。
                prevContent: '上一页',
                nextContent: '下一页',
                homePage: '首页',
                endPage: '尾页',
                callback: function (api) {
                    console.log(api.getCurrent());//获取的页码给后端
                    $.ajax({
                        url:'http://localhost/program/php/reallist.php',
                        type:'get',
                        dataType:'json',
                        data:{
                            page:api.getCurrent()
                        }
                    }).done(function(d){
                        let strhtml='';
                        
                        $.each(d,function(index,value){
                            strhtml+=`
                            <li>
                                <a href="http://localhost/program/html/detail.html?sid=${value.sid}" target="_blank">
                                    <img src=${value.url} sid=${value.sid}/>
                                    <p>${value.title}</p>
                                    <p class="price">￥${value.price}</p>
                                    <span>${value.sailnumber}</span>
                                    </a>
                                    <button>加入购物车</button>
                            </li>
                            `
                        })
                        $('.container ul').html(strhtml);
                        
                        array_default = [];//排序前的li数组
                        array = [];//排序中的数组
                        prev = null;
                        next = null;
                        $('.container ul li').each(function(index,value){
                            array[index]=$(this);
                            array_default[index]=$(this);
                        })
                        console.log(array);
                    })
                }
                    //替换之前的。
            })
            //冒泡排序。
            //思路按可以按价格排序。前提是获取所有的li节点。



            $('button').eq(0).on('click',function(){
                $('.container ul').empty();
                $.each(array_default,function(index,value){
                    $('.container ul').append(value);
                })
            })
            $('button').eq(1).on('click',function(){
                console.log(array);
                for(let i=0;i<array.length-1;i++){
                    for(let j=0;j<array.length-(i+1);j++){
                        prev = parseFloat(array[j].find('.price').html().substring(1));
                        next=parseFloat(array[j+1].find('.price').html().substring(1))
                        if(prev>next){
                            let tmp = array[j];
                            array[j]=array[j+1];
                            array[j+1]=tmp;
                        }
                        console.log(prev);
                        // if(array[j].)
                    }
                }
                $('.container ul').empty();
                $.each(array,function(index,value){
                    $('.container ul').append(value);
                })
            })
            $('button').eq(2).on('click',function(){
                for(let i=0;i<array.length-1;i++){
                    for(let j=0;j<array.length-(i+1);j++){
                        prev = parseFloat(array[j].find('.price').html().substring(1));
                        next=parseFloat(array[j+1].find('.price').html().substring(1))
                        if(prev<next){
                            let tmp = array[j];
                            array[j]=array[j+1];
                            array[j+1]=tmp;
                        }
                        console.log(prev);
                        // if(array[j].)
                    }
                }
                $('.container ul').empty();
                $.each(array,function(index,value){
                    $('.container ul').append(value);
                })
            })
            
        }
    }
})