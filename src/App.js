import React, { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import { Play, Pause, Upload, RotateCcw, Download, AlertCircle } from 'lucide-react';

// Theme Configuration Object (ORIGINAL)
const themeConfig = {
  default: {
    name: 'Default',
    emoji: '⚪',
    fonts: {
      primary: "'Helvetica Neue', Helvetica, Arial, sans-serif"
    },
    colors: {
      primary: '#000',
      secondary: '#333',
      accent: '#666',
      background: '#f5f5f5',
      surface: '#fff',
      border: '#ddd',
      text: {
        primary: '#333',
        secondary: '#999',
        inverse: '#fff'
      }
    },
    container: {
      minHeight: '100vh',
      background: '#f5f5f5',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem',
      position: 'relative'
    },
    player: {
      width: '100%',
      maxWidth: '300px',
      background: '#fff',
      border: '1px solid #ddd',
      boxShadow: 'none',
      borderRadius: '0'
    },
    header: {
      padding: '1rem',
      borderBottom: '1px solid #eee',
      background: '#fafafa',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    },
    effects: {
      sliderTrack: '#eee',
      sliderThumb: '#000',
      sliderHeight: '2px',
      sliderThumbSize: '12px'
    },
    text: {
      weight: 'normal',
      shadow: 'none'
    },
    visualizer: {
      colors: ['#666', '#666', '#666']
    }
  },

  vaporwave: {
    name: 'Vaporwave',
    emoji: '🌈',
    fonts: {
      primary: "'Orbitron', 'Helvetica Neue', Arial, sans-serif"
    },
    colors: {
      primary: '#ff006e',
      secondary: '#00f5ff',
      accent: '#8338ec',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      surface: 'rgba(0, 0, 0, 0.85)',
      border: '#00f5ff',
      text: {
        primary: '#ffffff',
        secondary: '#00f5ff',
        inverse: '#000'
      }
    },
    container: {
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem',
      position: 'relative'
    },
    player: {
      width: '100%',
      maxWidth: '300px',
      background: 'rgba(0, 0, 0, 0.85)',
      border: '1px solid #00f5ff',
      boxShadow: '0 0 30px rgba(255, 0, 110, 0.5), 0 0 60px rgba(0, 245, 255, 0.3)',
      borderRadius: '8px'
    },
    header: {
      padding: '1rem',
      borderBottom: '1px solid rgba(0, 245, 255, 0.3)',
      background: 'linear-gradient(45deg, #ff006e, #8338ec)',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    },
    effects: {
      sliderTrack: 'rgba(0, 245, 255, 0.3)',
      sliderThumb: '#ff006e',
      sliderHeight: '2px',
      sliderThumbSize: '12px',
      thumbShadow: '0 0 10px #ff006e'
    },
    text: {
      weight: 'normal',
      shadow: '2px 0 #ff006e, -2px 0 #00f5ff'
    },
    backgroundPattern: {
      backgroundImage: `
        linear-gradient(rgba(0, 245, 255, 0.1) 1px, transparent 1px),
        linear-gradient(90deg, rgba(0, 245, 255, 0.1) 1px, transparent 1px)
      `,
      backgroundSize: '30px 30px'
    },
    visualizer: {
      colors: ['#ff006e', '#00f5ff'],
      shadows: ['0 0 8px #ff006e', '0 0 8px #00f5ff']
    },
    special: {
      artworkHover: 'linear-gradient(45deg, #4c1d95, #7c2d12)'
    }
  },

  pixel: {
    name: 'Pixel',
    emoji: '🎮',
    fonts: {
      primary: "'Courier New', 'Monaco', 'Lucida Console', monospace"
    },
    colors: {
      primary: '#e94560',
      secondary: '#f39c12',
      accent: '#27ae60',
      background: '#1a1a2e',
      surface: '#16213e',
      border: '#0f3460',
      text: {
        primary: '#f39c12',
        secondary: '#27ae60',
        inverse: '#000000'
      }
    },
    container: {
      minHeight: '100vh',
      background: '#1a1a2e',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem',
      position: 'relative',
      imageRendering: 'pixelated'
    },
    player: {
      width: '100%',
      maxWidth: '300px',
      background: '#16213e',
      border: '4px solid #0f3460',
      boxShadow: '0 0 0 4px #e94560, 0 0 0 8px #0f3460',
      borderRadius: '0',
      imageRendering: 'pixelated'
    },
    header: {
      padding: '1rem',
      borderBottom: '4px solid #0f3460',
      background: 'linear-gradient(90deg, #e94560 0%, #e94560 50%, #f39c12 50%, #f39c12 100%)',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    },
    effects: {
      sliderTrack: '#0f3460',
      sliderThumb: '#e94560',
      sliderHeight: '6px',
      sliderThumbSize: '16px',
      thumbBorder: '3px solid #000000',
      thumbShadow: '2px 2px 0 #000000'
    },
    text: {
      weight: 'bold',
      shadow: '2px 2px 0 #000000'
    },
    backgroundPattern: {
      backgroundImage: `
        radial-gradient(circle at 25% 25%, #0f3460 2px, transparent 2px),
        radial-gradient(circle at 75% 75%, #e94560 1px, transparent 1px)
      `,
      backgroundSize: '20px 20px'
    },
    visualizer: {
      colors: ['#e94560', '#f39c12', '#27ae60'],
      width: '6px',
      gap: '4px'
    },
    special: {
      imageRendering: 'pixelated',
      artworkHover: '#1a1a2e'
    }
  },

  dark: {
    name: 'Dark',
    emoji: '🌙',
    fonts: {
      primary: "'Inter', 'Helvetica Neue', Arial, sans-serif"
    },
    colors: {
      primary: '#00ff7f',
      secondary: '#ff1493',
      accent: '#00bfff',
      background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%)',
      surface: '#0d0d0d',
      border: '#333333',
      text: {
        primary: '#ffffff',
        secondary: '#00ff7f',
        inverse: '#000000'
      }
    },
    container: {
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem',
      position: 'relative'
    },
    player: {
      width: '100%',
      maxWidth: '300px',
      background: '#0d0d0d',
      border: '1px solid #333333',
      boxShadow: '0 0 40px rgba(0, 255, 127, 0.2), 0 0 80px rgba(255, 20, 147, 0.1)',
      borderRadius: '12px'
    },
    header: {
      padding: '1rem',
      borderBottom: '1px solid rgba(0, 255, 127, 0.3)',
      background: 'linear-gradient(135deg, #1a1a1a 0%, #2a2a2a 100%)',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    },
    effects: {
      sliderTrack: 'rgba(51, 51, 51, 0.8)',
      sliderThumb: '#00ff7f',
      sliderHeight: '2px',
      sliderThumbSize: '14px',
      thumbShadow: '0 0 10px rgba(0, 255, 127, 0.8)'
    },
    text: {
      weight: '600',
      shadow: '0 0 10px rgba(0, 255, 127, 0.8)'
    },
    backgroundPattern: {
      backgroundImage: `
        radial-gradient(circle at 20% 80%, rgba(0, 255, 127, 0.05) 0%, transparent 50%),
        radial-gradient(circle at 80% 20%, rgba(255, 20, 147, 0.05) 0%, transparent 50%),
        radial-gradient(circle at 40% 40%, rgba(0, 191, 255, 0.03) 0%, transparent 50%)
      `
    },
    visualizer: {
      colors: ['#00ff7f', '#ff1493', '#00bfff'],
      shadows: ['0 0 6px #00ff7f', '0 0 6px #ff1493', '0 0 6px #00bfff']
    },
    special: {
      artworkHover: 'linear-gradient(135deg, #2a2a2a, #1a1a1a)'
    }
  },

  tropical: {
    name: 'Tropical',
    emoji: '🏝️',
    fonts: {
      primary: "'Poppins', 'Helvetica Neue', Arial, sans-serif"
    },
    colors: {
      primary: '#ff6f61',
      secondary: '#40e0d0',
      accent: '#ffd700',
      background: '#fffbec',
      surface: '#ffffff',
      border: '#ff6f61',
      text: {
        primary: '#333333',
        secondary: '#ff6f61',
        inverse: '#ffffff'
      }
    },
    container: {
      minHeight: '100vh',
      background: '#fffbec',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem',
      position: 'relative'
    },
    player: {
      width: '100%',
      maxWidth: '300px',
      background: '#ffffff',
      border: '2px solid #ff6f61',
      boxShadow: '0 8px 32px rgba(255, 111, 97, 0.3), 0 0 0 1px rgba(64, 224, 208, 0.2)',
      borderRadius: '20px'
    },
    header: {
      padding: '1rem',
      borderBottom: '2px solid rgba(255, 111, 97, 0.3)',
      background: 'linear-gradient(135deg, #ff6f61 0%, #40e0d0 100%)',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      borderRadius: '20px 20px 0 0'
    },
    effects: {
      sliderTrack: 'rgba(255, 111, 97, 0.2)',
      sliderThumb: '#ff6f61',
      sliderHeight: '4px',
      sliderThumbSize: '16px',
      thumbBorder: '2px solid #ffffff',
      thumbShadow: '0 4px 12px rgba(255, 111, 97, 0.5)'
    },
    text: {
      weight: '600',
      shadow: '0 2px 4px rgba(0, 0, 0, 0.2)'
    },
    backgroundPattern: {
      backgroundImage: `
        radial-gradient(circle at 20% 80%, rgba(255, 111, 97, 0.08) 0%, transparent 40%),
        radial-gradient(circle at 80% 20%, rgba(64, 224, 208, 0.08) 0%, transparent 40%),
        radial-gradient(circle at 40% 40%, rgba(255, 215, 0, 0.06) 0%, transparent 50%)
      `
    },
    visualizer: {
      colors: ['#ff6f61', '#40e0d0', '#ffd700'],
      shadows: ['0 0 8px #ff6f61', '0 0 8px #40e0d0', '0 0 8px #ffd700'],
      borderRadius: '2px'
    },
    special: {
      artworkHover: 'linear-gradient(135deg, #4dd0e1, #fff176)'
    }
  },

  cosmic: {
    name: 'Cosmic',
    emoji: '🌌',
    fonts: {
      primary: "'Orbitron', 'Exo 2', 'Helvetica Neue', Arial, sans-serif"
    },
    colors: {
      primary: '#0080ff',
      secondary: '#8a2be2',
      accent: '#c0c0c0',
      background: 'radial-gradient(ellipse at center, #1a0033 0%, #000011 50%, #000000 100%)',
      surface: 'rgba(26, 0, 51, 0.9)',
      border: '#0080ff',
      text: {
        primary: '#ffffff',
        secondary: '#c0c0c0',
        inverse: '#000000'
      }
    },
    container: {
      minHeight: '100vh',
      background: 'radial-gradient(ellipse at center, #1a0033 0%, #000011 50%, #000000 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem',
      position: 'relative',
      overflow: 'hidden'
    },
    player: {
      width: '100%',
      maxWidth: '300px',
      background: 'rgba(26, 0, 51, 0.95)',
      border: '1px solid #0080ff',
      boxShadow: '0 0 40px rgba(0, 128, 255, 0.4), 0 0 80px rgba(138, 43, 226, 0.2), inset 0 0 30px rgba(192, 192, 192, 0.05)',
      borderRadius: '16px',
      backdropFilter: 'blur(10px)',
      position: 'relative'
    },
    header: {
      padding: '1rem',
      borderBottom: '1px solid rgba(0, 128, 255, 0.3)',
      background: 'linear-gradient(135deg, rgba(0, 128, 255, 0.2) 0%, rgba(138, 43, 226, 0.2) 100%)',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      borderRadius: '16px 16px 0 0',
      position: 'relative'
    },
    effects: {
      sliderTrack: 'rgba(0, 128, 255, 0.2)',
      sliderThumb: '#0080ff',
      sliderHeight: '3px',
      sliderThumbSize: '16px',
      thumbBorder: '2px solid rgba(192, 192, 192, 0.8)',
      thumbShadow: '0 0 15px rgba(0, 128, 255, 0.8), 0 0 30px rgba(0, 128, 255, 0.4)'
    },
    text: {
      weight: '500',
      shadow: '0 0 10px rgba(0, 128, 255, 0.6), 0 0 20px rgba(0, 128, 255, 0.3)'
    },
    backgroundPattern: {
      backgroundImage: `
        radial-gradient(circle at 10% 20%, rgba(0, 128, 255, 0.1) 0%, transparent 20%),
        radial-gradient(circle at 80% 80%, rgba(138, 43, 226, 0.1) 0%, transparent 20%),
        radial-gradient(circle at 40% 40%, rgba(192, 192, 192, 0.05) 0%, transparent 30%),
        radial-gradient(1px 1px at 20px 30px, rgba(255, 255, 255, 0.8), transparent),
        radial-gradient(1px 1px at 40px 70px, rgba(0, 128, 255, 0.6), transparent),
        radial-gradient(1px 1px at 90px 40px, rgba(138, 43, 226, 0.4), transparent),
        radial-gradient(1px 1px at 130px 80px, rgba(255, 255, 255, 0.6), transparent),
        radial-gradient(2px 2px at 160px 30px, rgba(0, 128, 255, 0.3), transparent)
      `,
      backgroundSize: '200px 100px, 200px 100px, 200px 100px, 200px 100px, 200px 100px, 200px 100px, 200px 100px, 200px 100px',
      animation: 'starfield 20s linear infinite'
    },
    visualizer: {
      colors: ['#0080ff', '#8a2be2', '#c0c0c0', '#00ffff'],
      shadows: ['0 0 12px #0080ff', '0 0 12px #8a2be2', '0 0 12px #c0c0c0', '0 0 12px #00ffff'],
      borderRadius: '1px'
    },
    special: {
      artworkHover: 'radial-gradient(ellipse at center, rgba(0, 128, 255, 0.3) 0%, rgba(138, 43, 226, 0.2) 100%)',
      headerGlow: '0 0 20px rgba(0, 128, 255, 0.4)'
    }
  }
};

// Enhanced effect presets with better mobile compatibility
const effectPresets = {
  bedroom: {
    playbackRate: 0.8,
    reverbWet: 0.25,
    reverbRoomSize: 0.6,
    reverbDecay: 2.0,
    lowPassFilter: 6000,
    preservePitch: true
  },
  vaporwave: {
    playbackRate: 0.6,
    reverbWet: 0.4,
    reverbRoomSize: 1.0,
    reverbDecay: 3.5,
    lowPassFilter: 4000,
    preservePitch: true
  },
  chill: {
    playbackRate: 0.75,
    reverbWet: 0.15,
    reverbRoomSize: 0.4,
    reverbDecay: 1.2,
    lowPassFilter: 8000,
    preservePitch: true
  },
  midnight: {
    playbackRate: 0.65,
    reverbWet: 0.35,
    reverbRoomSize: 0.8,
    reverbDecay: 2.8,
    lowPassFilter: 4500,
    preservePitch: true
  }
};

// Custom hook for theme management (ORIGINAL)
const useTheme = (initialTheme = 'default') => {
  const [currentTheme, setCurrentTheme] = useState(initialTheme);
  
  const theme = useMemo(() => themeConfig[currentTheme], [currentTheme]);
  const themeNames = Object.keys(themeConfig);
  
  const cycleTheme = useCallback(() => {
    const currentIndex = themeNames.indexOf(currentTheme);
    const nextIndex = (currentIndex + 1) % themeNames.length;
    setCurrentTheme(themeNames[nextIndex]);
  }, [currentTheme, themeNames]);
  
  return {
    theme,
    currentTheme,
    cycleTheme
  };
};

// Enhanced mobile/iOS detection
const isMobile = () => {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
         (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
};

const isIOS = () => {
  return /iPad|iPhone|iPod/.test(navigator.userAgent) || 
         (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
};

// iOS-safe audio context creation
const createIOSSafeAudioContext = async (desiredSampleRate = 44100) => {
  const AudioCtor = window.AudioContext || window.webkitAudioContext;
  if (!AudioCtor) return null;

  let context = new AudioCtor();
  
  // iOS sample rate fix
  if (isIOS() && context.sampleRate !== desiredSampleRate) {
    console.log(`iOS sample rate mismatch: ${context.sampleRate}Hz, desired: ${desiredSampleRate}Hz`);
    
    try {
      await context.close();
      context = new AudioCtor();
    } catch (error) {
      console.warn('Failed to fix iOS sample rate:', error);
    }
  }
  
  return context;
};

const SlowReverbApp = () => {
  const { theme, currentTheme, cycleTheme } = useTheme('default');
  
  const [audioFile, setAudioFile] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isMobileDevice, setIsMobileDevice] = useState(false);
  const [isIOSDevice, setIsIOSDevice] = useState(false);
  const [audioError, setAudioError] = useState('');
  const [userInteracted, setUserInteracted] = useState(false);
  const [audioQuality, setAudioQuality] = useState('high'); // high, medium, basic
  
  // Visualizer state (ORIGINAL)
  const [visualizerData, setVisualizerData] = useState(Array(32).fill(0));
  
  // Effect parameters with mobile optimization
  const [playbackRate, setPlaybackRate] = useState(0.8);
  const [reverbRoomSize, setReverbRoomSize] = useState(0.6);
  const [reverbDecay, setReverbDecay] = useState(2.0);
  const [reverbWet, setReverbWet] = useState(0.25);
  const [volume, setVolume] = useState(0.8);
  const [lowPassFilter, setLowPassFilter] = useState(8000);
  const [preservePitch, setPreservePitch] = useState(true);
  
  // Enhanced audio context and nodes
  const audioContextRef = useRef(null);
  const sourceNodeRef = useRef(null);
  const gainNodeRef = useRef(null);
  const convolverNodeRef = useRef(null);
  const wetGainRef = useRef(null);
  const dryGainRef = useRef(null);
  const filterNodeRef = useRef(null);
  const audioBufferRef = useRef(null);
  const analyserNodeRef = useRef(null);
  const pitchShifterRef = useRef(null);
  
  // Improved buffer management
  const processedBufferRef = useRef(null);
  const bufferChunksRef = useRef([]);
  const chunkSizeRef = useRef(4096); // Larger chunks for mobile
  
  const fileInputRef = useRef(null);
  const startTimeRef = useRef(0);
  const pauseTimeRef = useRef(0);
  const animationFrameRef = useRef(null);
  
  // Detect device type and set quality on mount
  useEffect(() => {
    const mobile = isMobile();
    const ios = isIOS();
    setIsMobileDevice(mobile);
    setIsIOSDevice(ios);
    
    // Set audio quality based on device
    if (ios) {
      setAudioQuality('medium'); // iOS has good performance but needs optimization
      chunkSizeRef.current = 8192; // Larger chunks for iOS
    } else if (mobile) {
      setAudioQuality('basic'); // Android/other mobile
      chunkSizeRef.current = 16384; // Even larger for Android
    } else {
      setAudioQuality('high'); // Desktop
      chunkSizeRef.current = 4096;
    }
    
    // Add user interaction listener
    const handleUserInteraction = () => {
      setUserInteracted(true);
      document.removeEventListener('touchstart', handleUserInteraction);
      document.removeEventListener('click', handleUserInteraction);
    };
    
    document.addEventListener('touchstart', handleUserInteraction);
    document.addEventListener('click', handleUserInteraction);
    
    return () => {
      document.removeEventListener('touchstart', handleUserInteraction);
      document.removeEventListener('click', handleUserInteraction);
    };
  }, []);
  
  // Enhanced audio context initialization
  const initAudioContext = async () => {
    try {
      if (!audioContextRef.current) {
        audioContextRef.current = await createIOSSafeAudioContext(44100);
        
        if (!audioContextRef.current) {
          throw new Error('Web Audio API not supported');
        }
        
        // Create essential nodes
        gainNodeRef.current = audioContextRef.current.createGain();
        analyserNodeRef.current = audioContextRef.current.createAnalyser();
        
        // Optimize analyzer based on device
        if (audioQuality === 'basic') {
          analyserNodeRef.current.fftSize = 64;
          analyserNodeRef.current.smoothingTimeConstant = 0.9;
        } else if (audioQuality === 'medium') {
          analyserNodeRef.current.fftSize = 128;
          analyserNodeRef.current.smoothingTimeConstant = 0.85;
        } else {
          analyserNodeRef.current.fftSize = 256;
          analyserNodeRef.current.smoothingTimeConstant = 0.8;
        }
        
        analyserNodeRef.current.minDecibels = -90;
        analyserNodeRef.current.maxDecibels = -10;
        
        // Create advanced nodes for medium/high quality
        if (audioQuality !== 'basic') {
          try {
            convolverNodeRef.current = audioContextRef.current.createConvolver();
            wetGainRef.current = audioContextRef.current.createGain();
            dryGainRef.current = audioContextRef.current.createGain();
            filterNodeRef.current = audioContextRef.current.createBiquadFilter();
            
            // Create reverb impulse with optimized parameters
            const impulseResponse = createReverbImpulse(
              audioContextRef.current, 
              reverbRoomSize, 
              reverbDecay,
              audioQuality === 'medium' ? 2 : 4 // Shorter reverb for mobile
            );
            
            convolverNodeRef.current.buffer = impulseResponse;
            filterNodeRef.current.type = 'lowpass';
            filterNodeRef.current.frequency.value = lowPassFilter;
            filterNodeRef.current.Q.value = 1;
            
            wetGainRef.current.gain.value = reverbWet;
            dryGainRef.current.gain.value = 1 - reverbWet;
          } catch (advancedError) {
            console.warn('Advanced audio features not available:', advancedError);
            setAudioQuality('basic');
          }
        }
        
        gainNodeRef.current.gain.value = volume;
      }
      
      // Resume context if suspended
      if (audioContextRef.current.state === 'suspended') {
        await audioContextRef.current.resume();
      }
      
      return true;
    } catch (error) {
      console.error('Audio context initialization error:', error);
      setAudioError('Audio initialization failed. Please try refreshing the page.');
      return false;
    }
  };
  
  // Enhanced reverb impulse creation with quality optimization
  const createReverbImpulse = (audioContext, roomSize, decay, durationSeconds = 4) => {
    const length = audioContext.sampleRate * Math.min(durationSeconds, 4); // Limit length for mobile
    const impulse = audioContext.createBuffer(2, length, audioContext.sampleRate);
    
    for (let channel = 0; channel < 2; channel++) {
      const channelData = impulse.getChannelData(channel);
      for (let i = 0; i < length; i++) {
        const n = length - i;
        const envelope = Math.pow(n / length, roomSize);
        const noise = (Math.random() * 2 - 1) * envelope;
        
        // Apply subtle filtering for more natural reverb
        if (i > 0) {
          channelData[i] = noise * 0.8 + channelData[i - 1] * 0.2;
        } else {
          channelData[i] = noise;
        }
      }
    }
    
    return impulse;
  };
  
  // Enhanced audio processing with pitch preservation
  const processAudioBuffer = async (buffer, rate, preservePitch = true) => {
    if (!audioContextRef.current) return buffer;
    
    try {
      const offlineContext = new OfflineAudioContext(
        buffer.numberOfChannels,
        Math.floor(buffer.length / rate),
        buffer.sampleRate
      );
      
      const source = offlineContext.createBufferSource();
      source.buffer = buffer;
      
      if (preservePitch && rate !== 1.0) {
        // Simple pitch preservation using resampling
        source.playbackRate.value = rate;
        
        // Create a pitch shifter effect (simplified)
        const pitchRatio = 1 / rate;
        if (pitchRatio !== 1.0) {
          // This is a simplified approach - in production you'd use a more sophisticated algorithm
          const shiftedBuffer = offlineContext.createBuffer(
            buffer.numberOfChannels,
            buffer.length,
            buffer.sampleRate * pitchRatio
          );
          
          for (let channel = 0; channel < buffer.numberOfChannels; channel++) {
            const inputData = buffer.getChannelData(channel);
            const outputData = shiftedBuffer.getChannelData(channel);
            
            for (let i = 0; i < outputData.length; i++) {
              const sourceIndex = Math.floor(i * rate);
              if (sourceIndex < inputData.length) {
                outputData[i] = inputData[sourceIndex];
              }
            }
          }
          
          source.buffer = shiftedBuffer;
          source.playbackRate.value = 1.0;
        }
      } else {
        source.playbackRate.value = rate;
      }
      
      source.connect(offlineContext.destination);
      source.start(0);
      
      const processedBuffer = await offlineContext.startRendering();
      return processedBuffer;
      
    } catch (error) {
      console.warn('Audio processing failed, using original buffer:', error);
      return buffer;
    }
  };
  
  // Update visualizer with performance optimization
  const updateVisualizer = useCallback(() => {
    if (!analyserNodeRef.current || !isPlaying) {
      setVisualizerData(Array(32).fill(2));
      return;
    }
    
    const bufferLength = analyserNodeRef.current.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);
    analyserNodeRef.current.getByteFrequencyData(dataArray);
    
    const bars = [];
    const numBars = audioQuality === 'basic' ? 16 : 32;
    const groupSize = Math.floor(bufferLength / numBars);
    
    for (let i = 0; i < numBars; i++) {
      let sum = 0;
      const startIndex = i * groupSize;
      const endIndex = Math.min(startIndex + groupSize, bufferLength);
      
      for (let j = startIndex; j < endIndex; j++) {
        sum += dataArray[j];
      }
      
      const average = sum / groupSize;
      const normalizedValue = (average / 255) * 100;
      bars.push(Math.max(2, normalizedValue));
    }
    
    // Pad with zeros if needed
    while (bars.length < 32) {
      bars.push(2);
    }
    
    setVisualizerData(bars);
    
    if (isPlaying) {
      animationFrameRef.current = requestAnimationFrame(updateVisualizer);
    }
  }, [isPlaying, audioQuality]);
  
  // Start visualizer animation
  useEffect(() => {
    if (isPlaying) {
      updateVisualizer();
    } else {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      setVisualizerData(Array(32).fill(2));
    }
    
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isPlaying, updateVisualizer]);
  
  // Enhanced file upload with better processing
  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file || !file.type.startsWith('audio/')) {
      setAudioError('Please select a valid audio file');
      return;
    }
    
    // Check file size based on device capability
    const maxSize = audioQuality === 'basic' ? 50 * 1024 * 1024 : 
                   audioQuality === 'medium' ? 100 * 1024 * 1024 : 
                   200 * 1024 * 1024;
    
    if (file.size > maxSize) {
      setAudioError(`File too large. Please use files under ${Math.floor(maxSize / 1024 / 1024)}MB.`);
      return;
    }
    
    setIsLoading(true);
    setAudioFile(file);
    setAudioError('');
    
    try {
      const contextReady = await initAudioContext();
      if (!contextReady) {
        throw new Error('Audio context initialization failed');
      }
      
      const arrayBuffer = await file.arrayBuffer();
      const audioBuffer = await audioContextRef.current.decodeAudioData(arrayBuffer);
      
      audioBufferRef.current = audioBuffer;
      setDuration(audioBuffer.duration);
      setCurrentTime(0);
      pauseTimeRef.current = 0;
      setIsLoading(false);
      
      // Show quality info
      const qualityMessage = audioQuality === 'basic' ? 'Basic audio mode enabled for compatibility.' :
                            audioQuality === 'medium' ? 'Optimized audio mode for mobile devices.' :
                            'High-quality audio mode enabled.';
      
      if (isMobileDevice) {
        setAudioError(qualityMessage);
        setTimeout(() => setAudioError(''), 3000);
      }
      
    } catch (error) {
      console.error('Error loading audio file:', error);
      setAudioError('Failed to load audio file. Please try a different format (MP3, AAC, WAV).');
      setIsLoading(false);
    }
  };
  
  // Enhanced node connection with quality adaptation
  const connectNodes = (sourceNode) => {
    try {
      if (audioQuality === 'basic') {
        // Simple connection for basic quality
        sourceNode.connect(gainNodeRef.current);
        gainNodeRef.current.connect(analyserNodeRef.current);
        gainNodeRef.current.connect(audioContextRef.current.destination);
      } else {
        // Full connection for medium/high quality
        sourceNode.connect(filterNodeRef.current);
        filterNodeRef.current.connect(gainNodeRef.current);
        gainNodeRef.current.connect(analyserNodeRef.current);
        
        // Dry signal
        gainNodeRef.current.connect(dryGainRef.current);
        dryGainRef.current.connect(audioContextRef.current.destination);
        
        // Wet signal (reverb)
        if (convolverNodeRef.current && wetGainRef.current) {
          gainNodeRef.current.connect(convolverNodeRef.current);
          convolverNodeRef.current.connect(wetGainRef.current);
          wetGainRef.current.connect(audioContextRef.current.destination);
        }
      }
    } catch (error) {
      console.error('Node connection error:', error);
      // Fallback to simple connection
      sourceNode.connect(gainNodeRef.current);
      gainNodeRef.current.connect(audioContextRef.current.destination);
    }
  };
  
  // Enhanced pause function
  const pauseAudio = useCallback(() => {
    if (sourceNodeRef.current && audioContextRef.current) {
      try {
        sourceNodeRef.current.stop();
        sourceNodeRef.current.disconnect();
        sourceNodeRef.current = null;
        
        const elapsed = (audioContextRef.current.currentTime - startTimeRef.current) * playbackRate;
        pauseTimeRef.current = Math.min(elapsed, duration);
        setCurrentTime(pauseTimeRef.current);
        setIsPlaying(false);
      } catch (error) {
        console.warn('Pause error:', error);
        setIsPlaying(false);
      }
    }
  }, [playbackRate, duration]);
  
  // Enhanced play function with quality optimization
  const playAudio = async () => {
    if (!userInteracted && isMobileDevice) {
      setAudioError('Please tap anywhere to enable audio playback.');
      return;
    }
    
    if (!audioBufferRef.current || !audioContextRef.current) {
      setAudioError('No audio file loaded.');
      return;
    }
    
    setAudioError('');
    
    try {
      // Ensure audio context is running
      if (audioContextRef.current.state === 'suspended') {
        await audioContextRef.current.resume();
      }
      
      // Stop any existing playback
      if (sourceNodeRef.current) {
        sourceNodeRef.current.stop();
        sourceNodeRef.current.disconnect();
      }
      
      // Create new source
      sourceNodeRef.current = audioContextRef.current.createBufferSource();
      
      // Process audio if needed
      let bufferToPlay = audioBufferRef.current;
      if (preservePitch && playbackRate !== 1.0 && audioQuality !== 'basic') {
        bufferToPlay = await processAudioBuffer(audioBufferRef.current, playbackRate, true);
        sourceNodeRef.current.playbackRate.value = 1.0;
      } else {
        sourceNodeRef.current.playbackRate.value = playbackRate;
      }
      
      sourceNodeRef.current.buffer = bufferToPlay;
      
      // Connect nodes
      connectNodes(sourceNodeRef.current);
      
      // Start playback
      const offset = pauseTimeRef.current;
      sourceNodeRef.current.start(0, offset);
      startTimeRef.current = audioContextRef.current.currentTime - offset / sourceNodeRef.current.playbackRate.value;
      
      sourceNodeRef.current.onended = () => {
        setIsPlaying(false);
        setCurrentTime(0);
        pauseTimeRef.current = 0;
      };
      
      setIsPlaying(true);
      
    } catch (error) {
      console.error('Playback error:', error);
      setAudioError('Playback failed. Please try reloading the file.');
    }
  };
  
  // Reset function
  const resetAudio = () => {
    pauseAudio();
    setCurrentTime(0);
    pauseTimeRef.current = 0;
  };
  
  // Apply effect preset with mobile optimization
  const applyPreset = useCallback((preset) => {
    setPlaybackRate(preset.playbackRate);
    setReverbWet(audioQuality === 'basic' ? 0 : preset.reverbWet);
    setReverbRoomSize(preset.reverbRoomSize);
    setReverbDecay(preset.reverbDecay);
    setLowPassFilter(preset.lowPassFilter);
    setPreservePitch(preset.preservePitch && audioQuality !== 'basic');
  }, [audioQuality]);
  
  // Real-time effect updates with performance optimization
  useEffect(() => {
    if (gainNodeRef.current) {
      gainNodeRef.current.gain.setValueAtTime(volume, audioContextRef.current?.currentTime || 0);
    }
  }, [volume]);
  
  useEffect(() => {
    if (audioQuality !== 'basic' && wetGainRef.current && dryGainRef.current) {
      const currentTime = audioContextRef.current?.currentTime || 0;
      wetGainRef.current.gain.setValueAtTime(reverbWet, currentTime);
      dryGainRef.current.gain.setValueAtTime(1 - reverbWet, currentTime);
    }
  }, [reverbWet, audioQuality]);
  
  useEffect(() => {
    if (audioQuality !== 'basic' && filterNodeRef.current) {
      const currentTime = audioContextRef.current?.currentTime || 0;
      filterNodeRef.current.frequency.setValueAtTime(lowPassFilter, currentTime);
    }
  }, [lowPassFilter, audioQuality]);
  
  useEffect(() => {
    if (sourceNodeRef.current && !preservePitch) {
      sourceNodeRef.current.playbackRate.setValueAtTime(playbackRate, audioContextRef.current?.currentTime || 0);
    }
  }, [playbackRate, preservePitch]);
  
  useEffect(() => {
    if (audioQuality !== 'basic' && convolverNodeRef.current && audioContextRef.current) {
      try {
        const impulseResponse = createReverbImpulse(
          audioContextRef.current, 
          reverbRoomSize, 
          reverbDecay,
          audioQuality === 'medium' ? 2 : 4
        );
        convolverNodeRef.current.buffer = impulseResponse;
      } catch (error) {
        console.warn('Reverb update failed:', error);
      }
    }
  }, [reverbRoomSize, reverbDecay, audioQuality]);
  
  // Time update for Web Audio API
  useEffect(() => {
    let interval;
    if (isPlaying && audioContextRef.current && startTimeRef.current) {
      interval = setInterval(() => {
        const rate = sourceNodeRef.current?.playbackRate.value || playbackRate;
        const elapsed = (audioContextRef.current.currentTime - startTimeRef.current) * rate;
        const newCurrentTime = Math.min(elapsed, duration);
        setCurrentTime(newCurrentTime);
        
        if (newCurrentTime >= duration) {
          pauseAudio();
        }
      }, 100);
    }
    return () => clearInterval(interval);
  }, [isPlaying, duration, playbackRate, pauseAudio]);
  
  // Format time display
  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };
  
  // Export function
  const exportAudio = () => {
    if (audioQuality === 'basic') {
      alert('Export functionality requires medium or high quality mode. Please try on a desktop browser.');
    } else {
      alert('Export functionality would be implemented with OfflineAudioContext for production use.');
    }
  };

  // Helper function to get themed button style
  const getButtonStyle = (type = 'default', disabled = false, isPlayButton = false) => {
    const baseStyle = {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      cursor: disabled ? 'not-allowed' : 'pointer',
      transition: 'all 0.2s',
      opacity: disabled ? 0.5 : 1,
      background: 'none',
      border: `1px solid ${theme.colors.border}`,
      color: theme.colors.text.primary,
      WebkitTapHighlightColor: 'transparent',
      touchAction: 'manipulation'
    };

    if (type === 'theme') {
      return {
        ...baseStyle,
        border: `1px solid ${theme.colors.primary}`,
        borderRadius: currentTheme === 'pixel' ? '0' : currentTheme === 'dark' ? '6px' : currentTheme === 'tropical' ? '12px' : '4px',
        color: theme.colors.primary,
        padding: '0.25rem 0.5rem',
        fontSize: '0.5rem',
        textTransform: 'uppercase',
        letterSpacing: '0.1em',
        boxShadow: theme.effects.thumbShadow || 'none',
        fontWeight: theme.text.weight
      };
    }

    if (type === 'control') {
      return {
        ...baseStyle,
        width: isPlayButton ? '48px' : '36px',
        height: isPlayButton ? '48px' : '36px',
        border: `1px solid ${theme.colors.primary}`,
        background: disabled ? (theme.effects.sliderTrack) : (isPlayButton && audioFile ? theme.colors.primary : theme.colors.surface),
        color: isPlayButton && audioFile ? theme.colors.text.inverse : theme.colors.text.primary,
        borderRadius: currentTheme === 'pixel' ? '0' : currentTheme === 'dark' ? (isPlayButton ? '12px' : '6px') : currentTheme === 'tropical' ? (isPlayButton ? '24px' : '18px') : isPlayButton ? '50%' : '4px',
        boxShadow: theme.effects.thumbShadow || 'none',
        imageRendering: theme.special?.imageRendering
      };
    }

    if (type === 'preset') {
      return {
        ...baseStyle,
        padding: '0.5rem 0.75rem',
        border: `1px solid ${theme.colors.primary}`,
        background: theme.colors.surface,
        color: theme.colors.primary,
        fontSize: '0.5rem',
        textTransform: 'uppercase',
        letterSpacing: '0.1em',
        borderRadius: currentTheme === 'vaporwave' ? '4px' : currentTheme === 'dark' ? '6px' : currentTheme === 'tropical' ? '8px' : '0',
        boxShadow: theme.effects.thumbShadow || 'none',
        fontWeight: theme.text.weight,
        imageRendering: theme.special?.imageRendering
      };
    }

    return baseStyle;
  };

  // Helper function to get slider style
  const getSliderStyle = (disabled = false) => ({
    width: '100%',
    height: theme.effects.sliderHeight,
    background: theme.effects.sliderTrack,
    marginTop: '0.25rem',
    WebkitAppearance: 'none',
    appearance: 'none',
    outline: 'none',
    marginBottom: '1rem',
    opacity: disabled ? 0.5 : 1,
    cursor: disabled ? 'not-allowed' : 'pointer',
    border: currentTheme === 'pixel' ? '2px solid #000000' : 'none',
    borderRadius: currentTheme === 'dark' ? '2px' : currentTheme === 'tropical' ? '4px' : '0',
    imageRendering: theme.special?.imageRendering,
    WebkitTapHighlightColor: 'transparent'
  });

  return (
    <div style={{
      ...theme.container,
      fontFamily: theme.fonts.primary
    }}>
      {/* Background patterns */}
      {theme.backgroundPattern && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          ...theme.backgroundPattern,
          pointerEvents: 'none',
          zIndex: 1
        }} />
      )}
      
      <div style={{ position: 'relative', zIndex: 2 }}>
        {/* Error Display */}
        {audioError && (
          <div style={{
            position: 'absolute',
            top: '-4rem',
            left: 0,
            right: 0,
            padding: '0.75rem',
            background: '#FFF3CD',
            border: '1px solid #FFECB3',
            borderRadius: currentTheme === 'tropical' ? '12px' : currentTheme === 'dark' ? '8px' : '4px',
            fontSize: '0.75rem',
            color: '#856404',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            zIndex: 20
          }}>
            <AlertCircle size={14} />
            {audioError}
          </div>
        )}
      
        {isLoading && (
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: currentTheme === 'vaporwave' ? 'rgba(0, 0, 0, 0.9)' : 
                       currentTheme === 'pixel' ? 'rgba(26, 26, 46, 0.95)' : 
                       currentTheme === 'dark' ? 'rgba(13, 13, 13, 0.95)' : 
                       currentTheme === 'tropical' ? 'rgba(255, 251, 236, 0.95)' : 'rgba(255, 255, 255, 0.9)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 10,
            fontSize: '0.75rem',
            color: theme.colors.text.secondary,
            borderRadius: currentTheme === 'tropical' ? '20px' : '0'
          }}>
            {currentTheme === 'pixel' ? 'LOADING...' : 'Loading...'}
          </div>
        )}
        
        <div className="player-2" style={theme.player}>
          {/* Header */}
          <div className="player-2__header" style={theme.header}>
            <div className="player-2__title" style={{
              fontSize: '0.75rem',
              textTransform: 'uppercase',
              letterSpacing: '0.2em',
              color: theme.colors.text.primary,
              textShadow: theme.text.shadow,
              flex: 1,
              textAlign: 'center',
              fontWeight: theme.text.weight
            }}>
              {currentTheme === 'pixel' ? 'SLOW + REVERB' : 'Slow + Reverb'}
              <div style={{
                fontSize: '0.5rem',
                opacity: 0.7,
                marginTop: '0.25rem'
              }}>
                {audioQuality.toUpperCase()} QUALITY
              </div>
            </div>
            <button 
              onClick={cycleTheme}
              style={getButtonStyle('theme')}
              title={`Current: ${currentTheme} - Click to cycle themes`}
            >
              {theme.emoji}
            </button>
          </div>

          {/* Artwork/Visualizer */}
          <div className="player-2__artwork" style={{
            aspectRatio: '1',
            background: currentTheme === 'vaporwave' ? 'linear-gradient(45deg, #3a0ca3, #7209b7)' : 
                       currentTheme === 'pixel' ? '#0f3460' : 
                       currentTheme === 'dark' ? 'linear-gradient(135deg, #1a1a1a, #0a0a0a)' : 
                       currentTheme === 'tropical' ? 'linear-gradient(135deg, #40e0d0, #ffd700)' : 
                       currentTheme === 'cosmic' ? 'radial-gradient(ellipse at center, rgba(0, 128, 255, 0.3) 0%, rgba(138, 43, 226, 0.2) 50%, rgba(0, 0, 0, 0.8) 100%)' : '#f0f0f0',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderBottom: `1px solid ${theme.colors.border}`,
            padding: '1rem',
            cursor: !audioFile ? 'pointer' : 'default',
            transition: 'all 0.2s',
            imageRendering: theme.special?.imageRendering,
            position: 'relative',
            overflow: 'hidden'
          }}
          onClick={!audioFile ? () => fileInputRef.current?.click() : undefined}
          >
            {/* Cosmic theme: Add floating stars */}
            {currentTheme === 'cosmic' && (
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundImage: `
                  radial-gradient(1px 1px at 15% 25%, rgba(255, 255, 255, 0.9), transparent),
                  radial-gradient(1px 1px at 85% 15%, rgba(0, 128, 255, 0.8), transparent),
                  radial-gradient(1px 1px at 70% 70%, rgba(138, 43, 226, 0.6), transparent),
                  radial-gradient(1px 1px at 30% 80%, rgba(255, 255, 255, 0.7), transparent),
                  radial-gradient(2px 2px at 60% 30%, rgba(0, 255, 255, 0.5), transparent)
                `,
                backgroundSize: '100% 100%',
                animation: 'twinkle 3s ease-in-out infinite alternate',
                pointerEvents: 'none'
              }} />
            )}
            
            {isPlaying ? (
              <div style={{
                display: 'flex',
                alignItems: 'end',
                justifyContent: 'center',
                gap: theme.visualizer?.gap || '2px',
                height: '60px',
                width: '100%',
                zIndex: 2
              }}>
                {visualizerData.slice(0, audioQuality === 'basic' ? 16 : 32).map((height, index) => (
                  <div
                    key={index}
                    style={{
                      width: theme.visualizer?.width || '4px',
                      height: `${Math.max(4, height * 0.6)}px`,
                      background: theme.visualizer?.colors[index % theme.visualizer.colors.length] || theme.colors.primary,
                      transition: 'height 0.1s ease',
                      boxShadow: theme.visualizer?.shadows?.[index % theme.visualizer.shadows.length] || 'none',
                      imageRendering: theme.special?.imageRendering,
                      borderRadius: theme.visualizer?.borderRadius || '0'
                    }}
                  />
                ))}
              </div>
            ) : !audioFile ? (
              <div style={{
                textAlign: 'center',
                color: theme.colors.text.secondary,
                zIndex: 2
              }}>
                <Upload size={24} style={{ marginBottom: '0.5rem' }} />
                <div style={{
                  fontSize: '0.625rem',
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                  fontWeight: theme.text.weight
                }}>
                  {currentTheme === 'pixel' ? 'LOAD FILE' : currentTheme === 'cosmic' ? 'Upload Audio' : 'Click to Upload'}
                </div>
              </div>
            ) : (
              <div className="player-2__artwork-placeholder" style={{
                width: '60px',
                height: '60px',
                background: currentTheme === 'vaporwave' ? 'rgba(0, 245, 255, 0.3)' : 
                           currentTheme === 'pixel' ? '#e94560' : 
                           currentTheme === 'dark' ? 'rgba(0, 255, 127, 0.3)' : 
                           currentTheme === 'tropical' ? 'rgba(255, 255, 255, 0.3)' : 
                           currentTheme === 'cosmic' ? 'rgba(0, 128, 255, 0.4)' : '#ddd',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: theme.colors.text.secondary,
                fontSize: '24px',
                fontWeight: theme.text.weight,
                imageRendering: theme.special?.imageRendering,
                borderRadius: currentTheme === 'tropical' ? '12px' : currentTheme === 'cosmic' ? '8px' : '0',
                zIndex: 2,
                boxShadow: currentTheme === 'cosmic' ? '0 0 20px rgba(0, 128, 255, 0.4)' : 'none'
              }}>
                {currentTheme === 'pixel' ? '♫' : currentTheme === 'tropical' ? '🎵' : currentTheme === 'cosmic' ? '🌟' : '♪'}
              </div>
            )}
          </div>

          {/* Track Info */}
          <div className="player-2__info" style={{
            padding: '1rem',
            textAlign: 'center',
            borderBottom: `1px solid ${theme.colors.border}`
          }}>
            <div className="player-2__track-name" style={{
              fontSize: '0.75rem',
              color: theme.colors.text.primary,
              marginBottom: '0.25rem',
              fontWeight: theme.text.weight
            }}>
              {audioFile ? audioFile.name.replace(/\.[^/.]+$/, '') : (currentTheme === 'pixel' ? 'NO TRACK LOADED' : 'No Track Selected')}
            </div>
            <div className="player-2__artist" style={{
              fontSize: '0.625rem',
              color: theme.colors.text.secondary,
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              fontWeight: theme.text.weight
            }}>
              {audioFile ? (
                preservePitch ? 
                  (currentTheme === 'pixel' ? 'PITCH PRESERVED' : 'Pitch Preserved') : 
                  (currentTheme === 'pixel' ? 'NATURAL SLOW' : 'Natural Slow')
              ) : (
                currentTheme === 'pixel' ? 'SELECT AUDIO FILE' : 'Select an audio file to begin'
              )}
            </div>
          </div>

          {/* Progress */}
          <div className="player-2__progress" style={{
            padding: '1rem',
            borderBottom: `1px solid ${theme.colors.border}`
          }}>
            <div className="player-2__time-display" style={{
              display: 'flex',
              justifyContent: 'space-between',
              fontSize: '0.625rem',
              color: theme.colors.text.secondary,
              marginBottom: '0.5rem',
              fontVariantNumeric: 'tabular-nums',
              fontWeight: theme.text.weight
            }}>
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(duration)}</span>
            </div>
            <div className="player-2__progress-bar" style={{
              height: theme.effects.sliderHeight,
              background: theme.effects.sliderTrack,
              borderRadius: currentTheme === 'vaporwave' ? '1px' : currentTheme === 'dark' ? '2px' : currentTheme === 'tropical' ? '4px' : '0',
              border: currentTheme === 'pixel' ? '2px solid #000000' : 'none'
            }}>
              <div className="player-2__progress-fill" style={{
                height: '100%',
                width: `${duration > 0 ? (currentTime / duration) * 100 : 0}%`,
                background: currentTheme === 'vaporwave' ? '#ff006e' : 
                           currentTheme === 'pixel' ? '#e94560' : 
                           currentTheme === 'dark' ? 'linear-gradient(90deg, #00ff7f, #ff1493)' : 
                           currentTheme === 'tropical' ? 'linear-gradient(90deg, #ff6f61, #40e0d0)' : 
                           currentTheme === 'cosmic' ? 'linear-gradient(90deg, #0080ff, #8a2be2)' : '#000',
                transition: 'width 0.1s linear',
                borderRadius: currentTheme === 'vaporwave' ? '1px' : currentTheme === 'dark' ? '2px' : currentTheme === 'tropical' ? '4px' : '0',
                boxShadow: theme.effects.thumbShadow || 'none',
                imageRendering: theme.special?.imageRendering
              }} />
            </div>
          </div>

          {/* Controls */}
          <div className="player-2__controls" style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '1rem',
            padding: '1rem',
            borderBottom: `1px solid ${theme.colors.border}`
          }}>
            <button 
              className="player-2__control-btn"
              onClick={resetAudio}
              disabled={!audioFile}
              style={getButtonStyle('control', !audioFile)}
            >
              <RotateCcw size={14} />
            </button>
            
            <button 
              className="player-2__control-btn player-2__control-btn--play"
              onClick={isPlaying ? pauseAudio : playAudio}
              disabled={!audioFile}
              style={getButtonStyle('control', !audioFile, true)}
            >
              {isPlaying ? <Pause size={16} /> : <Play size={16} />}
            </button>
            
            <button 
              className="player-2__control-btn"
              onClick={() => fileInputRef.current?.click()}
              style={getButtonStyle('control')}
              title="Upload new file"
            >
              <Upload size={14} />
            </button>
            
            <button 
              className="player-2__control-btn"
              onClick={exportAudio}
              disabled={!audioFile}
              style={getButtonStyle('control', !audioFile)}
              title="Export processed audio"
            >
              <Download size={14} />
            </button>
            
            <input
              ref={fileInputRef}
              type="file"
              accept="audio/mp3,audio/mp4,audio/m4a,audio/wav,audio/aac,audio/ogg,audio/webm,audio/*"
              onChange={handleFileUpload}
              style={{ display: 'none' }}
            />
          </div>

          {/* Effects */}
          <div className="player-2__effects" style={{ padding: '1rem' }}>
            {/* Pitch Preservation Toggle */}
            {audioQuality !== 'basic' && (
              <div style={{
                marginBottom: '1rem',
                paddingBottom: '1rem',
                borderBottom: `1px solid ${theme.colors.border}`
              }}>
                <label style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  fontSize: '0.625rem',
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                  color: theme.colors.text.secondary,
                  fontWeight: theme.text.weight,
                  cursor: 'pointer'
                }}>
                  <input
                    type="checkbox"
                    checked={preservePitch}
                    onChange={(e) => setPreservePitch(e.target.checked)}
                    disabled={!audioFile}
                    style={{
                      accentColor: theme.colors.primary
                    }}
                  />
                  {currentTheme === 'pixel' ? 'PRESERVE PITCH' : 'Preserve Pitch'}
                </label>
              </div>
            )}

            {/* Speed */}
            <div className="player-2__effect-row" style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '0.75rem'
            }}>
              <span className="player-2__effect-label" style={{
                fontSize: '0.625rem',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                color: theme.colors.text.secondary,
                fontWeight: theme.text.weight
              }}>
                {currentTheme === 'pixel' ? 'SPD' : 'Speed'}
              </span>
              <span className="player-2__effect-value" style={{
                fontSize: '0.625rem',
                color: theme.colors.text.primary,
                fontVariantNumeric: 'tabular-nums',
                fontWeight: theme.text.weight
              }}>
                {playbackRate.toFixed(1)}x
              </span>
            </div>
            <input 
              type="range" 
              className="player-2__effect-slider"
              min="0.25"
              max="3.0"
              step="0.05"
              value={playbackRate}
              onChange={(e) => setPlaybackRate(parseFloat(e.target.value))}
              disabled={!audioFile}
              style={getSliderStyle(!audioFile)}
            />

            {/* Reverb (Available based on audio quality) */}
            <div className="player-2__effect-row" style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '0.75rem'
            }}>
              <span className="player-2__effect-label" style={{
                fontSize: '0.625rem',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                color: audioQuality === 'basic' ? theme.colors.text.secondary + '60' : theme.colors.text.secondary,
                fontWeight: theme.text.weight
              }}>
                {currentTheme === 'pixel' ? 'REV' : 'Reverb'} {audioQuality === 'basic' && '(Unavailable)'}
              </span>
              <span className="player-2__effect-value" style={{
                fontSize: '0.625rem',
                color: theme.colors.text.primary,
                fontVariantNumeric: 'tabular-nums',
                fontWeight: theme.text.weight,
                opacity: audioQuality === 'basic' ? 0.5 : 1
              }}>
                {Math.round(reverbWet * 100)}%
              </span>
            </div>
            <input 
              type="range" 
              className="player-2__effect-slider"
              min="0"
              max="0.6"
              step="0.05"
              value={reverbWet}
              onChange={(e) => setReverbWet(parseFloat(e.target.value))}
              disabled={!audioFile || audioQuality === 'basic'}
              style={getSliderStyle(!audioFile || audioQuality === 'basic')}
            />

            {/* Filter */}
            <div className="player-2__effect-row" style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '0.75rem'
            }}>
              <span className="player-2__effect-label" style={{
                fontSize: '0.625rem',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                color: audioQuality === 'basic' ? theme.colors.text.secondary + '60' : theme.colors.text.secondary,
                fontWeight: theme.text.weight
              }}>
                {currentTheme === 'pixel' ? 'FLT' : 'Filter'} {audioQuality === 'basic' && '(Unavailable)'}
              </span>
              <span className="player-2__effect-value" style={{
                fontSize: '0.625rem',
                color: theme.colors.text.primary,
                fontVariantNumeric: 'tabular-nums',
                fontWeight: theme.text.weight,
                opacity: audioQuality === 'basic' ? 0.5 : 1
              }}>
                {(lowPassFilter/1000).toFixed(1)}k
              </span>
            </div>
            <input 
              type="range" 
              className="player-2__effect-slider"
              min="500"
              max="16000"
              step="100"
              value={lowPassFilter}
              onChange={(e) => setLowPassFilter(parseInt(e.target.value))}
              disabled={!audioFile || audioQuality === 'basic'}
              style={getSliderStyle(!audioFile || audioQuality === 'basic')}
            />

            {/* Volume */}
            <div className="player-2__effect-row" style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '0.75rem'
            }}>
              <span className="player-2__effect-label" style={{
                fontSize: '0.625rem',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                color: theme.colors.text.secondary,
                fontWeight: theme.text.weight
              }}>
                {currentTheme === 'pixel' ? 'VOL' : 'Volume'}
              </span>
              <span className="player-2__effect-value" style={{
                fontSize: '0.625rem',
                color: theme.colors.text.primary,
                fontVariantNumeric: 'tabular-nums',
                fontWeight: theme.text.weight
              }}>
                {Math.round(volume * 100)}%
              </span>
            </div>
            <input 
              type="range" 
              className="player-2__effect-slider"
              min="0"
              max="1"
              step="0.05"
              value={volume}
              onChange={(e) => setVolume(parseFloat(e.target.value))}
              disabled={!audioFile}
              style={getSliderStyle(!audioFile)}
            />

            {/* Presets */}
            <div style={{
              marginTop: '1.5rem',
              paddingTop: '1rem',
              borderTop: `1px solid ${theme.colors.border}`
            }}>
              <div style={{
                fontSize: '0.625rem',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                color: theme.colors.text.secondary,
                marginBottom: '0.75rem',
                textAlign: 'center',
                fontWeight: theme.text.weight
              }}>
                {currentTheme === 'pixel' ? 'PRESETS' : 'Presets'}
              </div>
              <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '0.5rem',
                justifyContent: 'center'
              }}>
                <button 
                  onClick={() => applyPreset(effectPresets.bedroom)}
                  disabled={!audioFile}
                  style={getButtonStyle('preset', !audioFile)}
                >
                  {currentTheme === 'pixel' ? 'BEDRM' : 'Bedroom'}
                </button>
                <button 
                  onClick={() => applyPreset(effectPresets.vaporwave)}
                  disabled={!audioFile}
                  style={getButtonStyle('preset', !audioFile)}
                >
                  {currentTheme === 'pixel' ? 'VAPOR' : 'Vaporwave'}
                </button>
                <button 
                  onClick={() => applyPreset(effectPresets.chill)}
                  disabled={!audioFile}
                  style={getButtonStyle('preset', !audioFile)}
                >
                  {currentTheme === 'pixel' ? 'CHILL' : 'Chill'}
                </button>
                <button 
                  onClick={() => applyPreset(effectPresets.midnight)}
                  disabled={!audioFile}
                  style={getButtonStyle('preset', !audioFile)}
                >
                  {currentTheme === 'pixel' ? 'NIGHT' : currentTheme === 'tropical' ? 'Beach' : 'Midnight'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

        {/* Mobile Tips */}
        {isMobileDevice && (
          <div style={{
            position: 'absolute',
            bottom: '-14rem',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '100%',
            maxWidth: '300px',
            padding: '0.75rem',
            background: theme.colors.surface,
            border: `1px solid ${theme.colors.border}`,
            borderRadius: currentTheme === 'tropical' ? '12px' : currentTheme === 'dark' ? '8px' : '4px',
            fontSize: '0.625rem',
            color: theme.colors.text.secondary,
            lineHeight: '1.3',
            textAlign: 'left'
          }}>
            <div style={{ fontWeight: 'bold', marginBottom: '0.5rem', color: theme.colors.text.primary }}>
              📱 Mobile Audio Tips:
            </div>
            <div style={{ marginBottom: '0.25rem' }}>
              • <strong>Quality mode:</strong> {audioQuality.charAt(0).toUpperCase() + audioQuality.slice(1)} (auto-detected)
            </div>
            <div style={{ marginBottom: '0.25rem' }}>
              • <strong>First tap:</strong> Required to enable audio playback
            </div>
            <div style={{ marginBottom: '0.25rem' }}>
              • <strong>Best formats:</strong> MP3, AAC, M4A for reliability
            </div>
            <div style={{ marginBottom: '0.25rem' }}>
              • <strong>File size:</strong> Up to {audioQuality === 'basic' ? '50' : audioQuality === 'medium' ? '100' : '200'}MB
            </div>
            <div style={{ marginBottom: '0.25rem' }}>
              • <strong>Pitch preservation:</strong> {audioQuality === 'basic' ? 'Not available' : 'Available'}
            </div>
            <div>
              • <strong>Effects:</strong> {audioQuality === 'basic' ? 'Speed & Volume only' : 'Full effects available'}
            </div>
          </div>
        )}

      <style>{`
        .player-2__control-btn:hover:not(:disabled) {
          background: ${theme.colors.primary} !important;
          color: ${theme.colors.text.inverse} !important;
          transform: translateY(-1px) ${currentTheme === 'tropical' ? 'scale(1.05)' : ''};
          ${currentTheme === 'pixel' ? 'box-shadow: 4px 4px 0 #000000 !important;' : 
            currentTheme === 'dark' ? 'box-shadow: 0 0 12px rgba(0, 255, 127, 0.6) !important;' : 
            currentTheme === 'tropical' ? 'box-shadow: 0 6px 20px rgba(255, 111, 97, 0.4) !important;' : 
            currentTheme === 'cosmic' ? 'box-shadow: 0 0 15px rgba(0, 128, 255, 0.6) !important;' : ''}
        }
        
        .player-2__control-btn--play:hover:not(:disabled) {
          transform: translateY(-2px) ${currentTheme === 'pixel' ? '' : currentTheme === 'tropical' ? 'scale(1.1)' : 'scale(1.05)'};
          ${currentTheme === 'pixel' ? 'box-shadow: 4px 4px 0 #000000 !important;' : 
            currentTheme === 'dark' ? 'box-shadow: 0 0 25px rgba(0, 255, 127, 0.9) !important;' : 
            currentTheme === 'tropical' ? 'box-shadow: 0 8px 30px rgba(255, 111, 97, 0.6) !important;' : 
            currentTheme === 'cosmic' ? 'box-shadow: 0 0 30px rgba(0, 128, 255, 0.8) !important;' : ''}
        }
        
        .player-2__artwork:hover {
          background: ${theme.special?.artworkHover || 'inherit'} !important;
        }
        
        .player-2__effect-slider:not(:disabled)::-webkit-slider-thumb {
          -webkit-appearance: none;
          width: ${theme.effects.sliderThumbSize};
          height: ${theme.effects.sliderThumbSize};
          background: ${theme.effects.sliderThumb};
          cursor: pointer;
          border-radius: ${currentTheme === 'pixel' ? '0' : currentTheme === 'dark' ? '2px' : currentTheme === 'tropical' ? '8px' : '50%'};
          border: ${theme.effects.thumbBorder || (currentTheme === 'vaporwave' ? '2px solid #000' : currentTheme === 'dark' ? '2px solid #333' : 'none')};
          box-shadow: ${theme.effects.thumbShadow || 'none'};
          ${theme.special?.imageRendering ? 'image-rendering: pixelated;' : ''}
          transition: all 0.2s ease;
          -webkit-tap-highlight-color: transparent;
        }
        
        .player-2__effect-slider:disabled::-webkit-slider-thumb {
          -webkit-appearance: none;
          width: ${parseInt(theme.effects.sliderThumbSize) - 2}px;
          height: ${parseInt(theme.effects.sliderThumbSize) - 2}px;
          background: ${theme.effects.sliderTrack};
          cursor: not-allowed;
          border-radius: ${currentTheme === 'pixel' ? '0' : currentTheme === 'dark' ? '2px' : currentTheme === 'tropical' ? '8px' : '50%'};
          border: ${currentTheme === 'pixel' ? '2px solid #000000' : currentTheme === 'dark' ? '1px solid #333' : currentTheme === 'tropical' ? '1px solid #cccccc' : 'none'};
          ${theme.special?.imageRendering ? 'image-rendering: pixelated;' : ''}
        }
        
        .player-2__effect-slider::-webkit-slider-track {
          background: ${theme.effects.sliderTrack};
          height: ${theme.effects.sliderHeight};
          border-radius: ${currentTheme === 'dark' ? '2px' : currentTheme === 'tropical' ? '4px' : '0'};
          border: ${currentTheme === 'pixel' ? '2px solid #000000' : 'none'};
        }
        
        button:hover:not(:disabled) {
          background: ${theme.colors.primary} !important;
          color: ${theme.colors.text.inverse} !important;
          transform: translateY(-1px) ${currentTheme === 'tropical' ? 'scale(1.02)' : ''};
          ${currentTheme === 'pixel' ? 'box-shadow: 4px 4px 0 #000000 !important;' : 
            currentTheme === 'dark' ? 'box-shadow: 0 0 12px rgba(0, 255, 127, 0.6) !important;' : 
            currentTheme === 'tropical' ? 'box-shadow: 0 6px 16px rgba(255, 111, 97, 0.4) !important;' : 
            currentTheme === 'cosmic' ? 'box-shadow: 0 0 15px rgba(0, 128, 255, 0.6) !important;' : ''}
        }
        
        /* Mobile-specific optimizations */
        @supports (-webkit-touch-callout: none) {
          * {
            -webkit-tap-highlight-color: transparent;
            -webkit-touch-callout: none;
          }
          
          button {
            -webkit-user-select: none;
            user-select: none;
          }
          
          input[type="range"] {
            -webkit-appearance: none;
            appearance: none;
          }
        }
        
        /* Mobile touch improvements */
        @media (hover: none) and (pointer: coarse) {
          .player-2__control-btn {
            min-height: 44px;
            min-width: 44px;
          }
          
          .player-2__effect-slider {
            height: 44px;
            padding: 0 10px;
          }
          
          button {
            min-height: 44px;
            padding: 8px 12px;
          }
        }
        
        /* Cosmic theme animations */
        @keyframes starfield {
          0% { transform: translateY(0); }
          100% { transform: translateY(-200px); }
        }
        
        @keyframes twinkle {
          0% { opacity: 0.3; }
          100% { opacity: 1; }
        }
        
        ${currentTheme === 'cosmic' ? `
        .player-2__header {
          box-shadow: ${theme.special?.headerGlow} !important;
        }
        ` : ''}
        
        ${currentTheme === 'pixel' ? `
        * {
          image-rendering: pixelated;
          image-rendering: -moz-crisp-edges;
          image-rendering: crisp-edges;
        }
        ` : ''}
        
        ${currentTheme === 'tropical' ? `
        @keyframes bounce {
          0%, 20%, 53%, 80%, 100% {
            transform: translate3d(0,0,0);
          }
          40%, 43% {
            transform: translate3d(0,-6px,0);
          }
          70% {
            transform: translate3d(0,-3px,0);
          }
          90% {
            transform: translate3d(0,-1px,0);
          }
        }
        
        .player-2__control-btn--play:active {
          animation: bounce 0.6s ease;
        }
        ` : ''}
        
        /* Mobile responsiveness */
        @media (max-width: 480px) {
          .player-2 {
            max-width: 280px;
          }
          
          .player-2__controls {
            gap: 0.75rem;
            padding: 0.75rem;
          }
          
          .player-2__artwork {
            padding: 0.75rem;
          }
          
          .player-2__effects {
            padding: 0.75rem;
          }
        }
        
        /* Fix for mobile slider interaction */
        input[type="range"] {
          -webkit-appearance: none;
          appearance: none;
          background: transparent;
          cursor: pointer;
        }
        
        input[type="range"]::-webkit-slider-track {
          -webkit-appearance: none;
          appearance: none;
        }
        
        input[type="range"]:focus {
          outline: none;
        }
        
        /* Ensure proper touch targets on mobile */
        @media (max-width: 768px) {
          input[type="range"] {
            height: 40px;
            padding: 10px 0;
          }
          
          button {
            min-height: 44px;
            min-width: 44px;
          }
        }
      `}</style>
    </div>
  );
};

export default SlowReverbApp;
