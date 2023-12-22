interface PreviewProps {
  params: {
    slug: string
  }
}

export default function Preview({ params }: PreviewProps) {
  return <h1 className="mt-20">Post: {params.slug}</h1>
}
