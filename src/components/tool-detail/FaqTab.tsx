
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Tool } from "@/data/toolsData";

interface FaqTabProps {
  tool: Tool;
}

export default function FaqTab({ tool }: FaqTabProps) {
  return (
    <>
      <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
      <div className="max-w-3xl">
        <Accordion type="single" collapsible className="w-full">
          {tool.faq.map((item, index) => (
            <AccordionItem key={index} value={`item-${index}`} className="border-jaguarblue-600">
              <AccordionTrigger className="text-left text-white hover:no-underline">
                {item.question}
              </AccordionTrigger>
              <AccordionContent className="text-gray-300">
                {item.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </>
  );
}
