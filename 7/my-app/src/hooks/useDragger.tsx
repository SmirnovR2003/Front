import { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { Locations } from "../store/functions/funtions";

export const useDragger = (ref: HTMLDivElement | null, id:string, startLocation: Locations) => {
    const isClicked = useRef<boolean>(false);
    const dispatch = useDispatch()

    const coords = useRef<{
        startX: number,
        startY: number,
        lastX: number,
        lastY: number,
    }>({
        startX: startLocation.x,
        startY: startLocation.y,
        lastX: startLocation.x,
        lastY: startLocation.y,
    });
    useEffect( () => {
        coords.current.lastX = startLocation.x
        coords.current.lastY = startLocation.y
    }, [startLocation])

    useEffect(() => { 
        const target = ref//document.getElementById(id);
        if(!target) return;
        const container = target.parentElement;
        if(!container) return;


        const onMouseDown = (e: MouseEvent) => {
            isClicked.current = true
            coords.current.startX = e.clientX
            coords.current.startY = e.clientY
        } 

        const onMouseUp = (e: MouseEvent) => {
            e.preventDefault()
            
            if(!isClicked.current && (coords.current.lastX === container.offsetLeft && coords.current.lastY === container.offsetTop)) return;

            isClicked.current = false;
            coords.current.lastX = container.offsetLeft
            coords.current.lastY = container.offsetTop
            let x = coords.current.lastX;
            let y = coords.current.lastY;
            dispatch({type: "EDIT_BLOCK_LOCATION", id: id, position: { x: x, y: y}})
                        
            dispatch({type: "ADD_TO_HISTORY"})
        } 

        const onMouseMove = (e: MouseEvent) => {
            e.preventDefault()
            if(!isClicked.current) return;

            const nextX = e.clientX - coords.current.startX + coords.current.lastX;
            const nextY = e.clientY - coords.current.startY + coords.current.lastY;

            container.style.top = `${nextY}px`;
            container.style.left = `${nextX}px`;
        }

        target.addEventListener('mousedown', onMouseDown);
        target.addEventListener('mouseup', onMouseUp);
        container.addEventListener('mousemove', onMouseMove);
        container.addEventListener('mouseleave', onMouseUp);

        const cleanUp = () => {
            target.removeEventListener('mousedown', onMouseDown);
            target.removeEventListener('mouseup', onMouseUp);
            container.removeEventListener('mousemove', onMouseMove);
            container.removeEventListener('mouseleave', onMouseUp);
        }

        return cleanUp;
    }, [ref])
}