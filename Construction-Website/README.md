# Yashaswi Groups PHP Website

## Run locally with XAMPP

1. Install and open XAMPP, then start **Apache** and **MySQL**.
2. Copy this folder into `C:\xampp\htdocs\Construction-Website`.
3. Open `http://localhost/phpmyadmin`, choose **Import**, and import [database/yashaswi.sql](database/yashaswi.sql).
4. Check `includes/config.php`. The included defaults work for XAMPP (`root` user with an empty password). Change `BASE_URL` if the folder name is different.
5. Open `http://localhost/Construction-Website/`.

## Admin

Open `http://localhost/Construction-Website/admin/login.php`.

- Username: `admin`
- Initial password: `password`

Change this initial password immediately from **Settings** after the first login.

## Deployment

Create a MySQL database on your hosting control panel, import `database/yashaswi.sql`, then update the four database constants and `BASE_URL` in `includes/config.php`. Ensure the `uploads` folder is writable by PHP (normally permissions `755` on shared hosting).
