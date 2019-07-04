<?php

if (isset($_POST['submit'])){
    $name = $_POST['name'];
    $mailFrom = $_POST['email'];
    $message = $_POST['message'];

    $mailTo = "CareCompareDev@gmail.com";
    $headers = "From: ".$mailFrom;
    $txt = "You have received an email from ".$name.".\n\n".$message;
    $subject = "NEW EMAIL from ".$mailFrom;

    mail($mailTo, $subject, $txt, $headers);
}