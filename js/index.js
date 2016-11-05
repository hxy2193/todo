$(function(){
    $('.right').on('click',function () {

        animate($('.zhezhao').get(0),{left:0},500)
    })
    $('.zhezhao').on('touchstart',function(e){
        start=e.originalEvent.changedTouches[0].pageX;

    })
    $('.zhezhao').on('touchend',function(e){
        var leave=e.originalEvent.changedTouches[0].pageX;
        if(start>leave&start-leave>=30){
            animate($('.zhezhao').get(0),{left:-500},500)
        }
    })
    $('.items').addClass('add')
    var iteminfo=[];
    if(!localStorage.todos){
        localStorage.todos=JSON.stringify(iteminfo);
    }else{
        iteminfo=JSON.parse(localStorage.todos);
        rendar();
    }
    $('.add').on('click',function(){
        $('.add-name').addClass('add-input')

    })
    $('.add-decide').on('click',function (event) {
event.stopPropagation()
        var  name=$('.input-name').val();
        iteminfo.push({item:name,status:0,del:0});
        localStorage.todos=JSON.stringify(iteminfo);
        $('.add-input').removeClass('add-input')
        console.log(iteminfo)
        rendar();
        $('.input-name').val("")
    })

    function rendar(){
        $('.inner-box').html("");
        $.each(iteminfo,function(i,v){
            $('<li class="item"><div class="iteminner"><div class="name">'+v.item+'</div> <div class="delete"></div> </div></li>').appendTo('.inner-box');
            if(v.status){
                $('.iteminner').addClass('xian');
                $('.delete').addClass('del');
                $('.item ').css({backgroundcolor:"#ccc"})
            }else{
                return;
            }
        })


    }
    $('.inner-box').on('click','item',function () {
        
    })
    $('.inner-box').on('touchstart','.item',function(e){
        left=e.originalEvent.changedTouches[0].pageX;
        
    })
    $('.inner-box').on('touchend','.item',function(e){
        var n=e.originalEvent.changedTouches[0].pageX;
        if(n>left&n-left>=40){
            var a=$(this).index();
           $(this).find('.iteminner').addClass('xian')
            $(this).find('.delete').addClass('del');
            $(this).css({transform:"translate3d("+0+"px,0,0)"});
            iteminfo[a].status=1;
            localStorage.todos=JSON.stringify(iteminfo);
        }
    })
       $('.inner-box').on('touchmove','.item',function (e) {
           var x=e.originalEvent.changedTouches[0].pageX;
           if (x-left>=40){
               $(this).css({transform:"translate3d("+x+"px,0,0)",background:"#9e54ca"});

           }
    })

    $('.inner-box').on('click','.delete',function(){
        var i=$(this).closest('li').index();
        $(this).closest('li').addClass('feili');
        $(this).closest('li').delay(800).queue(function(){
            $(this).closest('li').remove().dequeue();
        });
        iteminfo.splice(i,1);
        localStorage.todos=JSON.stringify(iteminfo);

})
})