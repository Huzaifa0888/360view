"use client";

import { useMemo, useRef, useState, useEffect } from "react";

// import VideoPopup from "./VideoPopup";

import ReactPlayer from "react-player";

export const Panorama = ({}) => {
  const Canvas = useRef(null);
  const [open, setOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [audio, setAudio] = useState(false);

  const initializePANOLENS = async () => {
    const THREE = await import("three");
    const PANOLENS = await import("panolens");
    
    const viewer = new PANOLENS.Viewer({
      container: Canvas.current,
      autoRotate: true,
      autoRotateSpeed: 0.2,
      autoRotateActivationDuration: 5000,
      dwellTime: 1000,
      autoHideInfospot: false,
      controlBar: true,
      output: "console",
    });

    const panorama1 = new PANOLENS.ImagePanorama("/assets/shot.jpg");
    const panorama2 = new PANOLENS.ImagePanorama("/assets/360-2.jpg");
    viewer.add(panorama2, panorama1);
  

    const hotspot1 = createInfospot("/assets/circle.png");
    const hotspot2 = createInfospot("/assets/circle1.png");
    const popupHotspot1 = createInfospot("/assets/ellipseVip.png");
    const popupHotspot2 = createInfospot("/assets/circle2.png");

    hotspot2.position.set(10000.0, -500.0, 10.0);
    hotspot1.position.set(8300.0, 500.0, 5000.0);
    popupHotspot1.position.set(1800.0, 500.0, 8000.0);
    popupHotspot2.position.set(1000.0, 500.0, 8000.0);

    panorama1.add(hotspot1, popupHotspot1, popupHotspot2);
    // panorama1.add(hotspot1);
    panorama2.add(hotspot2);

    hotspot1.addEventListener("click", () => {viewer.setPanorama(panorama2)
    setAudio(false)});
    hotspot2.addEventListener("click", () => {viewer.setPanorama(panorama1)
    setAudio(true);});
    popupHotspot1.addEventListener("click", () => {
      setOpen(true)
    setAudio(false)
    });
    popupHotspot2.addEventListener("click", () => {setIsOpen(true)
    setAudio(false);
    });
    panorama1.addEventListener("enter-fade-start", () => {
    
     

      viewer.getCamera().fov = 80;
      viewer.getCamera().updateProjectionMatrix();
      viewer.tweenControlCenter(new THREE.Vector3(5000.0, 50.0, 3000.9));
    });

    function createInfospot(imageUrl) {
      const Infospot = new PANOLENS.Infospot(1000, imageUrl);

      Infospot.animated = true;

      return Infospot;
    }
  };
  const onClose = () => {
    setOpen(false);
    setAudio(true)
  };

  useMemo(() => {
    if (typeof window !== "undefined") {
      initializePANOLENS();
    }

    return () => {
      Canvas.current?.destroy();
      Canvas.current = null;
    };
  }, [Canvas]);
  

  return (
    <>
      <div ref={Canvas} className="w-full h-screen overflow-hidden bg-black"></div>
      {audio && (
        <audio
          src="/assets/audio.mp3"
          className="w-0 h-0 hidden"
          autoPlay
        ></audio>
      )}

      {open && (
        <div className="fixed inset-0 flex items-center justify-center z-10">
          <div className="bg-white rounded-lg p-8 w-[50%]">
            <div className="flex justify-between mb-4">
              <h2 className="text-xl  text-black">Enchanted Tranquility</h2>
              <button
                className=" text-black items-start"
                onClick={() => {setOpen(false)
                setAudio(true);}}
              >
                <svg
                  className="h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M14.348 14.849a1 1 0 01-1.414 1.414l-2.829-2.828-2.829 2.828a1 1 0 11-1.414-1.414l2.828-2.829L6.293 8.878a1 1 0 011.414-1.414l2.829 2.828 2.829-2.828a1 1 0 011.414 1.414l-2.828 2.829 2.828 2.829z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>
            <p className="text-black">
              As the golden rays of the setting sun embrace the earth, a serene
              scene unfolds before your eyes. Nestled amidst a lush forest, a
              picturesque lake glistens like a mirror, reflecting the ethereal
              beauty of the surrounding landscape. The tranquil waters gently
              lap against the shore, creating a soothing symphony that
              harmonizes with the whispers of the wind rustling through the
              trees.
            </p>
            <button
              className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
              onClick={onClose}
            >
              Close
            </button>
          </div>
        </div>
      )}
      {/* <VideoPopup open={open} setOpen={setOpen} /> */}
      {isOpen && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white  rounded-lg relative w-[50%]">
            <button
              className="absolute top-2 right-2 z-10 text-white"
              onClick={() => {setIsOpen(false)
              setAudio(true);}}
            >
              <svg
                className="h-5 w-5"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M14.348 14.849a1 1 0 01-1.414 1.414l-2.829-2.828-2.829 2.828a1 1 0 11-1.414-1.414l2.828-2.829L6.293 8.878a1 1 0 011.414-1.414l2.829 2.828 2.829-2.828a1 1 0 011.414 1.414l-2.828 2.829 2.828 2.829z"
                  clipRule="evenodd"
                />
              </svg>
            </button>

            <div className="aspect-w-16 aspect-h-9">
              <video src="/assets/State.mp4" controls autoPlay></video>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

