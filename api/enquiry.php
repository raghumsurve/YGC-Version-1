<?php
require_once __DIR__ . '/../includes/session.php'; require_once __DIR__ . '/../includes/db.php';
if ($_SERVER['REQUEST_METHOD'] !== 'POST') redirect(''); verify_csrf($_POST['csrf'] ?? null);
$name = trim($_POST['name'] ?? ''); $email = trim($_POST['email'] ?? ''); $phone = trim($_POST['phone'] ?? ''); $message = trim($_POST['message'] ?? '');
if (mb_strlen($name) < 2 || !filter_var($email, FILTER_VALIDATE_EMAIL) || !preg_match('/^[0-9+() .-]{7,25}$/', $phone) || mb_strlen($message) > 2000) { flash('enquiry', 'Please enter a valid name, email and phone number.'); redirect('#contact'); }
try { db()->prepare('INSERT INTO enquiries (name, phone, email, message) VALUES (?, ?, ?, ?)')->execute([$name, $phone, $email, $message]); flash('enquiry', 'Thank you! Your site-visit enquiry has been received. We will contact you shortly.'); } catch (Throwable $e) { flash('enquiry', 'We could not save your enquiry. Please call us directly.'); }
redirect('#contact');
