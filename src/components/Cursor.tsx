import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

const Cursor = () => {
    const [isHovering, setIsHovering] = useState(false);

    // Use MotionValues for performance (bypasses React render loop for position updates)
    const cursorX = useMotionValue(-100);
    const cursorY = useMotionValue(-100);

    // Smooth spring animation for the outer ring
    const springConfig = { damping: 25, stiffness: 400, mass: 0.2 }; // Tighter spring for less lag
    const cursorXSpring = useSpring(cursorX, springConfig);
    const cursorYSpring = useSpring(cursorY, springConfig);

    useEffect(() => {
        const moveCursor = (e: MouseEvent) => {
            // Update MotionValues directly
            cursorX.set(e.clientX);
            cursorY.set(e.clientY);
        };

        const handleMouseOver = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            const isClickable =
                target.tagName === 'A' ||
                target.tagName === 'BUTTON' ||
                target.closest('a') ||
                target.closest('button') ||
                target.closest('.group') || // Check for project/card groups
                target.classList.contains('cursor-pointer');

            setIsHovering(!!isClickable);
        };

        window.addEventListener('mousemove', moveCursor);
        window.addEventListener('mouseover', handleMouseOver);

        return () => {
            window.removeEventListener('mousemove', moveCursor);
            window.removeEventListener('mouseover', handleMouseOver);
        };
    }, [cursorX, cursorY]);

    // Framer Motion variants for visual states (scale, color, etc.)
    const ringVariants = {
        default: {
            width: 24,
            height: 24,
            backgroundColor: 'transparent',
            borderColor: '#00f3ff', // Cyan
            rotate: 45, // Diamond shape
            scale: 1,
        },
        hover: {
            width: 48,
            height: 48,
            backgroundColor: 'rgba(0, 243, 255, 0.1)',
            borderColor: '#ff00ff', // Pink
            rotate: 0, // Rotate back to square on hover for effect
            scale: 1,
        }
    };

    const dotVariants = {
        default: {
            scale: 1,
            backgroundColor: '#00f3ff'
        },
        hover: {
            scale: 0, // Hide dot on hover
            backgroundColor: '#ff00ff'
        }
    };

    return (
        <>
            {/* Main Outer Cursor - Follows smoothly */}
            <motion.div
                className="fixed top-0 left-0 border-2 pointer-events-none z-[9999] hidden md:block" // removed rounded-full for diamond shape logic
                style={{
                    x: cursorXSpring,
                    y: cursorYSpring,
                    translateX: '-50%',
                    translateY: '-50%',
                    position: 'fixed',
                    boxShadow: isHovering ? '0 0 15px #ff00ff' : '0 0 10px #00f3ff',
                }}
                variants={ringVariants}
                animate={isHovering ? "hover" : "default"}
                transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 20
                }}
            />

            {/* Center Dot - Follows Instantly (no spring) for precision */}
            <motion.div
                className="fixed top-0 left-0 w-2 h-2 rounded-full pointer-events-none z-[9999] hidden md:block"
                style={{
                    x: cursorX, // Direct raw value for instant tracking
                    y: cursorY, // Direct raw value
                    translateX: '-50%',
                    translateY: '-50%',
                    position: 'fixed'
                }}
                variants={dotVariants}
                animate={isHovering ? "hover" : "default"}
            />
        </>
    );
};

export default Cursor;
