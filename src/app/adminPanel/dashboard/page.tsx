import Dashboard from "./(_component)/dashboard";
import { UserRepository } from "@/core/repositories/IUserRepository";
import { UserUsecase } from "@/core/usecases/User.usecase";
import { BookSangeetRepository } from "@/core/repositories/IBookSangeet.repository";
import { BookSangeetUsecase } from "@/core/usecases/BookSangeet.usecase";
import { AlbumRepository } from "@/core/repositories/IAlbumRepository";
import { AlbumUsecase } from "@/core/usecases/Album.usecase";
import { ScrollArea } from "@/components/ui/scroll-area";
export const dynamic = "force-dynamic";
async function getVisitCount() {
    const stat =await prisma?.siteStat.findFirst();
    return stat?.visits || 0;
}
const page = async() => {
  const userrepo = new UserRepository();
  const userusecase = new UserUsecase(userrepo);
  const bookSangeetRepo = new BookSangeetRepository();
  const bookSangeetUsecase = new BookSangeetUsecase(bookSangeetRepo,userrepo);
  const albumRepo = new AlbumRepository();
  const Albumusecase = new AlbumUsecase(albumRepo);
  const data = await userusecase.TotalUser();
  const SangeetTotal = await bookSangeetUsecase.totalSangeet();
  const TotalPhotos = await Albumusecase.TotalPhoto();
  const visits = await getVisitCount();
  console.log("sangeetTotal",SangeetTotal);
  console.log("photos",TotalPhotos);
  return (
    <div>
      <ScrollArea className="h-[100vh]">
      <Dashboard total={data} sangeet={SangeetTotal} TotalPhotos={TotalPhotos} visitCount ={visits}/>
      </ScrollArea>
    </div>
  )
}

export default page