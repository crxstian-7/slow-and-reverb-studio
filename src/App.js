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
  }
};

// Theme presets for audio effects (ORIGINAL)
const effectPresets = {
  bedroom: {
    playbackRate: 0.8,
    reverbWet: 0.3,
    reverbRoomSize: 0.7,
    reverbDecay: 2.5,
    lowPassFilter: 6000
  },
  vaporwave: {
    playbackRate: 0.6,
    reverbWet: 0.5,
    reverbRoomSize: 1.2,
    reverbDecay: 4,
    lowPassFilter: 4000
  },
  chill: {
    playbackRate: 0.75,
    reverbWet: 0.2,
    reverbRoomSize: 0.5,
    reverbDecay: 1.5,
    lowPassFilter: 8000
  },
  midnight: {
    playbackRate: 0.65,
    reverbWet: 0.45,
    reverbRoomSize: 0.9,
    reverbDecay: 3.2,
    lowPassFilter: 4500
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

// iOS Detection
const isIOS = () => {
  return /iPad|iPhone|iPod/.test(navigator.userAgent) || 
         (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
};

const SlowReverbApp = () => {
  const { theme, currentTheme, cycleTheme } = useTheme('default');
  
  const [audioFile, setAudioFile] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isIOSDevice, setIsIOSDevice] = useState(false);
  const [iosError, setIosError] = useState('');
  
  // Visualizer state (ORIGINAL)
  const [visualizerData, setVisualizerData] = useState(Array(32).fill(0));
  
  // Effect parameters (ORIGINAL)
  const [playbackRate, setPlaybackRate] = useState(0.8);
  const [reverbRoomSize, setReverbRoomSize] = useState(0.7);
  const [reverbDecay, setReverbDecay] = useState(2.5);
  const [reverbWet, setReverbWet] = useState(0.3);
  const [volume, setVolume] = useState(0.8);
  const [lowPassFilter, setLowPassFilter] = useState(8000);
  
  // Audio context and nodes (ORIGINAL with iOS compatibility)
  const audioContextRef = useRef(null);
  const sourceNodeRef = useRef(null);
  const gainNodeRef = useRef(null);
  const convolverNodeRef = useRef(null);
  const wetGainRef = useRef(null);
  const dryGainRef = useRef(null);
  const filterNodeRef = useRef(null);
  const audioBufferRef = useRef(null);
  const analyserNodeRef = useRef(null);
  
  // iOS compatibility: Add HTML5 audio element as fallback
  const audioElementRef = useRef(null);
  const [useHtml5Audio, setUseHtml5Audio] = useState(false);
  
  const fileInputRef = useRef(null);
  const startTimeRef = useRef(0);
  const pauseTimeRef = useRef(0);
  const animationFrameRef = useRef(null);
  
  // Detect iOS on mount
  useEffect(() => {
    const ios = isIOS();
    setIsIOSDevice(ios);
    // Force HTML5 audio on iOS for better compatibility
    if (ios) {
      setUseHtml5Audio(true);
    }
  }, []);
  
  // Initialize audio context (ORIGINAL with iOS fixes)
  const initAudioContext = async () => {
    if (useHtml5Audio) {
      // iOS: Use HTML5 audio with limited Web Audio API
      try {
        if (!audioContextRef.current) {
          audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
          
          // Simplified audio graph for iOS
          gainNodeRef.current = audioContextRef.current.createGain();
          analyserNodeRef.current = audioContextRef.current.createAnalyser();
          
          // iOS-friendly analyzer settings
          analyserNodeRef.current.fftSize = 64;
          analyserNodeRef.current.smoothingTimeConstant = 0.8;
          
          gainNodeRef.current.gain.value = volume;
        }
        
        if (audioContextRef.current.state === 'suspended') {
          await audioContextRef.current.resume();
        }
        
        return true;
      } catch (error) {
        console.warn('iOS: Web Audio API limited, using HTML5 audio only');
        setIosError('Advanced effects limited on iOS. Basic playback available.');
        return false;
      }
    } else {
      // Original Web Audio API implementation
      if (!audioContextRef.current) {
        audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
        
        const impulseResponse = createReverbImpulse(audioContextRef.current, reverbRoomSize, reverbDecay);
        
        gainNodeRef.current = audioContextRef.current.createGain();
        convolverNodeRef.current = audioContextRef.current.createConvolver();
        wetGainRef.current = audioContextRef.current.createGain();
        dryGainRef.current = audioContextRef.current.createGain();
        filterNodeRef.current = audioContextRef.current.createBiquadFilter();
        analyserNodeRef.current = audioContextRef.current.createAnalyser();
        
        convolverNodeRef.current.buffer = impulseResponse;
        filterNodeRef.current.type = 'lowpass';
        filterNodeRef.current.frequency.value = lowPassFilter;
        
        analyserNodeRef.current.fftSize = 64;
        analyserNodeRef.current.smoothingTimeConstant = 0.8;
        
        gainNodeRef.current.gain.value = volume;
        wetGainRef.current.gain.value = reverbWet;
        dryGainRef.current.gain.value = 1 - reverbWet;
      }
      return true;
    }
  };
  
  // Update visualizer (ORIGINAL)
  const updateVisualizer = useCallback(() => {
    if (!analyserNodeRef.current || !isPlaying) {
      setVisualizerData(Array(32).fill(2));
      return;
    }
    
    const bufferLength = analyserNodeRef.current.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);
    analyserNodeRef.current.getByteFrequencyData(dataArray);
    
    const bars = [];
    const groupSize = Math.floor(bufferLength / 32);
    
    for (let i = 0; i < 32; i++) {
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
    
    setVisualizerData(bars);
    
    if (isPlaying) {
      animationFrameRef.current = requestAnimationFrame(updateVisualizer);
    }
  }, [isPlaying]);
  
  // Start visualizer animation (ORIGINAL)
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
  
  // Create reverb impulse response (ORIGINAL)
  const createReverbImpulse = (audioContext, roomSize, decay) => {
    const length = audioContext.sampleRate * decay;
    const impulse = audioContext.createBuffer(2, length, audioContext.sampleRate);
    
    for (let channel = 0; channel < 2; channel++) {
      const channelData = impulse.getChannelData(channel);
      for (let i = 0; i < length; i++) {
        const n = length - i;
        channelData[i] = (Math.random() * 2 - 1) * Math.pow(n / length, roomSize);
      }
    }
    
    return impulse;
  };
  
  // Handle file upload (ENHANCED for iOS)
  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith('audio/')) {
      // iOS: Check file size limit
      if (isIOSDevice && file.size > 50 * 1024 * 1024) {
        setIosError('File too large for iOS. Please use files under 50MB.');
        return;
      }
      
      setIsLoading(true);
      setAudioFile(file);
      setIosError('');
      
      try {
        await initAudioContext();
        
        if (useHtml5Audio) {
          // iOS: Use HTML5 audio element
          if (audioElementRef.current) {
            audioElementRef.current.pause();
          }
          
          audioElementRef.current = new Audio();
          audioElementRef.current.preload = 'metadata';
          
          const objectURL = URL.createObjectURL(file);
          audioElementRef.current.src = objectURL;
          
          audioElementRef.current.onloadedmetadata = () => {
            setDuration(audioElementRef.current.duration);
            setCurrentTime(0);
            pauseTimeRef.current = 0;
            
            // Try to connect to Web Audio API for visualizer
            if (audioContextRef.current && !sourceNodeRef.current) {
              try {
                sourceNodeRef.current = audioContextRef.current.createMediaElementSource(audioElementRef.current);
                sourceNodeRef.current.connect(gainNodeRef.current);
                gainNodeRef.current.connect(analyserNodeRef.current);
                gainNodeRef.current.connect(audioContextRef.current.destination);
              } catch (error) {
                console.warn('iOS: Limited Web Audio API connection');
              }
            }
            setIsLoading(false);
          };
          
          audioElementRef.current.onerror = () => {
            setIosError('Failed to load audio file. Try MP3 or AAC format.');
            setIsLoading(false);
          };
          
          audioElementRef.current.load();
        } else {
          // Original Web Audio API implementation
          const arrayBuffer = await file.arrayBuffer();
          const audioBuffer = await audioContextRef.current.decodeAudioData(arrayBuffer);
          audioBufferRef.current = audioBuffer;
          setDuration(audioBuffer.duration);
          setCurrentTime(0);
          pauseTimeRef.current = 0;
          setIsLoading(false);
        }
      } catch (error) {
        console.error('Error loading audio file:', error);
        setIosError('Error loading audio file. Please try a different file.');
        setIsLoading(false);
      }
    }
  };
  
  // Connect audio nodes (ORIGINAL)
  const connectNodes = (sourceNode) => {
    if (useHtml5Audio) {
      // Simplified connection for iOS
      if (gainNodeRef.current && analyserNodeRef.current) {
        sourceNode.connect(gainNodeRef.current);
        gainNodeRef.current.connect(analyserNodeRef.current);
        gainNodeRef.current.connect(audioContextRef.current.destination);
      }
    } else {
      // Original full connection
      sourceNode.connect(filterNodeRef.current);
      filterNodeRef.current.connect(gainNodeRef.current);
      gainNodeRef.current.connect(analyserNodeRef.current);
      gainNodeRef.current.connect(dryGainRef.current);
      dryGainRef.current.connect(audioContextRef.current.destination);
      gainNodeRef.current.connect(convolverNodeRef.current);
      convolverNodeRef.current.connect(wetGainRef.current);
      wetGainRef.current.connect(audioContextRef.current.destination);
    }
  };

  // Pause audio (ENHANCED for iOS)
  const pauseAudio = useCallback(() => {
    if (useHtml5Audio && audioElementRef.current) {
      audioElementRef.current.pause();
      setIsPlaying(false);
    } else if (sourceNodeRef.current && audioContextRef.current) {
      sourceNodeRef.current.stop();
      sourceNodeRef.current.disconnect();
      sourceNodeRef.current = null;
      
      const elapsed = (audioContextRef.current.currentTime - startTimeRef.current) * playbackRate;
      pauseTimeRef.current = Math.min(elapsed, duration);
      setCurrentTime(pauseTimeRef.current);
      setIsPlaying(false);
    }
  }, [playbackRate, duration, useHtml5Audio]);
  
  // Play audio (ENHANCED for iOS)
  const playAudio = async () => {
    if (useHtml5Audio && audioElementRef.current) {
      // iOS: HTML5 audio playback
      try {
        if (audioContextRef.current && audioContextRef.current.state === 'suspended') {
          await audioContextRef.current.resume();
        }
        
        audioElementRef.current.playbackRate = playbackRate;
        audioElementRef.current.volume = volume;
        
        await audioElementRef.current.play();
        setIsPlaying(true);
      } catch (error) {
        setIosError('Playback failed. Tap the screen first to enable audio.');
      }
    } else if (audioBufferRef.current && audioContextRef.current) {
      // Original Web Audio API playback
      if (audioContextRef.current.state === 'suspended') {
        await audioContextRef.current.resume();
      }
      
      if (sourceNodeRef.current) {
        sourceNodeRef.current.stop();
        sourceNodeRef.current.disconnect();
      }
      
      sourceNodeRef.current = audioContextRef.current.createBufferSource();
      sourceNodeRef.current.buffer = audioBufferRef.current;
      sourceNodeRef.current.playbackRate.value = playbackRate;
      
      connectNodes(sourceNodeRef.current);
      
      const offset = pauseTimeRef.current;
      sourceNodeRef.current.start(0, offset);
      startTimeRef.current = audioContextRef.current.currentTime - offset / playbackRate;
      
      sourceNodeRef.current.onended = () => {
        setIsPlaying(false);
        setCurrentTime(0);
        pauseTimeRef.current = 0;
      };
      
      setIsPlaying(true);
    }
  };
  
  // Reset to beginning (ENHANCED for iOS)
  const resetAudio = () => {
    if (useHtml5Audio && audioElementRef.current) {
      audioElementRef.current.currentTime = 0;
      setCurrentTime(0);
      if (isPlaying) {
        pauseAudio();
      }
    } else {
      pauseAudio();
      setCurrentTime(0);
      pauseTimeRef.current = 0;
    }
  };
  
  // Apply effect preset (ORIGINAL)
  const applyPreset = useCallback((preset) => {
    setPlaybackRate(preset.playbackRate);
    setReverbWet(preset.reverbWet);
    setReverbRoomSize(preset.reverbRoomSize);
    setReverbDecay(preset.reverbDecay);
    setLowPassFilter(preset.lowPassFilter);
  }, []);
  
  // Update effects in real-time (ENHANCED for iOS)
  useEffect(() => {
    if (useHtml5Audio && audioElementRef.current) {
      audioElementRef.current.volume = volume;
    } else if (audioContextRef.current && gainNodeRef.current) {
      gainNodeRef.current.gain.value = volume;
    }
  }, [volume, useHtml5Audio]);
  
  useEffect(() => {
    if (useHtml5Audio && audioElementRef.current) {
      audioElementRef.current.playbackRate = playbackRate;
    } else if (audioContextRef.current && wetGainRef.current && dryGainRef.current) {
      wetGainRef.current.gain.value = reverbWet;
      dryGainRef.current.gain.value = 1 - reverbWet;
    }
  }, [reverbWet, playbackRate, useHtml5Audio]);
  
  useEffect(() => {
    if (!useHtml5Audio && audioContextRef.current && filterNodeRef.current) {
      filterNodeRef.current.frequency.value = lowPassFilter;
    }
  }, [lowPassFilter, useHtml5Audio]);
  
  useEffect(() => {
    if (!useHtml5Audio && sourceNodeRef.current) {
      sourceNodeRef.current.playbackRate.value = playbackRate;
    }
  }, [playbackRate, useHtml5Audio]);
  
  useEffect(() => {
    if (!useHtml5Audio && audioContextRef.current && convolverNodeRef.current) {
      const impulseResponse = createReverbImpulse(audioContextRef.current, reverbRoomSize, reverbDecay);
      convolverNodeRef.current.buffer = impulseResponse;
    }
  }, [reverbRoomSize, reverbDecay, useHtml5Audio]);
  
  // Time update for HTML5 audio
  useEffect(() => {
    if (!useHtml5Audio || !audioElementRef.current) return;
    
    const handleTimeUpdate = () => {
      setCurrentTime(audioElementRef.current.currentTime);
    };
    
    const handleEnded = () => {
      setIsPlaying(false);
      setCurrentTime(0);
      audioElementRef.current.currentTime = 0;
    };
    
    audioElementRef.current.addEventListener('timeupdate', handleTimeUpdate);
    audioElementRef.current.addEventListener('ended', handleEnded);
    
    return () => {
      if (audioElementRef.current) {
        audioElementRef.current.removeEventListener('timeupdate', handleTimeUpdate);
        audioElementRef.current.removeEventListener('ended', handleEnded);
      }
    };
  }, [audioFile, useHtml5Audio]);
  
  // Original time update for Web Audio API
  useEffect(() => {
    if (useHtml5Audio) return;
    
    let interval;
    if (isPlaying && audioContextRef.current && startTimeRef.current) {
      interval = setInterval(() => {
        const elapsed = (audioContextRef.current.currentTime - startTimeRef.current) * playbackRate;
        const newCurrentTime = Math.min(elapsed, duration);
        setCurrentTime(newCurrentTime);
        
        if (newCurrentTime >= duration) {
          pauseAudio();
        }
      }, 100);
    }
    return () => clearInterval(interval);
  }, [isPlaying, duration, playbackRate, pauseAudio, useHtml5Audio]);
  
  // Format time display (ORIGINAL)
  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };
  
  // Export processed audio (ORIGINAL)
  const exportAudio = () => {
    if (isIOSDevice) {
      alert('Export functionality is limited on iOS Safari. Please use a desktop browser for full export capabilities.');
    } else {
      alert('Export functionality would be implemented with OfflineAudioContext for production use.');
    }
  };

  // Helper function to get themed button style (ORIGINAL)
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
      WebkitTapHighlightColor: 'transparent', // iOS: Remove tap highlight
      touchAction: 'manipulation' // iOS: Improve touch responsiveness
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

  // Helper function to get slider style (ORIGINAL)
  const getSliderStyle = (disabled = false) => ({
    width: '100%',
    height: theme.effects.sliderHeight,
    background: theme.effects.sliderTrack,
    marginTop: '0.25rem',
    WebkitAppearance: 'none',
    appearance: 'none', // iOS: Add standard appearance
    outline: 'none',
    marginBottom: '1rem',
    opacity: disabled ? 0.5 : 1,
    cursor: disabled ? 'not-allowed' : 'pointer',
    border: currentTheme === 'pixel' ? '2px solid #000000' : 'none',
    borderRadius: currentTheme === 'dark' ? '2px' : currentTheme === 'tropical' ? '4px' : '0',
    imageRendering: theme.special?.imageRendering,
    WebkitTapHighlightColor: 'transparent' // iOS: Remove tap highlight
  });

  return (
    <div style={{
      ...theme.container,
      fontFamily: theme.fonts.primary
    }}>
      {/* Background patterns (ORIGINAL) */}
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
        {/* iOS Error Display */}
        {isIOSDevice && iosError && (
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
            {iosError}
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
          {/* Header (ORIGINAL) */}
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
            </div>
            <button 
              onClick={cycleTheme}
              style={getButtonStyle('theme')}
              title={`Current: ${currentTheme} - Click to cycle themes`}
            >
              {theme.emoji}
            </button>
          </div>

          {/* Artwork/Visualizer (ORIGINAL) */}
          <div className="player-2__artwork" style={{
            aspectRatio: '1',
            background: currentTheme === 'vaporwave' ? 'linear-gradient(45deg, #3a0ca3, #7209b7)' : 
                       currentTheme === 'pixel' ? '#0f3460' : 
                       currentTheme === 'dark' ? 'linear-gradient(135deg, #1a1a1a, #0a0a0a)' : 
                       currentTheme === 'tropical' ? 'linear-gradient(135deg, #40e0d0, #ffd700)' : '#f0f0f0',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderBottom: `1px solid ${theme.colors.border}`,
            padding: '1rem',
            cursor: !audioFile ? 'pointer' : 'default',
            transition: 'all 0.2s',
            imageRendering: theme.special?.imageRendering
          }}
          onClick={!audioFile ? () => fileInputRef.current?.click() : undefined}
          >
            {isPlaying ? (
              <div style={{
                display: 'flex',
                alignItems: 'end',
                justifyContent: 'center',
                gap: theme.visualizer?.gap || '2px',
                height: '60px',
                width: '100%'
              }}>
                {visualizerData.slice(0, 16).map((height, index) => (
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
                color: theme.colors.text.secondary
              }}>
                <Upload size={24} style={{ marginBottom: '0.5rem' }} />
                <div style={{
                  fontSize: '0.625rem',
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                  fontWeight: theme.text.weight
                }}>
                  {currentTheme === 'pixel' ? 'LOAD FILE' : 'Click to Upload'}
                </div>
              </div>
            ) : (
              <div className="player-2__artwork-placeholder" style={{
                width: '60px',
                height: '60px',
                background: currentTheme === 'vaporwave' ? 'rgba(0, 245, 255, 0.3)' : 
                           currentTheme === 'pixel' ? '#e94560' : 
                           currentTheme === 'dark' ? 'rgba(0, 255, 127, 0.3)' : 
                           currentTheme === 'tropical' ? 'rgba(255, 255, 255, 0.3)' : '#ddd',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: theme.colors.text.secondary,
                fontSize: '24px',
                fontWeight: theme.text.weight,
                imageRendering: theme.special?.imageRendering,
                borderRadius: currentTheme === 'tropical' ? '12px' : '0'
              }}>
                {currentTheme === 'pixel' ? '♫' : currentTheme === 'tropical' ? '🎵' : '♪'}
              </div>
            )}
          </div>

          {/* Track Info (ORIGINAL) */}
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
              {audioFile ? (currentTheme === 'pixel' ? 'UNKNOWN ARTIST' : 'Unknown Artist') : 
                          (currentTheme === 'pixel' ? 'SELECT AUDIO FILE' : 'Select an audio file to begin')}
            </div>
          </div>

          {/* Progress (ORIGINAL) */}
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
                           currentTheme === 'tropical' ? 'linear-gradient(90deg, #ff6f61, #40e0d0)' : '#000',
                transition: 'width 0.1s linear',
                borderRadius: currentTheme === 'vaporwave' ? '1px' : currentTheme === 'dark' ? '2px' : currentTheme === 'tropical' ? '4px' : '0',
                boxShadow: theme.effects.thumbShadow || 'none',
                imageRendering: theme.special?.imageRendering
              }} />
            </div>
          </div>

          {/* Controls (ORIGINAL) */}
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
              accept="audio/mp3,audio/mp4,audio/m4a,audio/wav,audio/aac,audio/*"
              onChange={handleFileUpload}
              style={{ display: 'none' }}
            />
          </div>

          {/* Effects (ORIGINAL with iOS compatibility notes) */}
          <div className="player-2__effects" style={{ padding: '1rem' }}>
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
              max="1.5"
              step="0.05"
              value={playbackRate}
              onChange={(e) => setPlaybackRate(parseFloat(e.target.value))}
              disabled={!audioFile}
              style={getSliderStyle(!audioFile)}
            />

            {/* Reverb (Note: Limited on iOS) */}
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
                color: useHtml5Audio ? theme.colors.text.secondary + '80' : theme.colors.text.secondary,
                fontWeight: theme.text.weight
              }}>
                {currentTheme === 'pixel' ? 'REV' : 'Reverb'} {useHtml5Audio && '(Limited)'}
              </span>
              <span className="player-2__effect-value" style={{
                fontSize: '0.625rem',
                color: theme.colors.text.primary,
                fontVariantNumeric: 'tabular-nums',
                fontWeight: theme.text.weight
              }}>
                {Math.round(reverbWet * 100)}%
              </span>
            </div>
            <input 
              type="range" 
              className="player-2__effect-slider"
              min="0"
              max="0.8"
              step="0.05"
              value={reverbWet}
              onChange={(e) => setReverbWet(parseFloat(e.target.value))}
              disabled={!audioFile || useHtml5Audio}
              style={getSliderStyle(!audioFile || useHtml5Audio)}
            />

            {/* Filter (Note: Limited on iOS) */}
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
                color: useHtml5Audio ? theme.colors.text.secondary + '80' : theme.colors.text.secondary,
                fontWeight: theme.text.weight
              }}>
                {currentTheme === 'pixel' ? 'FLT' : 'Filter'} {useHtml5Audio && '(Limited)'}
              </span>
              <span className="player-2__effect-value" style={{
                fontSize: '0.625rem',
                color: theme.colors.text.primary,
                fontVariantNumeric: 'tabular-nums',
                fontWeight: theme.text.weight
              }}>
                {(lowPassFilter/1000).toFixed(1)}k
              </span>
            </div>
            <input 
              type="range" 
              className="player-2__effect-slider"
              min="500"
              max="20000"
              step="100"
              value={lowPassFilter}
              onChange={(e) => setLowPassFilter(parseInt(e.target.value))}
              disabled={!audioFile || useHtml5Audio}
              style={getSliderStyle(!audioFile || useHtml5Audio)}
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

            {/* Presets (ORIGINAL) */}
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
                  {currentTheme === 'pixel' ? 'NIGHT' : currentTheme === 'tropical' ? 'Beach Vibes' : 'Midnight Drive'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* iOS Tips */}
      {isIOSDevice && (
        <div style={{
          position: 'absolute',
          bottom: '-8rem',
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
          textAlign: 'center'
        }}>
          <strong>iOS Mode:</strong> Using simplified audio processing for compatibility. 
          Some effects may be limited. Use Safari for best results.
        </div>
      )}

      <style>{`
        .player-2__control-btn:hover:not(:disabled) {
          background: ${theme.colors.primary} !important;
          color: ${theme.colors.text.inverse} !important;
          transform: translateY(-1px) ${currentTheme === 'tropical' ? 'scale(1.05)' : ''};
          ${currentTheme === 'pixel' ? 'box-shadow: 4px 4px 0 #000000 !important;' : 
            currentTheme === 'dark' ? 'box-shadow: 0 0 12px rgba(0, 255, 127, 0.6) !important;' : 
            currentTheme === 'tropical' ? 'box-shadow: 0 6px 20px rgba(255, 111, 97, 0.4) !important;' : ''}
        }
        
        .player-2__control-btn--play:hover:not(:disabled) {
          transform: translateY(-2px) ${currentTheme === 'pixel' ? '' : currentTheme === 'tropical' ? 'scale(1.1)' : 'scale(1.05)'};
          ${currentTheme === 'pixel' ? 'box-shadow: 4px 4px 0 #000000 !important;' : 
            currentTheme === 'dark' ? 'box-shadow: 0 0 25px rgba(0, 255, 127, 0.9) !important;' : 
            currentTheme === 'tropical' ? 'box-shadow: 0 8px 30px rgba(255, 111, 97, 0.6) !important;' : ''}
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
            currentTheme === 'tropical' ? 'box-shadow: 0 6px 16px rgba(255, 111, 97, 0.4) !important;' : ''}
        }
        
        /* iOS-specific optimizations */
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
      `}</style>
    </div>
  );
};

export default SlowReverbApp;
