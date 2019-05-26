
$(document).ready(function(){
    $log = $('#Log');
    $Cancel = $('#Cancel');
    $Submit = $('#Submit');
    $UserName = $('#UserName');
    $UserPassword = $('#UserPassword');
    $log.click(function(e){
        
        if($UserName.val().length > 0 && $UserPassword.val().length > 0 ){
            var user = {
                Username:$UserName.val(),
                Password:$UserPassword.val()
            }
            $.ajax({
                method:'POST',
                url:'/login',
                data:user,
                success:function(message){
                    switch(message){
                        case "Admin": top.location.href = "/adminhome";break;
                        case "Client": top.location.href = "/family";break;
                        case "Invalid Credentials":caller(message);break;
                        default:break;
                    }
                }
            })
        }else{
            $Submit.click();
        }
    })

    function caller(message){
        alert(message);
        location.reload();
    }

    $Cancel.click(function(){
        top.location.href = "/";
    })
})