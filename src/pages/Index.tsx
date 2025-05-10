
import { useState, useEffect } from 'react';
import ZenAudio from '../components/ZenAudio';
import ZenElements from '../components/ZenElements';

const Index = () => {
  const [visible, setVisible] = useState(false);
  
  useEffect(() => {
    // Show the quote with a short delay for initial page load effect
    const timer = setTimeout(() => {
      setVisible(true);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);
  
  return (
    <div className="relative w-full h-screen overflow-hidden bg-gradient-to-br from-zen-paper to-zen-paper/90">
      {/* Background elements */}
      <ZenElements className="w-full h-full" />
      
      {/* Central message */}
      <div className="absolute inset-0 flex items-center justify-center z-10">
        {visible && (
          <h1 
            className="text-3xl md:text-5xl font-serif text-zen-moss/80 font-light tracking-wider px-4 text-center transition-all duration-1000
                      animate-float hover:text-zen-moss hover:tracking-widest"
          >
            Você não irá encontrar nada aqui.
          </h1>
        )}
      </div>
      
      {/* Domain name at the bottom center */}
      <div className="absolute bottom-4 w-full flex justify-center z-10">
        <p className="text-zen-moss/60 text-sm font-light tracking-wide hover:text-zen-moss transition-colors duration-300">
          www.lemesdasilva.com
        </p>
      </div>
      
      {/* Audio control */}
      <ZenAudio />
    </div>
  );
};

export default Index;
