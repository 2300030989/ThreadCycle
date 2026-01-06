import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { MessageCircle, X, Send, Bot } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'bot';
}

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, text: "Hi! I'm ThreadBot 🤖. How can I help you donate today?", sender: 'bot' }
  ]);
  const [inputValue, setInputValue] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const handleSend = () => {
    if (!inputValue.trim()) return;

    const userMsg: Message = { id: Date.now(), text: inputValue, sender: 'user' };
    setMessages(prev => [...prev, userMsg]);
    setInputValue('');

    // Simulate Bot Response
    setTimeout(() => {
      const botResponse = getBotResponse(userMsg.text);
      setMessages(prev => [...prev, { id: Date.now() + 1, text: botResponse, sender: 'bot' }]);
    }, 1000);
  };

  const getBotResponse = (text: string): string => {
    const lowerText = text.toLowerCase();
    if (lowerText.includes('donate') || lowerText.includes('schedule')) return "You can schedule a pickup by clicking the 'Schedule Pickup' button in the sidebar!";
    if (lowerText.includes('price') || lowerText.includes('cost')) return "Pickup is completely free! We appreciate your donation.";
    if (lowerText.includes('clothes') || lowerText.includes('items')) return "We accept shirts, pants, sarees, jackets, and other clean textiles.";
    if (lowerText.includes('rewards') || lowerText.includes('points')) return "You earn Eco Points for every kg donated. Check the 'Impact Rewards' page!";
    if (lowerText.includes('hello') || lowerText.includes('hi')) return "Hello there! Ready to make an impact?";
    return "I'm still learning! You can ask me about donations, rewards, or what items we accept.";
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {!isOpen && (
        <Button 
          onClick={() => setIsOpen(true)} 
          className="rounded-full h-14 w-14 bg-green-600 hover:bg-green-700 shadow-lg animate-bounce"
        >
          <MessageCircle className="h-8 w-8 text-white" />
        </Button>
      )}

      {isOpen && (
        <Card className="w-80 h-96 flex flex-col shadow-2xl border-green-100">
          <CardHeader className="bg-green-600 text-white p-4 rounded-t-lg flex flex-row justify-between items-center">
            <div className="flex items-center gap-2">
              <Bot className="h-6 w-6" />
              <CardTitle className="text-lg">ThreadBot</CardTitle>
            </div>
            <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)} className="text-white hover:bg-green-700 h-8 w-8">
              <X className="h-5 w-5" />
            </Button>
          </CardHeader>
          
          <CardContent className="flex-1 p-4 overflow-hidden bg-gray-50">
            <ScrollArea className="h-full pr-4">
              <div className="space-y-4">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[80%] p-3 rounded-lg text-sm ${
                        msg.sender === 'user'
                          ? 'bg-green-600 text-white rounded-br-none'
                          : 'bg-white border border-gray-200 text-gray-800 rounded-bl-none shadow-sm'
                      }`}
                    >
                      {msg.text}
                    </div>
                  </div>
                ))}
                <div ref={scrollRef} />
              </div>
            </ScrollArea>
          </CardContent>

          <CardFooter className="p-3 border-t bg-white">
            <div className="flex w-full gap-2">
              <Input 
                placeholder="Type a message..." 
                value={inputValue} 
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                className="focus-visible:ring-green-600"
              />
              <Button size="icon" onClick={handleSend} className="bg-green-600 hover:bg-green-700">
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </CardFooter>
        </Card>
      )}
    </div>
  );
};

export default Chatbot;
