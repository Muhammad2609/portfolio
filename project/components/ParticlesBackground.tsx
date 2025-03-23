"use client";

import { useCallback } from "react";
import Particles from "react-particles";
import type { Container, Engine } from "tsparticles-engine";
import { loadSlim } from "tsparticles-slim";
import { useTheme } from "next-themes";

export function ParticlesBackground() {
  const { theme } = useTheme();

  const particlesInit = useCallback(async (engine: Engine) => {
    await loadSlim(engine);
  }, []);

  const particlesLoaded = useCallback(async (container: Container | undefined) => {
    // Optional: Add any initialization after particles are loaded
  }, []);

  return (
    <div className="absolute inset-0 -z-10">
      <Particles
        id="tsparticles"
        init={particlesInit}
        loaded={particlesLoaded}
        options={{
          fps_limit: 60,
          particles: {
            number: {
              value: 50,
              density: {
                enable: true,
                value_area: 1000
              }
            },
            color: {
              value: theme === "dark" ? "#94a3b8" : "#64748b"
            },
            opacity: {
              value: 0.3,
              random: false
            },
            size: {
              value: 2,
              random: true
            },
            links: {
              enable: true,
              distance: 150,
              color: theme === "dark" ? "#94a3b8" : "#64748b",
              opacity: 0.2,
              width: 1
            },
            move: {
              enable: true,
              speed: 0.5,
              direction: "none",
              random: false,
              straight: false,
              outModes: {
                default: "bounce"
              }
            }
          },
          interactivity: {
            detectsOn: "window",
            events: {
              onHover: {
                enable: true,
                mode: "grab"
              },
              onClick: {
                enable: false
              },
              resize: true
            },
            modes: {
              grab: {
                distance: 150,
                links: {
                  opacity: 0.4
                }
              }
            }
          },
          background: {
            color: {
              value: "transparent"
            }
          },
          fullScreen: {
            enable: false,
            zIndex: -1
          },
          detectRetina: false,
          smooth: true
        }}
        className="w-full h-full"
      />
    </div>
  );
}