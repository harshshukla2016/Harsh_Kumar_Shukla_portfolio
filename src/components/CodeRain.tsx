import React, { useEffect, useRef } from 'react';

const CodeRain = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const codeSnippets = [
            'SAP_SD_SALES_ORDER', 'VBAK', 'VBAP', 'MARA', 'KNA1',
            'const [data, setData] = useState()', 'useEffect(() => {',
            'npx create-next-app', 'git push origin main', 'npm run dev',
            'AWS_S3_BUCKET', 'docker-compose up', 'SELECT * FROM USERS',
            'model.generateContent(prompt)', 'framer-motion', 'Three.js'
        ];

        const fontSize = 10;
        const columns = canvas.width / fontSize;
        const drops: number[] = [];

        for (let i = 0; i < columns; i++) {
            drops[i] = Math.random() * -100;
        }

        const draw = () => {
            ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            ctx.fillStyle = '#00f3ff'; // Default, will be tinted by theme-primary
            ctx.font = fontSize + 'px monospace';

            for (let i = 0; i < drops.length; i++) {
                const text = codeSnippets[Math.floor(Math.random() * codeSnippets.length)];
                ctx.fillText(text, i * fontSize * 10, drops[i] * fontSize);

                if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                    drops[i] = 0;
                }
                drops[i]++;
            }
        };

        const interval = setInterval(draw, 50);

        const handleResize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        window.addEventListener('resize', handleResize);
        return () => {
            clearInterval(interval);
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 pointer-events-none opacity-[0.03] z-0"
            style={{ filter: 'grayscale(100%) brightness(200%)' }}
        />
    );
};

export default CodeRain;
