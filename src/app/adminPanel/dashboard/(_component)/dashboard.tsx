import { IconUser } from "@tabler/icons-react"
import { Eye, Music2Icon, TrendingUp } from "lucide-react"
import { MdPhotoLibrary } from "react-icons/md"
const Dashboard = ({total,sangeet,TotalPhotos,visitCount}) => {
  return (
    <div className="w-full">
      <div className="grid mt-20 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 md:grid-cols-3">
        <div className="ml-4 gap-10 shadow-md h-50 rounded-md mt-10">
          <div className="flex gap-3">
            <span className="ml-25 font-bold text-2xl">Total Users</span>
            <IconUser/>
          </div>
          <div className="text-center font-bold text-3xl mt-10 text-green-500">{total.totalUser}</div>
        </div>
        <div className="ml-4  gap-10 shadow-md h-50 rounded-md mt-10">
          <div className="flex gap-3">
            <span className="ml-10 font-bold text-2xl">Total Sangeet Form</span>
            <Music2Icon/>
          </div>
          <div className=" text-center font-bold text-3xl mt-10 text-pink-800">{sangeet.totalSangeet}</div>
        </div>
        <div className="ml-4  gap-10 shadow-md h-50 rounded-md mt-10">
          <div className="flex gap-3">
            <span className="ml-10 font-bold text-2xl">Total Photos</span>
            <MdPhotoLibrary/>
          </div>
          <div className=" text-center font-bold text-3xl mt-10 text-yellow-700">{TotalPhotos.totalPhotos}</div>
        </div>
      </div>
      <div className="w-full mt-10 bg-gradient-to-r from-blue-800 to-indigo-900 rounded-xl shadow-xl text-white overflow-hidden relative">
        <div className="p-8 flex flex-col md:flex-row items-center justify-between z-10 relative">
          
          {/* Left Side: Text & Icon */}
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-3 text-blue-200">
              <Eye size={28} />
              <span className="text-lg font-medium uppercase tracking-wider">Site Traffic</span>
            </div>
            <h2 className="text-3xl font-bold">Total Website Visits</h2>
            <p className="text-blue-200 text-sm mt-1">
              Live updates of guests opening your invitation.
            </p>
          </div>

          {/* Right Side: Big Number */}
          <div className="mt-6 md:mt-0 text-center">
             <div className="flex items-center justify-center gap-2 text-green-400 mb-1">
                <TrendingUp size={20}/> 
                <span className="text-sm font-bold">+ Live</span>
             </div>
             <div className="text-6xl md:text-7xl font-extrabold tracking-tight">
                {visitCount || 0} 
             </div>
          </div>
        </div>
        <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-white opacity-5 rounded-full blur-3xl"></div>
        <div className="absolute top-10 left-10 w-32 h-32 bg-blue-500 opacity-10 rounded-full blur-2xl"></div>
      </div>
    </div>
  )
}

export default Dashboard