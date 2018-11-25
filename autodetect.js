var start = 0;
var unixTime = require('unix-time');
var latest = 0;
var tmp = 0;
var socket = require('socket.io-client')('http://172.22.100.200:81');
var spoken = false;

socket.on('connect', function(){
    //先傳001給server
    socket.emit('handshake1','001');
});
socket.on("service", function(data) {
    if (data==404) {
        latest=0;
        spoken=false;
    }
});
var flag=0;
socket.on('handshake2', function(data){
    //伺服器回傳002
    if (flag) return;
    flag=1;
    console.log(data);
    var child = require('child_process').spawn('./darknet', ['detector', 'demo', 'data/coco.data', 'cfg/yolov3-tiny-coco.cfg', 'coco.weight', 'http://127.0.0.1:8081/video.mjpg', '-i', '0', '-dont_show', '-ext_output']);
    child.stdout.on('data', function(data) {
        if (data.toString().includes("person")) {
            tmp=unixTime(new Date());
            if (tmp-latest>10) {
                //離開後再回來
                start=tmp;
                latest=tmp;
                spoken=false;
                socket.emit("service",401);
            } else {
                if (tmp-latest<10 && tmp!=latest) {
                    //一直在webcam前面  (離上次被偵測到10秒鐘內)
                    console.log("person  " + tmp);
                    latest=tmp;
                    if (latest>start+10) {
                        //從開始被偵測到已經超過10秒鐘
                        //401
                        socket.emit("chatroom","有人在webcam前面超過10秒-" + latest);
                        //socket.emit("service",401);
                        if (!spoken) {
                            socket.emit("service",402);
                            //socket.emit('speak',"你好，請問有什麼事嗎?");
                            spoken = true;
                        }
                        console.log("sent");
                        
                    }
                    setTimeout(function() {
                        if (unixTime(new Date()) > latest+10) {
                            console.log("403-" + unixTime(new Date()));
                            socket.emit("service",403);
                        }
                    },6000);
                }
            }
        }
    });
    child.on('close',function() {
        console.log('child process ended.');
        socket.close();
    })
});