<?php
// Démarrage de session si nécessaire (optionnel pour stocker des jetons CSRF ou messages flash)
session_start();

// Définir l'encodage et s'assurer que la requête vient bien d'un POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    header('Location: index.html');
    exit;
}

// 1. PROTECTION ANTI-SPAM : Le Honeypot (champ piège caché pour les bots)
// Si un robot remplit ce champ invisible, on bloque l'envoi discrètement
if (!empty($_POST['website'])) {
    // On simule un succès pour ne pas alerter le bot
    header('Location: index.html?success=1');
    exit;
}

// 2. RÉCUPÉRATION ET NETTOYAGE DES DONNÉES
$name    = trim($_POST['name'] ?? '');
$email   = trim($_POST['email'] ?? '');
$phone   = trim($_POST['phone'] ?? '');
$message = trim($_POST['message'] ?? '');

$errors = [];

// 3. VALIDATION DES CHAMPS
if (empty($name) || empty($email) || empty($phone) || empty($message)) {
    $errors[] = "Tous les champs sont obligatoires.";
}

// Validation de l'adresse e-mail
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    $errors[] = "L'adresse e-mail est invalide.";
}

// Nettoyage contre les failles XSS (htmlspecialchars)
$safe_name    = htmlspecialchars($name, ENT_QUOTES, 'UTF-8');
$safe_email   = htmlspecialchars($email, ENT_QUOTES, 'UTF-8');
$safe_phone   = htmlspecialchars($phone, ENT_QUOTES, 'UTF-8');
$safe_message = htmlspecialchars($message, ENT_QUOTES, 'UTF-8');

// S'il y a des erreurs, on arrête le traitement
if (!empty($errors)) {
    // Vous pouvez rediriger avec un message d'erreur ou afficher un message simple
    die("Erreur de validation : " . implode('<br>', $errors));
}

// 4. PARAMÈTRES DE L'E-MAIL
$to = "contact@virginadecoration.com"; // Votre e-mail professionnel
$subject = "Nouveau message de contact - " . $safe_name;

// Corps du message formaté proprement
$email_body = "Vous avez reçu un nouveau message depuis le site web de Virgina Decoration :\n\n";
$email_body .= "Nom complet : " . $safe_name . "\n";
$email_body .= "E-mail : " . $safe_email . "\n";
$email_body .= "Téléphone : " . $safe_phone . "\n\n";
$email_body .= "Message :\n" . $safe_message . "\n";

// En-têtes sécurisés pour éviter l'injection d'en-têtes (Email Header Injection)
$headers = "From: no-reply@virginadecoration.com\r\n";
$headers .= "Reply-To: " . $safe_email . "\r\n";
$headers .= "X-Mailer: PHP/" . phpversion();

// 5. ENVOI DE L'E-MAIL
$mail_sent = mail($to, $subject, $email_body, $headers);

if ($mail_sent) {
    // Redirection vers l'accueil avec un indicateur de succès (à gérer en JS ou affichage simple)
    header('Location: index.html?success=1');
    exit;
} else {
    // En cas d'échec technique du serveur mail
    die("Une erreur technique est survenue lors de l'envoi du message. Veuillez réessayer plus tard.");
}
?>