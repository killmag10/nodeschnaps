var hashes = {
    'sha1'   : 'afe754dd600e06d8760d693f156f1b4dbe83637f',
    'sha224' : '8091b54d896ae1458d301df63263a38d9a717beb8f341ee7c15a2b1c',
    'sha256' : 'cfd1939e8cb0b3a3670c73642debb427d00ea1397da81b689a16e94da0cc90bc',
    'sha384' : '12e3120278c913ac9c8fd3d4cafa83d6b254a3abdfe62d24e7319540d93c7adf4196f62c34695c556285e3878dbdf765',
    'sha512' : '5f7891cb584540398021958f85bb14f988208d80d147f3aab56ed6350a844fd7479f4175183c01dff08f89fdf7fec25a218ab38cee954a49aab76839baf0c96f',
    'md5'    : '3ea8b8314067daab252a9ed2c5783cc2',
    'rmd160' : '006b7845f6454c41b28dca282f4050660a7f1f98'
//    'sha224WithRSAEncryption',
//    'RSA-SHA224',
//    'sha256WithRSAEncryption',
//    'RSA-SHA256',
//    'sha384WithRSAEncryption',
//    'RSA-SHA384',
//    'sha512WithRSAEncryption',
//    'RSA-SHA512',
//    'RSA-SHA1',
//    'ecdsa-with-SHA1',
//    'DSA-SHA',
//    'DSA-SHA1',
//    'DSA',
//    'DSA-WITH-SHA224',
//    'DSA-SHA224',
//    'DSA-WITH-SHA256',
//    'DSA-SHA256',
//    'DSA-WITH-SHA384',
//    'DSA-SHA384',
//    'DSA-WITH-SHA512',
//    'DSA-SHA512',
//    'DSA-RIPEMD160',
//    'ripemd160WithRSA',
//    'RSA-RIPEMD160',
//    'md5WithRSAEncryption',
//    'RSA-MD5'
};

QUnit.test( "crypto", function() {
    var crypto = require('crypto');

    QUnit.ok(
        crypto instanceof Object,
        "crypto is in instance of Object"
    );   
});

QUnit.test( "crypto.createHash", function() {
    var crypto = require('crypto');

    Object.keys(hashes).forEach(function(hashName) {
        var hash = crypto.createHash(hashName);
        hash.update('test data 123');
        var result = hash.digest();

        QUnit.ok(
            result instanceof Buffer,
            hashName + ": hash.digest() return instance of Buffer"
        );

        QUnit.ok(
            result.toString('hex') === hashes[hashName],
            hashName + ": hash should be " + hashes[hashName]
        );
    });
});

