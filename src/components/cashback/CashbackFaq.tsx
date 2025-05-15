
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const CashbackFaq = () => {
  const faqs = [
    {
      question: "When will I receive my cashback payments?",
      answer: "Cashback is processed and paid out every Friday. All trading activity from Monday to Friday of the previous week is included in the payment."
    },
    {
      question: "Can I register multiple trading accounts?",
      answer: "Yes, you can register multiple trading accounts under a single JaguarForex account. Each trading account will earn cashback separately based on its trading volume."
    },
    {
      question: "What happens if I switch brokers?",
      answer: "You can add new broker accounts to your JaguarForex account at any time. Simply register your new broker account through our platform, and you'll continue receiving cashback without interruption."
    },
    {
      question: "Is there a minimum withdrawal amount?",
      answer: "Yes, the minimum withdrawal amount is $10. If your cashback is below this threshold, it will accumulate until you reach the minimum."
    },
    {
      question: "What payment methods are available?",
      answer: "We offer payments via bank transfer, GCash, BinancePay, and other electronic payment methods depending on your country of residence."
    },
    {
      question: "Is KYC verification required?",
      answer: "Yes, KYC verification is required to comply with financial regulations. You'll need to complete this process once before your first withdrawal."
    },
    {
      question: "Are there any taxes on cashback?",
      answer: "Tax treatment of cashback varies by country. We recommend consulting with a tax professional in your jurisdiction for guidance on how to report cashback income."
    }
  ];

  return (
    <section className="py-16 bg-jaguarblue-900" id="faq">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-10 text-center">Frequently Asked Questions</h2>
        
        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-lg text-left">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-gray-300">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
        
        <div className="mt-10 text-center">
          <p className="text-gray-400">
            Have more questions? <a href="/contact" className="text-jaguargold hover:underline">Contact our support team</a>
          </p>
        </div>
      </div>
    </section>
  );
};

export default CashbackFaq;
