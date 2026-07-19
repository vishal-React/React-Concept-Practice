import { NavLink } from "react-router-dom";
const ErrorPage = () => {
  return (
    <div
      className="h-dvh w-dvw grid select-none py-10 px-2 sm:p-10 overflow-hidden"
      style={{
        background: `
          radial-gradient(at top left, #e7918a, transparent 90%),
          radial-gradient(at top right, #f7be93, transparent 90%),
          radial-gradient(at bottom left, #e7918a, transparent 60%),
          radial-gradient(at bottom right, #f7be93, transparent 60%)
        `,
        backgroundColor: "#f7be93",
      }}
    >
      {/* Image */}
      <div className="flex justify-center items-center">
        <img
          src="https://res.cloudinary.com/dks6kvoay/image/upload/v1773245481/t3_grcsyx.png"
          alt="Error image"
          className="sm:h-[65vh] object-fill drop-shadow-xl z-10"
          draggable="false"
        />
      </div>

      {/* Message & Button */}
      <div className="flex flex-col gap-4 items-center justify-center">
        <div className="grid gap-2">
          <h1 className="text-4xl 2xl:text-6xl font-bold text-white drop-shadow-lg text-center">
            Oh no! Something went wrong
          </h1>
          <p className="2xl:text-xl text-white/80 drop-shadow-md text-center">
            An unexpected error occurred. You can refresh the page or go back
            home.
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

export default ErrorPage;
