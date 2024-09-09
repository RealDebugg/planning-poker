import NextHead from 'next/head'
import * as React from 'react'

import { defaultMeta, isClient } from '@/lib/constants'

export const Meta = (props) => {

  const resolvedMetadata = React.useMemo(() => {
    const data = {
      title: props.title ?? defaultMeta.title,
      description: props.description ?? defaultMeta.description,
      canonical: props.cannonical ?? (isClient ? window.location.href : ''),
      noIndex: props.noIndex,
      noFollow: props.noFollow
    }

    if (isClient && !data.canonical.startsWith('http')) {
      throw new Error('canonical must be an absolute URL.')
    }

    return data
  }, [
    props.cannonical,
    props.description,
    props.noFollow,
    props.noIndex,
    props.title
  ])

  return (
    <>
      <NextHead>
        <meta charSet="utf-8" />
        <meta
          name="viewport"
          key="viewport"
          content="width=device-width, height=device-height, initial-scale=1, shrink-to-fit=no"
        />
        <link rel="icon" type="image/x-icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />

        {resolvedMetadata.noIndex && <meta name="robots" content="noindex" />}
        {resolvedMetadata.noFollow && <meta name="robots" content="nofollow" />}

        <title>{resolvedMetadata.title}</title>
        <meta name="description" content={resolvedMetadata.description} />
        <meta name="twitter:title" content={resolvedMetadata.title} />
        <meta
          name="twitter:description"
          content={resolvedMetadata.description}
        />
        <meta property="og:title" content={resolvedMetadata.title} />
        <meta
          property="og:description"
          content={resolvedMetadata.description}
        />
        <meta property="og:url" content={resolvedMetadata.canonical} />
        <link rel="canonical" href={resolvedMetadata.canonical} />
      </NextHead>
    </>
  )
}
