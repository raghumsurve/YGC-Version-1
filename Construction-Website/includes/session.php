<?php
declare(strict_types=1);
if (session_status() !== PHP_SESSION_ACTIVE) {
    session_name('yashaswi_session');
    session_set_cookie_params(['httponly'=>true, 'samesite'=>'Lax', 'secure'=>(!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off')]);
    session_start();
}
require_once __DIR__ . '/config.php';
require_once __DIR__ . '/functions.php';
function admin_required(): void { if (empty($_SESSION['admin_id'])) redirect('admin/login.php'); }
