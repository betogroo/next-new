'use client'
import useTitle from '@/hooks/useTitle'
import { useEffect } from 'react'
export default function Home() {
  const { title, setTitle } = useTitle()

  useEffect(() => {
    setTitle('Home page')
  }, [setTitle])

  return <h1 className="text-2xl">{title}</h1>
}
