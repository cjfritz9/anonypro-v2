'use client'

import Image from 'next/image'
import React from 'react'
import storiesIcon from '@/public/assets/stories-icon.svg'
import postsIcon from '@/public/assets/posts-icon.svg'
import highlightsIcon from '@/public/assets/highlights-icon.svg'
import ppIcon from '@/public/assets/pp-icon.svg'

const buttonIcons = [storiesIcon, postsIcon, highlightsIcon, ppIcon]

interface Props {
  displayNames: string[]
}

const ServiceSelector: React.FC<Props> = ({ displayNames }) => {
  const buttonsData = buttonIcons.map((icon, i) => ({
    displayName: displayNames[i],
    icon,
  }))
  return (
    <div className="join join-vertical w-full max-w-[668px] lg:join-horizontal">
      {buttonsData.map((data) => (
        <button
          key={data.displayName}
          className="btn join-item h-[72px] w-full bg-base-100 font-normal text-primary lg:w-[25%]"
        >
          <Image src={data.icon} alt="Instagram Stories Icon" />
          {data.displayName}
        </button>
      ))}
    </div>
  )
}

export default ServiceSelector
