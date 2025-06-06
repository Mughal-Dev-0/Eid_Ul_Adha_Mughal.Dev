import React, { useState, useRef, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Star, Download, Gift, MessageSquare, BookOpen, Heart } from "lucide-react";
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

  const eidPrayers = [
    {
      id: 1,
      title: "Prayer for Acceptance",
      arabic: "رَبَّنَا تَقَبَّلْ مِنَّا إِنَّكَ أَنتَ السَّمِيعُ الْعَلِيمُ",
      urdu: "اے ہمارے رب! ہم سے قبول فرما، بے شک تو سننے والا جاننے والا ہے",
      transliteration: "Rabbana taqabbal minna innaka antas-Samee'ul-Aleem"
    },
    {
      id: 2,
      title: "Prayer for Forgiveness",
      arabic: "رَبِّ اغْفِرْ لِي وَلِوَالِدَيَّ وَلِلْمُؤْمِنِينَ",
      urdu: "اے میرے رب! مجھے اور میرے والدین کو اور تمام مومنوں کو بخش دے",
      transliteration: "Rabbi ghfir li wa li walidayya wa lil-mu'mineen"
    },
    {
      id: 3,
      title: "Prayer for Guidance",
      arabic: "اللَّهُمَّ اهْدِنَا فِيمَنْ هَدَيْتَ",
      urdu: "اے اللہ! ہمیں ان لوگوں میں ہدایت دے جن کو تو نے ہدایت دی ہے",
      transliteration: "Allahumma hdina feeman hadayt"
    },
    {
      id: 4,
      title: "Prayer for Blessing",
      arabic: "اللَّهُمَّ بَارِكْ لَنَا فِيمَا أَعْطَيْتَنَا",
      urdu: "اے اللہ! جو کچھ تو نے ہمیں دیا ہے اس میں برکت عطا فرما",
      transliteration: "Allahumma barik lana feema a'taytana"
    },
    {
      id: 5,
      title: "Prayer for Protection",
      arabic: "أَعُوذُ بِاللَّهِ مِنَ الشَّيْطَانِ الرَّجِيمِ",
      urdu: "میں شیطان مردود سے اللہ کی پناہ مانگتا ہوں",
      transliteration: "A'udhu billahi minash-shaytanir-rajeem"
    },
    {
      id: 6,
      title: "Prayer for Gratitude",
      arabic: "الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ",
      urdu: "تمام تعریفیں اللہ کے لیے ہیں جو تمام جہانوں کا رب ہے",
      transliteration: "Alhamdulillahi rabbil-alameen"
    },
    {
      id: 7,
      title: "Prayer for Peace",
      arabic: "اللَّهُمَّ أَنْتَ السَّلَامُ وَمِنْكَ السَّلَامُ",
      urdu: "اے اللہ! تو ہی سلامتی ہے اور تجھ ہی سے سلامتی ہے",
      transliteration: "Allahumma antas-salamu wa minkas-salam"
    },
    {
      id: 8,
      title: "Prayer for Sustenance",
      arabic: "اللَّهُمَّ اكْفِنِي بِحَلَالِكَ عَنْ حَرَامِكَ",
      urdu: "اے اللہ! اپنے حلال سے مجھے اپنے حرام سے بے نیاز کر دے",
      transliteration: "Allahumma kfini bi halalaika an haramik"
    },
    {
      id: 9,
      title: "Prayer for Family",
      arabic: "رَبَّنَا هَبْ لَنَا مِنْ أَزْوَاجِنَا وَذُرِّيَّاتِنَا قُرَّةَ أَعْيُنٍ",
      urdu: "اے ہمارے رب! ہمیں اپنے بیوی بچوں سے آنکھوں کی ٹھنڈک عطا فرما",
      transliteration: "Rabbana hab lana min azwajina wa dhurriyyatina qurrata a'yun"
    },
    {
      id: 10,
      title: "Prayer for the Ummah",
      arabic: "اللَّهُمَّ أَصْلِحْ دِينَنَا وَدُنْيَانَا وَآخِرَتَنَا",
      urdu: "اے اللہ! ہمارے دین، دنیا اور آخرت کی اصلاح فرما",
      transliteration: "Allahumma aslih deenana wa dunyaana wa akhiratana"
    }
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

    canvas.width = 800;
    canvas.height = 600;

    const gradient = ctx.createLinearGradient(0, 0, 800, 600);
    gradient.addColorStop(0, '#1a1a2e');
    gradient.addColorStop(1, '#16213e');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 800, 600);

    ctx.strokeStyle = '#ffd700';
    ctx.lineWidth = 10;
    ctx.strokeRect(20, 20, 760, 560);

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
          
          <div className="mt-8 space-y-4">
            <Button
              onClick={() => setCurrentSection('prayers')}
              className="bg-purple-600 hover:bg-purple-700 text-white mr-4"
            >
              <BookOpen className="w-4 h-4 mr-2" />
              Eid Prayers & Guide
            </Button>
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
      
      <audio ref={audioRef} preload="none">
        <source src="data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+LpymNdGjiS1vLNeSsFJXfH8N2QQAoUXrTp66hVFApGn+LpymNdGjoT2fL" type="audio/wav" />
      </audio>
    </div>
  );

  const renderPrayersSection = () => (
    <div className="min-h-screen bg-gradient-to-b from-indigo-900 via-purple-900 to-blue-900 p-4">
      <div className="max-w-6xl mx-auto">
        <Card className="bg-black/80 border-yellow-500 mb-8">
          <CardContent className="p-8 text-center">
            <h2 className="text-4xl font-bold text-yellow-400 mb-4 animate-fade-in">
              Eid-ul-Adha Prayers & Guide
            </h2>
            <div className="text-6xl mb-6 animate-bounce-gentle">🤲</div>
            
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <Button
                onClick={() => setCurrentSection('prayers-list')}
                className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white p-6 h-auto"
              >
                <div className="text-center">
                  <Heart className="w-8 h-8 mx-auto mb-2" />
                  <div className="text-xl font-bold">10 Special Eid Prayers</div>
                  <div className="text-sm opacity-80">Arabic & Urdu with Translation</div>
                </div>
              </Button>
              
              <Button
                onClick={() => setCurrentSection('prayer-guide')}
                className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white p-6 h-auto"
              >
                <div className="text-center">
                  <BookOpen className="w-8 h-8 mx-auto mb-2" />
                  <div className="text-xl font-bold">How to Pray Eid-ul-Adha</div>
                  <div className="text-sm opacity-80">Complete Step-by-Step Guide</div>
                </div>
              </Button>
            </div>
            
            <Button
              onClick={() => setCurrentSection('spiritual')}
              className="bg-yellow-600 hover:bg-yellow-700 text-black font-bold"
            >
              Continue Journey
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const renderPrayersListSection = () => (
    <div className="min-h-screen bg-gradient-to-b from-purple-900 to-indigo-900 p-4">
      <div className="max-w-4xl mx-auto">
        <Card className="bg-black/80 border-yellow-500 mb-6">
          <CardContent className="p-6 text-center">
            <h2 className="text-3xl font-bold text-yellow-400 mb-4">
              10 Special Eid-ul-Adha Prayers
            </h2>
            <div className="text-4xl mb-4 animate-twinkle">✨🤲✨</div>
            <Button
              onClick={() => setCurrentSection('prayers')}
              className="bg-purple-600 hover:bg-purple-700 text-white mb-4"
            >
              ← Back to Prayer Menu
            </Button>
          </CardContent>
        </Card>

        <div className="grid gap-6">
          {eidPrayers.map((prayer, index) => (
            <Card key={prayer.id} className="bg-black/80 border-yellow-500 animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold text-yellow-400 mb-4 text-center">
                  {prayer.title}
                </h3>
                
                <div className="space-y-4">
                  <div className="text-right bg-gradient-to-r from-green-900/50 to-emerald-900/50 p-4 rounded-lg border border-yellow-500/30">
                    <p className="text-2xl text-white font-arabic leading-relaxed">
                      {prayer.arabic}
                    </p>
                  </div>
                  
                  <div className="text-right bg-gradient-to-r from-blue-900/50 to-purple-900/50 p-4 rounded-lg border border-yellow-500/30">
                    <p className="text-lg text-white font-urdu">
                      {prayer.urdu}
                    </p>
                  </div>
                  
                  <div className="text-center bg-gradient-to-r from-yellow-900/30 to-orange-900/30 p-3 rounded-lg border border-yellow-500/30">
                    <p className="text-sm text-yellow-200 italic">
                      {prayer.transliteration}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="text-center mt-8">
          <Button
            onClick={() => setCurrentSection('spiritual')}
            className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white"
          >
            Continue to Spiritual Message
          </Button>
        </div>
      </div>
    </div>
  );

  const renderPrayerGuideSection = () => (
    <div className="min-h-screen bg-gradient-to-b from-emerald-900 to-teal-900 p-4">
      <div className="max-w-4xl mx-auto">
        <Card className="bg-black/80 border-yellow-500 mb-6">
          <CardContent className="p-6 text-center">
            <h2 className="text-3xl font-bold text-yellow-400 mb-4">
              How to Pray Eid-ul-Adha Salah
            </h2>
            <div className="text-4xl mb-4 animate-bounce-gentle">🕌📿🕌</div>
            <Button
              onClick={() => setCurrentSection('prayers')}
              className="bg-emerald-600 hover:bg-emerald-700 text-white mb-4"
            >
              ← Back to Prayer Menu
            </Button>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card className="bg-black/80 border-yellow-500 animate-scale-in">
            <CardContent className="p-6">
              <h3 className="text-2xl font-bold text-yellow-400 mb-4 text-center">
                Preparation / تیاری
              </h3>
              
              <div className="space-y-4">
                <div className="bg-gradient-to-r from-green-900/50 to-emerald-900/50 p-4 rounded-lg border border-yellow-500/30">
                  <h4 className="text-lg font-bold text-white mb-2">1. Make Wudu / وضو کریں</h4>
                  <p className="text-yellow-200">Perform ablution as you would for any prayer</p>
                  <p className="text-white text-right font-urdu">نماز کی طرح وضو کریں</p>
                </div>
                
                <div className="bg-gradient-to-r from-blue-900/50 to-purple-900/50 p-4 rounded-lg border border-yellow-500/30">
                  <h4 className="text-lg font-bold text-white mb-2">2. Face Qibla / قبلہ رخ ہوں</h4>
                  <p className="text-yellow-200">Face towards the Kaaba in Mecca</p>
                  <p className="text-white text-right font-urdu">مکہ مکرمہ میں خانہ کعبہ کی طرف رخ کریں</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-black/80 border-yellow-500 animate-fade-in" style={{ animationDelay: '0.3s' }}>
            <CardContent className="p-6">
              <h3 className="text-2xl font-bold text-yellow-400 mb-4 text-center">
                First Rakah / پہلی رکعت
              </h3>
              
              <div className="space-y-4">
                <div className="bg-gradient-to-r from-purple-900/50 to-indigo-900/50 p-4 rounded-lg border border-yellow-500/30">
                  <h4 className="text-lg font-bold text-white mb-2">1. Takbir-e-Tahrimah / تکبیر تحریمہ</h4>
                  <div className="text-center my-3">
                    <p className="text-2xl text-green-300 font-arabic">اللّٰہُ اَکْبَر</p>
                    <p className="text-yellow-200">Allahu Akbar</p>
                  </div>
                  <p className="text-white text-right font-urdu">دونوں ہاتھ کانوں تک اٹھا کر اللہ اکبر کہیں</p>
                </div>
                
                <div className="bg-gradient-to-r from-emerald-900/50 to-green-900/50 p-4 rounded-lg border border-yellow-500/30">
                  <h4 className="text-lg font-bold text-white mb-2">2. Additional Takbeers (6 times) / اضافی تکبیریں</h4>
                  <p className="text-yellow-200">Raise hands and say "Allahu Akbar" 6 more times</p>
                  <p className="text-white text-right font-urdu">چھ مرتبہ اضافی اللہ اکبر کہیں، ہر مرتبہ ہاتھ اٹھائیں</p>
                </div>
                
                <div className="bg-gradient-to-r from-orange-900/50 to-red-900/50 p-4 rounded-lg border border-yellow-500/30">
                  <h4 className="text-lg font-bold text-white mb-2">3. Recite Surah Al-Fatiha / سورہ فاتحہ</h4>
                  <div className="text-center my-3">
                    <p className="text-lg text-green-300 font-arabic text-right leading-relaxed">
                      بِسْمِ اللّٰہِ الرَّحْمٰنِ الرَّحِیْمِ<br/>
                      اَلْحَمْدُ لِلّٰہِ رَبِّ الْعٰلَمِیْنَ
                    </p>
                  </div>
                  <p className="text-white text-right font-urdu">اس کے بعد کوئی اور سورہ پڑھیں</p>
                </div>
                
                <div className="bg-gradient-to-r from-teal-900/50 to-cyan-900/50 p-4 rounded-lg border border-yellow-500/30">
                  <h4 className="text-lg font-bold text-white mb-2">4. Ruku and Sujood / رکوع اور سجدہ</h4>
                  <p className="text-yellow-200">Perform ruku and two sujood as normal</p>
                  <p className="text-white text-right font-urdu">عام نماز کی طرح رکوع اور دو سجدے کریں</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-black/80 border-yellow-500 animate-fade-in" style={{ animationDelay: '0.6s' }}>
            <CardContent className="p-6">
              <h3 className="text-2xl font-bold text-yellow-400 mb-4 text-center">
                Second Rakah / دوسری رکعت
              </h3>
              
              <div className="space-y-4">
                <div className="bg-gradient-to-r from-indigo-900/50 to-purple-900/50 p-4 rounded-lg border border-yellow-500/30">
                  <h4 className="text-lg font-bold text-white mb-2">1. After Surah Al-Fatiha / سورہ فاتحہ کے بعد</h4>
                  <p className="text-yellow-200">Recite Al-Fatiha and another surah</p>
                  <p className="text-white text-right font-urdu">سورہ فاتحہ اور کوئی اور سورہ پڑھیں</p>
                </div>
                
                <div className="bg-gradient-to-r from-pink-900/50 to-rose-900/50 p-4 rounded-lg border border-yellow-500/30">
                  <h4 className="text-lg font-bold text-white mb-2">2. Additional Takbeers (5 times) / پانچ تکبیریں</h4>
                  <p className="text-yellow-200">Before ruku, say "Allahu Akbar" 5 times with raised hands</p>
                  <p className="text-white text-right font-urdu">رکوع سے پہلے پانچ مرتبہ ہاتھ اٹھا کر اللہ اکبر کہیں</p>
                </div>
                
                <div className="bg-gradient-to-r from-green-900/50 to-teal-900/50 p-4 rounded-lg border border-yellow-500/30">
                  <h4 className="text-lg font-bold text-white mb-2">3. Complete the Prayer / نماز مکمل کریں</h4>
                  <p className="text-yellow-200">Perform ruku, sujood, tashahhud, and salam</p>
                  <p className="text-white text-right font-urdu">رکوع، سجدہ، تشہد اور سلام کے ساتھ نماز مکمل کریں</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-black/80 border-yellow-500 animate-scale-in" style={{ animationDelay: '0.9s' }}>
            <CardContent className="p-6">
              <h3 className="text-2xl font-bold text-yellow-400 mb-4 text-center">
                After Prayer / نماز کے بعد
              </h3>
              
              <div className="space-y-4">
                <div className="bg-gradient-to-r from-yellow-900/50 to-orange-900/50 p-4 rounded-lg border border-yellow-500/30">
                  <h4 className="text-lg font-bold text-white mb-2">Khutbah / خطبہ</h4>
                  <p className="text-yellow-200">Listen to the Imam's sermon</p>
                  <p className="text-white text-right font-urdu">امام کا خطبہ سنیں</p>
                </div>
                
                <div className="bg-gradient-to-r from-purple-900/50 to-pink-900/50 p-4 rounded-lg border border-yellow-500/30">
                  <h4 className="text-lg font-bold text-white mb-2">Make Dua / دعا کریں</h4>
                  <p className="text-yellow-200">Ask Allah for forgiveness and blessings</p>
                  <p className="text-white text-right font-urdu">اللہ سے مغفرت اور برکتوں کی دعا کریں</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="text-center mt-8">
          <Button
            onClick={() => setCurrentSection('spiritual')}
            className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white"
          >
            Continue to Spiritual Message
          </Button>
        </div>
      </div>
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
    if (currentSection === 'card' && canvasRef.current) {
      setTimeout(generateCard, 100);
    }
  }, [currentSection, userName]);

  return (
    <div className="min-h-screen">
      {currentSection === 'welcome' && renderWelcomeSection()}
      {currentSection === 'bakra' && renderBakraSection()}
      {currentSection === 'prayers' && renderPrayersSection()}
      {currentSection === 'prayers-list' && renderPrayersListSection()}
      {currentSection === 'prayer-guide' && renderPrayerGuideSection()}
      {currentSection === 'spiritual' && renderSpiritualSection()}
      {currentSection === 'card' && renderCardSection()}
      {currentSection === 'surprise' && renderSurpriseSection()}
    </div>
  );
};

export default Index;
