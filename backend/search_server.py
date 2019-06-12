#!/usr/bin/env python3
import json, os
import socket, threading
from retrieval_model import load_inv, retrieval, init_retrieval
from codecs import encode, decode
import pandas as pd

config = json.load(open('config.example.json'))
if os.path.exists('config.json'):
    config = json.load(open('config.json'))

init_retrieval()
print('Loading inverted_file')
invert_file = load_inv(config['inv_file'])
print('Loading news url')
news_url = pd.read_csv(config['news_url']).iloc[:,1]
print('Loading title')
url_title = json.load(open(config['url2title']))
print('Loading content')
url_content = json.load(open(config['url2content']))

server = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
server.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1) #reuse tcp
server.bind(('', config['search_server']['port']))
server.listen(5)
print('Listening on %d' % config['search_server']['port'])

def handle_client(client_socket):
    request = client_socket.recv(1024)
    request = decode(request, 'utf8')
    print("[*] Received: %s" % request)

    docs = retrieval(request, invert_file)
    urls = [news_url[int(i.split('_')[-1])-1] for i in docs]
    content = [url_content[i] for i in urls]
    title = [url_title[i] for i in urls]
    news = [{'url': urls[i], 'title': title[i], 'content': content[i]} for i in range(len(urls))]
    ret = json.JSONEncoder(ensure_ascii=False).encode({'news': news})
    ret = encode(ret, 'utf8')
    client_socket.send(ret)
    client_socket.close()

try:
    while True:
        client, addr = server.accept()
        # print("Client Info: ", cserver, adr)
        print("[*] Acepted connection from: %s:%d" % (addr[0],addr[1]))
        client_handler = threading.Thread(target=handle_client, args=(client,))
        client_handler.start()
except KeyboardInterrupt:
    print('Closing socket server')
    server.close()
