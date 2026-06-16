import React, { useEffect, useRef } from "react";

function IPSBackground() {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");

        let animId;
        let t = 0;

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        resize();
        window.addEventListener("resize", resize);

        // ── Building floor plan rooms ──
        const rooms = [
            { x: 0.05, y: 0.1, w: 0.18, h: 0.22, label: "Lab A" },
            { x: 0.25, y: 0.1, w: 0.22, h: 0.14, label: "Hub" },
            { x: 0.05, y: 0.35, w: 0.18, h: 0.18, label: "Lab B" },
            { x: 0.25, y: 0.27, w: 0.22, h: 0.26, label: "Server" },
            { x: 0.5, y: 0.08, w: 0.14, h: 0.32, label: "Corridor" },
            { x: 0.66, y: 0.08, w: 0.2, h: 0.18, label: "Office A" },
            { x: 0.66, y: 0.28, w: 0.2, h: 0.18, label: "Office B" },
            { x: 0.5, y: 0.44, w: 0.36, h: 0.22, label: "Main Hall" },
            { x: 0.05, y: 0.57, w: 0.3, h: 0.16, label: "Lounge" },
            { x: 0.38, y: 0.7, w: 0.2, h: 0.14, label: "Meeting" },
            { x: 0.62, y: 0.7, w: 0.24, h: 0.14, label: "Reception" },
        ];

        // ── Beacon anchors ──
        const beacons = [
            { rx: 0.08, ry: 0.15, id: "A1", color: "#FF6100" },
            { rx: 0.3, ry: 0.13, id: "A2", color: "#FF6100" },
            { rx: 0.57, ry: 0.12, id: "B1", color: "#3B82F6" },
            { rx: 0.74, ry: 0.12, id: "B2", color: "#3B82F6" },
            { rx: 0.74, ry: 0.32, id: "B3", color: "#3B82F6" },
            { rx: 0.62, ry: 0.52, id: "C1", color: "#FF6100" },
            { rx: 0.1, ry: 0.62, id: "C2", color: "#FF6100" },
            { rx: 0.45, ry: 0.75, id: "C3", color: "#3B82F6" },
        ];

        // ── Navigation path (normalized coords) ──
        const path = [
            [0.1, 0.2],
            [0.3, 0.18],
            [0.55, 0.15],
            [0.72, 0.2],
            [0.72, 0.35],
            [0.65, 0.52],
            [0.55, 0.52],
            [0.42, 0.75],
            [0.68, 0.75],
            [0.2, 0.63],
            [0.1, 0.62],
            [0.1, 0.2],
        ];

        // ── Secondary entity path ──
        const path2 = [
            [0.3, 0.3],
            [0.55, 0.28],
            [0.72, 0.12],
            [0.55, 0.12],
            [0.3, 0.13],
            [0.1, 0.38],
            [0.3, 0.3],
        ];

        function lerpPath(pts, progress) {
            const total = pts.length - 1;
            const scaled = progress * total;
            const i = Math.floor(scaled);
            const frac = scaled - i;
            const a = pts[i % pts.length];
            const b = pts[(i + 1) % pts.length];
            return [a[0] + (b[0] - a[0]) * frac, a[1] + (b[1] - a[1]) * frac];
        }

        // ── Concrete Canvas Implementation Metrics ──
        const drawGrid = (W, H) => {
            ctx.strokeStyle = "rgba(255, 255, 255, 0.02)";
            ctx.lineWidth = 1;
            const step = 50;
            for (let x = 0; x < W; x += step) {
                ctx.beginPath();
                ctx.moveTo(x, 0);
                ctx.lineTo(x, H);
                ctx.stroke();
            }
            for (let y = 0; y < H; y += step) {
                ctx.beginPath();
                ctx.moveTo(0, y);
                ctx.lineTo(W, y);
                ctx.stroke();
            }
        };

        const drawDots = (W, H) => {
            ctx.fillStyle = "rgba(255, 255, 255, 0.07)";
            const step = 100;
            for (let x = 0; x < W; x += step) {
                for (let y = 0; y < H; y += step) {
                    ctx.beginPath();
                    ctx.arc(x, y, 1, 0, Math.PI * 2);
                    ctx.fill();
                }
            }
        };

        const drawRooms = (W, H) => {
            rooms.forEach((room) => {
                const rx = room.x * W;
                const ry = room.y * H;
                const rw = room.w * W;
                const rh = room.h * H;

                // Draw Room Boundaries
                ctx.strokeStyle = "rgba(255, 255, 255, 0.05)";
                ctx.lineWidth = 1.5;
                ctx.strokeRect(rx, ry, rw, rh);

                // Fill background subtly on hover-simulation
                ctx.fillStyle = "rgba(255, 255, 255, 0.005)";
                ctx.fillRect(rx, ry, rw, rh);

                // Technical Room Label Typography
                ctx.fillStyle = "rgba(255, 255, 255, 0.25)";
                ctx.font = "9px monospace";
                ctx.textBaseline = "top";
                ctx.fillText(room.label.toUpperCase(), rx + 8, ry + 8);
            });
        };

        const drawScanLine = (W, H) => {
            const scanY = (t * 1.5) % H;
            const gradient = ctx.createLinearGradient(0, scanY - 40, 0, scanY);
            gradient.addColorStop(0, "transparent");
            gradient.addColorStop(1, "rgba(255, 97, 0, 0.03)");
            ctx.fillStyle = gradient;
            ctx.fillRect(0, scanY - 40, W, 40);

            ctx.strokeStyle = "rgba(255, 97, 0, 0.12)";
            ctx.beginPath();
            ctx.moveTo(0, scanY);
            ctx.lineTo(W, scanY);
            ctx.stroke();
        };

        const drawRadarSweep = (W, H) => {
            const centerX = W * 0.5;
            const centerY = H * 0.4;
            const radius = 250;
            const angle = (t * 0.015) % (Math.PI * 2);

            ctx.save();
            ctx.beginPath();
            ctx.moveTo(centerX, centerY);
            ctx.arc(centerX, centerY, radius, angle - 0.4, angle);
            ctx.closePath();

            const gradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, radius);
            gradient.addColorStop(0, "rgba(255, 255, 255, 0.03)");
            gradient.addColorStop(1, "transparent");
            ctx.fillStyle = gradient;
            ctx.fill();
            ctx.restore();
        };

        const drawPathTrail = (W, H) => {
            const pathsToRender = [path, path2];
            pathsToRender.forEach((p, idx) => {
                ctx.strokeStyle = idx === 0 ? "rgba(255, 97, 0, 0.15)" : "rgba(59, 130, 246, 0.12)";
                ctx.lineWidth = 1;
                ctx.setLineDash([4, 6]);
                ctx.beginPath();
                p.forEach((pt, i) => {
                    if (i === 0) ctx.moveTo(pt[0] * W, pt[1] * H);
                    else ctx.lineTo(pt[0] * W, pt[1] * H);
                });
                ctx.stroke();
                ctx.setLineDash([]); // Reset
            });
        };

        const drawBeacons = (W, H) => {
            beacons.forEach((b) => {
                const bx = b.rx * W;
                const by = b.ry * H;

                // Animated pulse rings
                const pulse = (t * 0.02 + b.id.charCodeAt(0)) % 2;
                ctx.strokeStyle = b.color;
                ctx.lineWidth = 1;
                ctx.beginPath();
                ctx.arc(bx, by, 8 + pulse * 24, 0, Math.PI * 2);
                ctx.globalAlpha = Math.max(0, 1 - pulse / 2) * 0.4;
                ctx.stroke();
                ctx.globalAlpha = 1.0;

                // Static beacon core
                ctx.fillStyle = b.color;
                ctx.beginPath();
                ctx.arc(bx, by, 3, 0, Math.PI * 2);
                ctx.fill();

                // Technical data identification string
                ctx.fillStyle = "rgba(255, 255, 255, 0.3)";
                ctx.font = "8px monospace";
                ctx.fillText(b.id, bx + 8, by - 4);
            });
        };

        const drawEntity = (W, H) => {
            const progress = (t * 0.0006) % 1;
            const [ex, ey] = lerpPath(path, progress);
            const px = ex * W;
            const py = ey * H;

            // Outer locator system
            ctx.strokeStyle = "#FF6100";
            ctx.lineWidth = 1.5;
            ctx.beginPath();
            ctx.arc(px, py, 7, 0, Math.PI * 2);
            ctx.stroke();

            // Blinking core tracking center
            if (Math.floor(t / 15) % 2 === 0) {
                ctx.fillStyle = "#ffffff";
                ctx.beginPath();
                ctx.arc(px, py, 2.5, 0, Math.PI * 2);
                ctx.fill();
            }
        };

        const drawEntity2 = (W, H) => {
            const progress = (t * 0.0009) % 1;
            const [ex, ey] = lerpPath(path2, progress);
            const px = ex * W;
            const py = ey * H;

            ctx.strokeStyle = "#3B82F6";
            ctx.lineWidth = 1.5;
            ctx.beginPath();
            ctx.arc(px, py, 6, 0, Math.PI * 2);
            ctx.stroke();

            ctx.fillStyle = "#3B82F6";
            ctx.beginPath();
            ctx.arc(px, py, 2, 0, Math.PI * 2);
            ctx.fill();
        };

        const drawSoftGlows = (W, H) => {
            // Soft radial ambiance in the viewport framework center
            const gradient = ctx.createRadialGradient(W * 0.5, H * 0.5, 100, W * 0.5, H * 0.5, Math.max(W, H) * 0.6);
            gradient.addColorStop(0, "rgba(255, 97, 0, 0.02)");
            gradient.addColorStop(1, "rgba(0, 0, 0, 0)");
            ctx.fillStyle = gradient;
            ctx.fillRect(0, 0, W, H);
        };

        const drawVignette = (W, H) => {
            const gradient = ctx.createRadialGradient(W * 0.5, H * 0.5, Math.min(W, H) * 0.3, W * 0.5, H * 0.5, Math.max(W, H) * 0.8);
            gradient.addColorStop(0, "transparent");
            gradient.addColorStop(1, "#030305");
            ctx.fillStyle = gradient;
            ctx.fillRect(0, 0, W, H);
        };

        function loop() {
            const W = canvas.width, H = canvas.height;
            ctx.clearRect(0, 0, W, H);

            // Base Background Layer
            ctx.fillStyle = "#030305";
            ctx.fillRect(0, 0, W, H);

            // Procedural telemetry stack calls
            drawGrid(W, H);
            drawDots(W, H);
            drawRooms(W, H);
            drawScanLine(W, H);
            drawRadarSweep(W, H);
            drawPathTrail(W, H);
            drawBeacons(W, H);
            drawEntity2(W, H);
            drawEntity(W, H);
            drawSoftGlows(W, H);
            drawVignette(W, H);

            t++;
            animId = requestAnimationFrame(loop);
        }

        loop();
        return () => {
            cancelAnimationFrame(animId);
            window.removeEventListener("resize", resize);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 z-0 pointer-events-none"
            style={{ width: "100%", height: "100%" }}
        />
    );
}

export default IPSBackground;