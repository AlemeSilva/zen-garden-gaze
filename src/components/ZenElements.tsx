
import { useEffect, useState } from 'react';
import { Leaf } from 'lucide-react';

// Random position within constraints
const randomPosition = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

// Random size within constraints
const randomSize = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

// Random rotation
const randomRotation = () => {
  return Math.floor(Math.random() * 360);
};

// Random opacity
const randomOpacity = (min: number, max: number) => {
  return (Math.random() * (max - min) + min).toFixed(2);
};

interface ElementProps {
  className?: string;
}

const ZenElements = ({ className = '' }: ElementProps) => {
  const [elements, setElements] = useState<JSX.Element[]>([]);

  useEffect(() => {
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    
    const createElements = () => {
      const newElements: JSX.Element[] = [];
      
      // Create stones
      for (let i = 0; i < 5; i++) {
        const width = randomSize(30, 80);
        const height = randomSize(20, 60);
        const left = randomPosition(0, windowWidth - width);
        const top = randomPosition(windowHeight * 0.4, windowHeight - height);
        const rotate = randomRotation();
        const opacity = randomOpacity(0.7, 0.9);
        
        newElements.push(
          <div 
            key={`stone-${i}`}
            className="stone"
            style={{
              width: `${width}px`,
              height: `${height}px`,
              left: `${left}px`,
              top: `${top}px`,
              transform: `rotate(${rotate}deg)`,
              opacity: opacity
            }}
          />
        );
      }
      
      // Create leaves
      for (let i = 0; i < 7; i++) {
        const size = randomSize(16, 30);
        const left = randomPosition(0, windowWidth - size);
        const top = randomPosition(0, windowHeight - size);
        const rotate = randomRotation();
        const opacity = randomOpacity(0.3, 0.7);
        const delay = i * 0.8;
        
        newElements.push(
          <div 
            key={`leaf-${i}`}
            className="leaf animate-float"
            style={{
              left: `${left}px`,
              top: `${top}px`,
              transform: `rotate(${rotate}deg)`,
              opacity: opacity,
              animationDelay: `${delay}s`
            }}
          >
            <Leaf
              size={size}
              color="#5E6B4F"
              strokeWidth={1}
              fill="rgba(94, 107, 79, 0.2)"
            />
          </div>
        );
      }
      
      // Create zen circles
      for (let i = 0; i < 3; i++) {
        const size = randomSize(100, 300);
        const left = randomPosition(0, windowWidth - size);
        const top = randomPosition(0, windowHeight - size);
        const opacity = randomOpacity(0.1, 0.3);
        
        newElements.push(
          <div 
            key={`circle-${i}`}
            className="zen-circle animate-ripple"
            style={{
              width: `${size}px`,
              height: `${size}px`,
              left: `${left}px`,
              top: `${top}px`,
              opacity: opacity,
              animationDelay: `${i * 1.5}s`
            }}
          />
        );
      }
      
      // Create bamboo
      for (let i = 0; i < 3; i++) {
        const height = randomSize(150, 300);
        const width = randomSize(4, 8);
        const left = randomPosition(windowWidth * 0.7, windowWidth - width);
        const bottom = 0;
        const rotate = randomSize(-5, 5);
        
        newElements.push(
          <div 
            key={`bamboo-${i}`}
            className="bamboo"
            style={{
              height: `${height}px`,
              width: `${width}px`,
              left: `${left}px`,
              bottom: `${bottom}px`,
              transform: `rotate(${rotate}deg)`,
              opacity: 0.8
            }}
          />
        );
      }
      
      return newElements;
    };
    
    setElements(createElements());
    
    // Handle resize
    const handleResize = () => {
      setElements(createElements());
    };
    
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  
  return <div className={`zen-elements ${className}`}>{elements}</div>;
};

export default ZenElements;
