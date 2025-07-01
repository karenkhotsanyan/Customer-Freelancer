"use client";

import { usePathname, useRouter } from "next/navigation";
import "bootstrap/dist/css/bootstrap.min.css";

import styles from "../styles/layout.module.css";
import { useProfileQuery } from "@/lib/features/authRTK/rtkQuery";
import { UserRole } from "@/type/type";
import Cookies from "js-cookie";
import { Container, Navbar, NavDropdown, NavLink, Nav as Navs } from "react-bootstrap";
import { useEffect } from "react";

export const Nav = () => {
  const pathname = usePathname();
  const router = useRouter();
  const { data: user, isLoading, isError } = useProfileQuery();



  const logout = () => {
    Cookies.remove("token");
    window.location.href = "/login";
  };
  if (!user) return null;

  return (
    <>
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container>
          <Navbar.Brand href="/">Web</Navbar.Brand>
          <Navbar.Toggle aria-controls="main-navbar" />
          <Navbar.Collapse id="main-navbar">
            <Navs
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >

            <li className="nav-item"><NavLink className="nav-link" active={pathname === "/"} href="/">
              Dashboard
            </NavLink>
            </li>

            {user?.role === UserRole.ADMIN && (
              <>
                <li className="nav-item"><NavLink className="nav-link" active={pathname === "/add-skill"} href="/add-skill">
                  Add Skill
                </NavLink>
                </li>
                <li className="nav-item"><NavLink className="nav-link" active={pathname === "/skills"} href="/skills">
                  Skills
                </NavLink>
                </li>
                <li className="nav-item"><NavLink className="nav-link" active={pathname === "/jobs"} href="/jobs">
                  Jobs
                </NavLink>
                </li>
                <li className="nav-item"><NavLink className="nav-link" active={pathname === "/users"} href="/users">
                  Users
                </NavLink>
                </li>
              </>
            )}

            {user?.role === UserRole.CUSTOMER && (
              <>
                <li className="nav-item"><NavLink className="nav-link" active={pathname === "/freelancer"} href="/freelancers">
                  Freelancers
                </NavLink>
                </li>
                <li className="nav-item"><NavLink className="nav-link" active={pathname === "/add-job"} href="/add-job">
                  Add Job
                </NavLink>
                </li>
                <li className="nav-item"><NavLink className="nav-link" active={pathname === "/add-skill"} href="/add-skill">
                  Add Skill
                </NavLink>
                </li>
                     <li className="nav-item"><NavLink className="nav-link" active={pathname === "/jobs/customer"} href="/jobs/customer">
                  CustomerJob
                </NavLink>
                </li>
                <li className="nav-item"><NavLink className="nav-link" active={pathname === "/jobs"} href="/jobs">
                  Jobs
                </NavLink>
                </li>
              </>
            )}

            {user?.role === UserRole.FREELANCER && (
        <div>
                <li className="nav-item"><NavLink className="nav-link" active={pathname === "/jobs"} href="/jobs">
                Jobs
              </NavLink>
              </li>
               <li className="nav-item"><NavLink className="nav-link" active={pathname === "/jobs/freelancer/see"} href="/jobs/freelancer/see">
                FreelancerJob
              </NavLink>
              </li>
        </div>
            )}

            <li className="nav-item"><NavLink className="nav-link" active={pathname === "/settings"} href="/settings">
              Settings
            </NavLink>
            </li>

            <button onClick={logout} className="btn btn-outline-danger">
              Log out
            </button>
          </Navs>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};
