<?php

function sendMail()
{
    if (isset($_POST['g-recaptcha-response']) and isset($_POST['offer']) and isset($_POST['name']) and isset($_POST['email'])) {
        $captcha = $_POST['g-recaptcha-response'];
        $offer = $_POST['offer'];
        $name = $_POST['name'];
        $email = $_POST['email'];
        $response = file_get_contents("https://www.google.com/recaptcha/api/siteverify?secret=" . $GLOBALS["recaptchaSecretKey"] . "&response=" . $captcha);
        $responseKeys = json_decode($response, true);

        $headers = "MIME-Version: 1.0\r\n";
        $headers .= "Content-Type: text/html; charset=UTF-8\r\n";

        $message = "<html><head>";
        $message .= "<meta http-equiv='Content-Type' content='text/html; charset=UTF-8'><meta name='viewport' content='width=device-width, initial scale=1.0'>";
        $message .= "<title>Offer - " . $GLOBALS["domainName"] . "</title>";
        $message .= "<body style='background: #D1D6E4;'>";
        $message .= "<div style='width: 100%; max-width: 640px; padding: 2em; margin: 0 auto;'>";
        $message .= "<h4>Hello,</h4><p>my offer for the <strong style='color: black;'>" . $GLOBALS["domainName"] . " domain is: " . $offer . "€</strong></p>";
        $message .= "<p>Please contact me <a href='mailto:" . $email . "' style='color: black;'>" . $email . "</a></p>";
        $message .= "<p>" . $name . "</p>";
        $message .= "</div></body></html>";

        if (intval($responseKeys["success"]) !== 1) {
            echo "<div class='form-response text-error'>" . $GLOBALS['messages']['email_not_sent'] . "!</div>";
        } else {
            mail("" . $GLOBALS["defaultEmail"], "Offer " . $GLOBALS["domainName"], $message, $headers);
            echo "<div class='form-response text-valid'>" . $GLOBALS['messages']['email_sent'] . "!</div>";
        }
    }
}

function initLanguage()
{
    if (isset($_SERVER['HTTP_ACCEPT_LANGUAGE'])) {
        $clientLang = substr($_SERVER['HTTP_ACCEPT_LANGUAGE'], 0, 2);
        if (file_exists("locale/" . $clientLang . ".php")) {
            return $clientLang;
        }
    }
    return $GLOBALS["siteLangCode"];
}