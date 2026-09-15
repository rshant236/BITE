const http=require('http'),fs=require('fs'),path=require('path');
const root=__dirname,port=Number(process.env.PORT)||4174;
const types={'.html':'text/html; charset=utf-8','.css':'text/css','.js':'text/javascript','.jpg':'image/jpeg','.jpeg':'image/jpeg','.png':'image/png','.webp':'image/webp','.mp4':'video/mp4','.json':'application/json','.svg':'image/svg+xml'};
http.createServer((req,res)=>{let name;try{name=decodeURIComponent(new URL(req.url,'http://localhost').pathname)}catch{res.writeHead(400);return res.end()}
const file=path.resolve(root,'.'+(name==='/'?'/index.html':name));if(file!==root&&!file.startsWith(root+path.sep)){res.writeHead(403);return res.end()}
fs.stat(file,(err,stat)=>{if(err||!stat.isFile()){res.writeHead(404);return res.end('Not found')};const headers={'Content-Type':types[path.extname(file)]||'application/octet-stream','Accept-Ranges':'bytes','Cache-Control':'no-cache'};
let start=0,end=stat.size-1,status=200;if(req.headers.range){const match=/^bytes=(\d*)-(\d*)$/.exec(req.headers.range);if(!match){res.writeHead(416,{'Content-Range':`bytes */${stat.size}`});return res.end()};if(match[1]){start=Number(match[1]);if(match[2])end=Math.min(end,Number(match[2]))}else{start=Math.max(0,stat.size-Number(match[2]))};if(start>end||start>=stat.size){res.writeHead(416,{'Content-Range':`bytes */${stat.size}`});return res.end()};status=206;headers['Content-Range']=`bytes ${start}-${end}/${stat.size}`}
headers['Content-Length']=end-start+1;res.writeHead(status,headers);if(req.method==='HEAD')return res.end();const stream=fs.createReadStream(file,{start,end});stream.on('error',()=>res.destroy());res.on('close',()=>stream.destroy());stream.pipe(res);});
}).listen(port,'127.0.0.1',()=>console.log(`BITE is running at http://127.0.0.1:${port}`));
