const {spawn}  = require('child_process');

const defaultCommandArgs = {
	'--width':480,
	'--height':480,
	'-o':'./public/libJpeg.jpg',
	'-t':1000,
	'-n':''
}

class JpegCam{
	constructor(args = defaultCommandArgs ){
		this.args = args
	}
	// this function takes a new image and saves it at the specifed path, then using the err & close
	// callback functions you can determine if the file is ready to be read.
	getNewImage(close=(code)=>code,err=(data)=>data,stdout=(data)=>data){
		const libCamJpeg = spawn('libcamera-jpeg',Object.entries(this.args).join(',').split(','))
		
		libCamJpeg.stdout.on('data',(data)=>{
			stdout(data)
		})

		libCamJpeg.stderr.on('data',(data)=>{
			err(data)
		});

		libCamJpeg.on('close',(code)=>{
			close(code) 
		})
	}
}

module.exports = JpegCam
