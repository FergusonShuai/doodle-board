import React, {useRef, useEffect, useState} from 'react';

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
        context.lineWidth = 5;
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
    
    return (
        
        <div>
            <canvas 
             onMouseDown = {startDrawing}
             onMouseUp = {doneDrawing}
             onMouseMove = {draw}
             ref = {canvasRef}></canvas>
        </div>
        
    );
}

export default Canvas;