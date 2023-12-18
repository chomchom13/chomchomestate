import { FaSearch } from "react-icons/fa";
{
  /*fa -> font awesome FaSearch -> an icon from react-icons library*/
}
import { Link } from "react-router-dom";
{
  /* Link is used to navigate to different pages or routes without refreshing the page*/
}
import { useSelector } from "react-redux";

export default function Header() {
  const { currentUser } = useSelector((state) => state.user);
  return (
    <header className="bg-slate-300 shadow-md">
      {/*justify-between -> adds a space between tags( if there are multiple tags )*/}
      {/*items-center -> vertically centers the tags inside div*/}
      <div className="flex justify-between items-center max-w-7xl mx-auto p-3">
        <Link to="/">
          <h1 className="font-bold text-lg sm:text-xl flex flex-wrap">
            {/*span is used when we want to apply style to specific texts inside a block of many texts*/}
            <span className="text-slate-500">ChomChom</span>
            <span className="text-slate-700">Estate</span>
          </h1>
        </Link>
        <form className="bg-slate-200 p-2 rounded-lg flex items-center">
          {/*focus:outline-none -> removes the outline that appears when clicking the input field*/}
          <input
            type="text "
            placeholder="Search..."
            className="bg-transparent focus:outline-none w-24 sm:w-64"
          />
          <FaSearch className="text-slate-500" />
        </form>
        <ul className="flex gap-4">
          {/* hidden sm:inline -> hidden by default but for sm and above -> inline */}
          <Link to="/">
            <li className="hidden sm:inline text-slate-700 hover:underline">
              Home
            </li>
          </Link>
          <Link to="/about">
            <li className="hidden sm:inline text-slate-700 hover:underline">
              About
            </li>
          </Link>
          <Link to="/profile">
            {currentUser ? (
              <img className="rounded-full h-7 w-7 object-cover"
              src={currentUser.avatar} alt="profile" />
            ) : (
              <li className=" text-slate-700 hover:underline">Sign in</li>
            )}
          </Link>
        </ul>
      </div>
    </header>
  );
}
