/** 
* Simple Node.js wrapper for `libcamera-apps` : [libcamera-vid] 
* @module VidCam 
*/

const {spawn}  = require('child_process');

class VidCam{
    /** 
    * @param {Object} videoConfig
    * @property {String} dash_o file name 
    * @property {String} dash_n no preview  
    * @property {String} dash_t timeout time to wait [default 5000 (5 seconds)]  
    * @property {String} dash_dash_inline no preview  
    * @property {String} dash_dash_circular record onto a circular buffer  
    * @property {String} dash_dash_codec specify the video codec [default h264]
    * @property {String} dash_dash_segment specify how often to break the video into separate files   
    */
	constructor(videoConfig){
		this.videoConfig = videoConfig
	}
	
    /** 
    * @callback onCloseCB 
    * @callback onErrorCB 
    */

    /** 
    * @function
    * @param {NodeJS.WriteableStream} writeStream writable stream that should receive the video stream data... 
    * @param {onCloseCB} onCloseCb callback function which receives the exit code of the program 
    * @param {onErrorCB} errCb  callback function which receives the stderr && error emitted 
    */
    // create a circular buffer and pipe the output into the writable stream
    createVideoStream(writeStream,onCloseCb,errCb){
        const libCamVideoStream = spawn('libcamera-vid',Object.entries(this.videoConfig).join(',').split(','))
        libCamVideoStream.on('error',(data)=>{
            errCb(data)
        })
        
        libCamVideoStream.stdout.on('data',(data)=>{
            writeStream.write(data)
        })
        
        libCamVideoStream.stderr.on('data',(data)=>{
            errCb(data)
        });
    
        libCamVideoStream.on('close',(code)=>{ 
            onCloseCb(code)
        })
    }
}
/** 
* @exports VidCam 
*/
module.exports = VidCam