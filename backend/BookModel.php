<?php
class BookModel {
    protected static function db() {
        static $pdo = null;
        if (!$pdo) {
            $pdo = new PDO('mysql:host=localhost;dbname=booktrackerDB', 'root', '');
            $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        }
        return $pdo;
    }

    public static function getAll() {
        return self::db()->query("SELECT * FROM books ORDER BY created_at DESC")->fetchAll(PDO::FETCH_ASSOC);
    }

    public static function create($data) {
        $stmt = self::db()->prepare("INSERT INTO books (title, author, genre, status) VALUES (?, ?, ?, ?)");
        $stmt->execute([$data['title'], $data['author'], $data['genre'], $data['status']]);
        return ['status' => 'success'];
    }

    public static function update($id, $data) {
        $stmt = self::db()->prepare("UPDATE books SET title = ?, author = ?, genre = ?, status = ? WHERE id = ?");
        $stmt->execute([$data['title'], $data['author'], $data['genre'], $data['status'], $id]);
        return ['status' => 'updated'];
    }

    public static function delete($id) {
        self::db()->prepare("DELETE FROM books WHERE id = ?")->execute([$id]);
        return ['status' => 'deleted'];
    }
}
