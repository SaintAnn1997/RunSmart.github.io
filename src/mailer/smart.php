<?php 

$name = $_POST['name'];
$phone = $_POST['phone'];
$email = $_POST['email'];

require_once('phpmailer/PHPMailerAutoload.php');
$mail = new PHPMailer;
$mail->CharSet = 'utf-8';

// $mail->SMTPDebug = 3;                             

$mail->isSMTP();                                   
$mail->Host = 'smtp.inbox.ru'; 
$mail->SMTPAuth = true;                          
$mail->Username = 'korchagina-1995@inbox.ru';          
$mail->Password = 'A7Qt2rQzwxM1JM2WqnQC';                        
$mail->SMTPSecure = 'ssl';              
$mail->Port = 465;                              

$mail->setFrom('korchagina-1995@inbox.ru', 'Pulse');  
$mail->addAddress('smilie1221@mail.ru');    
$mail->isHTML(true);                     

$mail->Subject = 'Данные';
$mail->Body    = '
		Пользователь оставил данные <br> 
	Имя: ' . $name . ' <br>
	Номер телефона: ' . $phone . '<br>
	E-mail: ' . $email . ' ';

if(!$mail->send()) {
    return false;
} else {
    return true;
}

?>