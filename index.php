<?php
include 'settings.php';
include 'sendmail.php';
?>

<html lang="<?php echo $siteLangCode; ?>">

<head>
    <script async src="https://www.googletagmanager.com/gtag/js?id=<?php echo $googleAnalyticsKey; ?>"></script>
    <script>
        window.dataLayer = window.dataLayer || [];
        function gtag() {
            dataLayer.push(arguments)
        };
        gtag('js', new Date());

        gtag('config', '<?php echo $googleAnalyticsKey; ?>');
    </script>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title><?php echo $domainName; ?> - Doména na predaj</title>
    <meta name="description" content="Doména <?php echo $domainName; ?> je na predaj!">
    <meta name="keywords" content="<?php echo $domainName; ?>, doména, domain, predaj, sell">
    <meta name="author" content="Ing. Róbert Taraba">
    <link rel="shortcut icon" href="assets/images/favicon.ico"/>
    <link href="https://fonts.googleapis.com/css?family=Source+Sans+Pro:600,600i,700" rel="stylesheet">
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta/css/bootstrap.min.css"
          integrity="sha384-/Y6pD6FV/Vv2HJnA6t+vslU6fwYXjCFtcEpHbNJ0lyAFsXTsjBbfaDjzALeQsN6M" crossorigin="anonymous">
    <link href="assets/css/font-awesome.min.css" rel="stylesheet">
    <link href="assets/css/style.css" rel="stylesheet">
</head>

<body id="body" class="wide-layout">
<main class="main-content">
    <div class="page-container">
        <section class="section hero-area" style="background-image: url(assets/images/bg.jpg);">
            <div class="hero-overlay-gradient"></div>
            <div class="hero-content container">
                <div class="h-full pos-r">
                    <div class="pos-tb-center">
                        <div class="row ptb-30">
                            <div class="col-md-7 t-xs-center t-md-left ptb-30">
                                <h1 class="h1 t-uppercase mb-30"><?php echo $domainName; ?> je na predaj!</h1>
                                <h3 class="font-24 t-uppercase mb-30">Doména je základ úspešného podnikania na
                                    internete.</h3>
                                <h5>Úspešný internetový projekt vyžaduje vhodnú ľahko zapamätateľnú doménu. Pri
                                    vyslovení názvu domény by malo návštevníka hneď napadnúť, aký obsah ponúka. Pre
                                    slovenský projekt je potrebná doména s koncovkou .sk. Táto doména môže byť
                                    vaša!</h5>
                                <div class="pt-30">
                                    <a class="btn btn-lg btn-orange btn-rounded mt-20"
                                       href="https://whois.sk-nic.sk/?query=<?php echo $domainName; ?>" target="_blank">Info
                                        o doméne</a>
                                    <a class="btn btn-lg btn-green btn-rounded ml-sm-20 mt-20" href="data/GA-WebSiteData.pdf">Štatistiky</a>
                                </div>
                            </div>
                            <div class="col-md-5 ptb-20">
                                <div class="hero-form float-center float-md-right t-center t-md-left">
                                    <div class="hero-form-header">
                                        <h4 class="t-uppercase mb-10">Vaša ponuka</h4>
                                        <p class="mb-0"><?php echo $domainName; ?> je ľahko zapamätateľná a zrozumiteľná
                                            doména pre podnikanie v oblasti IT</p>
                                    </div>
                                    <div class="hero-form-wrapper">
                                        <form method="post">
                                            <div class="mb-15">
                                                <div class="field">
                                                    <input type="text" class="form-control input-lg"
                                                           placeholder="Vaša max. ponuka" name="offer"
                                                           autocomplete="off" required>
                                                    <i class="fa fa-eur font-18"></i>
                                                </div>
                                            </div>
                                            <div class="mb-15">
                                                <div class="field">
                                                    <input type="text" class="form-control input-lg"
                                                           placeholder="Váše meno" name="name" required>
                                                    <i class="fa fa-user font-15"></i>
                                                </div>
                                            </div>
                                            <div class="mb-15">
                                                <div class="field">
                                                    <input type="text" class="form-control input-lg"
                                                           placeholder="Váš Email" name="email" required>
                                                    <i class="fa fa-envelope font-15"></i>
                                                </div>
                                            </div>
                                            <div class="mb-15">
                                                <div class="g-recaptcha"
                                                     data-sitekey="<?php echo $recaptchaSiteKey; ?>"></div>
                                            </div>
                                            <div class="mb-15">
                                                <button type="submit" class="btn btn-lg btn-blue btn-block">Odoslať
                                                </button>
                                            </div>
                                            <div>
                                                <?php sendMail($recaptchaSecretKey, $defaultEmail, $domainName) ?>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
</main>

<footer class="main-footer bg-dark color-lighter">
    <div class="container">
        <div class="copyright-text">© 2017 All Rights Reserved</div>
    </div>
</footer>

<script src="https://code.jquery.com/jquery-3.2.1.slim.min.js"
        integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN"
        crossorigin="anonymous"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.11.0/umd/popper.min.js"
        integrity="sha384-b/U6ypiBEHpOf/4+1nzFpr53nxSS+GLCkfwBdFNTxtclqqenISfwAzpKaMNFNmj4"
        crossorigin="anonymous"></script>
<script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta/js/bootstrap.min.js"
        integrity="sha384-h0AbiXch4ZDo7tp9hKZ4TsHbi047NrKGLO3SEJAg45jXxnGIfYzk4Si90RDIqNm1"
        crossorigin="anonymous"></script>
<script src="assets/js/script.js"></script>
<script src="https://www.google.com/recaptcha/api.js"></script>
</body>

</html>