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
        }
    }
})