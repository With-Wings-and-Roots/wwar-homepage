import { fetchMediaFromId } from '@/utilities/media'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const SidebarContentTypeImage = async ({sidebarContent}) => {

    const {sidebar_content_image:{image, title, caption, display_credit, credit, credit_link},  sidebar_content_quote, sidebar_content_sidenote, sidebar_content_featured_story, text } = sidebarContent

    const media = await fetchMediaFromId(image) || null



    const mediaUrl = media.source_url 

// {
//   sidebar_content_type: 'image',
//   sidebar_content_video: {
//     video: null,
//     title: '',
//     caption: '',
//     display_credit: false,
//     credit: '',
//     credit_link: ''
//   },
//   sidebar_content_image: {
//     image: 1323,
//     image_orientation: 'landscape',
//     title: 'New Amsterdam',
//     caption: 'A map, drawn in 1916, depicts the Castello Plan of New Amsterdam in 1660.',
//     display_credit: true,
//     credit: 'New York Historical Society Library',
//     credit_link: 'http://www.nyhistory.org/library'
//   },
//   sidebar_content_quote: { quote: '', quote_author: '', quote_source: '' },
//   sidebar_content_sidenote: { title: '', caption: '' },
//   sidebar_content_featured_story: null,
//   text: ''
// }

  return (
    <div>
        <Image className={`w-50 h-50 mb-1`} src={mediaUrl} height={1000} width={1000} alt={title}/>
        {display_credit && <Link className='font-thin text-xs hover:underline' href={`credit_link`}> {credit}</Link>}
        <div className='text-2xl py-4'>{title}</div>
        <div className='text-base text-wwr_gray_storm font-light leading-6'>{caption}</div>
    </div>
  )
}

export default SidebarContentTypeImage