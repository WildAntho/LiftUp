import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { ReactElement, useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { type CarouselApi } from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { SlideButton } from "./SlideButton";

type Items = {
  title: string;
  redirect: string;
  image: string;
  description: string;
  buttonContent: string;
  icon: ReactElement;
};

type DashboardCarousselProps = {
  items: Items[];
};

export default function DashboardCaroussel({ items }: DashboardCarousselProps) {
  const navigate = useNavigate();
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  const plugin = useRef(Autoplay({ delay: 4000, stopOnInteraction: true }));

  useEffect(() => {
    if (!api) {
      return;
    }

    setCurrent(api.selectedScrollSnap());

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  return (
    <div className="relative w-full">
      <Carousel
        setApi={setApi}
        plugins={[plugin.current]}
        opts={{
          loop: true,
        }}
        onMouseEnter={plugin.current.stop}
        onMouseLeave={() => {
          plugin.current.reset();
          plugin.current.play();
        }}
        className="h-96 w-full"
      >
        <CarouselContent className="px-4">
          {items.map((i) => (
            <CarouselItem
              key={i.title}
              className="flex flex-col items-center justify-center gap-4 px-4"
            >
              <img
                src={i.image}
                alt={i.title}
                className="object-cover w-48 h-48 rounded-lg"
              />
              <div className="flex flex-col items-center justify-center gap-4 max-w-sm text-center">
                <div className="flex flex-col items-center justify-center">
                  <p className="text-lg font-semibold">{i.title}</p>
                  <p className="text-sm text-gray-600">{i.description}</p>
                </div>
                <div
                  className="w-full h-full"
                  onClick={() => navigate(i.redirect)}
                >
                  <SlideButton title={i.title} icon={i.icon} />
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        {/* Flèches positionnées en haut à droite côte à côte */}
        <div className="absolute top-4 right-4 flex gap-2 z-10">
          <CarouselPrevious className="static bg-white/80 hover:bg-white border shadow-md backdrop-blur-sm" />
          <CarouselNext className="static bg-white/80 hover:bg-white border shadow-md backdrop-blur-sm" />
        </div>
      </Carousel>

      {/* Indicateurs de pagination (points) */}
      <div className="flex justify-center gap-1 mt-4">
        {items.map((_, index) => (
          <button
            key={index}
            onClick={() => api?.scrollTo(index)}
            className={`rounded-full transition-all duration-200 ${
              index === current
                ? "bg-primary w-4 h-2"
                : "bg-primary/20 hover:bg-primary/40 w-2 h-2"
            }`}
            aria-label={`Aller à l'élément ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
