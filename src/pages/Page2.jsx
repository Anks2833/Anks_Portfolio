import { useEffect, useRef, useMemo } from "react";
import AnimatedMarquee from "../components/AnimatedMarquee"
import { Canvas } from '@react-three/fiber';
import { useGLTF, useAnimations } from '@react-three/drei';
import * as THREE from 'three';
import { handleCursorChangeStyle, handleMouseLeave } from "../utils/CursorEffects";


const Page2 = () => {
    const Model = useMemo(() => {
        const ModelComponent = () => {
            const actionRef = useRef();
            const { scene, animations } = useGLTF('../../Models/Man_Talking.glb');
            const { actions } = useAnimations(animations, scene);

            // To know animation name
            useEffect(() => {
                if (animations) {
                    animations.forEach((animation, index) => {
                        console.log(`Animation ${index}: ${animation.name}`);
                    });
                }
            }, [animations]);

            useEffect(() => {
                if (actions && actions['Armature|mixamo.com|Layer0.001']) {
                    actionRef.current = actions['Armature|mixamo.com|Layer0.001'];
                    actionRef.current.setLoop(THREE.LoopRepeat, Infinity);
                    actionRef.current.play();
                }
            }, [actions]);

            return (
                <primitive
                    object={scene}
                    scale={[3, 3, 3]}
                    position={[1, -2.8, 0]}
                    rotation={[0.3, -0.5, 0]}
                />
            );
        };

        return ModelComponent;
    }, []); // Empty dependency array to memoize the component

    return (
        <div id="about" className='relative w-full h-screen bg-[#0B0D0C] text-white pt-12 flex flex-col items-center gap-16'>
            <h1 className='page2-heading w-full flex justify-start pl-32 tracking-widest text-5xl'>DO YOU REALLY KNOW ME?</h1>
            <div className="w-full flex flex-col justify-start items-start pl-32 text-4xl">
                <p>I am Ankur Dubey, a self-taught Full-Stack</p>
                <p>Developer who constantly seeks out</p>
                <p> innovative solutions to everyday problems</p>
                <p> and enjoys creating things that live on the internet.</p>
                <p className="mt-24">Well-versed in numerous technologies including:</p>
                <div className="absolute left-0 bottom-36">
                    <AnimatedMarquee />
                </div>
            </div>
            <div className="absolute z-[9] w-[32vw] h-[25vw] right-20 pointer-events-none">
                <Canvas className="w-full h-full pointer-events-none">
                    <ambientLight />
                    <pointLight position={[10, 10, 10]} />
                    <Model />
                </Canvas>
            </div>
            <div
                onMouseEnter={handleCursorChangeStyle} 
                onMouseLeave={handleMouseLeave} 
                className="absolute z-[10] -right-8 top-36 flex flex-col items-center">
                <h1 className="text-white text-[2vw] tracking-[5vw] px-5 py-2">HOVER</h1>
                <h1 className="text-white text-[3vw] tracking-[10vw] ml-20 px-5 py-2">ME</h1>
            </div>
        </div>
    );
}

export default Page2;