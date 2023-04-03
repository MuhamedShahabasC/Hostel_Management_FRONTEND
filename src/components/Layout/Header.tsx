import { Link } from "react-router-dom";

function Header() {
  return (
    <header className="h-16 bg-white flex shadow-lg">
      <div className="container flex my-auto content-center justify-between gap-1 items-center">
        <span className="flex items-center">
          <h1>Hostel Management</h1>
        </span>
        <div className="flex gap-6">
          <Link to="/">
            <button className="header-btn">
              <img
                className="h-7 mr-1"
                src="https://res.cloudinary.com/dqrnskj2b/image/upload/v1680516698/Hostel%20Management%20Project/UI/icons/d9dkiufrkmbvmanofd0f_poanvw.png"
                alt="student-icon"
              />
              <span className="text-xs lg:text-base lg:block">Student</span>
            </button>
          </Link>
        </div>
      </div>
    </header>
  );
}

export default Header;
