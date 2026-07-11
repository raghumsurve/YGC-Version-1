<?php
declare(strict_types=1);

function e(?string $value): string { return htmlspecialchars((string) $value, ENT_QUOTES, 'UTF-8'); }
function url(string $path = ''): string { return rtrim(BASE_URL, '/') . '/' . ltrim($path, '/'); }
function redirect(string $path): never { header('Location: ' . url($path)); exit; }
function csrf_token(): string { $_SESSION['csrf'] ??= bin2hex(random_bytes(32)); return $_SESSION['csrf']; }
function verify_csrf(?string $token): void {
    if (!is_string($token) || !hash_equals($_SESSION['csrf'] ?? '', $token)) { http_response_code(419); exit('Invalid or expired form token. Please return and try again.'); }
}
function flash(string $key, ?string $message = null): ?string {
    if ($message !== null) { $_SESSION['flash'][$key] = $message; return null; }
    $message = $_SESSION['flash'][$key] ?? null; unset($_SESSION['flash'][$key]); return $message;
}
function upload_image(array $file, string $folder): string {
    if (($file['error'] ?? UPLOAD_ERR_NO_FILE) !== UPLOAD_ERR_OK || ($file['size'] ?? 0) > UPLOAD_MAX_BYTES) throw new RuntimeException('Choose a JPG, PNG, WEBP or GIF image smaller than 5 MB.');
    $mime = (new finfo(FILEINFO_MIME_TYPE))->file($file['tmp_name']);
    $extensions = ['image/jpeg'=>'jpg','image/png'=>'png','image/webp'=>'webp','image/gif'=>'gif'];
    if (!isset($extensions[$mime])) throw new RuntimeException('Only JPG, PNG, WEBP and GIF images are allowed.');
    $directory = dirname(__DIR__) . '/uploads/' . trim($folder, '/');
    if (!is_dir($directory) && !mkdir($directory, 0755, true)) throw new RuntimeException('Could not create upload directory.');
    $name = bin2hex(random_bytes(16)) . '.' . $extensions[$mime];
    if (!move_uploaded_file($file['tmp_name'], $directory . '/' . $name)) throw new RuntimeException('Could not save the uploaded image.');
    return 'uploads/' . trim($folder, '/') . '/' . $name;
}
