const http = require('http');
const { PORT = 1337 } = process.env;

const fs = require('fs');
const path = require('path');

const MIME_TYPES = {
  default: 'application/octet-stream',
  html: 'text/html; charset=UTF-8',
  js: 'application/javascript; charset=UTF-8',
  css: 'text/css',
  png: 'image/png',
  jpg: 'image/jpg',
  gif: 'image/gif',
  ico: 'image/x-icon',
  svg: 'image/svg+xml',
};

const STATIC_PATH = path.join(process.cwd(), './public'); // <--- nambah public
const MODULES_PATH = path.join(process.cwd(), './node_modules'); // <--- nambah node_modules
const ROOT_PATH = path.join(process.cwd(), ''); // <--- nambah root


const toBool = [() => true, () => false];

const prepareFile = async (url) => {
  const paths = [STATIC_PATH, url];
  if (url.endsWith('/')) paths.push('index.html');
  if (url.startsWith('/node_modules')) paths[0] = ROOT_PATH // <--- nambah node_modules
  const filePath = path.join(...paths);
  const pathTraversal = !filePath.startsWith(STATIC_PATH) && !filePath.startsWith(MODULES_PATH); // <--- nambah node_modules
  const exists = await fs.promises.access(filePath).then(...toBool);
  const found = !pathTraversal && exists;
  const streamPath = found ? filePath : STATIC_PATH + '/404.html';
  const ext = path.extname(streamPath).substring(1).toLowerCase();
  const stream = fs.createReadStream(streamPath);
  return { found, ext, stream };
};

http.createServer(async (req, res) => {
  const file = await prepareFile(req.url);
  const statusCode = file.found ? 200 : 404;
  const mimeType = MIME_TYPES[file.ext] || MIME_TYPES.default;
  res.writeHead(statusCode, { 'Content-Type': mimeType });
  file.stream.pipe(res);
  console.log(`${req.method} ${req.url} ${statusCode}`);
}).listen(PORT, 'localhost', () => {
  console.log("Server sudah berjalan, silahkan buka http://localhost:%d", PORT);
})


// Kalau 0.0.0.0 tidak bisa, bisa diganti 'localhost' atau '127.0.0.1'