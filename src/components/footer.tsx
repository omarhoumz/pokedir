import * as React from 'react'

export default function Footer() {
  return (
    <footer className="p-4 w-full max-w-4xl mx-auto" id="footer">
      By{' '}
      <a
        className="text-blue-600 border-b-2 dark:text-blue-500 border-current hover:text-blue-800 dark:hover:text-blue-700"
        href="https://github.com/omarhoumz"
        target="_blank"
      >
        Omar Houmz
      </a>
    </footer>
  )
}
