
import Link from 'next/link'
import React from 'react'

const SidebarContentTypeVideo = async ({sidebarContent}) => {

    const {sidebar_content_video:{video, title, caption, display_credit, credit, credit_link},  sidebar_content_quote, sidebar_content_sidenote, sidebar_content_featured_story, text } = sidebarContent

    const youtubelink = video && video.replace('youtu.be', 'youtube.com/embed');;
      
  

// {
//   sidebar_content_type: 'video',
//   sidebar_content_video: {
//     video: 'https://youtu.be/zBb9hTyLjfM',
//     title: 'Nicholas Brothers in Stormy Weather',
//     caption: 'Fayard and Harold Nicholas were a fantastic set of flash-dancers who performed as the Nicholas Brothers. Born seven years apart, the brothers performed for decades on stage and screen, later teaching dance to Michael and Janet Jackson, among many others. In the performance below from Stormy Weather, many of their trademark moves are on display — jumping down stairs into splits, sliding up from splits without using hands, and gleefully jumping through orchestra stands, while tap-dancing in unison.',
//     display_credit: false,
//     credit: '',
//     credit_link: ''
//   },
//   sidebar_content_image: {
//     image: null,
//     image_orientation: 'fit',
//     title: '',
//     caption: '',
//     display_credit: false,
//     credit: '',
//     credit_link: ''
//   },
//   sidebar_content_quote: { quote: '', quote_author: '', quote_source: '' },
//   sidebar_content_sidenote: { title: '', caption: '' },
//   sidebar_content_featured_story: null,
//   text: ''
// }


  return (
    <div>
      <iframe className='w-full h-full min-h-fit'  src={youtubelink} title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
      
        {display_credit && <Link className='font-thin text-xs hover:underline' href={`credit_link`}> {credit}</Link>}
        <div className='text-2xl py-4'>{title}</div>
        <div className='text-base text-wwr_gray_storm font-light leading-6'>{caption}</div>
    </div>
  )
}

export default SidebarContentTypeVideo