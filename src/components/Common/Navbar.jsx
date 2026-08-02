import { useEffect, useState } from "react"
import { AiOutlineMenu, AiOutlineShoppingCart } from "react-icons/ai"
import { BsChevronDown } from "react-icons/bs"
import {
  FaCode,
  FaMobileAlt,
  FaLaptopCode,
  FaArrowRight,
} from "react-icons/fa"
import { useSelector } from "react-redux"
import { Link, matchPath, useLocation } from "react-router-dom"

import logo from "../../assets/Logo/Logo-Full-Light.png"
import { NavbarLinks } from "../../data/navbar-links"
import { apiConnector } from "../../services/apiConnector"
import { categories } from "../../services/apis"
import { ACCOUNT_TYPE } from "../../utils/constants"
import ProfileDropdown from "../core/Auth/ProfileDropdown"

// const subLinks = [
//   {
//     title: "Python",
//     link: "/catalog/python",
//   },
//   {
//     title: "javascript",
//     link: "/catalog/javascript",
//   },
//   {
//     title: "web-development",
//     link: "/catalog/web-development",
//   },
//   {
//     title: "Android Development",
//     link: "/catalog/Android Development",
//   },
// ];

function Navbar() {
  const { token } = useSelector((state) => state.auth)
  const { user } = useSelector((state) => state.profile)
  const { totalItems } = useSelector((state) => state.cart)
  const location = useLocation()

  const [subLinks, setSubLinks] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {(async () => {
      setLoading(true)
      try {
        const res = await apiConnector("GET", categories.CATEGORIES_API)
        setSubLinks(res.data.data)
      } catch (error) {
        console.log("Could not fetch Categories.", error)
      }
      setLoading(false)
    })()
  }, [])

  // console.log("sub links", subLinks)

  const matchRoute = (route) => {
    return matchPath({ path: route }, location.pathname)
  }

  return (
    <div
      className={`flex h-14 items-center justify-center border-b-[1px] border-b-richblack-700 ${
        location.pathname !== "/" ? "bg-richblack-800" : ""
      } transition-all duration-200`}
    >
      <div className="flex w-11/12 max-w-maxContent items-center justify-between">
        {/* Logo */}
        <Link to="/">
          <img src={logo} alt="Logo" width={160} height={32} loading="lazy" />
        </Link>
        {/* Navigation links */}
        <nav className="hidden md:block">
          <ul className="flex gap-x-6 text-richblack-25">
            {NavbarLinks.map((link, index) => (
              <li key={index}>
                {link.title === "Catalog" ? (
                  <>
                    <div
                      className={`group relative flex cursor-pointer items-center gap-1 
                      ${
                        matchRoute("/catalog/:catalogName")
                          ? "text-yellow-25"
                          : "text-richblack-25"
                      }`}
                    >
                      <p>{link.title}</p>
                      <BsChevronDown />
                      <div className="invisible absolute left-1/2 top-full z-[1000] mt-4 w-[380px] -translate-x-1/2 rounded-2xl border border-richblack-700 bg-richblack-800 p-4 opacity-0 shadow-2xl transition-all duration-300 group-hover:visible group-hover:opacity-100">

  {/* Arrow */}
  <div className="absolute left-1/2 top-0 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rotate-45 border-l border-t border-richblack-700 bg-richblack-800"></div>

  {loading ? (
    <p className="py-6 text-center text-richblack-100">
      Loading...
    </p>
  ) : subLinks?.length ? (
    <>
      {subLinks
        ?.filter((subLink) => subLink?.courses?.length > 0)
        ?.map((subLink, index) => (
          <Link
            key={index}
            to={`/catalog/${subLink.name
              .split(" ")
              .join("-")
              .toLowerCase()}`}
            className="group/item flex items-center gap-4 rounded-xl p-4 transition-all duration-200 hover:bg-richblack-700"
          >
            {/* Icon */}
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-richblack-900 text-yellow-50">
              {index % 3 === 0 ? (
                <FaCode size={20} />
              ) : index % 3 === 1 ? (
                <FaMobileAlt size={20} />
              ) : (
                <FaLaptopCode size={20} />
              )}
            </div>

            {/* Text */}
            <div className="flex-1">
              <h3 className="font-semibold text-richblack-5">
                {subLink.name}
              </h3>

              <p className="mt-1 text-xs text-richblack-300">
                {subLink.courses.length} Courses Available
              </p>
            </div>

            <FaArrowRight className="text-richblack-300 transition-all group-hover/item:text-yellow-50" />
          </Link>
        ))}

      
      
    </>
  ) : (
    <p className="py-6 text-center text-richblack-100">
      No Courses Found
    </p>
  )}
</div>
                    </div>
                  </>
                ) : (
                  <Link to={link?.path}>
                    <p
                      className={
                        `${
                        matchRoute(link?.path)
                          ? "text-yellow-25"
                          : "text-richblack-25"
                      }`}
                    >
                      {link.title}
                    </p>
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </nav>
        {/* Login / Signup / Dashboard */}
        <div className="hidden items-center gap-x-4 md:flex">
          {user && user?.accountType !== ACCOUNT_TYPE.INSTRUCTOR && (
            <Link to="/dashboard/cart" className="relative">
              <AiOutlineShoppingCart className="text-2xl text-richblack-100" />
              {
                totalItems > 0 && (
                <span className="absolute -bottom-2 -right-2 grid h-5 w-5 place-items-center overflow-hidden rounded-full bg-richblack-600 text-center text-xs font-bold text-yellow-100">
                  {totalItems}
                </span>
              )}
            </Link>
          )}
          {token === null && (
            <Link to="/login">
              <button className="rounded-[8px] border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100">
                Log in
              </button>
            </Link>
          )}
          {token === null && (
            <Link to="/signup">
              <button className="rounded-[8px] border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100">
                Sign up
              </button>
            </Link>
          )}
          {token !== null && <ProfileDropdown />}
        </div>
        <button className="mr-4 md:hidden">
          <AiOutlineMenu fontSize={24} fill="#AFB2BF" />
        </button>
      </div>
    </div>
  )
}

export default Navbar