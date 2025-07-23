import { FaQuestionCircle } from "react-icons/fa";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { FAQItems } from "../Pricing";

type FaqAccordionProps = {
  items: FAQItems[];
};

export default function FaqAccordion({ items }: FaqAccordionProps) {
  return (
    <div className="space-y-4 w-[50%] py-10">
      <h2 className="text-2xl text-gray-700 font-bold flex items-center justify-center gap-3 py-4">
        <FaQuestionCircle />
        Nos questions fréquentes
      </h2>
      <Accordion type="single" collapsible className="w-full">
        {items.map((item) => (
          <AccordionItem value={item.id} key={item.id} className="py-4">
            <AccordionTrigger className="py-2 text-lg font-semibold text-gray-600 leading-6 hover:no-underline">
              <span className="flex items-center gap-3">
                {item.icon}
                <span>{item.title}</span>
              </span>
            </AccordionTrigger>
            <AccordionContent className="w-full flex justify-start items-center py-4 pl-9 text-base text-gray-500">
              {item.content}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
