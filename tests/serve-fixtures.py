"""Local-only failure fixtures. Run from the project: python3 tests/serve-fixtures.py"""
from http.server import ThreadingHTTPServer,SimpleHTTPRequestHandler
from pathlib import Path
from urllib.parse import urlsplit
import json
root=Path(__file__).resolve().parent.parent/'dist'
class Handler(SimpleHTTPRequestHandler):
 def __init__(self,*args,**kwargs):super().__init__(*args,directory=str(root),**kwargs)
 def do_GET(self):
  original=urlsplit(self.path).path
  mode=original.split('/')[1]
  if mode in ('invalid','missing'):
   self.path='/'+original.split('/',2)[-1]
   if self.path=='/content.json':
    if mode=='invalid':body=b'{bad json'
    else:
     d=json.loads((root/'content.json').read_text());d['welcomes'][0]['image']='assets/missing.jpg';body=json.dumps(d).encode()
    self.send_response(200);self.send_header('Content-Type','application/json');self.end_headers();self.wfile.write(body);return
  super().do_GET()
print('Local failure fixtures at http://127.0.0.1:8766/invalid/?nosw=1 and /missing/?nosw=1',flush=True)
ThreadingHTTPServer(('127.0.0.1',8766),Handler).serve_forever()
