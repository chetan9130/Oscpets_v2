import { useState } from "react";
import {
  Bot,
  X,
  MessageSquare,
  Apple,
  Dumbbell,
  MapPin,
  Loader2,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/hooks/use-toast";

/* ---------------- USER INFO ---------------- */
const storedUser = JSON.parse(localStorage.getItem("user") || "{}");
const userName = storedUser?.firstName || "User";

/* ---------------- AI TYPES ---------------- */
const assistantTypes = [
  {
    id: "vet",
    label: "Veterinary Questions",
    icon: MessageSquare,
    description: "Get answers about pet health and medical concerns",
  },
  {
    id: "nutrition",
    label: "Nutrition Advice",
    icon: Apple,
    description: "Learn about proper diet and feeding for your pets",
  },
  {
    id: "training",
    label: "Training Tips",
    icon: Dumbbell,
    description: "Get guidance on pet behavior and training techniques",
  },
];

const DEFAULT_MODEL = "arcee-ai/trinity-mini:free";
const DEFAULT_API_KEY =
  "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"; // ⚠️ move to backend later

const PetAIAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState<
    { type: "user" | "ai"; content: string }[]
  >([]);
  const [showPuneNotice, setShowPuneNotice] = useState(true);
  const [apiKey] = useState(DEFAULT_API_KEY);
  const [apiKeySubmitted] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [model] = useState(DEFAULT_MODEL);

  const toggleAssistant = () => setIsOpen(!isOpen);

  /* ---------------- TYPE SELECTION ---------------- */
  const handleTypeSelection = (typeId: string) => {
    setSelectedType(typeId);

    const welcomeMessages: Record<string, string> = {
      vet: `Hello ${userName}! 👋 I’m your veterinary assistant. How can I help with your pet’s health today?`,
      nutrition: `Hi ${userName}! 🐾 I’m your pet nutrition advisor. What would you like to know?`,
      training: `Welcome ${userName}! 🐕 I’m your pet training assistant. How can I help today?`,
    };

    setMessages([{ type: "ai", content: welcomeMessages[typeId] }]);
  };

  const handleBackToTopics = () => {
    setSelectedType(null);
    setMessages([]);
  };

  /* ---------------- SEND MESSAGE ---------------- */
  const handleSendQuestion = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!question.trim()) return;

    setMessages((prev) => [...prev, { type: "user", content: question }]);
    setIsLoading(true);

    try {
      const systemPrompts: Record<string, string> = {
        vet: `You are an AI veterinary assistant for OSCPETS in India.
The user's name is ${userName}. Address them by name.
Give helpful medical guidance but clarify you are not a replacement for a vet.
Be friendly and concise.`,

        nutrition: `You are an AI pet nutrition advisor for OSCPETS.
The user's name is ${userName}. Address them personally.
Give accurate diet and feeding advice.`,

        training: `You are an AI pet training assistant for OSCPETS.
The user's name is ${userName}. Be encouraging and positive.
Focus on reward-based training.`,
      };

      const response = await fetch(
        "https://openrouter.ai/api/v1/chat/completions",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${apiKey}`,
            Referer: window.location.origin,
            "X-Title": "OSCPETS AI Assistant",
          },
          body: JSON.stringify({
            model,
            messages: [
              { role: "system", content: systemPrompts[selectedType!] },
              ...messages.map((m) => ({
                role: m.type === "user" ? "user" : "assistant",
                content: m.content,
              })),
              { role: "user", content: question },
            ],
            max_tokens: 500,
          }),
        }
      );

      const data = await response.json();
      const aiReply =
        data.choices?.[0]?.message?.content ||
        "Sorry, I couldn’t generate a response.";

      setMessages((prev) => [...prev, { type: "ai", content: aiReply }]);
    } catch (err) {
      toast({
        title: "AI Error",
        description: "Failed to connect to AI service.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
      setQuestion("");
    }
  };

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={toggleAssistant}
        className="fixed right-6 bottom-6 bg-osc-blue text-white p-3 rounded-full shadow-lg z-40"
      >
        <Bot size={24} />
      </button>

      {/* Panel */}
      <div
        className={cn(
          "fixed right-0 top-0 bottom-0 w-full sm:w-96 bg-white z-50 transition-transform",
          isOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        {/* Header */}
        <div className="p-4 bg-osc-blue text-white flex justify-between">
          <div className="flex items-center gap-2">
            <Bot size={18} />
            <span>OSCPETS AI</span>
          </div>
          <X onClick={toggleAssistant} className="cursor-pointer" />
        </div>

        {/* Content */}
        <div className="p-4 flex flex-col h-full">
          {selectedType === null ? (
            assistantTypes.map((t) => (
              <button
                key={t.id}
                onClick={() => handleTypeSelection(t.id)}
                className="p-3 border rounded-lg mb-3 text-left"
              >
                <p className="font-semibold">{t.label}</p>
                <p className="text-sm text-gray-500">{t.description}</p>
              </button>
            ))
          ) : (
            <>
              <button
                onClick={handleBackToTopics}
                className="text-sm text-osc-blue mb-2"
              >
                ← Back
              </button>

              <div className="flex-grow overflow-y-auto space-y-3">
                {messages.map((msg, i) => (
                  <div
                    key={i}
                    className={cn(
                      "p-3 rounded-lg max-w-[85%]",
                      msg.type === "user"
                        ? "bg-osc-blue text-white ml-auto"
                        : "bg-gray-100"
                    )}
                  >
                    <p className="text-xs opacity-70 mb-1">
                      {msg.type === "user" ? userName : "OSCPETS AI"}
                    </p>
                    {msg.content}
                  </div>
                ))}
                {isLoading && (
                  <div className="flex items-center gap-2 text-sm">
                    <Loader2 className="animate-spin" size={14} /> Thinking...
                  </div>
                )}
              </div>

              <form onSubmit={handleSendQuestion} className="mt-2 flex gap-2">
                <Input
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  placeholder={`Ask something, ${userName}...`}
                />
                <Button disabled={isLoading}>Send</Button>
              </form>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default PetAIAssistant;
