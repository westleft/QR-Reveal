export async function fetchWebsite(url: string) {
  try {
    const response = await fetch(url, {
      method: 'GET',
    })

    const html = await response.text()
    const titleMatch = html.match(/<title[^>]*>([^<]+)<\/title>/i)
    const descriptionMatch = html.match(/<meta name="description" content="([^"]+)"/i)
    const imageMatch = html.match(/<meta property="og:image" content="([^"]+)"/i)

    return {
      title: titleMatch?.[1]?.trim(),
      description: descriptionMatch?.[1]?.trim(),
      image: imageMatch?.[1]?.trim(),
    }
  } catch (error) {
    console.error('error：', error)
    throw error
  }
}
