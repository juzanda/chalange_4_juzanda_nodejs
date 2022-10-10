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
  json : 'application/json; charset=UTF-8'
};

const STATIC_PATH = path.join(process.cwd(), ''); 

const toBool = [() => true, () => false]; 

const prepareFile = async (url) => { 
  const paths = [STATIC_PATH, url]; 
  if (url.endsWith('/')) paths.push('/index.html'); 
  if (!url.startsWith('/node_modules')) paths[0] += '/public';
  //sif (!url.startsWith('/data')) paths[0] += '/public';
  
  const filePath = path.join(...paths);
  //console.log(filePath);
  const pathTraversal = !filePath.startsWith(STATIC_PATH) 
  const exists = await fs.promises.access(filePath).then(...toBool);
  const found = !pathTraversal && exists; 
  const streamPath = found ? filePath : STATIC_PATH + '/public/404.html'; 
  const ext = path.extname(streamPath).substring(1).toLowerCase(); 
  const stream = fs.createReadStream(streamPath);  
  return { found, ext, stream }; 
};


http.createServer(async (req, res) => {
  if(req.url === '/carimobil'){
    req.url = '/index_tes.html'
  }
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