import * as React from "react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { CarouselItemData, carouselItems } from "./Carousel_image";

export function CarouselDemo() {
  return (
    <Carousel
      opts={{ align: "start", loop: true }}
      className="w-full h-[100vh] relative"
    >
      <CarouselContent>
        {carouselItems.map((item: CarouselItemData) => {
          const isVideo = item.imageUrl.endsWith(".mp4");

          return (
            <CarouselItem key={item.id} className="flex items-center justify-center">
              <div className="relative w-full h-[100vh] overflow-hidden">
                {isVideo ? (
                  <video
                    src={item.imageUrl}
                    className="h-full w-full object-cover"
                    autoPlay
                    loop
                    muted
                    playsInline
                  />
                ) : (
                  <img
                    src={item.imageUrl}
                    alt={`Carousel item ${item.id}`}
                    className="h-full w-full object-cover"
                  />
                )}
              </div>
            </CarouselItem>
          );
        })}
      </CarouselContent>
      <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2 transform text-white hover:bg-white/20 hover:text-white" />
      <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2 transform text-white hover:bg-white/20 hover:text-white" />
    </Carousel>
  );
}
