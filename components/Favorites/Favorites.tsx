'use client';

import { getFavorites, removeFavorite } from '@/lib/tools';
import React, { useEffect, useState } from 'react';
import { MdClose, MdFavoriteBorder } from 'react-icons/md';

const Favorites: React.FC = () => {
  const [favorites, setFavorites] = useState<string[]>([]);
  const [isHovered, setIsHovered] = useState(false);

  const updateFavorites = () => {
    const savedFavs = getFavorites();

    if (savedFavs) {
      setFavorites(savedFavs);
    }
  };

  const handleRemove = (username: string) => {
    removeFavorite(username);
    setFavorites((prev) => prev.filter((fav) => fav !== username));
  };

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
          onClick={updateFavorites}
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
        <ul className="menu min-h-full w-80 gap-2 overflow-y-auto bg-base-200 p-4 text-base-content">
          <h4 className="mb-4 text-xl font-semibold">Your Favorites</h4>
          {favorites.length > 0 ? (
            favorites.map((fav, i) => (
              <li key={i} className="flex flex-row items-end justify-between">
                <a href={`/user-profile/${fav}`}>@{fav}</a>
                <MdClose
                  size={24}
                  className="h-fit w-fit text-red-500"
                  onClick={() => handleRemove(fav)}
                />
              </li>
            ))
          ) : (
            <p>{"You don't have any favorites yet"}</p>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Favorites;
