define(['jquery','./jscookie'],function(jquery,cookie){
    return {
        detail:function(){
            console.log(11)
            let $sid = location.search.substring(1).split('=')[1];
            let linum=null;
            $.ajax({
                //向后端请求所有数据，来比对，然后渲染详情页。
                type:'get',
                url:'http://localhost/program/php/detail.php',
                data:{
                    sid:$sid,
                },
                dataType:'json',
            }).done(function(d){
                console.log(d)
                $.each(d,function(index,value){
                    $('#spic').find('img').attr({
                        'src':value.url,
                        'sid':value.sid
                    });
                    $('#bf').find('img').attr('src',value.url)
                    $('.loadtitle').html(value.title)
                    $('.loadpcp').html(value.price)
                    let strhtml =`<li><img src=${value.url} /></li>`
                    $.each(value.picsurl.split(','),function(index,val){
                        strhtml+=`
                        
                        <li>
                            <a href="javascript:;"><img src=${val} /></a>
                        </li>`
                    })
                    $('#list ul').html(strhtml);
                    linum = $('#list ul li').length;
                })
            })
            //放大镜效果
            let $bili = $('#bpic').width()/$('#spic').width()
            console.log($('#bpic').width(),$('#spic').width(),$('#bf').width())
            $('#sf').width($('#bf').width()/$bili);
            $('#sf').height($('#bf').height()/$bili);
            $('#spic').hover(function(){
                $('#sf').css('visibility','visible');
                $('#bf').css('visibility','visible');
                $('#spic').on('mousemove',function(ev){
                    let l  =ev.pageX-$(this).offset().left-$('#sf').width()/2;
                    let t = ev.pageY-$(this).offset().top-$('#sf').height()/2;
                    if(l<0){
                        l=0
                    }else if(l>$('#spic').width()-$('#sf').width()){
                        l=$('#spic').width()-$('#sf').width();
                    }
                    if(t<0){
                        t=0
                    }else if(t>$('#spic').height()-$('#sf').height()){
                        t=$('#spic').height()-$('#sf').height();
                    }
                    $('#sf').css('left',l);
                    $('#sf').css('top',t);
                    $('#bpic').css({
                        'left':-l*$bili,
                        'top':-t*$bili
                    })
                })
            },function(){
                $('#bf').css('visibility','hidden');
                $('#sf').css('visibility','hidden');
            })
            //列表图，点击更换。
            $('#list ul').on('click','li',function(){
                $('#smallpic').attr('src',$(this).find('img').attr('src'))
                $('#bpic').attr('src',$(this).find('img').attr('src'))
                $(this).find('img').addClass('active');
                $(this).siblings('li').find('img').removeClass('active');
            })
            //左右箭头换图。
            let $num=6;
            $('#right').on('click',function(){
                if(linum>$num){
                    $num++;
                    $('#list ul').css({
                        'left':-($num-6)*$('#list ul li').eq(0).outerWidth()
                    })
                    $('#left').css('color','#333')
                    if(linum===$num){
                        $(this).css('color','#fff');
                    }
                }
            })
            $('#left').on('click',function(){
                if($num>6){
                    $num--;
                    $('#list ul').css({
                        'left':-($num-6)*$('#list ul li').eq(0).outerWidth()
                    })
                    $('#right').css('color','#333')
                    if($num===6){
                        $(this).css('color','#fff');
                    }
                }
            })
            //购物车加入
            //cookie 存值sid和num。思路先定义数组用来接收是否存在cookie，存在则得到各自数组，然后通过比对商品sid在cookie数组中的索引位置是否存在。,
            let sidarr=[];
            let goodnum=[];
            
            $('.p-btn').find('a').on('click',function(){
                console.log(11)
                if(cookie.get('sid') && cookie.get('num')){
                    sidarr=cookie.get('sid').split(',');
                    goodnum=cookie.get('num').split(',')

                }else{
                    sidarr=[];
                    goodnum=[];
                }
                if($.inArray($('#smallpic').attr('sid'),sidarr) !==-1){//说明存在
                    let newnum=parseInt(goodnum[$.inArray($('#smallpic').attr('sid'),sidarr)])+parseInt($('#count').val());//这里取整是因为，cookie存的是字符串，要数字相加，必须转数字。
                    goodnum[$.inArray($('#smallpic').attr('sid'),sidarr)]=newnum;
                    
                    cookie.add('num',goodnum);
                }else{//不存在
                    sidarr.push($('#smallpic').attr('sid'))
                    cookie.add('sid',sidarr,10);
                    goodnum.push($('#count').val());
                    cookie.add('num',goodnum);
                }

                
            })

        }
    }
})