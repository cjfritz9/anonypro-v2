'use client';

import React, { useContext, useEffect, useState } from 'react';
import { InstagramContext } from '../Context/InstagramProvider';
import { fetchPosts, fetchReels } from '@/utils/requests';

const Pagination: React.FC = () => {
  const { igProfile, mode } = useContext(InstagramContext);

  if (!igProfile) return;

  if (mode === 1) {
    return <PostsPagination />;
  }

  if (mode === 3) {
    return <ReelsPagination />;
  }

  return null;
};

const PostsPagination: React.FC = () => {
  const {
    igProfile,
    posts,
    pagination: { page },
    setPagination,
    setPosts,
  } = useContext(InstagramContext);

  const triggerScroll = () => {
    setPagination((prev) => ({
      ...prev,
      isLoading: true,
    }));
    setTimeout(() => {
      setPagination((prev) => ({
        ...prev,
        isLoading: false,
      }));
    }, 1500);
  };

  const handlePrevPage = () => {
    if (!posts) return;

    setPagination((prev) => ({
      ...prev,
      page: prev.page - 1,
    }));
    triggerScroll();
  };

  const handleNextPage = async () => {
    if (!posts) return;

    if (posts.items.length > page * 6) {
      setPagination((prev) => ({
        ...prev,
        page: prev.page + 1,
      }));
      triggerScroll();
      return;
    }
    const postsCopy = posts;
    setPosts(null);
    setPagination((prev) => ({
      page: prev.page + 1,
      isLoading: true,
    }));
    const response: typeof posts = await fetchPosts(
      igProfile!.id,
      posts.next_max_id
    );

    if (response && response) {
      setPosts({
        ...postsCopy,
        next_max_id: response.next_max_id,
        more_available: response.more_available,
        num_results: response.num_results,
        items: [...postsCopy.items, ...response.items],
      });
    }
    setPagination((prev) => ({
      ...prev,
      isLoading: false,
    }));
  };
  return (
    <div className="join mt-10 w-full justify-center">
      <button
        className={`${page < 2 && 'btn-disabled'} btn btn-accent join-item h-16 min-w-16`}
        onClick={handlePrevPage}
      >
        «
      </button>
      <button className="btn btn-accent join-item h-16  min-w-[240px] cursor-default hover:border-accent hover:bg-accent">
        Page {page}
      </button>
      <button
        className={`${!posts?.more_available && 'btn-disabled'} btn btn-accent join-item h-16 min-w-16`}
        onClick={handleNextPage}
      >
        »
      </button>
    </div>
  );
};

const ReelsPagination: React.FC = () => {
  const {
    igProfile,
    reels,
    pagination: { page },
    setPagination,
    setReels,
  } = useContext(InstagramContext);

  if (!reels) return;

  const triggerScroll = () => {
    setPagination((prev) => ({
      ...prev,
      isLoading: true,
    }));
    setTimeout(() => {
      setPagination((prev) => ({
        ...prev,
        isLoading: false,
      }));
    }, 1500);
  };

  const handlePrevPage = () => {
    setPagination((prev) => ({
      ...prev,
      page: prev.page - 1,
    }));
    triggerScroll();
  };

  const handleNextPage = async () => {
    if (reels.items.length > page * 12) {
      setPagination((prev) => ({
        ...prev,
        page: prev.page + 1,
      }));
      triggerScroll();
      return;
    }
    const reelsCopy = reels;
    setReels(null);
    setPagination((prev) => ({
      page: prev.page + 1,
      isLoading: true,
    }));
    const response: typeof reels = await fetchReels(
      igProfile!.id,
      reels.next_max_id ?? undefined
    );

    if (response && response) {
      setReels({
        ...reelsCopy,
        next_max_id: response.next_max_id,
        more_available: response.more_available,
        items: [...reelsCopy.items, ...response.items],
      });
    }
    setPagination((prev) => ({
      ...prev,
      isLoading: false,
    }));
  };

  return (
    <div className="join mt-10 w-full justify-center">
      <button
        className={`${page < 2 && 'btn-disabled'} btn btn-accent join-item h-16 min-w-16`}
        onClick={handlePrevPage}
      >
        «
      </button>
      <button className="btn btn-accent join-item h-16  min-w-[240px] cursor-default hover:border-accent hover:bg-accent">
        Page {page}
      </button>
      <button
        className={`${!reels.more_available && 'btn-disabled'} btn btn-accent join-item h-16 min-w-16`}
        onClick={handleNextPage}
      >
        »
      </button>
    </div>
  );
};

export default Pagination;
