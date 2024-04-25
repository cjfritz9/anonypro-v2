'use client';

import { getFavorites } from '@/lib/tools';
import React, { useEffect, useState } from 'react';
import { MdFavoriteBorder } from 'react-icons/md';

const Favorites: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (window) {
      const savedFavs = getFavorites();
      if (savedFavs) {
        setFavorites(savedFavs);
      }
    }
  }, []);

  return (
    <div className="drawer drawer-end">
      <input id="favs-drawer" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        <label
          htmlFor="favs-drawer"
          className={`btn drawer-button fixed right-0 top-0 rounded-sm bg-base-100 sm:top-28 ${isHovered ? 'translate-x-0' : 'translate-x-[72px]'}`}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <MdFavoriteBorder size={24} />
          <p
            className={`'transition-all duration-300 '${isHovered ? 'block opacity-100' : 'hidden translate-x-12 opacity-0'}`}
          >
            Favorites
          </p>
        </label>
      </div>
      <div className="drawer-side">
        <label
          htmlFor="favs-drawer"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <ul className="menu min-h-full w-80 bg-base-200 p-4 text-base-content">
          <h4 className="mb-4 text-xl font-semibold">Your Favorites</h4>
          {favorites.map((fav, i) => (
            <li key={i}>
              <a href={`/user-profile/${fav}`}>@{fav}</a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Favorites;
