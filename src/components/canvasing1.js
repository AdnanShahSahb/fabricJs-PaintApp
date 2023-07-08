import React, { useState, useEffect, useRef } from 'react';
import "./canvasing.css"
import { fabric } from 'fabric';

const Canvasing1 = () => {

  // const [draw,setDraw]=useState(true)

  const svgInputRef = useRef()
  const dwnldRef = useRef()
  const transparentRef = useRef()

  let canvas;
  var svgData

  useEffect(() => {

    canvas = new fabric.Canvas('canvas', { height: window.innerHeight / 2, width: window.innerWidth / 2 });
    canvas.isDrawingMode = false




  }, [])




  const putRect = () => {
    canvas.isDrawingMode = false

    canvas.add(new fabric.Rect({ fill: 'goldenrod', height: 100, width: 100, left: 150, top: Math.random() * 100 }))

  }


  const putCircle = () => {
    canvas.isDrawingMode = false

    canvas.add(new fabric.Circle({ fill: 'goldenrod', radius: 100, left: 100, top: Math.random() * 100 }))
  }

  const putTriangle = () => {
    canvas.isDrawingMode = false

    canvas.add(new fabric.Triangle({ fill: 'goldenrod', height: 100, width: 100, left: 100, top: Math.random() * 100 + 100, borderDashArray: [1, 2] }))
  }

  const putDrawing = () => {



    if (canvas.isDrawingMode === true)
      canvas.isDrawingMode = false
    else
      canvas.isDrawingMode = true
  }
  var groups = [];

  const grouping = () => {

    canvas.isDrawingMode = false

    const obj = canvas.getObjects();
    groups.val = new fabric.Group(obj)
    clearAll();
    // console.log(groups,groups.val);
    canvas.add(groups.val)

    //   if(canvas._objects !== undefined){
    //     for (var i=0;i<canvas._objects.length;i++){
    //       groups.push(canvas._objects[i])
    //     }
    //     // console.log(groups);
    //     clearAll();
    //     canvas.add(new fabric.Group(groups))
    // }



  }

  const ungrouping = () => {
    canvas.isDrawingMode = false
    groups.val.destroy()

    let oldGroup = groups.val.getObjects();
    canvas.remove(groups.val);
    canvas.add(...oldGroup);
    groups.val = null;

    canvas.renderAll();




    // canvas.remove(canvas.item(0)).renderAll();

  }

  const clearAll = () => {
    canvas.isDrawingMode = false

    canvas.clear().renderAll();
  }


  const clearSingle = () => {
    canvas.isDrawingMode = false

    canvas.getActiveObjects().forEach((obj) => {
      canvas.remove(obj)
    });
    // canvas.discardActiveObject().renderAll()
  }

  const reader = new FileReader();
  const addImage = (e) => {
    // console.log(e);
    const imageElement = document.getElementById('imaging')
    const file = imageElement.files[0]
    reader.readAsDataURL(file)

  }
  reader.addEventListener('load', () => {
    new fabric.Image.fromURL(reader.result, img => {
      // img.scale(0.75);
      canvas.add(img);
      canvas.renderAll();
    })
  })


  const uploadingSvg = () => {//http://fabricjs.com/assets/1.svg
    console.log(svgInputRef.current.value);
    fabric.loadSVGFromURL(svgInputRef.current.value, function (objects, options) {
      svgData = fabric.util.groupSVGElements(objects, options);
      svgData.top = 30;
      svgData.left = 50;
      canvas.add(svgData);

    });

    // fabric.loadSVGFromString(svgData,)
  }

  var download = function () {

    console.log(transparentRef.current.checked);
    if (transparentRef.current.checked == true)
      canvas.setBackgroundColor('', canvas.renderAll.bind(canvas));
    else {
      canvas.setBackgroundColor('#fff', canvas.renderAll.bind(canvas));
    }
    var link = document.createElement('a');
    link.download = `${dwnldRef.current.value}.png`;
    link.href = document.getElementById('canvas').toDataURL()
    link.click();
  }

  return (
    <>
      <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>"Paint App in Fabric.js on React"</h1>
      <div className='container'>

        <div className='canvas-container'>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            Name of your work
            <input type='text' ref={dwnldRef} required />
            transparent background?
            <input type='checkbox' ref={transparentRef} />
            <button onClick={download}>Download your work</button>
          </div>
          <canvas id="canvas" className='canvasing' />
        </div>

        <div className='button-container'>
          <div className='groups'>
            <h3>Shapes</h3>
            <button onClick={putTriangle}>Triangle</button>
            <button onClick={putRect}>Rectangle</button>
            <button onClick={putCircle}>Circle</button>
          </div>
          <div className='groups'>
            <h3>Pencil</h3>
            <button id='addingPencil' onClick={putDrawing}>pencil</button>
          </div>
          <div className='groups'>
            <h3>Group/Ungroup</h3>
            <button onClick={grouping}>Group</button>
            <button onClick={ungrouping}>Ungroup</button>
          </div>
          <div className='groups'>
            <h3>Delete</h3>
            <button onClick={clearSingle}>Delete Selected</button>
            <button onClick={clearAll}>Delete All</button>
          </div>
          <div className='groups'>
            <h3>Image</h3>
            <input type="file" id='imaging' />
            <br />
            <button onClick={addImage}>Upload</button>
          </div>
          <div className='groups'>
            <h3>Svgs</h3>
            <input type='text' id='svging' ref={svgInputRef} />
            <br />
            <button onClick={uploadingSvg}>Upload</button>
            <br />
            <i style={{fontSize:'10px'}}>example: http://fabricjs.com/assets/2.svg</i>
          </div>
        </div>


      </div>
    </>
  );
}

export default Canvasing1;














