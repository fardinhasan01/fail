import { useEffect, useState, useRef } from "react";
import { Mic, MicOff, Sparkles, X, Volume2 } from "lucide-react";
import { useNavigate } from "@tanstack/react-router";
import { cn } from "@/lib/utils";

interface VoiceOrbProps {
  className?: string;
}

export function VoiceOrb({ className }: VoiceOrbProps) {
  const navigate = useNavigate();
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [response, setResponse] = useState("");
  const [showPanel, setShowPanel] = useState(false);
  const [supported, setSupported] = useState(true);
  
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      
    if (!SpeechRecognition) {
      setSupported(false);
      return;
    }

    const rec = new SpeechRecognition();
    rec.continuous = false;
    rec.lang = "bn-BD"; // Primary language is Bangla, fallback is handled.
    rec.interimResults = false;
    rec.maxAlternatives = 1;

    rec.onstart = () => {
      setIsListening(true);
      setTranscript("শুনছি...");
      setResponse("");
      setShowPanel(true);
    };

    rec.onerror = (event: any) => {
      console.error("Speech recognition error", event.error);
      if (event.error === "no-speech") {
        setTranscript("কোনো শব্দ শোনা যায়নি।");
        speak("দুঃখিত, আমি শুনতে পাইনি।");
      } else {
        setTranscript("ভুল হয়েছে। আবার চেষ্টা করো।");
      }
      setIsListening(false);
    };

    rec.onend = () => {
      setIsListening(false);
    };

    rec.onresult = (event: any) => {
      const result = event.results[0][0].transcript;
      setTranscript(result);
      processCommand(result);
    };

    recognitionRef.current = rec;
  }, []);

  const speak = (text: string) => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel(); // Cancel any ongoing speech
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = "bn-BD";
      window.speechSynthesis.speak(utterance);
    }
  };

  const processCommand = (commandText: string) => {
    const text = commandText.toLowerCase().trim();
    
    // Command matching map
    const commands = [
      {
        keywords: ["স্কুল", "school", "বিদ্যালয়", "পাঠশালা"],
        action: () => {
          navigate({ to: "/school" });
          speak("স্কুল ড্যাশবোর্ডে নিয়ে যাচ্ছি।");
          setResponse("স্কুল ড্যাশবোর্ডে নিয়ে যাচ্ছি...");
        }
      },
      {
        keywords: ["ড্যাশবোর্ড", "dashboard", "শুরু", "home", "হোম"],
        action: () => {
          navigate({ to: "/dashboard" });
          speak("ড্যাশবোর্ড ওপেন করা হচ্ছে।");
          setResponse("ড্যাশবোর্ড ওপেন করা হচ্ছে...");
        }
      },
      {
        keywords: ["ছাত্র", "student", "শিক্ষার্থী", "প্রোফাইল"],
        action: () => {
          navigate({ to: "/students" });
          speak("ছাত্র ড্যাশবোর্ড ওপেন করা হচ্ছে।");
          setResponse("ছাত্র ড্যাশবোর্ডে নিয়ে যাচ্ছি...");
        }
      },
      {
        keywords: ["প্রতিযোগিতা", "competition", "যুদ্ধ", "ব্যাটল"],
        action: () => {
          navigate({ to: "/competitions" });
          speak("জাতীয় প্রতিযোগিতা পেইজে যাচ্ছি।");
          setResponse("জাতীয় প্রতিযোগিতা পেইজে যাচ্ছি...");
        }
      },
      {
        keywords: ["বিষয়", "subject", "পড়া", "পড়াশোনা"],
        action: () => {
          navigate({ to: "/subjects" });
          speak("বিষয়ভিত্তিক অনুশীলনে নিয়ে যাচ্ছি।");
          setResponse("বিষয়ভিত্তিক অনুশীলনে নিয়ে যাচ্ছি...");
        }
      },
      {
        keywords: ["সার্চ", "search", "খোঁজ", "অনুসন্ধান", "স্মার্ট"],
        action: () => {
          navigate({ to: "/smart-board" });
          speak("স্মার্ট বোর্ড ওপেন করা হচ্ছে।");
          setResponse("স্মার্ট বোর্ড ওপেন করা হচ্ছে...");
        }
      },
      {
        keywords: ["সহায়ক", "assistant", "ai helper", "তুতর", "tutor", "সহায়িকা"],
        action: () => {
          navigate({ to: "/bani" });
          speak("সহায়িকা এআই ওপেন করা হচ্ছে।");
          setResponse("সহায়িকা এআই চ্যাটরুম ওপেন করা হচ্ছে...");
        }
      },
      {
        keywords: ["স্বাস্থ্য", "health", "ব্যায়াম", "মন", "সুস্থ"],
        action: () => {
          navigate({ to: "/student-health" });
          speak("শিক্ষার্থী স্বাস্থ্য ও মনন পেইজে যাচ্ছি।");
          setResponse("শিক্ষার্থী স্বাস্থ্য ও মনন পেইজে যাচ্ছি...");
        }
      },
      {
        keywords: ["কুইজ", "quiz", "প্রশ্ন", "পরীক্ষা"],
        action: () => {
          navigate({ to: "/quiz" });
          speak("কুইজ বোর্ডে নিয়ে যাচ্ছি।");
          setResponse("কুইজ বোর্ডে নিয়ে যাচ্ছি...");
        }
      },
      {
        keywords: ["বোর্ড", "board", "হোয়াইটবোর্ড", "whiteboard", "আঁকা"],
        action: () => {
          navigate({ to: "/smart-board" });
          speak("স্মার্ট বোর্ড ওপেন করা হচ্ছে।");
          setResponse("স্মার্ট বোর্ড ওপেন করা হচ্ছে...");
        }
      },
      {
        keywords: ["ক্লাসমেট", "classmate", "বন্ধু", "সহপাঠী", "চ্যাট"],
        action: () => {
          navigate({ to: "/classmates" });
          speak("সহপাঠী আড্ডাখানায় নিয়ে যাচ্ছি।");
          setResponse("সহপাঠী আড্ডাখানায় নিয়ে যাচ্ছি...");
        }
      },
      {
        keywords: ["লাইভ", "live class", "ভিডিও", "লাইভ ক্লাস"],
        action: () => {
          navigate({ to: "/live-class" });
          speak("লাইভ ক্লাসরুমে নিয়ে যাচ্ছি।");
          setResponse("লাইভ ক্লাসরুমে নিয়ে যাচ্ছি...");
        }
      },
      {
        keywords: ["লাইব্রেরি", "library", "বই", "লাইব্রেরী"],
        action: () => {
          navigate({ to: "/library" });
          speak("ভিডিও লাইব্রেরিতে নিয়ে যাচ্ছি।");
          setResponse("ভিডিও লাইব্রেরিতে নিয়ে যাচ্ছি...");
        }
      },
      {
        keywords: ["সার্টিফিকেট", "certificate", "পুরস্কার", "অর্জন"],
        action: () => {
          navigate({ to: "/certificates" });
          speak("তোমার সার্টিফিকেট গ্যালারি ওপেন করা হচ্ছে।");
          setResponse("সার্টিফিকেট গ্যালারি ওপেন করা হচ্ছে...");
        }
      },
      {
        keywords: ["র‍্যাঙ্ক", "rank", "লিডারবোর্ড", "leaderboard"],
        action: () => {
          navigate({ to: "/leaderboard" });
          speak("লিডারবোর্ড ওপেন করা হচ্ছে।");
          setResponse("লিডারবোর্ড ওপেন করা হচ্ছে...");
        }
      },
      {
        keywords: ["হ্যালো", "হাই", "hello", "hi"],
        action: () => {
          speak("হ্যালো! আমি E-পাঠশালা ভয়েস অ্যাসিস্ট্যান্ট। আপনি কোনো নির্দিষ্ট পেইজে যেতে বলতে পারেন।");
          setResponse("হ্যালো! আমি E-পাঠশালা ভয়েস অ্যাসিস্ট্যান্ট। আমি কোনো নির্দিষ্ট পেইজে যেতে সাহায্য করতে পারি।");
        }
      },
      {
        keywords: ["কে বানিয়েছে", "তৈরি করেছে", "made you"],
        action: () => {
          speak("আমাকে তৈরি করেছে কচুয়া সরকারি পাইলট উচ্চ বিদ্যালয় টিম।");
          setResponse("আমাকে তৈরি করেছে কচুয়া সরকারি পাইলট উচ্চ বিদ্যালয় টিম।");
        }
      }
    ];

    // Check match
    const matched = commands.find((cmd) =>
      cmd.keywords.some((keyword) => text.includes(keyword))
    );

    if (matched) {
      matched.action();
    } else {
      speak("দুঃখিত, আমি এই কমান্ডটি বুঝতে পারিনি। আবার বলুন।");
      setResponse("কমান্ডটি খুঁজে পাওয়া যায়নি। 'স্কুল', 'স্বাস্থ্য', 'বোর্ড' ইত্যাদি বলে ট্রাই করো।");
    }
  };

  const toggleListening = () => {
    if (!supported) {
      alert("দুঃখিত, এই ব্রাউজারে ভয়েস রিকগনিশন সাপোর্ট করে না।");
      return;
    }
    
    if (isListening) {
      recognitionRef.current?.stop();
    } else {
      speak("আমি শুনছি, বলুন");
      // Short delay to let the TTS finish speaking before we start listening
      setTimeout(() => {
        try {
          recognitionRef.current?.start();
        } catch (e) {
          console.error(e);
        }
      }, 1000);
    }
  };

  return (
    <div className={cn("relative", className)}>
      {/* Glow Rings Orb Button */}
      <button
        type="button"
        onClick={toggleListening}
        className={cn(
          "relative w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center cursor-pointer transition-all duration-300 focus:outline-none z-50 hover:scale-105 active:scale-95 shadow-glow",
          isListening 
            ? "bg-gradient-to-r from-pink-500 to-rose-600 shadow-[0_0_25px_rgba(244,63,94,0.6)]" 
            : "bg-gradient-to-r from-cyan-400 to-indigo-500 shadow-[0_0_20px_rgba(6,182,212,0.4)]"
        )}
      >
        {/* Animated outer circles like Jarvis */}
        <div 
          className={cn(
            "absolute inset-0 rounded-full border-2 border-dashed transition-all duration-1000",
            isListening 
              ? "border-rose-300 animate-spin scale-110 speed-fast" 
              : "border-cyan-300 animate-spin"
          )}
          style={{ animationDuration: isListening ? "2s" : "6s" }}
        />
        <div 
          className={cn(
            "absolute inset-1 rounded-full border border-dotted transition-all duration-1000",
            isListening 
              ? "border-pink-200 animate-spin-reverse scale-105" 
              : "border-indigo-200 animate-spin-reverse"
          )}
          style={{ animationDuration: isListening ? "3s" : "8s" }}
        />

        {/* Inner pulsing core */}
        <div 
          className={cn(
            "w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-300 text-white",
            isListening ? "bg-rose-400 animate-ping" : "bg-cyan-400"
          )}
        >
          {isListening ? <Mic className="h-4.5 w-4.5 animate-pulse" /> : <Mic className="h-4.5 w-4.5" />}
        </div>
      </button>

      {/* Speech Interaction Panel */}
      {showPanel && (
        <div className="absolute right-0 bottom-16 md:bottom-20 w-[280px] md:w-[320px] glass-strong rounded-[2rem] border border-border shadow-glow p-5 flex flex-col gap-3 text-foreground animate-in slide-in-from-bottom-5 fade-in duration-200 z-50">
          <div className="flex items-center justify-between border-b border-border pb-2">
            <div className="flex items-center gap-1.5">
              <Sparkles className={cn("h-4 w-4 text-cyan-400", isListening && "animate-spin")} />
              <h4 className="font-bold text-xs md:text-sm">জার্ভিস ভয়েস অ্যাসিস্ট্যান্ট</h4>
            </div>
            <button
              type="button"
              onClick={() => setShowPanel(false)}
              className="p-1 hover:bg-muted rounded-full text-muted-foreground hover:text-foreground cursor-pointer"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </div>

          <div className="space-y-3">
            {/* Transcript Area */}
            <div className="bg-muted/40 rounded-xl p-3 border border-border">
              <div className="text-[10px] text-muted-foreground font-semibold">আপনার কথা:</div>
              <p className="text-xs font-bold text-foreground mt-1 min-h-[16px] leading-relaxed">
                {transcript}
              </p>
            </div>

            {/* Response Area */}
            {response && (
              <div className="bg-cyan-500/5 rounded-xl p-3 border border-cyan-500/10 flex items-start gap-2">
                <Volume2 className="h-3.5 w-3.5 text-cyan-400 shrink-0 mt-0.5" />
                <p className="text-xs text-cyan-900 leading-relaxed font-semibold">
                  {response}
                </p>
              </div>
            )}

            {/* Suggestion list */}
            <div className="text-[10px] text-muted-foreground">
              <span className="font-bold">বলুন:</span> "স্কুল", "ড্যাশবোর্ড", "স্বাস্থ্য", "বোর্ড", "কুইজ", "ক্লাসমেট" ইত্যাদি।
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
