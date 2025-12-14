import LanguageSwitcher from "@/components/LanguageSwitcher";
import { CarouselDemo } from "@/components/widget/Carousel";
import CountdownTimer from "@/components/countDownTimer";
import { TimelineDemo } from "@/components/common/Story";
import WeddingEvents from "@/components/common/weddingEvent";
import GroomMember from "@/components/widget/FamilyMember/Groom";
import BrideMember from "@/components/widget/FamilyMember/Bride";
import Footer from "@/components/widget/Footer";
import { ToastContainer } from "react-toastify";
import VisitTracker from "@/components/VisitTracker";
export default function Home() {

  return (
    <>
    <main className="text-center w-full h-full min-h-screen bg-gray-400 flex flex-col items-center justify-center">
    <ToastContainer position="top-center"/>
      <VisitTracker/>
      <CarouselDemo />
      <CountdownTimer/>
      <LanguageSwitcher />
      {/* <Events/> */}
      <WeddingEvents/>
      <TimelineDemo/>
      <GroomMember/>
    </main>
    <div className="text-center mt-10 w-full h-full min-h-screen bg-white flex flex-col items-center justify-center">
      <BrideMember/>
      <Footer/>
    </div>
    </>
  );
}
