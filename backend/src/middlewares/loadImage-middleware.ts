// import multer, { Multer } from "multer";
// import path from "path";
// import fs from "fs"; // Модуль fs для работы с файловой системой.

// const uploadDir = "public/images"; // Имя директории для загрузки файлов.
// const uploadGeoJson = "geojsons"; // Имя директории для загрузки файлов.

// // Создаем папку для загрузок, если она не существует
// if (!fs.existsSync(uploadGeoJson)) {
//   fs.mkdirSync(uploadGeoJson);
// }

// // Устанавливаем путь для хранения загруженных изображений
// const geoJsonStorage = multer.diskStorage({
//   destination: (req, file, callback) => {
//     callback(null, uploadGeoJson); // Изображения будут сохраняться в папку "uploads"
//   },
//   filename: (req, file, callback) => {
//     const ext = path.extname(file.originalname);
//     callback(null, Date.now() + ext); // Генерируем уникальное имя файла
//   },
// });

// // Создаем middleware для загрузки файлов с помощью multer
// export const loadGeoJsonMiddleware: Multer = multer({
//   storage: geoJsonStorage,
// });

// // Устанавливаем путь для хранения загруженных изображений
// const storage = multer.diskStorage({
//   destination: (req, file, callback) => {
//     callback(null, uploadDir); // Изображения будут сохраняться в папку "uploads"
//   },
//   filename: (req, file, callback) => {
//     const ext = path.extname(file.originalname);
//     callback(null, Date.now() + ext); // Генерируем уникальное имя файла
//   },
// });

// // Создаем middleware для загрузки файлов с помощью multer
// const loadImageMiddleware: Multer = multer({ storage: storage });

// export default loadImageMiddleware;
