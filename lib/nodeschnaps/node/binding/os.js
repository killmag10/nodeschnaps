/**
 * The os module wrapper.
 *
 * @module nodeschnaps/lib/os.js
 * @author Lars Dietrich <lars@dietrich-hosting.de>
 */

var ByteOrder = java.nio.ByteOrder;
var InetAddress = java.net.InetAddress;
var ManagementFactory = java.lang.management.ManagementFactory;
var System = java.lang.System;
var Runtime = java.lang.Runtime;
var NetworkInterface = java.net.NetworkInterface;

/**
 * The os object.
 */
var os = {};

os.getEndianness = function() {
    if (ByteOrder.nativeOrder().equals(ByteOrder.BIG_ENDIAN)) {
        return 'BE';
    }

    return 'LE';
};

os.getHostname = function() {
    return String(InetAddress.getLocalHost().getHostName());
};

os.getOSType = function() {
    return String(System.getProperty("os.name"));
};

os.getOSRelease = function() {
    return String(System.getProperty("os.version"));
};

os.getLoadAvg = function() {
    var load = Number(
        ManagementFactory
            .getOperatingSystemMXBean()
            .getSystemLoadAverage()
    );

    return [load, load, load];
};

os.getUptime = function() {
    return 0;
};

os.getCPUs = function() {
    // No esay way to get this information in java, so we return fake data.
    var result = [];
    var cpuCount = Runtime.getRuntime().availableProcessors();
    for (var i = 0; i < cpuCount; i++) {
        result.push({
            model: 'Java CPU Core',
            speed: 0,
            times: {
                user: 0,
                nice: 0,
                sys: 0,
                idle: 0,
                irq: 0
            }
        });
    }
    return result;
};

os.getFreeMem = function() {
    // I know it's not the system memory, put there is no esay way to get it.
    return Number(Runtime.getRuntime().freeMemory());
};

os.getTotalMem = function() {
    // I know it's not the system memory, put there is no esay way to get it.
    return Number(Runtime.getRuntime().maxMemory());
};

os.getInterfaceAddresses = function() {
    var result = {};
    var networkInterfaces = NetworkInterface.getNetworkInterfaces();
    while (networkInterfaces.hasMoreElements()) {
        var networkInterface = networkInterfaces.nextElement();
        var mac = Java.from(networkInterface.getHardwareAddress());
        if (mac) {
            mac = mac.reduce(function(buffer, byte, i) {
                buffer.writeInt8(byte, i);
                return buffer;
            }, Buffer.alloc(6)).toString('hex').match(/.{1,2}/g).join(':');
        }
        result[networkInterface.getName()] = Java.from(networkInterface
        .getInterfaceAddresses().toArray()).map(function(address) {
            var result = {
                address: String(address.getAddress().getHostAddress()).split('%')[0],
                family: address.getAddress() instanceof java.net.Inet6Address ? 'IPv6' : 'IPv4',
                mac: mac,
                internal:  address.getAddress().isAnyLocalAddress()
            };

            if (address.getAddress().getScopeId) {
                result.scopeid = address.getAddress().getScopeId();
            }

            var networkPrefixToMaskBuffer = function(size, prefixLength) {
                var prefixFullBytesLength = Math.floor(prefixLength / 8);
                var buffer = Buffer.alloc(size)
                    .fill(255, 0, prefixFullBytesLength);
                if (prefixFullBytesLength < size) {
                    buffer.fill(
                        255 >>> (8 - (prefixLength % 8)),
                        prefixFullBytesLength,
                        prefixFullBytesLength + 1
                    );
                }

                return buffer;
            };

            if (result.family === 'IPv6') {
                var buffer = networkPrefixToMaskBuffer(16, address.getNetworkPrefixLength());
                result.netmask = buffer.toString('hex')
                    .match(/.{1,4}/g).map(function(item) {
                        return item.replace(/^0{1,3}/, '');
                    }).join(':').replace(/:(0:)+/, '::').replace(/::0$/, '::');
            } else {
                var buffer = networkPrefixToMaskBuffer(4, address.getNetworkPrefixLength());
                result.netmask = Object.keys(buffer).map(function(key) {
                    return buffer[key];
                }).join('.');
            }

            result.cidr = result.address + '/' + address.getNetworkPrefixLength();

            return result;
        });
    }

    return result;
};

module.exports = os;
