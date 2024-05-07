'use client';

import React, { useEffect } from 'react';

const DisplayAd: React.FC = () => {

  return (
    <>
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client="ca-pub-9924000383649266"
        data-ad-slot="7391767564"
        data-ad-format="auto"
        data-full-width-responsive="true"
      ></ins>
      <script>{(window.adsbygoogle = window.adsbygoogle || []).push({})}</script>
    </>
  );
};

export default DisplayAd;
