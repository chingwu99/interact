import Link from 'next/link'

export const dynamic = 'force-dynamic'

const NotFound = () => (
  <div className="flex flex-col items-center justify-center h-screen px-4">
    <div className="text-center">
      <h1 className="text-6xl font-bold text-neutral-300 mb-4">Oops!</h1>
      <div className="w-16 h-1 bg-[#906B7F] mx-auto mb-6 rounded-full" />
      <p className="text-neutral-400 mb-8 max-w-md">
        Sorry, the page you are trying to access does not exist or has been removed.
      </p>
      <Link
        href="/"
        className="px-6 py-3 bg-[#906B7F] text-white rounded-full hover:bg-opacity-80 transition-colors duration-300 inline-flex items-center"
      >
        Back to Home
      </Link>
    </div>
  </div>
)

export default NotFound
