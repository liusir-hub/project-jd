
define(['jquery'],function(){
    return {
            address:function(){
                $('.info-left').hover(function(){
                    $('.address-list').show();
                },function(){
                    $('.address-list').hide();
                })
                $('.address-list li').on('click',function(){
                    $('.now span').html($(this).find('span').html());
                    $('.address-list').hide();
                })
                $('.address-list li').on('mouseover',function(){
                    $(this).addClass('color1').siblings('li').removeClass('color1');
                })
            },
            qiye:function(){
              $.ajax({
                type:'get',
                url:'http://localhost/program/php/sy.php',
                dataType:'json',
                crossDomain:true,
                }).done(function(d){
                    console.log(d)
                    let str =''//利用数据渲染网站导航部门。
                    for(let value of d){
                        str+=`<dl class="list-dl"><dt><span>${value.theme}</span></dt><dd>`
                            for(let val in value ){
                                str+=`<div class="item"><span>${value[val]}</span></div>`
                            }
                        str+='</dd></dl>';
                    }
                    $('.jdd').html(str);
                })
            },
            kill:function(){
                function double(n){
                    return n<10?"0"+n:n;
                }
                setInterval(function(){
                    let  d = new Date();
                    let h =d.getHours();
                    let ds = 3600-parseInt(d.getTime()/1000%3600);
                    let dsm =double(parseInt(ds/60));
                    let dss = double(ds%60);
                    
                    // console.log(ds);
                    let oStrong = document.querySelector('.kill-count strong');
                    oStrong.innerHTML = (h+1)+':00';
                    let oH = document.querySelector('.timer-h');
                    let oM = document.querySelector('.timer-m');
                    let oS = document.querySelector('.timer-s');
                    oH.innerHTML = '00';
                    oM.innerHTML = dsm;
                    oS.innerHTML = dss;
                },1000)
            },
            list:function(){
                $('.banner-list-key li').on('mouseenter',function(){
                    $(this).addClass('active1').siblings('li').removeClass('active1');

                    $('.banner-list-value').show();
                    //因为offset()只对可见元素有效。所以你先出来。
                    if($(window).scrollTop()>$('.banner-list-value').offset().top){
                        $('.banner-list-value').css({
                            'top':$(window).scrollTop()-$('.banner-list-value').offset().top,
                        })
                    }else{
                        $('.banner-list-value').css({
                            'top':0,
                        })
                    }
                    

                    $('.banner-list-value .banner-box').eq($(this).index()).show().siblings('.banner-box').hide();

                    
                })

                $('.banner-list-key li').on('mouseleave',function(){
                    $('.banner-list-key li').removeClass('active1');
                    //下面这个必须加上，否则上一次进来设置的高度依然存在，导致无形中它的offset().top值被增大。
                    $('.banner-list-value').css({
                        'top':0,
                    })
                    $('.banner-list-value').hide();
                })
                $('.banner-list-value').on('mouseover',function(){
                    $(this).show();
                })
                $('.banner-list-value').on('mouseout',function(){
                    $(this).hide();
                })

                

                
                


                
            },
    }
})
