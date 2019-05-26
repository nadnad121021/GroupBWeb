$(document).ready(function(){
    $lastname = $('#lastname')
    $firstname = $('#firstname')
    $password = $('#password')
    $password2 = $('#password2')
    $email = $('#email')
    $Signup = $('#Signup')
    $ButSign = $('#ButSign')

    $ButSign.click(function(e){
         e.preventDefault();
        //  alert("jjjsdf")
         if($lastname.val().length > 0 && $firstname.val().length > 0 && $password.val().length > 0
           && $password2.val().length > 0 ){
               var client = {
                   FullName:$firstname.val() + " " +$lastname.val(),
                   Username:$lastname.val(),
                   Password:$password.val(),
                   Email:"None",
                   Type:"Client"
               }
               if($email.val().length > 0){
                  client.Email = $email.val();
               }
               console.log(client);
               if($password.val() === $password2.val()){
                $.ajax({
                    method:'POST',
                    url:'/signup',
                    data:client,
                    success:function(message){
                      alert(message);
                      if(message === "Successful! You can now login!"){
                        top.location.href = "/login";
                      }else{
                          location.reload();
                      }
                    }
                })
               }else{
                   alert("Password not Match!");
                   $password.val('');
                   $password2.val('');
               }
         }else{
             $Signup.click();
         } 
    })

})