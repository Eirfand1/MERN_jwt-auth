import { Link } from 'react-router-dom'
import { Artboard } from 'react-daisyui'

const Home = () => {
  return (
    <div className="min-h-screen bg-base-200 flex  justify-center p-4">
      <Artboard className="bg-base-100 shadow-xl h-96 rounded-sm p-8 max-w-xl w-full">
        <div className="text-center space-y-2">
          <div className="space-y-2">
            <h1 className="text-4xl font-bold text-primary">SiAKAD</h1>
            <p className="text-base-content/70 text-lg">
              Sistem Informasi Akademik
            </p>
          </div>

          <div className="divider"></div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/register"
              className="btn bg-green-700 text-white btn-lg">
              Daftar Sekarang
            </Link>
            <Link
              to="/login"
              className="btn bg-blue-600 text-white btn-lg">
              Masuk
            </Link>
          </div>

          <p className="text-sm text-base-content/60 mt-6">
            Selamat datang di portal akademik kami
          </p>
        </div>
      </Artboard>
    </div>
  )
}

export default Home
