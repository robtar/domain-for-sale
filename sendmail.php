<?php

function sendMail($secretKey, $defaultEmail, $domainName)
{
    if (isset($_POST['g-recaptcha-response']) and isset($_POST['offer']) and isset($_POST['name']) and isset($_POST['email'])) {
        $captcha = $_POST['g-recaptcha-response'];
        $offer = $_POST['offer'];
        $name = $_POST['name'];
        $email = $_POST['email'];
        $response = file_get_contents("https://www.google.com/recaptcha/api/siteverify?secret=" . $secretKey . "&response=" . $captcha);
        $responseKeys = json_decode($response, true);
        if (intval($responseKeys["success"]) !== 1) {
            echo "<div class='form-response text-error'>Email nebol odoslaný!</div>";
        } else {
            mail("" . $defaultEmail, "Ponuka za " . $domainName, "Dobrý deň, moja max. ponuka za doménu" . $domainName . " je " . $offer . " prosím kontaktujte ma " . $email . " " . $name);
            echo "<div class='form-response text-valid'>Email bol odoslaný!</div>";
        }
    }
}