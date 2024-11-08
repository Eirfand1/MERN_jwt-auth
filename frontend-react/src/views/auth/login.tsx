import React, { useContext, useState } from 'react'
import { Card, Input, Button } from 'react-daisyui'
import { Link, useNavigate } from 'react-router-dom'
import api from '../../services/api'
import Cookies from 'js-cookie'
import { AuthContext } from '../../context/AuthContext'

const Login: React.FC = () => {
  const navigate = useNavigate()
  const { setIsAuthenticated } = useContext(AuthContext)
  const [email, setEmail] = useState<string>("")
  const [password, setPassword] = useState<string>("")

  const [validation, setValidation] = useState<{ errors?: { path: string; msg: string }[] }>({})
  const [loginFailed, setLoginFailed] = useState<{ message?: string }>({})
  const [loading, setLoading] = useState<boolean>(false)

  const login = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)

    try {
      const res = await api.post('/api/user/login', { email, password })
      Cookies.set('token', res.data.data.token)
      Cookies.set('user', JSON.stringify(res.data.data.user))

      setIsAuthenticated(true)
      navigate("/admin/dashboard", { replace: true })
    } catch (err: any) {
      setValidation(err.response?.data || {})
      setLoginFailed(err.response?.data || {})
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex justify-center min-h-screen bg-base-200">
      <Card className="w-96 bg-base-100 my-6 h-min shadow-sm rounded-sm">
        <Card.Title className="text-center p-4 border-b">
          <h1 className="text-2xl font-semibold text-primary">Login</h1>
        </Card.Title>

        <Card.Body className="space-y-4">
          {validation.errors && (
            <div className="alert alert-error">
              {validation.errors.map((error, index) => (
                <p key={index}>{error.path} : {error.msg}</p>
              ))}
            </div>
          )}
          {loginFailed.message && (
            <div className="alert alert-error ">
              {loginFailed.message}
            </div>
          )}
          <form onSubmit={login}>
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
              <label className="label">
                <Link to="/forgot-password" className="label-text-alt text-primary hover:underline">
                  Lupa password?
                </Link>
              </label>
            </div>

            <Button type="submit" disabled={loading} className="btn-primary w-full mt-6">
              {loading ? "Loading..." : "Masuk"}
            </Button>
          </form>
          <div className="text-center text-sm">
            Belum punya akun?{' '}
            <Link to="/register" className="text-primary hover:underline">
              Daftar di sini
            </Link>
          </div>
        </Card.Body>
      </Card>
    </div>
  )
}

export default Login

