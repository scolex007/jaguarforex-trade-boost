
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
      answer: "JaguarForex is a platform that offers free trading tools for forex traders, including Expert Advisors (EAs), indicators, and other helpful utilities. We also run a cashback program, rewarding traders with rebates for every trade executed through our partnered brokers."
    },
    {
      question: "How do I earn cashback?",
      answer: "To start earning cashback, simply register your trading account with JaguarForex. Once registered, we will automatically track your trades, and your cashback will accumulate as you continue trading."
    },
    {
      question: "Where does the cashback money come from?",
      answer: "The cashback comes from the spread or commission you pay to the broker. A portion of this is returned to us by the broker as a rebate, and we give it back to you as cashback."
    },
    {
      question: "Is there a cost to use JaguarForex services?",
      answer: "No, all JaguarForex services are free. We earn through broker partnerships, which allows us to provide our tools and cashback program at no cost to our users."
    },
    {
      question: "Which brokers are supported for cashback?",
      answer: "We currently support Exness and RoboForex, with plans to add more brokers soon. We aim to give traders more options as we grow."
    },
    {
      question: "How often can I withdraw my cashback?",
      answer: "You can request a withdrawal once your cashback reaches a minimum of $15. Payouts can be made through your preferred method: GCash, Crypto, Skrill, or PayPal."
    },
    {
      question: "Are the trading tools really free?",
      answer: "Yes, our trading tools—including EAs and indicators—are completely free to use. We also offer optional premium features that can be unlocked through a one-time upgrade, but they are not required to benefit from our platform."
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
