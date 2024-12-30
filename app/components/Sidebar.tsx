"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { FiMenu } from "react-icons/fi";
import { MdDashboard } from "react-icons/md";
import { FaLinkedin, FaGithub } from "react-icons/fa";

const SideBar: React.FC = () => {
  const [isSecondColumnOpen, setIsSecondColumnOpen] = useState(false);
  const router = useRouter();

  const navigateToTasks = () => {
    router.push("/tasks");
  };

  const toggleSecondColumn = () => {
    setIsSecondColumnOpen((prev) => !prev);
  };

  return (
    <div className="flex">
      <div className="relative z-50 flex h-screen w-16 flex-col justify-between border-e bg-white">
        <div>
          <div
            className="inline-flex size-16 items-center justify-center cursor-pointer"
            onClick={toggleSecondColumn}
          >
            <span className="grid size-10 place-content-center rounded-lg bg-gray-100 text-xs text-gray-600">
              <FiMenu className="w-5 h-5 text-gray-600" />
            </span>
          </div>

          <div className="border-t border-gray-100">
            <div className="px-2">
              <div className="py-4">
                <button
                  onClick={navigateToTasks}
                  className="t group relative flex justify-center items-center rounded bg-blue-50 px-2 py-1.5 text-blue-700 transition hover:bg-blue-100"
                >
                  <MdDashboard className="w-6 h-6" />
                  <span className="invisible absolute start-full top-1/2 ms-4 -translate-y-1/2 rounded bg-gray-900 px-2 py-1.5 text-xs font-medium text-white group-hover:visible">
                    Task Board
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="sticky inset-x-0 bottom-0 border-t border-gray-100 bg-white p-2">
          <form action="#">
            <button
              type="submit"
              className="group relative flex w-full justify-center rounded-lg px-2 py-1.5 text-sm text-gray-500 hover:bg-gray-50 hover:text-gray-700"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="size-5 opacity-75"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                />
              </svg>
            </button>
          </form>
        </div>
      </div>
      <div
        className={`absolute top-0 left-16 h-full w-64 bg-gray-50 shadow-lg transition-transform duration-300 ease-in-out ${
          isSecondColumnOpen
            ? "translate-x-0 opacity-100"
            : "-translate-x-full opacity-0"
        }`}
        style={{
          zIndex: 40,
        }}
      >
        <div className="px-4 py-6">
          <ul className="mt-14 space-y-1">
            <li>
              <button
                onClick={navigateToTasks}
                className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500"
              >
                <span className="text-sm font-medium"> Task Board </span>
              </button>
            </li>
            <li>
              <details className="group [&_summary::-webkit-details-marker]:hidden">
                <summary className="flex cursor-pointer items-center justify-between rounded-lg px-4 py-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700">
                  <span className="text-sm font-medium"> Teams </span>
                  <span className="shrink-0 transition duration-300 group-open:-rotate-180">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="size-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </span>
                </summary>
                <ul className="mt-2 space-y-1 px-4">
                  <li>
                    <a
                      href="https://www.linkedin.com/in/alejo-saez-gebicki/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700 flex items-center gap-2"
                    >
                      <FaLinkedin className="text-gray-500" />
                      LinkedIn
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://github.com/alejosaez"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700 flex items-center gap-2"
                    >
                      <FaGithub className="text-gray-500" />
                      GitHub
                    </a>
                  </li>
                </ul>
              </details>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
