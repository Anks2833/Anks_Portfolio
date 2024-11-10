import { useEffect, useRef } from "react";
import AnimatedMarquee from "../components/AnimatedMarquee"
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, useAnimations  } from '@react-three/drei';
import * as THREE from 'three';


const Page2 = () => {

    const Model = () => {
        const actionRef = useRef();
        const { scene, animations } = useGLTF('../../Models/Man.glb');
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
            if (actions && actions['Armature|mixamo.com|Layer0']) {
                actionRef.current = actions['Armature|mixamo.com|Layer0'];
                actionRef.current.setLoop(THREE.LoopRepeat, Infinity);
                actionRef.current.play();
            }
        }, [actions]);
 
    
        return (
            <primitive
                object={scene}
                scale={[3.2, 3.2, 3.2]}
                position={[-1, -3, 0]}
                rotation={[0.3, 0.3, 0]}
            />
        );
    };

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

            <div className="absolute z-[100] w-[32vw] h-[25vw] right-20">
                <Canvas className="w-full h-full">
                    <ambientLight />
                    <pointLight position={[10, 10, 10]} />
                    <Model />
                    {/* <OrbitControls /> */}
                </Canvas>
            </div>

        </div>
    )
}

export default Page2