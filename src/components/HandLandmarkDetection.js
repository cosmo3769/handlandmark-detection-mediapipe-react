import { FilesetResolver, HandLandmarker, DrawingUtils } from "@mediapipe/tasks-vision";
import React, { useEffect } from "react";

export default function HandLandmarkDetection() {
    useEffect(() => {
        let handLandmarker;
        let runningMode = "IMAGE";
        let enableWebcamButton;
        const videoHeight = "360px";
        const videoWidth = "480px";
        async function runDemo() {
            const vision = await FilesetResolver.forVisionTasks(
              "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest/wasm"
            );
            handLandmarker = await HandLandmarker.createFromOptions(vision, {
              baseOptions: {
                modelAssetPath: `https://storage.googleapis.com/mediapipe-assets/hand_landmarker.task`
              },
              runningMode: runningMode,
              numHands: 2
            });
          }
        runDemo()
        
        const video = document.getElementById("webcam");
        const canvasElement = document.getElementById("output_canvas");
        const canvasCtx = canvasElement.getContext("2d");

        let webcamRunning= false;

        // Check if webcam access is supported.
        function hasGetUserMedia() {
            return !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia);
        }

        // If webcam supported, add event listener to button for when user
        // wants to activate it.
        if (hasGetUserMedia()) {
            enableWebcamButton = document.getElementById("webcamButton");
            enableWebcamButton.addEventListener("click", enableCam);
        } else {
            console.warn("getUserMedia() is not supported by your browser");
        }

        // Enable the live webcam view and start detection.
        function enableCam(event) {
            if (!handLandmarker) {
            console.log("Wait! objectDetector not loaded yet.");
            return;
            }
        
            if (webcamRunning === true) {
            webcamRunning = false;
            enableWebcamButton.innerText = "ENABLE PREDICTIONS";
            } else {
            console.log("webcam was off");
            webcamRunning = true;
            enableWebcamButton.innerText = "DISABLE PREDICITONS";
            }
        
            // getUsermedia parameters.
            const constraints = {
            video: true
            };
        
            // Activate the webcam stream.
            navigator.mediaDevices.getUserMedia(constraints).then(function (stream) {
            video.srcObject = stream;
            video.addEventListener("loadeddata", predictWebcam);
            });
        }

        async function predictWebcam() {
            // Now let's start detecting the stream.
            if (runningMode === "IMAGE") {
            runningMode = "VIDEO";
            await handLandmarker.setOptions({ runningMode: runningMode });
            }
            let nowInMs = Date.now();
            const results = handLandmarker.detectForVideo(video, nowInMs);
        
            canvasCtx.save();
            canvasCtx.clearRect(0, 0, canvasElement.width, canvasElement.height);
            const drawingUtils = new DrawingUtils(canvasCtx);
            canvasElement.style.height = videoHeight;
            video.style.height = videoHeight;
            canvasElement.style.width = videoWidth;
            video.style.width = videoWidth;
          
            if (results.landmarks) {
                for (const landmarks of results.landmarks) {
                    drawingUtils.drawConnectors(
                        landmarks,
                        HandLandmarker.HAND_CONNECTIONS,
                        {
                          color: "#00FF00",
                          lineWidth: 5
                        }
                      );
                      drawingUtils.drawLandmarks(landmarks, {
                        color: "#FF0000",
                        lineWidth: 2
                      });
                }
            }
            canvasCtx.restore();
        
            // Call this function again to keep predicting when the browser is ready.
            if (webcamRunning === true) {
            window.requestAnimationFrame(predictWebcam);
            }
        }
    })

    return (
        <div>
            <h1>Hello hand landmark detection</h1>
            <div id="liveView" className="videoView">
                <button id="webcamButton">
                    <span>ENABLE WEBCAM</span>
                </button>
                <div style={{position: "relative"}}>
                    <video id="webcam" style={{width: "1280px", height: "720px", position: "absolute", left: "0px", top: "0px"}} autoPlay playsInline></video>
                    <canvas className="output_canvas" id="output_canvas" width="1280" height="720" style={{position: "absolute", left: "0px", top: "0px"}}></canvas>
                </div>
            </div>
        </div>
    )
}