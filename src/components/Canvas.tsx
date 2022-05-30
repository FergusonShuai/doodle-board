import React, {useRef, useEffect, useState} from 'react';
import '../Canvas.css';

const Canvas = (): React.ReactElement => {
    
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const contextRef = useRef<CanvasRenderingContext2D | null>(null);
    const [isDrawing, setIsDrawing] = useState<boolean>(false);

    useEffect(() => {
        const canvas = canvasRef.current;
        if(!canvas) return;
        canvas.width = window.innerWidth * 2;
        canvas.height = window.innerHeight * 2;
        canvas.style.width = `${window.innerWidth}px`;
        canvas.style.height = `${window.innerHeight}px`;
        canvas.style.border = '1px solid #000';
        
        const context: CanvasRenderingContext2D | null = canvas.getContext("2d");
        if (!context) return;
        context.scale(2,2);
        context.lineCap = "round";
        context.strokeStyle = "black";
        context.lineWidth = 3;
        contextRef.current = context;
    }, [])

    const startDrawing = (e: React.MouseEvent) => {
        const {offsetX, offsetY} = e.nativeEvent;
        if (contextRef && contextRef.current) {
            contextRef.current.beginPath();
            contextRef.current.moveTo(offsetX, offsetY);
            setIsDrawing(true);
        }
    }

    const doneDrawing = () => {
        if (contextRef && contextRef.current) {
            contextRef.current.closePath();
        }
        setIsDrawing(false);
    }

    const draw = (e: React.MouseEvent) => {
        if (!isDrawing) return;
        const {offsetX, offsetY} = e.nativeEvent;
        if (contextRef && contextRef.current) {
            contextRef.current.lineTo(offsetX, offsetY);
            contextRef.current.stroke();
        }
    }

    const clearCanvas = () => {
        const context = contextRef.current;
        const canvas = canvasRef.current;
        if (!context || !canvas) return;

        context.clearRect(0, 0, canvas.width, canvas.height);
    }

    const saveCanvas = () => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const dataURL = canvas.toDataURL("image/png");
        // A hacky way to achieve download function.
        var link = document.createElement('a');
        link.download = 'doodle.png';
        link.href = dataURL;
        link.click();
    }
    
    return (
        
        <div>
            <button onClick = {clearCanvas} >Clear</button>
            <button onClick = {saveCanvas} >Save</button>
            <div className = 'drawingArea'>
                <canvas 
                    onMouseDown = {startDrawing}
                    onMouseUp = {doneDrawing}
                    onMouseMove = {draw}
                    ref = {canvasRef}></canvas>
            </div>
            
        </div>
        
    );
}

export default Canvas;