import React from 'react';
import Particles from 'react-tsparticles';
import { loadFull } from 'tsparticles';

const ParticlesBackground: React.FC = () => {
    const particlesInit = async (main: any) => {
        await loadFull(main);
    };

    return (
        <Particles
            id="tsparticles"
            init={particlesInit}
            options={{
                fullScreen: { enable: true, zIndex: -1 },
                particles: {
                    number: { value: 80 },
                    color: { value: '#ffffff' },
                    shape: { type: 'circle' },
                    opacity: { value: 0.5 },
                    size: { value: 3 },
                    move: { enable: true, speed: 1 },
                },
                interactivity: {
                    events: { onhover: { enable: true, mode: 'repulse' } },
                    modes: { repulse: { distance: 100, duration: 0.4 } },
                },
                background: { color: '#0b4f55' },
            }}
        />
    );
};

export default ParticlesBackground;
