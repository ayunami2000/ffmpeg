importScripts('ffmpeg.js');
function print(text){
  postMessage({'type':'stdout','data':text});
}
onmessage=function(event){
  if(event.data.type==="command"){
    var Module={
      print:print,
      printErr:print,
      files:event.data.files||[],
      arguments:event.data.arguments||[],
      TOTAL_MEMORY:event.data.TOTAL_MEMORY||false
      //Can play around with this option - must be a power of 2
      //TOTAL_MEMORY:268435456
    };
    postMessage({'type':'start','data':Module.arguments.join(" ")});
    print('Received command: '+Module.arguments.join(" ")+((Module.TOTAL_MEMORY)?" ~ Processing with "+Module.TOTAL_MEMORY+" bits.":""));
    var time=Date.now();
    var result=ffmpeg_run(Module);
    var totalTime=Date.now()-time;
    print('Finished processing (took ' + totalTime + 'ms)');
    postMessage({'type':'done','data':result,'time':totalTime});
  }
};
postMessage({'type':'ready'});
