import { NavLink } from "react-router-dom";

const NotFound = () => {
  return (
    <div
      className="h-dvh w-dvw grid select-none py-10 px-2 sm:p-10 overflow-hidden"
      style={{
        background: `
          radial-gradient(at top left, #5f8a9a, transparent 60%),
          radial-gradient(at top right, #bad5cc, transparent 60%),
          radial-gradient(at bottom left, #4d7484, transparent 60%),
          radial-gradient(at bottom right, #adbeab, transparent 60%)
        `,
        backgroundColor: "#adbeab",
      }}
    >
      {/* Image & 404 */}
      <div className="relative flex justify-center items-center">
        <img
          src="https://res.cloudinary.com/dks6kvoay/image/upload/v1768808800/sadBoy-removebg-preview_ndfx2b.png"
          alt="404 image"
          className="sm:h-[60vh] object-fill drop-shadow-xl z-10"
          draggable="false"
        />
        <h1
          className="absolute text-[11rem] sm:text-[19rem] 2xl:text-[30rem] font-extrabold text-white/50 z-0
                     drop-shadow-lg tracking-wider"
        >
          404
        </h1>
      </div>

      {/* Message & Button */}
      <div className="flex flex-col gap-4 items-center justify-center">
        <div>
          <h1 className="text-4xl 2xl:text-6xl font-bold text-white drop-shadow-lg text-center">
            Oh No!
          </h1>
          <p className="2xl:text-xl text-white/80 drop-shadow-md text-center">
            The page you are looking for does not exist or has been moved.
          </p>
        </div>
        <NavLink
          to={"/"}
          className=" cursor-pointer
                      px-6 py-1
                      2xl:px-10 2xl:py-2
                      md:text-xl 2xl:text-2xl
                      rounded-xl 2xl:rounded-2xl
                      bg-white/20
                      backdrop-blur-md
                      border border-white/30
                      text-white
                      shadow-lg
                      hover:bg-white/30
                      hover:scale-105
                      transition-all
                      duration-300"
        >
          Go Home
        </NavLink>
      </div>
    </div>
  );
};

export default NotFound;
