#! /usr/bin/env python
#-*- coding: utf-8 -*-
import os
import sys
import json
import argparse
import tempfile
import subprocess
import hashlib


def main(argv=sys.argv[1:]):
    parser = argparse.ArgumentParser()
    parser.add_argument('dump')
    parser.add_argument('path')
    parser.add_argument('api')
    opts = parser.parse_args()

    api_data = []
    for root, dirs, files in os.walk(opts.path):
        for filename in files:
            target = root if filename == 'index.html' else os.path.join(root, filename)
            if target.endswith('/'):
                target = target[:-1]
            if target.endswith('~'):
                continue
            url = 'http://0.0.0.0:8000/{}'.format(target)
            thumbnail = os.path.join('api/slides', '{}.png'.format(hashlib.md5(target.encode('utf8')).hexdigest()))
            output = tempfile.TemporaryFile()
            child = subprocess.Popen('phantomjs {} "{}" {}'.format(opts.dump, url, thumbnail), shell=True, stdout=output)
            child.wait()
            output.seek(0)
            buf = output.read()
            api_data.append(json.loads(buf.decode('utf8').strip()))
    with open(opts.api, 'w+b') as fp:
        fp.write(json.dumps(api_data).encode('utf8'))

if __name__ == '__main__':
    main()
