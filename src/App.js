// import './App.css';
// import Webcam from 'react-webcam';
// import { FilesetResolver, HandLandmarker } from '@mediapipe/tasks-vision';
// import { Camera } from '@mediapipe/camera_utils';
// import { useEffect, useRef } from 'react';

import HandLandmarkDetection from "./components/HandLandmarkDetection";

// function App() {

//   const webcamRef = useRef(null);
//   const canvasRef = useRef(null);
  

//   useEffect(() => {
//     let handLandmarker = undefined;
//     let runningMode = "IMAGE";
//     var camera = null;
//     var results;
//     const connect = window.drawConnectors;

//     async function runDemo() {
//       const vision = await FilesetResolver.forVisionTasks(
//         "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest/wasm"
//       );
//       handLandmarker = await HandLandmarker.createFromOptions(vision, {
//         baseOptions: {
//           modelAssetPath: `https://storage.googleapis.com/mediapipe-assets/hand_landmarker.task`
//         },
//         runningMode: runningMode,
//         numHands: 2
//       });
//       console.log(typeof(handLandmarker))
//       console.log(handLandmarker)

//       if (runningMode === "IMAGE") {
//         runningMode = "VIDEO";
//         await handLandmarker.setOptions({ runningMode: runningMode });
//       }

//       if (
//         typeof webcamRef.current !== "undefined" &&
//         webcamRef.current !== null
//       ) {
    
//         let nowInMs = Date.now();
//         results = handLandmarker.detectForVideo(webcamRef.current.video, nowInMs)
//         console.log(results)

//         const videoWidth = webcamRef.current.video.videoWidth;
//         const videoHeight = webcamRef.current.video.videoHeight;

//         // Set canvas width
//         canvasRef.current.width = videoWidth;
//         canvasRef.current.height = videoHeight;

        // const canvasElement = canvasRef.current;
        // const canvasCtx = canvasElement.getContext("2d");

//         // canvasElement.style.height = videoHeight;
//         // video.style.height = videoHeight;
//         // canvasElement.style.width = videoWidth;
//         // video.style.width = videoWidth;

//         // Now let's start detecting the stream.
//         // if (runningMode === "IMAGE") {
//         //   runningMode = "VIDEO";
//         //   await handLandmarker.setOptions({ runningMode: runningMode });
//         // }

        
        
      
//         canvasCtx.save();
//         canvasCtx.clearRect(0, 0, canvasElement.width, canvasElement.height);
//         if (results.landmarks) {
//           for (const landmarks of results.landmarks) {
//             connect(canvasCtx, landmarks, HandLandmarker.HAND_CONNECTIONS, {
//               color: "#00FF00",
//               lineWidth: 5
//             });
//             connect(canvasCtx, landmarks, { color: "#FF0000", lineWidth: 2 });
//           }
//         }
//         canvasCtx.restore();
      
//     }
//   }
//     runDemo();

//     console.log(handLandmarker)
//     // async function predictWebcam() {

//     //   // if (
//     //   //   typeof webcamRef.current !== "undefined" &&
//     //   //   webcamRef.current !== null
//     //   // ) {
//     //     let nowInMs = Date.now();
//     //     results = await handLandmarker.detectForVideo({image: webcamRef.current.video}, nowInMs);
//     //   // }

//     //   const videoWidth = webcamRef.current.video.videoWidth;
//     //   const videoHeight = webcamRef.current.video.videoHeight;

//     //   // Set canvas width
//     //   canvasRef.current.width = videoWidth;
//     //   canvasRef.current.height = videoHeight;

//     //   const canvasElement = canvasRef.current;
//     //   const canvasCtx = canvasElement.getContext("2d");

//     //   // canvasElement.style.height = videoHeight;
//     //   // video.style.height = videoHeight;
//     //   // canvasElement.style.width = videoWidth;
//     //   // video.style.width = videoWidth;

//     //   // Now let's start detecting the stream.
//     //   // if (runningMode === "IMAGE") {
//     //   //   runningMode = "VIDEO";
//     //   //   await handLandmarker.setOptions({ runningMode: runningMode });
//     //   // }

      
      
    
//     //   canvasCtx.save();
//     //   canvasCtx.clearRect(0, 0, canvasElement.width, canvasElement.height);
//     //   if (results.landmarks) {
//     //     for (const landmarks of results.landmarks) {
//     //       connect(canvasCtx, landmarks, HandLandmarker.HAND_CONNECTIONS, {
//     //         color: "#00FF00",
//     //         lineWidth: 5
//     //       });
//     //       connect(canvasCtx, landmarks, { color: "#FF0000", lineWidth: 2 });
//     //     }
//     //   }
//     //   canvasCtx.restore();
    
//     //   // Call this function again to keep predicting when the browser is ready.
//     //   window.requestAnimationFrame(predictWebcam);
      
//     // }

//     // predictWebcam()
//   }, [])

//   return (
//     <div className="App">
//       <h1>Hello Hand Landmark</h1>
//       <Webcam
//         ref={webcamRef}
//         style={{
//           position: "absolute",
//           marginLeft: "auto",
//           marginRight: "auto",
//           left: 0,
//           right: 0,
//           textAlign: "center",
//           zindex: 9,
//           width: 640,
//           height: 480,
//         }}
//       />{" "}
//       <canvas
//         ref={canvasRef}
//         className="output_canvas"
//         style={{
//           position: "absolute",
//           marginLeft: "auto",
//           marginRight: "auto",
//           left: 0,
//           right: 0,
//           textAlign: "center",
//           zindex: 9,
//           width: 640,
//           height: 480,
//         }}
//       ></canvas>
//     </div>
//   );
// }

// export default App;

function App() {
    return (
        <div className="App">
            <HandLandmarkDetection/>
        </div>
    )
}

export default App;