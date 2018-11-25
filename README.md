# Darknet

Darknet是我們用來偵測有沒有人在webcam前面用的軟體

首先要先在要偵測人的電腦上架設IP Camera，接著去autodetect.js修改第24行的參數

(Windows上可以使用Yawcam  Ubuntu上可以使用motion達成)

接下來使用 node autodetect.js 指令來偵測經過的人

autodetect.js使用的套件:

[socket.io-client](https://www.npmjs.com/package/socket.io-client) 2.1.1  MIT授權

[unix-time](https://www.npmjs.com/package/unix-time) 1.0.1  MIT授權

使用方法:

> 首先你必須先編譯darknet，在Ubuntu下是使用make指令，建議先參考[How to compile on ___](https://github.com/AlexeyAB/darknet#how-to-compile-on-linux) 的部分設定makefile，你需要使用OpenCV才能使用autodetect.js

> npm i

> node autodetect.js

***

Darknet is what we used to detect people infront of webcam

First you need to setup IP cambera on the computer that is used to detect people, then change line 24 of autodetect.js so it uses your IP camera.

(You can use Yawcam on Windows or motion on Ubuntu)

Then use "node autodetect.js" command to detect people passing through.

packages used in autodetect.js:

[socket.io-client](https://www.npmjs.com/package/socket.io-client) 2.1.1  MIT License

[unix-time](https://www.npmjs.com/package/unix-time) 1.0.1  MIT License

Usage:

> You have to compile darknet first, you can compile on Ubuntu by using "make" command, it is recommended to look at [How to compile on ___](https://github.com/AlexeyAB/darknet#how-to-compile-on-linux) before you compile, OpenCV is required to use autodetect.js

> npm i

> node autodetect.js