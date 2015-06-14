var util = require("util");
var async = require('../../async.js');

var jsEngine = require('../../engine.js');

var JavaString = java.lang.String;
var JavaReflectArray = java.lang.reflect.Array
var JavaLangByte = java.lang.Byte;
var JavaFile = java.io.File;
var JavaNioFiles = java.nio.file.Files;
var JavaNioPaths = java.nio.file.Paths;
var JavaFileInputStream = java.io.FileInputStream;
var JavaFileOutputStream = java.io.FileOutputStream;
var JavaFiles = null;
var JavaBasicFileAttributeView = null;
var JavaFiles = java.nio.file.Files;
var JavaBasicFileAttributeView = java.nio.file.attribute.BasicFileAttributeView;
var JavaFileAttributeFileTime = java.nio.file.attribute.FileTime;

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

var FdList = function FdList() {
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
    var fd = this[key];

    if (fd === undefined) {
        throw new ReferenceError('File descriptor not found: ' +  key);
    }

    return fd;
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

        if ((flags & O_SYMLINK) === O_SYMLINK) {
            fileHandle.file = fileHandle.file.getCanonicalFile();
        }

        if ((flags & O_EXCL) === O_EXCL) {
            var file = new JavaFile(fileHandle.file);
            if(file.exists()) {
                throw new Error('File already exists');
            }
        }

        if ((!fileHandle.file.isDirectory())) {
            if ((flags & O_WRONLY) === O_WRONLY) {
                fileHandle.write = new JavaFileOutputStream(
                    fileHandle.file,
                    Boolean(flags & O_APPEND)
                );
            } else {
                fileHandle.read = new JavaFileInputStream(fileHandle.file);
            }

            if ((flags & O_RDWR) === O_RDWR) {
                fileHandle.write = new JavaFileOutputStream(
                    fileHandle.file,
                    Boolean(flags & O_APPEND)
                );
                fileHandle.read = new JavaFileInputStream(
                    fileHandle.read.getFD()
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
        }

        return fdList.add(fileHandle);
    }

    if (callback) {
        async.call(
            function() {
                return open(path, flags, mode);
            },
            callback.oncomplete
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
            callback.oncomplete
        )
    } else {
        return close(fd);
    }
}

fs.fsync = function fsync(fd, callback)
{
    if (typeof fd.valueOf() !== 'number') {
        throw new TypeError("fd must be an integer");
    }

    var fsync = function(fd)
    {
        var fileHandle = fdList.get(fd);

        fileHandle.fd.sync();
    }

    if (callback) {
        async.call(
            function() {
                return fsync(fd);
            },
            callback.oncomplete
        )
    } else {
        return fsync(fd);
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

        if (position !== null && position !== undefined && position >= 0) {
            fileHandle.read.getChannel().position(position);
        }

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
            callback.oncomplete
        )
    } else {
        return read(fd, buffer, offset, length, position);
    }
}

fs.writeBuffer = function writeBuffer(fd, buffer, offset, length, position, callback)
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
        throw new Error("off + len > buffer.length");
    }

    var write = function(fd, buffer, offset, length, position)
    {
        var fileHandle = fdList.get(fd);

        if (fileHandle.write === null) {
            throw new Error("Not opend with write access.");
        }

        var javabuffer = new JavaString(buffer.toString('binary'));
        javabuffer = javabuffer.getBytes();

        if (position !== null && position !== undefined && position >= 0) {
            fileHandle.write.getChannel().position(position);
        }

        fileHandle.write.write(javabuffer, 0, length);
        var writtenLength = javabuffer.length - offset;
        if (writtenLength > length) {
            writtenLength = length;
        }

        return writtenLength;
    }

    if (callback) {
        async.call(
            function() {
                return write(fd, buffer, offset, length, position);
            },
            callback.oncomplete
        )
    } else {
        return write(fd, buffer, offset, length, position);
    }
}

fs.writeString = function writeString(fd, buffer, offset, length, position, callback)
{
    buffer = new Buffer('' + buffer, length);
    offset = 0;
    length = buffer.length;

    fs.writeBuffer(fd, buffer, offset, length, position, callback);
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
            var view = JavaBasicFileAttributeView;
            
            if (jsEngine.getEngineId() !== jsEngine.ENGINE_RHINO) {
                view = JavaBasicFileAttributeView.class;
            }
            
            var fileAttributes = JavaFiles.getFileAttributeView(
                fileHandle.file.toPath(),
                view
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
                : null,
            blksize: null,
            blocks: null,
            atime: fileAttributes
                ? new Date(fileAttributes.lastAccessTime().toMillis()) : null,
            mtime: fileAttributes
                ? new Date(fileAttributes.lastModifiedTime().toMillis()) : null,
            ctime: fileAttributes
                ? new Date(fileAttributes.creationTime().toMillis()) : null,
            isFile : function isFile() {
                return fileHandle.file.isFile();
            },
            isDirectory : function isDirectory() {
                return fileHandle.file.isDirectory();
            },
            isBlockDevice : function isBlockDevice() {
                return false;
            },
            isCharacterDevice : function isCharacterDevice() {
                return false;
            },
            isSymbolicLink : function isSymbolicLink() {
                return JavaNioFiles.isSymbolicLink(fileHandle.file.toPath());
            },
            isFIFO : function isFIFO() {
                return false;
            },
            isSocket : function isSocket() {
                return false;
            }

        }

    }

    if (callback) {
        async.call(
            function() {
                return fstat(fd);
            },
            callback.oncomplete
        )
    } else {
        return fstat(fd);
    }
};

fs.ftruncate = function fstat(fd, len, callback)
{
    if (typeof fd.valueOf() !== 'number') {
        throw new TypeError("fd must be an integer");
    }

    if (typeof len.valueOf() !== 'number') {
        throw new TypeError("len must be an integer");
    }

    var ftruncate = function(fd, len)
    {
        var fileHandle = fdList.get(fd);

        if (fileHandle.write === null) {
            throw new Error("Not opend with write access.");
        }

        fileHandle.write.getChannel().truncate(len);

        return;
    }

    if (callback) {
        async.call(
            function() {
                return ftruncate(fd, len);
            },
            callback.oncomplete
        )
    } else {
        return ftruncate(fd, len);
    }
};

fs.stat = function stat(path, callback)
{
    if (path === undefined) throw new TypeError("path required");
    if (typeof path.valueOf() !== 'string') throw new TypeError("path must be a string");

    var stat = function(path)
    {
        var fd = fs.open(
            path,
            constants.O_RDONLY | constants.O_SYMLINK,
            0
        );
        var result = fs.fstat(fd);
        fs.close(fd);

        return result;
    }

    if (callback) {
        async.call(
            function() {
                return stat(path);
            },
            callback.oncomplete
        )
    } else {
        return stat(path);
    }
};

fs.lstat = function stat(path, callback)
{
    if (path === undefined) throw new TypeError("path required");
    if (typeof path.valueOf() !== 'string') throw new TypeError("path must be a string");

    var stat = function(path)
    {
        var fd = fs.open(
            path,
            constants.O_RDONLY,
            0
        );
        var result = fs.fstat(fd);
        fs.close(fd);

        return result;
    }

    if (callback) {
        async.call(
            function() {
                return stat(path);
            },
            callback.oncomplete
        )
    } else {
        return stat(path);
    }
};

fs.unlink = function unlink(path, callback)
{
    if (path === undefined) throw new TypeError("path required");
    if (typeof path.valueOf() !== 'string') throw new TypeError("path must be a string");

    var unlink = function(path)
    {
        var file = new JavaFile(path);
        if (file.isDirectory()) {
            throw new Error('Path "' + path + '" is a directory');
        }

        if(!file.delete()){
            throw new Error('Error by unlink: ' + path);
        }
    }

    if (callback) {
        async.call(
            function() {
                return unlink(path);
            },
            callback.oncomplete
        )
    } else {
        return unlink(path);
    }
};

fs.mkdir = function mkdir(path, mode, callback)
{
    if (path === undefined) throw new TypeError("path required");
    if (typeof path.valueOf() !== 'string') throw new TypeError("path must be a string");

    var mkdir = function(path)
    {
        var file = new JavaFile(path);

        if(!file.mkdir()){
            throw new Error('Error by creating directory: ' + path);
        }
    }

    if (callback) {
        async.call(
            function() {
                return mkdir(path, mode);
            },
            callback.oncomplete
        )
    } else {
        return mkdir(path, mode);
    }
};

fs.readlink = function readlink(path, callback)
{
    if (path === undefined) throw new TypeError("path required");
    if (typeof path.valueOf() !== 'string') throw new TypeError("path must be a string");

    var readlink = function(path)
    {
        return String(new JavaFile(path).getCanonicalFile());
    }

    if (callback) {
        async.call(
            function() {
                return readlink(path);
            },
            callback.oncomplete
        )
    } else {
        return readlink(path);
    }
};


fs.rmdir = function rmdir(path, callback)
{
    if (path === undefined) throw new TypeError("path required");
    if (typeof path.valueOf() !== 'string') throw new TypeError("path must be a string");

    var rmdir = function(path)
    {
        var file = new JavaFile(path);
        if (!file.isDirectory()) {
            throw new Error('Path "' + path + '" is not a directory');
        }

        if(!file.delete()){
            throw new Error('Error by deleting directory: ' + path);
        }
    }

    if (callback) {
        async.call(
            function() {
                return rmdir(path);
            },
            callback.oncomplete
        )
    } else {
        return rmdir(path);
    }
};

fs.readdir = function readdir(path, callback)
{
    if (path === undefined) throw new TypeError("path required");
    if (typeof path.valueOf() !== 'string') throw new TypeError("path must be a string");

    var readdir = function(path)
    {
        var file = new JavaFile(path);
        if (!file.isDirectory()) {
            throw new Error('Path "' + path + '" is not a directory');
        }

        var files = file.listFiles();
        if (files === null) {
            return new Array();
        }

        return Java.from(file.list()).map(function(file){
            return String(file);
        });
    }

    if (callback) {
        async.call(
            function() {
                return readdir(path);
            },
            callback.oncomplete
        )
    } else {
        return readdir(path);
    }
};

fs.rename = function rename(oldPath, newPath, callback)
{
    if (oldPath === undefined) throw new TypeError("oldPath required");
    if (typeof oldPath.valueOf() !== 'string') throw new TypeError("oldPath must be a string");
    if (newPath === undefined) throw new TypeError("newPath required");
    if (typeof newPath.valueOf() !== 'string') throw new TypeError("newPath must be a string");

    var rename = function(oldPath, newPath)
    {
        var oldFile = new JavaFile(oldPath);
        var newFile = new JavaFile(newPath);

        if(!oldFile.renameTo(newFile)){
            throw new Error('Error by rename file from "' + oldPath +'" to "' + newPath + '".' );
        }
    }

    if (callback) {
        async.call(
            function() {
                return rename(oldPath, newPath);
            },
            callback.oncomplete
        )
    } else {
        return rename(oldPath, newPath);
    }
};

fs.link = function link(srcpath, dstpath, callback)
{
    if (srcpath === undefined) throw new TypeError("src required");
    if (typeof srcpath.valueOf() !== 'string') throw new TypeError("src must be a string");

    if (dstpath === undefined) throw new TypeError("dest required");
    if (typeof dstpath.valueOf() !== 'string') throw new TypeError("dest must be a string");

    var link = function(srcpath, dstpath)
    {
        var result = JavaNioFiles.createLink(
            new JavaFile(dstpath).toPath(),
            new JavaFile(srcpath).toPath()
        );

        if(!result){
            throw new Error('Error by creating symbolic link: ' + srcpath);
        }
    }

    if (callback) {
        async.call(
            function() {
                return link(srcpath, dstpath);
            },
            callback.oncomplete
        )
    } else {
        return link(srcpath, dstpath);
    }
};

fs.symlink = function symlink(srcpath, dstpath, type, callback)
{
    if (srcpath === undefined) throw new TypeError("src required");
    if (typeof srcpath.valueOf() !== 'string') throw new TypeError("src must be a string");

    if (dstpath === undefined) throw new TypeError("dest required");
    if (typeof dstpath.valueOf() !== 'string') throw new TypeError("dest must be a string");

    var symlink = function(srcpath, dstpath)
    {
        var result = JavaNioFiles.createSymbolicLink(
            new JavaFile(dstpath).toPath(),
            new JavaFile(srcpath).toPath(),
            new Array()
        );

        if(!result){
            throw new Error('Error by creating symbolic link: ' + srcpath);
        }
    }

    if (callback) {
        async.call(
            function() {
                return symlink(srcpath, dstpath, type);
            },
            callback.oncomplete
        )
    } else {
        return symlink(srcpath, dstpath, type);
    }
};


var utimes = function(file, atime, mtime)
{
    if (!(file instanceof JavaFile)) {
        var file = new JavaFile(file);
    }

    JavaFiles.setAttribute(
        file.toPath(),
        "lastAccessTime",
        JavaFileAttributeFileTime.fromMillis(atime)
    );

    JavaFiles.setAttribute(
        file.toPath(),
        "lastModifiedTime",
        JavaFileAttributeFileTime.fromMillis(mtime)
    );
}

fs.utimes = function mkdir(path, atime, mtime, callback)
{
    if (path === undefined) throw new TypeError("path is required");
    if (atime === undefined) throw new TypeError("atime is required");
    if (mtime === undefined) throw new TypeError("mtime is required");
    if (typeof path.valueOf() !== 'string') throw new TypeError("path must be a string");
    if (typeof atime.valueOf() !== 'number') throw new TypeError("atime must be a number");
    if (typeof mtime.valueOf() !== 'number') throw new TypeError("mtime must be a number");

    if (callback) {
        async.call(
            function() {
                return utimes(path, atime, mtime);
            },
            callback.oncomplete
        )
    } else {
        return utimes(path, atime, mtime);
    }
};

fs.futimes = function mkdir(fd, atime, mtime, callback)
{
    if (fd === undefined) throw new TypeError("fd is required");
    if (atime === undefined) throw new TypeError("atime is required");
    if (mtime === undefined) throw new TypeError("mtime is required");
    if (typeof fd.valueOf() !== 'number') throw new TypeError("fd must be a number");
    if (typeof atime.valueOf() !== 'number') throw new TypeError("atime must be a number");
    if (typeof mtime.valueOf() !== 'number') throw new TypeError("mtime must be a number");

    if (callback) {
        async.call(
            function() {
                var fileHandle = fdList.get(fd);

                return utimes(fileHandle.file, atime, mtime);
            },
            callback.oncomplete
        )
    } else {
        var fileHandle = fdList.get(fd);

        return utimes(fileHandle.file, atime, mtime);
    }
}

// Mocks
fs.fchown = function fchown(fd, uid, gid, callback)
{
    if (callback) {
        callback.oncomplete(null);
    } else {
        return;
    }
};

fs.chown = function fchown(path, uid, gid, callback)
{
    if (callback) {
        callback.oncomplete(null);
    } else {
        return;
    }
};

fs.fchmod = function fchown(fd, mode, callback)
{
    if (callback) {
        callback.oncomplete(null);
    } else {
        return;
    }
};

fs.chmod = function fchown(path, mode, callback)
{
    if (callback) {
        callback.oncomplete(null);
    } else {
        return;
    }
};

fs.Stats = null;

fs.FSInitialize = function(Stats) {
    fs.Stats = Stats
};

fs.FSReqWrap = function(){};
fs.FSReqWrap.prototype.oncomplete = null;

module.exports = fs;
