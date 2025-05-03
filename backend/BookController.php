<?php
class BookController {
    public static function index() {
        Flight::json(BookModel::getAll());
    }

    public static function store() {
        $data = Flight::request()->data->getData();
        Flight::json(BookModel::create($data));
    }

    public static function update($id) {
        $data = Flight::request()->data->getData();
        Flight::json(BookModel::update($id, $data));
    }

    public static function destroy($id) {
        Flight::json(BookModel::delete($id));
    }
}
