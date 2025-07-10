'use client'
import useTitle from '@/hooks/useTitle'
import { useEffect } from 'react'
import { Button } from '@/components/ui/button'
export default function Home() {
  const { title, setTitle } = useTitle()

  useEffect(() => {
    setTitle('Home page')
  }, [setTitle])

  return (
    <div
      className="container flex flex-col items-center
    "
    >
      <h1 className="text-2xl">{title}</h1>
      <Button
        className="cursor-pointer"
        variant={'default'}
        onClick={() => console.log('Button')}
      >
        Button
      </Button>
    </div>
  )
}
