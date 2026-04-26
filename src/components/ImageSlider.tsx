import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { gsap } from 'gsap';

// Shader vertex shader
const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

// Shader fragment shader for transition effect
const fragmentShader = `
  varying vec2 vUv;
  uniform sampler2D texture1;
  uniform sampler2D texture2;
  uniform sampler2D disp;
  uniform float dispPower;
  uniform float intensity;
  uniform vec2 resolution;

  void main() {
    vec2 uv = vUv;
    vec4 dispTexture = texture2D(disp, uv);
    vec2 dispVec = vec2(dispTexture.r, dispTexture.g);
    
    vec2 distPos1 = uv + (dispVec * intensity * dispPower);
    vec2 distPos2 = uv + (dispVec * -(intensity * (1.0 - dispPower)));
    
    vec4 tex1 = texture2D(texture1, distPos1);
    vec4 tex2 = texture2D(texture2, distPos2);
    
    gl_FragColor = mix(tex1, tex2, dispPower);
  }
`;

// Noise texture for displacement (create canvas-based noise)
const createNoiseTexture = () => {
  const size = 512;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d')!;
  
  const imageData = ctx.createImageData(size, size);
  for (let i = 0; i < imageData.data.length; i += 4) {
    const val = Math.floor(Math.random() * 255);
    imageData.data[i] = val;     // R
    imageData.data[i + 1] = val; // G
    imageData.data[i + 2] = val; // B
    imageData.data[i + 3] = 255; // A
  }
  ctx.putImageData(imageData, 0, 0);
  
  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(2, 2);
  return texture;
};

type ImageSliderProps = {
  images: string[];
  autoPlay?: boolean;
  autoPlayDelay?: number;
};

const ImageSlider = ({ images, autoPlay = true, autoPlayDelay = 4000 }: ImageSliderProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [nextIndex, setNextIndex] = useState(1);
  const [isAnimating, setIsAnimating] = useState(false);
  
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.OrthographicCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const materialRef = useRef<THREE.ShaderMaterial | null>(null);
  const texturesRef = useRef<THREE.Texture[]>([]);
  const dispTextureRef = useRef<THREE.Texture | null>(null);
  const animationRef = useRef<number | null>(null);

  // Setup Three.js scene
  const setupScene = () => {
    if (!containerRef.current) return;

    const { clientWidth, clientHeight } = containerRef.current;

    // Scene
    sceneRef.current = new THREE.Scene();

    // Camera (Orthographic for 2D effect)
    cameraRef.current = new THREE.OrthographicCamera(
      clientWidth / -2,
      clientWidth / 2,
      clientHeight / 2,
      clientHeight / -2,
      1,
      1000
    );
    cameraRef.current.position.z = 1;

    // Renderer
    rendererRef.current = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    rendererRef.current.setSize(clientWidth, clientHeight);
    rendererRef.current.setPixelRatio(window.devicePixelRatio);
    containerRef.current.appendChild(rendererRef.current.domElement);

    // Create displacement texture
    dispTextureRef.current = createNoiseTexture();

    // Load textures
    loadTextures();

    // Add resize listener
    window.addEventListener('resize', handleResize);
  };

  // Load all images as textures
  const loadTextures = () => {
    const loader = new THREE.TextureLoader();
    texturesRef.current = [];

    images.forEach((src, idx) => {
      const texture = loader.load(src);
      texture.minFilter = THREE.LinearFilter;
      texture.generateMipmaps = false;
      texturesRef.current.push(texture);
    });

    // Create material after first two textures are ready
    if (texturesRef.current[0] && texturesRef.current[1]) {
      createMaterial();
    }
  };

  // Create shader material
  const createMaterial = () => {
    if (!texturesRef.current[0] || !texturesRef.current[1]) return;

    materialRef.current = new THREE.ShaderMaterial({
      uniforms: {
        texture1: { value: texturesRef.current[0] },
        texture2: { value: texturesRef.current[1] },
        disp: { value: dispTextureRef.current },
        dispPower: { value: 0 },
        intensity: { value: 0.5 },
        resolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
      },
      vertexShader: vertexShader,
      fragmentShader: fragmentShader,
      transparent: true,
    });

    const geometry = new THREE.PlaneGeometry(
      containerRef.current?.clientWidth || window.innerWidth,
      containerRef.current?.clientHeight || window.innerHeight
    );
    const mesh = new THREE.Mesh(geometry, materialRef.current);
    sceneRef.current?.add(mesh);

    // Start animation loop
    animate();
  };

  // Animation loop
  const animate = () => {
    if (!rendererRef.current || !sceneRef.current || !cameraRef.current) return;
    rendererRef.current.render(sceneRef.current, cameraRef.current);
    animationRef.current = requestAnimationFrame(animate);
  };

  // Handle window resize
  const handleResize = () => {
    if (!containerRef.current || !rendererRef.current || !cameraRef.current) return;

    const { clientWidth, clientHeight } = containerRef.current;

    cameraRef.current.left = clientWidth / -2;
    cameraRef.current.right = clientWidth / 2;
    cameraRef.current.top = clientHeight / 2;
    cameraRef.current.bottom = clientHeight / -2;
    cameraRef.current.updateProjectionMatrix();

    rendererRef.current.setSize(clientWidth, clientHeight);

    // Update mesh geometry
    if (materialRef.current) {
      const geometry = new THREE.PlaneGeometry(clientWidth, clientHeight);
      sceneRef.current?.children.forEach(child => {
        if (child instanceof THREE.Mesh) {
          child.geometry.dispose();
          child.geometry = geometry;
        }
      });
    }
  };

  // Transition to next slide
  const transitionToNext = () => {
    if (isAnimating) return;
    setIsAnimating(true);

    const next = (currentIndex + 1) % images.length;
    setNextIndex(next);

    // Update textures in shader
    if (materialRef.current) {
      materialRef.current.uniforms.texture1.value = texturesRef.current[currentIndex];
      materialRef.current.uniforms.texture2.value = texturesRef.current[next];
      
      // Animate dispPower from 0 to 1
      gsap.to(materialRef.current.uniforms.dispPower, {
        value: 1,
        duration: 1.5,
        ease: 'power2.inOut',
        onComplete: () => {
          setCurrentIndex(next);
          if (materialRef.current) {
            materialRef.current.uniforms.dispPower.value = 0;
            materialRef.current.uniforms.texture1.value = texturesRef.current[next];
          }
          setIsAnimating(false);
        }
      });
    }
  };

  // Auto-play effect
  useEffect(() => {
    if (autoPlay && !isAnimating) {
      const interval = setInterval(() => {
        transitionToNext();
      }, autoPlayDelay);
      return () => clearInterval(interval);
    }
  }, [autoPlay, autoPlayDelay, currentIndex, isAnimating]);

  // Initialize scene
  useEffect(() => {
    setupScene();
    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
      if (rendererRef.current && containerRef.current) {
        containerRef.current.removeChild(rendererRef.current.domElement);
      }
      if (materialRef.current) materialRef.current.dispose();
      texturesRef.current.forEach(t => t.dispose());
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="relative w-full h-full">
      <div ref={containerRef} className="absolute inset-0" />
      
      {/* Navigation Arrows */}
      <button
        onClick={transitionToNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white p-3 rounded-full transition-all duration-300"
        disabled={isAnimating}
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>
      
      <button
        onClick={() => {
          if (!isAnimating) {
            // Manual prev would need reverse animation
            transitionToNext();
          }
        }}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white p-3 rounded-full transition-all duration-300"
        disabled={isAnimating}
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      {/* Dots indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex gap-2">
        {images.map((_, idx) => (
          <button
            key={idx}
            onClick={() => {
              if (!isAnimating && idx !== currentIndex) {
                setCurrentIndex(idx);
                setNextIndex((idx + 1) % images.length);
                if (materialRef.current) {
                  materialRef.current.uniforms.texture1.value = texturesRef.current[idx];
                }
              }
            }}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              idx === currentIndex ? 'bg-white w-6' : 'bg-white/50'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default ImageSlider;