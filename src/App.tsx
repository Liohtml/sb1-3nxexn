import React, { useState } from 'react';
import { Download, RefreshCw, Sparkles } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';

function App() {
  const [seed, setSeed] = useState(() => Math.random().toString(36).substring(7));
  const [loading, setLoading] = useState(false);

  const generateNewAvatar = () => {
    setLoading(true);
    setSeed(Math.random().toString(36).substring(7));
    setTimeout(() => setLoading(false), 500);
  };

  const downloadAvatar = async () => {
    try {
      const response = await fetch(`https://api.multiavatar.com/${seed}.svg`);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `avatar-${seed}.svg`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
      toast.success('Avatar downloaded successfully!');
    } catch (error) {
      toast.error('Failed to download avatar');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-800 mb-4 flex items-center justify-center gap-2">
              AI Avatar Generator <Sparkles className="text-purple-500" />
            </h1>
            <p className="text-gray-600 text-lg">
              Create unique, transparent background avatars powered by AI
            </p>
          </div>

          {/* Avatar Display */}
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
            <div className="relative aspect-square max-w-sm mx-auto mb-8 
                          bg-gradient-to-r from-purple-50 to-pink-50 
                          rounded-xl overflow-hidden">
              <img
                src={`https://api.multiavatar.com/${seed}.svg`}
                alt="Generated Avatar"
                className={`w-full h-full object-contain transition-opacity duration-300 ${
                  loading ? 'opacity-0' : 'opacity-100'
                }`}
              />
              {loading && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <RefreshCw className="w-8 h-8 text-purple-500 animate-spin" />
                </div>
              )}
            </div>

            {/* Controls */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={generateNewAvatar}
                className="flex items-center justify-center gap-2 px-6 py-3 
                         bg-purple-600 hover:bg-purple-700 text-white 
                         rounded-lg transition-colors duration-200 font-medium"
              >
                <RefreshCw className="w-5 h-5" />
                Generate New
              </button>
              <button
                onClick={downloadAvatar}
                className="flex items-center justify-center gap-2 px-6 py-3 
                         bg-gray-800 hover:bg-gray-900 text-white 
                         rounded-lg transition-colors duration-200 font-medium"
              >
                <Download className="w-5 h-5" />
                Download SVG
              </button>
            </div>
          </div>

          {/* Features */}
          <div className="grid md:grid-cols-3 gap-6 text-center">
            {[
              {
                title: 'Unique Designs',
                description: 'Every avatar is uniquely generated using advanced algorithms'
              },
              {
                title: 'Transparent Background',
                description: 'Perfect for using anywhere with clean SVG format'
              },
              {
                title: 'Instant Download',
                description: 'Download your avatars in high-quality SVG format'
              }
            ].map((feature, index) => (
              <div key={index} className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Toaster position="bottom-center" />
    </div>
  );
}

export default App;