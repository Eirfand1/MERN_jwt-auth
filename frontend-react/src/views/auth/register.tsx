import React, { useState } from 'react'
import { Card, Input } from 'react-daisyui'
import { Link, useNavigate } from 'react-router-dom'
import api from '../../services/api'

interface ValidationErrors {
  errors?: {
    name?: string[]
    email?: string[]
    password?: string[]
  }
}

const Register: React.FC = () => {
  const [name, setName] = useState<string>("")
  const [email, setEmail] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [loading, setLoading] = useState<boolean>(false)
  const navigate = useNavigate()
  const [validation, setValidation] = useState<ValidationErrors>({})

  const register = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)

    try {
      await api.post('/api/user/register', {
        name,
        email,
        password
      })
      navigate("/login")
    } catch (error: any) {
      setValidation(error.response.data)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-base-200">
      <Card className="w-96 bg-base-100 shadow-sm rounded-sm">
        <Card.Title className="text-center p-4 border-b">
          <h1 className="text-2xl font-semibold text-primary">Register</h1>
        </Card.Title>
        <Card.Body className="space-y-4">
          {validation.errors && (
            <div role="alert" className="alert alert-error">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 shrink-0 stroke-current"
                fill="none"
                viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>
                {validation.errors.name?.[0] ||
                  validation.errors.email?.[0] ||
                  validation.errors.password?.[0] ||
                  'Terjadi kesalahan'}
              </span>
            </div>
          )}

          <form onSubmit={register} className="space-y-4">
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Username</span>
              </label>
              <Input
                type="text"
                placeholder="Masukkan username"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="input-bordered w-full"
              />
              {validation.errors?.name && (
                <label className="label">
                  <span className="label-text-alt text-error">{validation.errors.name[0]}</span>
                </label>
              )}
            </div>

            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <Input
                type="email"
                placeholder="Masukkan email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input-bordered w-full"
              />
              {validation.errors?.email && (
                <label className="label">
                  <span className="label-text-alt text-error">{validation.errors.email[0]}</span>
                </label>
              )}
            </div>

            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <Input
                type="password"
                placeholder="Masukkan password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input-bordered w-full"
              />
              {validation.errors?.password && (
                <label className="label">
                  <span className="label-text-alt text-error">{validation.errors.password[0]}</span>
                </label>
              )}
            </div>

            <button
              type="submit"
              className={`btn btn-primary w-full ${loading ? 'loading' : ''}`}
              disabled={loading}
            >
              {loading ? 'Mendaftar...' : 'Daftar'}
            </button>

            <div className="text-center text-sm mt-4">
              Sudah punya akun?{' '}
              <Link to="/login" className="text-primary hover:underline">
                Login di sini
              </Link>
            </div>
          </form>
        </Card.Body>
      </Card>
    </div>
  )
}

export default Register
