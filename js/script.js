
$(function() {
    const getData = () => {
        if(localStorage.getItem('clipboard')){
            let data =  new Array
            let lsItem = JSON.parse(localStorage.getItem('clipboard', data))
            for(let i = 0;i<lsItem.length;i++){
                data.push(lsItem[i])
            }
            return data
        } else {
            let data =  [
                'test',
            ]
            return data
        }
    }
    let data = getData()
    for(let i = 0; i<data.length; i++) {
        let section = '<section class="section added">'
        section += '<div class="wrap">'
        section += '<button type="button" class="btn">Copy</button>'
        section += '<p class="txt">'+ data[i] +'</p>'
        section += '<button class="delete">Delete</button>'
        section += '</div>'
        section += '<p class="msg" class="copy_alert">Copied</p>'
        $('#sectionInput').after(section)
    }

    $('.btn').on('click', function(){
        if ($(this).hasClass('btn-ma')){
            let text = 'M&amp;A';
            navigator.clipboard.writeText(text)

        } else {
            let text = $(this).parent().find('.txt').text();
            navigator.clipboard.writeText(text)

        }
        $(this).parents('.section').find('.msg').show().delay(300).fadeOut(100);
    });
    $("#input").keydown(function(e){
        if(e.keyCode == 13) {
            let inputVal = $(this).val()
            data.push(inputVal)
            localStorage.setItem('clipboard', JSON.stringify(data))
            let section = '<section class="section added">'
                section += '<div class="wrap">'
                section += '<button type="button" class="btn">Copy</button>'
                section += '<p class="txt">'+ inputVal +'</p>'
                section += '<button class="delete">Delete</button>'
                section += '</div>'
                section += '<p class="msg" class="copy_alert">Copied</p>'
            $('#sectionInput').after(section)
            $("#input").val("")
        }
    })
    $(".delete").on('click',function(){
        $(this).parent().parent().remove()
        let data2 = new Array
        $('.added').each(function(i, o){
            data2.push($(o).find('.txt').text())
        })

        localStorage.setItem('clipboard', JSON.stringify(data2))
    })
});