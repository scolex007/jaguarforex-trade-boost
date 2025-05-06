
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FaqSection = () => {
  const faqs = [
    {
      question: "What is JaguarForex?",
      answer: "JaguarForex is a platform that provides free trading tools for forex traders, including Expert Advisors (EAs), indicators, and other trading tools. Additionally, we offer a cashback program that rewards traders with rebates on every trade they make through our affiliated brokers."
    },
    {
      question: "How do I earn cashback?",
      answer: "To earn cashback, simply register your trading account with JaguarForex and continue trading as usual. We'll automatically track your trading activity and accumulate your cashback rewards, which you can withdraw at any time."
    },
    {
      question: "Is there a cost to use JaguarForex services?",
      answer: "No, JaguarForex services are completely free. We make money through our partnerships with brokers, allowing us to provide our tools and cashback program at no cost to traders."
    },
    {
      question: "Which brokers are supported for cashback?",
      answer: "We support a wide range of reputable forex brokers including IC Markets, Exness, FXPro, Pepperstone, and many more. You can find the complete list of supported brokers in your dashboard after registration."
    },
    {
      question: "How often can I withdraw my cashback?",
      answer: "You can withdraw your cashback anytime as long as you've met the minimum withdrawal amount, which varies by payment method. Most withdrawals are processed within 24-48 hours."
    },
    {
      question: "Are the trading tools really free?",
      answer: "Yes, all our trading tools, including EAs and indicators, are completely free to use. We believe in providing value to the trading community and helping traders succeed."
    }
  ];

  return (
    <section id="faq" className="py-16 md:py-24 bg-jaguarblue-900 relative">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Frequently Asked <span className="gradient-text">Questions</span>
          </h2>
          <p className="text-gray-300">
            Find answers to the most common questions about JaguarForex services.
          </p>
        </div>

        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`} className="border border-jaguarblue-700 rounded-lg mb-4 overflow-hidden">
              <AccordionTrigger className="px-4 py-4 bg-jaguarblue-800 hover:bg-jaguarblue-700 text-left font-medium transition-all">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="px-4 py-3 bg-jaguarblue-800/50 text-gray-300">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
      
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-jaguargold/5 rounded-full filter blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-jaguargold/5 rounded-full filter blur-3xl"></div>
    </section>
  );
};

export default FaqSection;
