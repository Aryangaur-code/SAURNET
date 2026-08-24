"use client";

import { useState } from "react";
import { Bot, User, Send, Sparkles, Compass, AlertCircle, TrendingUp, HelpCircle, Loader2 } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface Message {
  sender: "user" | "bot";
  text: string;
  timestamp: string;
}

const suggestedQuestions = [
  "How's my current ROI?",
  "Optimize panel tilt angles",
  "Explain the B4 dust warning",
  "Forecast tomorrow's solar yield",
];

const initialMessages: Message[] = [
  {
    sender: "bot",
    text: "Hello! I am your Saurnet AI Solar Copilot. I can analyze thermal telemetry, optimize panel configurations, and calculate financial savings. Ask me anything about your solar fleet!",
    timestamp: "10:00 AM",
  },
];

export default function AIAssistant() {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [inputText, setInputText] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const handleSendMessage = (textToSend: string) => {
    if (!textToSend.trim()) return;

    const userMsg: Message = {
      sender: "user",
      text: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText("");
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      let replyText = "I have reviewed your solar logs. The operational yield is currently within normal parameters. Can I assist with further grid adjustments?";
      
      if (textToSend.toLowerCase().includes("roi") || textToSend.toLowerCase().includes("financial")) {
        replyText = "Your cumulative ROI stands at $142.50 for this week, trending 12.4% higher than last week's yield due to higher GHI averages (842 W/m²). At this rate, your payback period is projected to complete 4 months ahead of schedule.";
      } else if (textToSend.toLowerCase().includes("tilt") || textToSend.toLowerCase().includes("optimize")) {
        replyText = "Based on current latitude solar coordinates, adjusting the tilt angle of Array A from 32° to 28° will optimize GHI absorption, increasing daily clean yield by roughly 4.2 kWh (+$1.80/day).";
      } else if (textToSend.toLowerCase().includes("b4") || textToSend.toLowerCase().includes("dust") || textToSend.toLowerCase().includes("warning")) {
        replyText = "Array B, Panel Row B4 has registered a 14% efficiency drop due to dust/soiling accumulation. I recommend scheduling a washing cycle in the settings panel to restore output back to 320W.";
      } else if (textToSend.toLowerCase().includes("forecast") || textToSend.toLowerCase().includes("tomorrow")) {
        replyText = "Tomorrow's weather forecast predicts clear skies with a UV index of 9. Solar generation is forecasted at 48.5 kWh, generating an estimated $18.60 in utility savings.";
      }

      const botMsg: Message = {
        sender: "bot",
        text: replyText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, botMsg]);
      setIsTyping(false);
    }, 1200);
  };

  return (
    <div className="space-y-8 animate-slide-up">
      {/* Title */}
      <div>
        <h1 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white">AI Copilot</h1>
        <p className="text-slate-500 dark:text-slate-400 text-xs font-semibold mt-1">
          Natural Language solar engineering, yield analytics, and diagnostic reasoning.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chat Interface Container */}
        <Card className="lg:col-span-2 border-slate-200/60 dark:border-slate-800/80 flex flex-col h-[550px] overflow-hidden">
          <CardHeader className="border-b border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/10 py-4">
            <CardTitle className="text-xs font-extrabold tracking-wider uppercase flex items-center gap-2">
              <Bot className="h-4 w-4 text-emerald-450" />
              Chat Assistant
            </CardTitle>
          </CardHeader>

          {/* Chat Bubble Pane */}
          <div className="flex-grow overflow-y-auto p-4 space-y-4">
            {messages.map((m, index) => (
              <div
                key={index}
                className={`flex gap-3.5 max-w-[85%] ${m.sender === "user" ? "ml-auto flex-row-reverse" : ""}`}
              >
                {/* Avatar */}
                <div
                  className={`h-8 w-8 rounded-full shrink-0 flex items-center justify-center font-bold text-xs ${
                    m.sender === "bot"
                      ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-455"
                      : "bg-blue-500/10 text-blue-600 dark:text-blue-400"
                  }`}
                >
                  {m.sender === "bot" ? <Bot className="h-4.5 w-4.5" /> : <User className="h-4.5 w-4.5" />}
                </div>
                {/* Text bubble */}
                <div
                  className={`p-4 rounded-2xl text-xs leading-relaxed font-semibold ${
                    m.sender === "bot"
                      ? "bg-slate-100/80 dark:bg-slate-900/40 border border-slate-200/40 dark:border-slate-800/40 text-slate-800 dark:text-slate-200"
                      : "bg-emerald-600 text-white shadow-md shadow-emerald-900/10"
                  }`}
                >
                  <p>{m.text}</p>
                  <span className="text-[8px] opacity-60 block mt-2 text-right font-mono font-bold">{m.timestamp}</span>
                </div>
              </div>
            ))}

            {/* Typing Loader Indicator */}
            {isTyping && (
              <div className="flex gap-3.5 max-w-[85%]">
                <div className="h-8 w-8 rounded-full bg-emerald-500/10 text-emerald-500 flex items-center justify-center">
                  <Bot className="h-4.5 w-4.5" />
                </div>
                <div className="p-4 rounded-2xl text-xs bg-slate-100/80 dark:bg-slate-900/40 border border-slate-200/40 dark:border-slate-800/40 text-slate-400 font-semibold flex items-center gap-2">
                  <Loader2 className="h-3.5 w-3.5 animate-spin" />
                  Copilot is parsing telemetry...
                </div>
              </div>
            )}
          </div>

          {/* Suggested Questions Section */}
          <div className="px-4 py-3 bg-slate-50/50 dark:bg-slate-900/10 border-t border-slate-200 dark:border-slate-800">
            <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block mb-2">Suggested Triggers</span>
            <div className="flex flex-wrap gap-2">
              {suggestedQuestions.map((q) => (
                <button
                  key={q}
                  onClick={() => handleSendMessage(q)}
                  className="px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-800/80 hover:border-emerald-500/30 bg-white dark:bg-[#0b0f19] text-[10px] font-bold text-slate-600 dark:text-slate-300 hover:text-emerald-500 dark:hover:text-emerald-400 transition-all cursor-pointer"
                >
                  {q}
                </button>
              ))}
            </div>
          </div>

          {/* Chat Form Input */}
          <div className="p-3.5 border-t border-slate-200 dark:border-slate-800">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage(inputText);
              }}
              className="flex gap-2"
            >
              <Input
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Ask about ROI, panel tilt optimizations, or warnings..."
                className="flex-grow text-xs"
              />
              <Button type="submit" size="icon" className="h-10 w-10 shrink-0 cursor-pointer">
                <Send className="h-4 w-4" />
              </Button>
            </form>
          </div>
        </Card>

        {/* Solar Recommendations Panel */}
        <div className="space-y-6">
          <Card className="border-slate-200/60 dark:border-slate-800/80">
            <CardHeader className="pb-2">
              <CardTitle className="text-xs font-extrabold tracking-wider uppercase flex items-center gap-1.5">
                <Sparkles className="h-4 w-4 text-amber-500" />
                Solar Optimizations
              </CardTitle>
              <CardDescription>AI recommended efficiency rules</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 pt-2">
              {/* Rec 1 */}
              <div className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/10 text-xs space-y-2 hover:border-emerald-500/25 transition-all duration-300">
                <div className="flex justify-between items-center font-bold">
                  <span className="flex items-center gap-1.5 text-slate-900 dark:text-slate-200 font-extrabold">
                    <Compass className="h-4 w-4 text-emerald-450 animate-spin" style={{ animationDuration: '40s' }} />
                    Tilt Angle Calibration
                  </span>
                  <span className="text-[9px] text-emerald-500 font-extrabold bg-emerald-500/10 px-1.5 py-0.5 rounded-full">+6% Yield</span>
                </div>
                <p className="text-slate-500 dark:text-slate-400 leading-relaxed font-semibold">
                  Adjust Array A tilt angle from 32° to 28° to align with summer solar coordinates.
                </p>
                <Button size="sm" variant="outline" className="w-full text-[10px] font-bold h-7 mt-1 cursor-pointer" onClick={() => handleSendMessage("Optimize panel tilt angles")}>
                  Run Optimization
                </Button>
              </div>

              {/* Rec 2 */}
              <div className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/10 text-xs space-y-2 hover:border-emerald-500/25 transition-all duration-300">
                <div className="flex justify-between items-center font-bold">
                  <span className="flex items-center gap-1.5 text-slate-900 dark:text-slate-200 font-extrabold">
                    <AlertCircle className="h-4 w-4 text-amber-550" />
                    Washing Cycle (Grid B4)
                  </span>
                  <span className="text-[9px] text-amber-500 font-extrabold bg-amber-500/10 px-1.5 py-0.5 rounded-full">+14% Output</span>
                </div>
                <p className="text-slate-500 dark:text-slate-400 leading-relaxed font-semibold">
                  Execute wash cleaning on row B4 to prevent cell hotspots from soiling accumulation.
                </p>
                <Button size="sm" variant="outline" className="w-full text-[10px] font-bold h-7 mt-1 cursor-pointer" onClick={() => handleSendMessage("Explain the B4 dust warning")}>
                  Inspect Node B4
                </Button>
              </div>

              {/* Rec 3 */}
              <div className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/10 text-xs space-y-2 hover:border-emerald-500/25 transition-all duration-300">
                <div className="flex justify-between items-center font-bold">
                  <span className="flex items-center gap-1.5 text-slate-900 dark:text-slate-200 font-extrabold">
                    <TrendingUp className="h-4 w-4 text-blue-450" />
                    Peak Export Sell-Off
                  </span>
                  <span className="text-[9px] text-blue-500 font-extrabold bg-blue-500/10 px-1.5 py-0.5 rounded-full">+$12/day</span>
                </div>
                <p className="text-slate-500 dark:text-slate-400 leading-relaxed font-semibold">
                  Feed surplus battery reserves to local grid between 17:00-19:00 for peak tariff rates.
                </p>
                <Button size="sm" variant="outline" className="w-full text-[10px] font-bold h-7 mt-1 cursor-pointer" onClick={() => handleSendMessage("How's my current ROI?")}>
                  Read Financial Index
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
