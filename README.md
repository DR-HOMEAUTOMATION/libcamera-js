# libcamera-js
A simple wrapper for [libcamera-apps](https://github.com/raspberrypi/libcamera-apps) (raspbian). Currently supports only libcamera-jpeg functionality, but the goal is to support all libcamera-apps functionality. 

## Installation
This library expects you to have already installed `libcamera-apps` 

### Install `libcamera-apps`
```
sudo apt-get update
sudo apt-get upgrade
sudo apt-get libcamera-apps
```

#### Enabling the pi camera
```
sudo raspi-config 
- Interface options
	- Disable Legacy Camera
- Advanced options
	- Enable GL Driver
	- Enable Glamor
```

### Import
After you have installed libcamera-apps and enabled the picam if necessary, test libcamera using `libcamera-hello`. You should see a window pop up displaying a preview of the camera. Once you know its working you can install the library using the command below: 

`npm install libcamera-js`

`const libcamera = require('libcamera-js')`

## API
Below is an example of how to use the module.
```js
const express = require('express')
const {JpegCam} = require('libcamera-js') // import the JpegCam module from `libcamera-js`

// Create the list of arguments to pass into the created JpegCam object
const CommandArgs = {
	'--width':480,
	'--height':480,
	'-o':'testFile.jpg',
	'-t':500,
	'-n':''
}

// instantiate a new JpegCam using the args we created
const myCam = new JpegCam(CommandArgs)

const router = express.Router()

router.get('/image', (req,res)=>{
/*
call `getNewImage` with a callback function that sends the file we specified 
in the args if the program got a new image and exited with code 0
*/
  myCam.getNewImage(code=>{ 
    if(code === 0){
      res.sendFile(`${process.cwd()}/${CommandArgs['-o'}`)
    }
  });
})
```

## JpegCam(options)

Constructor: returns a JpegCam object which can be used to take jpeg images using the [libcamera-jpeg](https://www.raspberrypi.com/documentation/accessories/camera.html#libcamera-jpeg) CLI tools

- `options` - JSON containing command line options:
  - `-o`: File Name - must end in jpg
  - `-t`: Integer - specify how long should be waited until the image is saved
  - `--width`: Integer - specify the width of the output image
  - `--height`: Integer - specify the height of the output image
  - `--shutter`: Integer(μs) - specify a set light exposure in microseconds 
  - `--gain` : Integer - Specify a set gain

## getNewImage(close,err,data)

Method: takes a new image using the options passed into the constructor
- `close` - callback function that takes the exit code of the capture program, called when the command is finished
- `err` - callback function that takes the error message of the capture program, called when the command emits an error
- `data` - callback function that takes the stdout of the command, useful sometimes for debugging

## License

The MIT License (MIT)

Copyright (c) 2022 Dawson Reschke dawson.e.reschke@gmail.com

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
