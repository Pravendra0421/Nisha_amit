import SangeetList from "./(_component)/SangeetList"
import { BookSangeetEntity } from "@/core/entities/BookSangeetEntity"
import { BookSangeetRepository } from "@/core/repositories/IBookSangeet.repository"
import { IUserRepository, UserRepository } from "@/core/repositories/IUserRepository"
import { BookSangeetUsecase } from "@/core/usecases/BookSangeet.usecase"
const userReposiotry = new UserRepository();
const sangeetRepository = new BookSangeetRepository();
const sangeetusecase = new BookSangeetUsecase(sangeetRepository,userReposiotry);
const page = async() => {
    const data =await sangeetusecase.getAll();
  return (
    <div>
        <SangeetList data={data}/>
    </div>
  )
}

export default page