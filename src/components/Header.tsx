import { Link } from "react-router-dom";

function Header() {
  return (
    <header className="h-16 bg-red-400 flex">
      <div className="container flex my-auto bg-green-300 content-center justify-between">
        <span className="flex items-center">
          <h1>Hostel Management</h1>
        </span>
        <div className="flex gap-6">
          <Link to="/">
            <button className="header-btn">
              <img
                className="h-7 mr-1"
                src="http://res.cloudinary.com/dtlzdpfiu/image/upload/v1678464174/Hostel%20Management%20Project/UI/Icons/d9dkiufrkmbvmanofd0f.png"
                alt="student-icon"
              />
              <span>Student</span>
            </button>
          </Link>
        </div>
      </div>
    </header>
  );
}

export default Header;
