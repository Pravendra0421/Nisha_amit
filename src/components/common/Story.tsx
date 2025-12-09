import React, { useMemo } from "react";
import { Timeline } from "@/components/ui/timeline";
import Image from "next/image"; // 1. Import next/image

const shadowClasses = "shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]";

export function TimelineDemo() {
  const data = useMemo(() => [
    {
      title: "2024:First Hello",
      content: (
        <div>
          <p className="mb-8 text-xs font-normal text-neutral-800 md:text-sm dark:text-neutral-200">
            Kismat had its own plans! A chance meeting through a mutual friend
            sparked something special. Who knew a simple hello in Indore would lead
            to a forever story?
          </p>
          <div className="grid grid-cols-2 gap-4">
            {/* Image 1 */}
            {/* Wrapper Div needed for 'fill' layout */}
            <div className={`relative h-20 w-full md:h-44 lg:h-60 rounded-lg overflow-hidden ${shadowClasses}`}>
              <Image
                src="https://res.cloudinary.com/ddhgvmdg9/image/upload/v1753727006/bearded-man-his-lovely-bride-pose-snow-magic-winter-forest_ztubzj.jpg"
                alt="couple in winter forest"
                fill // Fills the parent relative div container
                className="object-cover"
                sizes="(max-width: 768px) 50vw, 25vw" // Responsive sizing hint for browser
              />
            </div>
            {/* Image 2 */}
            <div className={`relative h-20 w-full md:h-44 lg:h-60 rounded-lg overflow-hidden ${shadowClasses}`}>
              <Image
                src="https://res.cloudinary.com/ddhgvmdg9/image/upload/v1753726984/beautiful-wedding-walk-nature-ukraine-sumy_jzsryk.jpg"
                alt="wedding walk nature"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 50vw, 25vw"
              />
            </div>
            {/* Image 3 */}
            <div className={`relative h-20 w-full md:h-44 lg:h-60 rounded-lg overflow-hidden ${shadowClasses}`}>
              <Image
                src="https://res.cloudinary.com/ddhgvmdg9/image/upload/v1753726997/beautiful-couple-posing-their-wedding-day_uzqtwh.jpg"
                alt="couple posing wedding day"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 50vw, 25vw"
              />
            </div>
            {/* Image 4 */}
            <div className={`relative h-20 w-full md:h-44 lg:h-60 rounded-lg overflow-hidden ${shadowClasses}`}>
              <Image
                src="https://res.cloudinary.com/ddhgvmdg9/image/upload/v1753727006/bearded-man-his-lovely-bride-pose-snow-magic-winter-forest_ztubzj.jpg"
                alt="couple in winter forest repeat"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 50vw, 25vw"
              />
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "December 2024: The Proposal",
      content: (
        <div>
          <p className="mb-8 text-xs font-normal text-neutral-800 md:text-sm dark:text-neutral-200">
            Under a beautiful sky, he asked the most important question of his
            life, and with a heart full of joy
          </p>
          <p className="mb-8 text-xs font-normal text-neutral-800 md:text-sm dark:text-neutral-200">
            she said YES! A promise of a
            lifetime of love and laughter was made.
          </p>
          <div className="grid grid-cols-2 gap-4">
             {/* Repeated the same optimized image structure for the rest.
                 In a real project, you would create a reusable <ImageCard /> component 
                 instead of copy-pasting this code 8 times.
             */}
             {[1, 2, 3, 4].map((item) => (
                <div key={item} className={`relative h-20 w-full md:h-44 lg:h-60 rounded-lg overflow-hidden ${shadowClasses}`}>
                  <Image
                    src="https://res.cloudinary.com/ddhgvmdg9/image/upload/v1753727006/bearded-man-his-lovely-bride-pose-snow-magic-winter-forest_ztubzj.jpg"
                    alt={`proposal image ${item}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 50vw, 25vw"
                  />
                </div>
             ))}
          </div>
        </div>
      ),
    },
    {
      title: "Changelog",
      content: (
        <div>
          <p className="mb-4 text-xs font-normal text-neutral-800 md:text-sm dark:text-neutral-200">
            Deployed 5 new components on Aceternity today
          </p>
          <div className="mb-8">
             {/* ... (List items remain same) ... */}
             <div className="flex items-center gap-2 text-xs text-neutral-700 md:text-sm dark:text-neutral-300">
                ✅ Card grid component
             </div>
             {/* ... more list items ... */}
          </div>
          <div className="grid grid-cols-2 gap-4">
             {[1, 2, 3, 4].map((item) => (
                <div key={item} className={`relative h-20 w-full md:h-44 lg:h-60 rounded-lg overflow-hidden ${shadowClasses}`}>
                  <Image
                    src="https://res.cloudinary.com/ddhgvmdg9/image/upload/v1753727006/bearded-man-his-lovely-bride-pose-snow-magic-winter-forest_ztubzj.jpg"
                    alt={`changelog image ${item}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 50vw, 25vw"
                  />
                </div>
             ))}
          </div>
        </div>
      ),
    },
  ], []); // Dependency array empty hai kyunki data static hai

  return (
    <div className="relative w-full overflow-clip">
      <Timeline data={data} />
    </div>
  );
}