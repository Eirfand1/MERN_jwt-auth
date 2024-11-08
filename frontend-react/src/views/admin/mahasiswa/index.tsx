import SidebarMenu from '../../../components/SidebarMenu'
import { Link } from 'react-router-dom'
import React, { useState, useEffect } from 'react'
import Cookies from 'js-cookie'
import Api from '../../../services/api'
import { MahasiswaInterface } from '../../../utils/Type'
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  flexRender,
  createColumnHelper,
  type SortingState,
} from '@tanstack/react-table'
import { Search, Edit, Trash2 } from 'lucide-react'


const MahasiswaIndex: React.FC = () => {
  const [mahasiswa, setMahasiswa] = useState<MahasiswaInterface[]>([])
  const [sorting, setSorting] = useState<SortingState>([])
  const [globalFilter, setGlobalFilter] = useState('')

  const handleDelete = async (id: number) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus data ini?')) {
      const token = Cookies.get('token')
      Api.defaults.headers.common['Authorization'] = token
      
      try {
        await Api.delete(`/api/mahasiswa/${id}`)
        fetchDataMahasiswa()
      } catch (error) {
        console.error("Error ketika menghapus data mahasiswa", error)
      }
    }
  }

  const columnHelper = createColumnHelper<MahasiswaInterface>()
  
  const columns = [
    columnHelper.accessor('id', {
      cell: (info) => info.row.index + 1,
      header: 'No'
    }),
    columnHelper.accessor('name', {
      cell: info => info.getValue(),
      header: 'Nama'
    }),
    columnHelper.accessor('nim', {
      cell: info => info.getValue(),
      header: 'NIM'
    }),
    columnHelper.accessor('jurusan', {
      cell: info => info.getValue(),
      header: 'Jurusan'
    }),
    columnHelper.accessor('angkatan', {
      cell: info => info.getValue(),
      header: 'Angkatan'
    }),
    columnHelper.accessor('_id', {
      id: 'actions',
      cell: (info) => (
        <div className="flex gap-2">
          <Link
            to={`/admin/mahasiswa/edit/${info.getValue()}`}
            className="btn btn-warning btn-sm rounded-sm text-gray-800"
          >
            <Edit size={14} />
          </Link>
          <button
            onClick={() => handleDelete(info.getValue())}
            className="btn btn-error rounded-sm btn-sm text-gray-100"
          >
            <Trash2 size={14} />
          </button>
        </div>
      ),
      header: 'Aksi'
    })
  ]

  const table = useReactTable({
    data: mahasiswa,
    columns,
    state: {
      sorting,
      globalFilter,
    },
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    initialState: {
      pagination: {
        pageSize: 10,
      },
    },
  })

  const fetchDataMahasiswa = async () => {
    const token = Cookies.get('token')
    Api.defaults.headers.common['Authorization'] = token
    
    if (token) {
      try {
        const response = await Api.get('/api/mahasiswa')
        setMahasiswa(response.data.data)
      } catch (error) {
        console.error("Error ketika mengambil data mahasiswa", error)
      }
    } else {
      console.error("Token tidak tersedia, silahkan login")
    }
  }

  useEffect(() => {
    fetchDataMahasiswa()
  }, [])

  return (
    <div className="mx-auto p-8 bg-gray-100 min-h-screen">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
        <div className="md:col-span-3 ">
          <SidebarMenu />
        </div>
        <div className="md:col-span-9">
          <div className="card bg-base-100 shadow-sm rounded-sm border">
            <div className="card-body">
              <div className="flex justify-between items-center bg-primary text-primary-content p-4 -mx-6 -mt-6">
                <h2 className="card-title m-0">Mahasiswa</h2>
                <Link 
                  to="/admin/mahasiswa/create" 
                  className="btn rounded-sm text-gray-100 btn-success btn-sm"
                >
                  ADD MAHASISWA
                </Link>
              </div>

              <div className="mt-4 relative">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    value={globalFilter ?? ''}
                    onChange={e => setGlobalFilter(e.target.value)}
                    className="pl-10 p-2 border rounded w-full"
                    placeholder="Search Mahasiswa"
                  />
                </div>
              </div>

              <div className="mt-4 overflow-x-auto">
                <table className="table w-full border">
                  <thead>
                    {table.getHeaderGroups().map(headerGroup => (
                      <tr key={headerGroup.id} className='bg-base-200 text-gray-800'>
                        {headerGroup.headers.map(header => (
                          <th 
                            key={header.id}
                            className="cursor-pointer"
                            onClick={header.column.getToggleSortingHandler()}
                          >
                            {flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                            {{
                              asc: ' 🔼',
                              desc: ' 🔽',
                            }[header.column.getIsSorted() as string] ?? null}
                          </th>
                        ))}
                      </tr>
                    ))}
                  </thead>
                  <tbody>
                    {table.getRowModel().rows.length > 0 ? (
                      table.getRowModel().rows.map(row => (
                        <tr key={row.id} className="hover:bg-base-200">
                          {row.getVisibleCells().map(cell => (
                            <td key={cell.id}>
                              {flexRender(
                                cell.column.columnDef.cell,
                                cell.getContext()
                              )}
                            </td>
                          ))}
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={columns.length} className="text-center p-4">
                          Data tidak tersedia
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>

                <div className="flex items-center justify-between mt-4">
                  <div className="flex items-center gap-2">
                    <button
                      className="btn btn-sm rounded-sm"
                      onClick={() => table.setPageIndex(0)}
                      disabled={!table.getCanPreviousPage()}
                    >
                      {'<<'}
                    </button>
                    <button
                      className="btn btn-sm rounded-sm"
                      onClick={() => table.previousPage()}
                      disabled={!table.getCanPreviousPage()}
                    >
                      {'<'}
                    </button>
                    <button
                      className="btn btn-sm rounded-sm"
                      onClick={() => table.nextPage()}
                      disabled={!table.getCanNextPage()}
                    >
                      {'>'}
                    </button>
                    <button
                      className="btn btn-sm rounded-sm"
                      onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                      disabled={!table.getCanNextPage()}
                    >
                      {'>>'}
                    </button>
                  </div>
                  <span className="flex items-center gap-1">
                    <div>Page</div>
                    <strong>
                      {table.getState().pagination.pageIndex + 1} of{' '}
                      {table.getPageCount()}
                    </strong>
                  </span>
                  <select
                    value={table.getState().pagination.pageSize}
                    onChange={e => {
                      table.setPageSize(Number(e.target.value))
                    }}
                    className="select select-bordered select-sm rounded-sm"
                  >
                    {[10, 20, 30, 40, 50].map(pageSize => (
                      <option key={pageSize} value={pageSize}>
                        Show {pageSize}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MahasiswaIndex
