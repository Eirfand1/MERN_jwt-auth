import React, { FormEventHandler } from 'react'
import SidebarMenu from '../../../components/SidebarMenu'
import { useState, useEffect } from 'react'
import Cookies from 'js-cookie'
import Api from '../../../services/api'
import { Link, useNavigate, useParams } from 'react-router-dom'

const token = Cookies.get('token')

const MahasiswaCreate: React.FC = () => {
  const navigate = useNavigate()
  const [name, setName] = useState<string>('')
  const [jurusan, setJurusan] = useState<string>('')
  const [angkatan, setAngkatan] = useState<number>()
  const [nim, setNim] = useState<number>()
  const {id} = useParams()

  const [validation, setValidation] = useState<any>([])

  const fetchDetailUser = async () => {

    //fetch data
    await Api.get(`/api/mahasiswa/${id}`)
      .then(response => {

        setName(response.data.data.name)
        setJurusan(response.data.data.jurusan)
        setAngkatan(response.data.data.angkatan)
        setNim(response.data.data.nim)
      })
  }

  useEffect(() => {

    fetchDetailUser();

  }, []);

  const updateMahasiswa: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault()
    try {
      Api.defaults.headers.common['Authorization'] = token
      await Api.put(`/api/mahasiswa/${id}`, {
        name: name,
        nim: nim,
        jurusan: jurusan,
        angkatan: angkatan
      })
      navigate('/admin/mahasiswa')
    } catch (err: any) {
      console.error('Error:', err)
      setValidation(err.response?.data || err)
    }
  }

  return (
    <div className="mx-auto p-8 bg-gray-100 min-h-screen">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
        <div className="md:col-span-3">
          <SidebarMenu />
        </div>
        <div className="md:col-span-9">
          <div className="card bg-base-100 rounded-sm shadow-xl">
            <div className="card-body">
              <h2 className="card-title bg-primary text-primary-content p-4 -mx-6 -mt-6">
                ADD Mahasiswa
              </h2>
              {
                validation.errors && (
                  <div role='alert' className="alert alert-error mt-2 pb-0">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 shrink-0 stroke-current"
                      fill="none"
                      viewBox="0 0 24 24">
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {
                      validation.errors.map((error, index) => (
                        <p key={index}>{error.path} : {error.msg}</p>
                      ))
                    }
                  </div>
                )
              }
              <div>
                <form className='grid gap-3' onSubmit={updateMahasiswa}>
                  <label className="input input-sm input-bordered flex items-center gap-2">
                    Name
                    <input
                      type="text"
                      className="grow"
                      placeholder="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required />
                  </label>
                  <label className="input input-sm input-bordered flex items-center gap-2">
                    Nim
                    <input
                      type="number"
                      className="grow"
                      placeholder="name"
                      value={nim}
                      onChange={(e) => setNim(parseInt(e.target.value))}
                      required />
                  </label>
                  <select className="select select-sm select-bordered w-full max-w-xs" onChange={(e) => setJurusan(e.target.value)} value={jurusan}>
                    <option hidden selected>Pilih Jurusan</option>
                    <option value={`Teknik Informatika`}>Teknik Informatika</option>
                    <option value={`Teknik Mesin`}>Teknik Mesin</option>
                    <option value={`Teknik Listrik`}>Teknik Listrik</option>
                    <option value={`Teknik Agroindustri`}>Teknik Agroindustri</option>
                  </select>
                  <label className="input input-sm input-bordered flex items-center gap-2">
                    angkatan
                    <input
                      type="number"
                      minLength={1900}
                      maxLength={2099}
                      step='1'
                      className="grow"
                      placeholder="angkatan"
                      value={angkatan}
                      onChange={(e) => setAngkatan(parseInt(e.target.value))}
                      required />
                  </label>
                  <div className='flex justify-between'>

                    <Link to='/admin/mahasiswa' className='btn btn-sm rounded-sm text-gray-900 btn-warning'>KEMBALI</Link>
                    <button className='btn rounded-sm btn-sm btn-success text-gray-200'>
                      UPDATE DATA MAHASISWA
                    </button>
                  </div>

                </form>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MahasiswaCreate
