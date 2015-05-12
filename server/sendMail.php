<?php
    require_once('api.php');
    $postdata = file_get_contents("php://input");
    $request = json_decode($postdata);
    $name = $request->req_name;
    $email = $request->req_email;
    $content = $request->req_content;

    $uri = 'https://mandrillapp.com/api/1.0/messages/send.json';

    $postString = array(
        "key" => $api,
        "message" => array(
            "html" => $content,
            "text" => $content,
            "to" => array(
            array("email" => "qianwang1013@gmail.com", "name" => "Qian Wang")

            ),
            "from_email" => $email,
            "from_name" => $name,
            "subject" => $name."have send you a request",
            "track_opens" => TRUE,
            "track_clicks" => TRUE
        )
    );

    $postString = json_encode($postString);
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $uri);
    curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true );
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true );
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_POSTFIELDS, $postString);
    $result = curl_exec($ch);
    $http_status = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    if($http_status !== 200){
        echo json_encode('A mandrill error occurred: '.curl_error($ch).$http_status);
    }else{
        echo json_encode('A email has been send to ' .$email);
    }


?>