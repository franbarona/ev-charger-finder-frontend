import { LuCode, LuHeart, LuMapPin } from "react-icons/lu";
import { Link } from "react-router-dom";
import Logo from "../ui/Logo";

export default function AboutSection() {
  return (
    <div className="max-w-4xl mx-auto px-2 lg:px-8 space-y-10">
      {/* Header */}
      <div className="flex flex-col items-center justify-center lg:mt-10 space-y-2">
        <Logo size="big" />
        <p className="text-gray-600">EV Charging Station Finder</p>
      </div>

      {/* Overview Section */}
      <div>
        <h2 className="text-2xl font-semibold text-gray-700 mb-3 flex items-center border-b-1 border-zinc-300 pb-1">
          <LuMapPin className="text-lg text-emerald-700 mr-2 mt-1 flex-shrink-0" />
          Overview
        </h2>
        <p className="text-gray-700 leading-relaxed pl-4">
          This application allows users to search for electric vehicle charging
          stations on an interactive map and display detailed information about
          each station, including location, availability, and charging
          specifications.
        </p>
      </div>

      {/* Personal Project Notice */}
      <div className="bg-gradient-to-r from-emerald-50 to-green-50 border-l-4 border-emerald-700 rounded p-4">
        <h3 className="flex items-center text-lg font-semibold  mb-2 text-emerald-800">
          <LuHeart className="text-emerald-700 mr-2 mt-1 flex-shrink-0" />
          Important
        </h3>
        <p className="text-gray-700 pl-2">
          This is a personal project created for educational purposes and is
          non-commercial.
        </p>
      </div>

      {/* Third-Party APIs */}
      <div>
        <h2 className="text-2xl font-semibold text-gray-700 mb-3 flex items-start border-b-1 border-zinc-300 pb-1">
          Third-Party Services
        </h2>
        <p className="text-gray-700 pl-2 mb-4">
          This application uses the following external APIs and services:
        </p>

        <div className="space-y-4 pl-4">
          <div className="bg-white rounded border-l-4 border-gray-800 pl-4 py-2">
            <h3 className="font-semibold text-gray-800 mb-1">
              <Link
                to="https://openchargemap.org/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline"
              >
                Open Charge Map
              </Link>
            </h3>

            <p className="text-gray-600 text-sm mt-1">
              Provides comprehensive charging station data and information
            </p>
          </div>

          <div className="bg-white rounded border-l-4 border-gray-800 pl-4 py-2">
            <h3 className="font-semibold text-gray-800 mb-1">
              <Link
                to="https://www.geoapify.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline"
              >
                Leaflet & Geoapify
              </Link>
            </h3>
            <p className="text-gray-600 text-sm">
              Powers the interactive map interface and geolocation features
            </p>
          </div>
        </div>
      </div>

      {/* Technologies Used */}
      <div>
        <h2 className="text-2xl font-semibold text-gray-700 mb-3 flex items-center border-b-1 border-zinc-300 pb-1">
          <LuCode className="text-lg text-emerald-700 mr-2 mt-1 flex-shrink-0" />
          Technologies Used
        </h2>
        <ul className="px-4">
          <li>
            <strong className="text-gray-700">React · </strong> UI Framework
          </li>
          <li>
            <strong className="text-gray-700">Tailwind CSS · </strong> Styling
          </li>
          <li>
            <strong className="text-gray-700">Framer Motion · </strong>{" "}
            Animations
          </li>
        </ul>
      </div>

      {/* Footer */}
      <div className="text-center mt-12 pb-8">
        <p className="text-gray-500 text-sm">
          See other projects like this in{" "}
          <Link
            to="https://www.franbarona.dev/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline font-semibold text-emerald-700"
          >
            franbarona.dev
          </Link>
        </p>
      </div>
    </div>
  );
}
