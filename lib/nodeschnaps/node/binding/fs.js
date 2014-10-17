var util = require("util");
var async = require('../../async.js');

var JavaString = java.lang.String;
var JavaReflectArray = java.lang.reflect.Array
var JavaLangByte = java.lang.Byte;
var JavaFile = java.io.File;
var JavaFileInputStream = java.io.FileInputStream;
var JavaFileOutputStream = java.io.FileOutputStream;
var JavaFiles = null;
var JavaBasicFileAttributeView = null;
// If Java 7 use java.nio.file.Files
if (false && typeof java.nio.file.Files === 'function') {
    JavaFiles = java.nio.file.Files;
    JavaBasicFileAttributeView = java.nio.file.attribute.BasicFileAttributeView;
}

var constants = process.binding('constants');
var O_APPEND = constants.O_APPEND || 0;
var O_CREAT = constants.O_CREAT || 0;
var O_DIRECTORY = constants.O_DIRECTORY || 0;
var O_EXCL = constants.O_EXCL || 0;
var O_NOCTTY = constants.O_NOCTTY || 0;
var O_NOFOLLOW = constants.O_NOFOLLOW || 0;
var O_RDONLY = constants.O_RDONLY || 0;
var O_RDWR = constants.O_RDWR || 0;
var O_SYMLINK = constants.O_SYMLINK || 0;
var O_SYNC = constants.O_SYNC || 0;
var O_TRUNC = constants.O_TRUNC || 0;
var O_WRONLY = constants.O_WRONLY || 0;

var FdList = function(){};

function FdList() {
    Array.call(this);
}
util.inherits(FdList, Array);


FdList.prototype.add = function add(value)
{
    for (var key in this) {
        if (this[key] === undefined) {
            this[key] = value;
            return Number(key);
        }
    }

    return this.push(value) - 1;
};

FdList.prototype.get = function get(key)
{
    return this[key];
};

FdList.prototype.remove = function remove(key)
{
    this[key] = undefined;
};

fdList = new FdList();

var fs = {};

fs.open = function open(path, flags, mode, callback)
{
    if (path === undefined) throw new TypeError("path required");
    if (flags === undefined) throw new TypeError("flags required");
    if (mode === undefined) throw new TypeError("mode required");
    if (typeof path.valueOf() !== 'string') throw new TypeError("path must be a string");
    if (typeof flags.valueOf() !== 'number') throw new TypeError("flags must be an int");
    if (typeof mode.valueOf() !== 'number') throw new TypeError("mode must be an int");

    var open = function(path, flags, mode) {

        var fileHandle = {
            "read" : null,
            "write" : null,
            "fd" : null,
            "file" : new JavaFile(path),
            "sync" : false
        }

        if ((flags & O_EXCL) === O_EXCL) {
            var file = new JavaFile(fileHandle.file);
            if(file.exists()) {
                throw new Error('File already exists');
            }
        }

        if ((flags & O_WRONLY) === O_WRONLY) {
            fileHandle.write = new JavaFileOutputStream(
                fileHandle.file,
                Boolean(lags & O_APPEND)
            );
        } else {
            fileHandle.read = new JavaFileInputStream(fileHandle.file);
        }

        if ((flags & O_RDWR) === O_RDWR) {
            fileHandle.read = new JavaFileInputStream(fileHandle.file);
            fileHandle.write = new JavaFileOutputStream(
                fileHandle.read.getFD(),
                Boolean(lags & O_APPEND)
            );
        }

        fileHandle.fd = fileHandle.read
                ? fileHandle.read.getFD()
                : fileHandle.write.getFD();

        if ((flags & O_TRUNC) === O_TRUNC) {
            fileHandle.write.getChannel().truncate(0);
        }

        if ((flags & O_SYNC) === O_SYNC) {
            fileHandle.sync = true;
            fileHandle.fd.sync();
        }

        return fdList.add(fileHandle);
    }

    if (callback) {
        async.call(
            function() {
                return open(path, flags, mode);
            },
            callback
        )
    } else {
        return open(path, flags, mode);
    }
}

fs.close = function close(fd, callback)
{
    if (typeof fd.valueOf() !== 'number') {
        throw new TypeError("fd must be an integer");
    }
    
    var close = function(fd)
    {
        var fileHandle = fdList.get(fd);

        if (fileHandle.sync) fileHandle.fd.sync();
        if (fileHandle.read !== null) fileHandle.read.close();
        if (fileHandle.write !== null) fileHandle.write.close();
        
        fdList.remove(fd);
    }

    if (callback) {
        async.call(
            function() {
                return close(fd);
            },
            callback
        )
    } else {
        return close(fd);
    }
}

fs.read = function read(fd, buffer, offset, length, position, callback)
{
    if (typeof fd.valueOf() !== 'number') {
        throw new TypeError("fd must be an integer");
    }
    
    if (!(buffer instanceof Buffer)) {
        throw new TypeError("Second argument needs to be a buffer");
    }

    if (offset >= buffer.length) {
        throw new Error("Offset is out of bounds");
    }
    
    if ((offset + length) > buffer.length) {
        throw new Error("Length extends beyond buffer");
    }
    
    var read = function(fd, buffer, offset, length, position)
    {
        var fileHandle = fdList.get(fd);
        
        if (fileHandle.read === null) {
            throw new Error("Not opend with read access.");
        }
        
        var javabuffer = JavaReflectArray.newInstance(
            JavaLangByte.TYPE,
            length
        );
        
        var readedLength = Number(fileHandle.read.read(javabuffer, 0, length));
        var dataBuffer = new Buffer(
            String(new JavaString(javabuffer))
        );
        
        dataBuffer.copy(buffer, offset);
        
        return readedLength;
    }

    if (callback) {
        async.call(
            function() {
                return read(fd, buffer, offset, length, position);
            },
            callback
        )
    } else {
        return read(fd, buffer, offset, length, position);
    }
}

fs.fstat = function fstat(fd, callback)
{
    if (typeof fd.valueOf() !== 'number') {
        throw new TypeError("fd must be an integer");
    }

    var fstat = function(fd)
    {
        var fileHandle = fdList.get(fd);

        if (JavaFiles !== null) {
            var fileAttributes = JavaFiles.getFileAttributeView(
                fileHandle.file.toPath(),
                JavaBasicFileAttributeView.class
            ).readAttributes();
        }

        return {
            dev: null,
            ino: fileAttributes ? fileAttributes.fileKey() : null,
            mode: null,
            nlink: null,
            uid: null,
            gid: null,
            rdev: null,
            size: fileHandle.read
                ? Number(fileHandle.read.getChannel().size())
                : Number(fileHandle.write.getChannel().size()),
            blksize: null,
            blocks: null,
            atime: fileAttributes
                ? new Date(fileAttributes.lastAccessTime().toMillis()) : null,
            mtime: fileAttributes
                ? new Date(fileAttributes.lastModifiedTime().toMillis()) : null,
            ctime: fileAttributes
                ? new Date(fileAttributes.creationTime().toMillis()) : null
        }
    }

    if (callback) {
        async.call(
            function() {
                return fstat(fd);
            },
            callback
        )
    } else {
        return fstat(fd);
    }
}

fs.Stats = function() {};

module.exports = fs;
