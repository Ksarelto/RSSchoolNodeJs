import { Writable, Readable, Transform } from 'stream';
import { UsersErrors } from '../helpers/userErrors.js';
import fs from 'fs';
import { setErrorsMessage } from '../helpers/utils.js';

export class myReadableStream extends Readable {
  constructor(filename) {
    super();
    this.filename = filename;
    this.fd = null;
  }
  _construct(callback) {
    if (!fs.existsSync(this.filename)) {
      throw new UsersErrors('Input file is not exist');
    }
    fs.open(this.filename, (err, fd) => {
      if (err) {
        callback(err);
        setErrorsMessage(err);
      } else {
        this.fd = fd;
        callback();
      }
    });
  }
  _read(n) {
    const buf = Buffer.alloc(n);
    fs.read(this.fd, buf, 0, n, null, (err, bytesRead) => {
      if (err) {
        setErrorsMessage(err);
      } else {
        this.push(bytesRead > 0 ? buf.slice(0, bytesRead) : null);
      }
    });
  }
}

export class myWritableStream extends Writable {
  constructor(filename) {
    super();
    this.filename = filename;
  }
  _construct(callback) {
    if (!fs.existsSync(this.filename)) {
      throw new UsersErrors('Output file is not exist');
    }
    callback();
  }

  _write(chunk, encoding, callback) {
    fs.appendFile(this.filename, chunk, (err) => {
      if (err) {
        setErrorsMessage(err);
      }
    });
    callback();
  }
}

export class myTransformStream extends Transform {
  constructor(func, cipher, mode) {
    super();
    this.func = func;
    this.cipher = cipher;
    this.mode = mode;
  }
  _transform(chunk, encoding, result) {
    try {
      result(null, this.func(chunk.toString('utf-8'), this.cipher, this.mode));
    } catch (err) {
      result(err);
    }
  }
}
