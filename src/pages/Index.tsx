
import React, { useState, useRef, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Star, Download, Gift, MessageSquare } from "lucide-react";
import { toast } from "sonner";

const Index = () => {
  const [currentSection, setCurrentSection] = useState('welcome');
  const [userName, setUserName] = useState('');
  const [showSpiritual, setShowSpiritual] = useState(false);
  const [bakraClicked, setBakraClicked] = useState(false);
  const [surpriseRevealed, setSurpriseRevealed] = useState(false);
  const [surpriseMessage, setSurpriseMessage] = useState('');
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);

  const surpriseMessages = [
    "💸 Virtual Eidi for you!",
    "🐐 A Bakra Hug",
    "🕌 May Allah accept your qurbani"
  ];

  const handleNameSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (userName.trim()) {
      setCurrentSection('bakra');
      toast.success(`Welcome ${userName}! Enjoy your Eid greeting experience.`);
    }
  };

  const handleBakraClick = () => {
    setBakraClicked(true);
    // Try to play goat sound if available
    if (audioRef.current) {
      audioRef.current.play().catch(() => {
        console.log('Audio autoplay blocked');
      });
    }
    toast.success(`Mehhh... Eid Mubarak, dear ${userName}!`);
  };

  const generateCard = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    canvas.width = 800;
    canvas.height = 600;

    // Create gradient background
    const gradient = ctx.createLinearGradient(0, 0, 800, 600);
    gradient.addColorStop(0, '#1a1a2e');
    gradient.addColorStop(1, '#16213e');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 800, 600);

    // Add golden border
    ctx.strokeStyle = '#ffd700';
    ctx.lineWidth = 10;
    ctx.strokeRect(20, 20, 760, 560);

    // Add text
    ctx.fillStyle = '#ffd700';
    ctx.font = 'bold 48px serif';
    ctx.textAlign = 'center';
    ctx.fillText('Eid Mubarak', 400, 150);

    ctx.font = '32px serif';
    ctx.fillStyle = '#ffffff';
    ctx.fillText(`Dear ${userName}`, 400, 220);

    ctx.font = '24px serif';
    ctx.fillText('May this blessed occasion bring you', 400, 320);
    ctx.fillText('joy, peace, and prosperity', 400, 360);

    // Add decorative elements
    ctx.fillStyle = '#ffd700';
    ctx.font = '60px serif';
    ctx.fillText('🌙', 150, 450);
    ctx.fillText('🕌', 400, 450);
    ctx.fillText('🐐', 650, 450);

    ctx.font = '20px serif';
    ctx.fillStyle = '#ffd700';
    ctx.fillText('✨ Created with ❤️ By Zain Mughal', 400, 550);
  };

  const downloadCard = () => {
    generateCard();
    const canvas = canvasRef.current;
    if (!canvas) return;

    const link = document.createElement('a');
    link.download = `eid-greeting-${userName}.png`;
    link.href = canvas.toDataURL();
    link.click();
    toast.success('Eid card downloaded successfully!');
  };

  const revealSurprise = () => {
    const randomMessage = surpriseMessages[Math.floor(Math.random() * surpriseMessages.length)];
    setSurpriseMessage(randomMessage);
    setSurpriseRevealed(true);
    toast.success(randomMessage);
  };

  const renderWelcomeSection = () => (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Starry background */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-blue-900 to-slate-900">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
            }}
          >
            <Star className="w-2 h-2 text-yellow-300 fill-current" />
          </div>
        ))}
      </div>

      <Card className="w-full max-w-md mx-4 bg-black/80 border-yellow-500 backdrop-blur-sm">
        <CardContent className="p-8 text-center">
          <h1 className="text-3xl font-bold text-yellow-400 mb-2">
            Welcome to your personalized
          </h1>
          <h2 className="text-2xl font-bold text-white mb-6">
            Eid-ul-Adha Greeting
          </h2>
          <div className="text-6xl mb-6">🌙</div>
          
          <form onSubmit={handleNameSubmit} className="space-y-4">
            <Input
              type="text"
              placeholder="Enter your name"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              className="bg-slate-800 border-yellow-500 text-white placeholder-gray-400"
            />
            <Button 
              type="submit" 
              className="w-full bg-yellow-600 hover:bg-yellow-700 text-black font-bold"
            >
              Begin Your Eid Journey
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );

  const renderBakraSection = () => (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-green-900 to-emerald-900 p-4">
      <Card className="w-full max-w-2xl bg-black/80 border-yellow-500">
        <CardContent className="p-8 text-center">
          <h2 className="text-3xl font-bold text-yellow-400 mb-6">Meet Bakra No.1</h2>
          
          <div className="text-8xl mb-6 animate-bounce">🐐</div>
          
          <Button
            onClick={handleBakraClick}
            className="mb-6 bg-yellow-600 hover:bg-yellow-700 text-black font-bold text-xl px-8 py-4"
          >
            Click to hear from Bakra No.1
          </Button>
          
          {bakraClicked && (
            <div className="bg-green-800 p-4 rounded-lg border border-yellow-500 animate-fade-in">
              <p className="text-xl text-white font-bold">
                Mehhh... Eid Mubarak, dear {userName}! 🐐💚
              </p>
            </div>
          )}
          
          <div className="mt-8">
            <Button
              onClick={() => {
                setShowSpiritual(true);
                setCurrentSection('spiritual');
              }}
              className="bg-emerald-600 hover:bg-emerald-700 text-white"
            >
              Continue to Spiritual Message
            </Button>
          </div>
        </CardContent>
      </Card>
      
      {/* Hidden audio element for goat sound effect */}
      <audio ref={audioRef} preload="none">
        <source src="data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+LpymNdGjiS1vLNeSsFJXfH8N2QQAoUXrTp66hVFApGn+LpymNdGjoT2fL" type="audio/wav" />
      </audio>
    </div>
  );

  const renderSpiritualSection = () => (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-purple-900 to-indigo-900 p-4">
      <Card className="w-full max-w-4xl bg-black/80 border-yellow-500">
        <CardContent className="p-8 text-center">
          <div className="text-6xl mb-6">🕌</div>
          <h2 className="text-3xl font-bold text-yellow-400 mb-8">Spiritual Reflection</h2>
          
          <div className="bg-purple-800/50 p-8 rounded-lg border border-yellow-500 mb-8 animate-fade-in">
            <blockquote className="text-xl text-white italic leading-relaxed">
              "True qurbani is not the sacrifice of an animal, but the sacrifice of ego, pride and hate for the sake of Allah."
            </blockquote>
            <div className="text-yellow-400 mt-4">— Islamic Teaching</div>
          </div>
          
          <Button
            onClick={() => setCurrentSection('card')}
            className="bg-purple-600 hover:bg-purple-700 text-white"
          >
            Create Your Eid Card
          </Button>
        </CardContent>
      </Card>
    </div>
  );

  const renderCardSection = () => (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-900 to-cyan-900 p-4">
      <Card className="w-full max-w-4xl bg-black/80 border-yellow-500">
        <CardContent className="p-8 text-center">
          <h2 className="text-3xl font-bold text-yellow-400 mb-6">Personalized Eid Card Generator</h2>
          
          <div className="mb-6">
            <canvas
              ref={canvasRef}
              className="border border-yellow-500 rounded-lg max-w-full"
              style={{ maxHeight: '400px' }}
            />
          </div>
          
          <div className="space-y-4">
            <Button
              onClick={generateCard}
              className="bg-blue-600 hover:bg-blue-700 text-white mr-4"
            >
              Generate Preview
            </Button>
            <Button
              onClick={downloadCard}
              className="bg-yellow-600 hover:bg-yellow-700 text-black font-bold"
            >
              <Download className="w-4 h-4 mr-2" />
              Download Card
            </Button>
          </div>
          
          <div className="mt-8">
            <Button
              onClick={() => setCurrentSection('surprise')}
              className="bg-cyan-600 hover:bg-cyan-700 text-white"
            >
              Open Your Surprise!
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderSurpriseSection = () => (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-pink-900 to-rose-900 p-4">
      <Card className="w-full max-w-2xl bg-black/80 border-yellow-500">
        <CardContent className="p-8 text-center">
          <h2 className="text-3xl font-bold text-yellow-400 mb-6">Your Special Surprise!</h2>
          
          <div className="text-8xl mb-6">🎁</div>
          
          {!surpriseRevealed ? (
            <Button
              onClick={revealSurprise}
              className="bg-pink-600 hover:bg-pink-700 text-white text-xl px-8 py-4"
            >
              <Gift className="w-6 h-6 mr-2" />
              Open your surprise!
            </Button>
          ) : (
            <div className="bg-pink-800 p-6 rounded-lg border border-yellow-500 animate-scale-in">
              <p className="text-2xl text-white font-bold mb-4">{surpriseMessage}</p>
              <div className="text-6xl mb-4">🎉</div>
            </div>
          )}
          
          <div className="mt-8 pt-8 border-t border-yellow-500">
            <p className="text-yellow-400 text-lg mb-4">
              ✨ Created with ❤️ By Zain Mughal
            </p>
            <p className="text-white">
              May this Eid bring you and your family countless blessings, joy, and peace.
            </p>
            <div className="mt-4 text-2xl">🌙 Eid Mubarak! 🕌</div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  useEffect(() => {
    // Generate initial card preview when entering card section
    if (currentSection === 'card' && canvasRef.current) {
      setTimeout(generateCard, 100);
    }
  }, [currentSection, userName]);

  return (
    <div className="min-h-screen">
      {currentSection === 'welcome' && renderWelcomeSection()}
      {currentSection === 'bakra' && renderBakraSection()}
      {currentSection === 'spiritual' && renderSpiritualSection()}
      {currentSection === 'card' && renderCardSection()}
      {currentSection === 'surprise' && renderSurpriseSection()}
    </div>
  );
};

export default Index;
