import { useLoaderData, useSearchParams, useNavigate } from 'react-router-dom'

export default function App() {
  const { provinces, regencies, districts } = useLoaderData()
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()

  const selectedProvinceId = searchParams.get('province')
    ? Number(searchParams.get('province'))
    : ''
  const selectedRegencyId = searchParams.get('regency')
    ? Number(searchParams.get('regency'))
    : ''
  const selectedDistrictId = searchParams.get('district')
    ? Number(searchParams.get('district'))
    : ''

  const filteredRegencies = selectedProvinceId
    ? regencies.filter((r) => r.province_id === selectedProvinceId)
    : []

  const filteredDistricts = selectedRegencyId
    ? districts.filter((d) => d.regency_id === selectedRegencyId)
    : []

  const selectedProvince = provinces.find((p) => p.id === selectedProvinceId)
  const selectedRegency = regencies.find((r) => r.id === selectedRegencyId)
  const selectedDistrict = districts.find((d) => d.id === selectedDistrictId)

  function handleProvinceChange(e) {
    const val = e.target.value
    const params = new URLSearchParams()
    if (val) params.set('province', val)
    navigate(`/?${params.toString()}`, { replace: true })
  }

  function handleRegencyChange(e) {
    const val = e.target.value
    const params = new URLSearchParams()
    if (selectedProvinceId) params.set('province', selectedProvinceId)
    if (val) params.set('regency', val)
    navigate(`/?${params.toString()}`, { replace: true })
  }

  function handleDistrictChange(e) {
    const val = e.target.value
    const params = new URLSearchParams()
    if (selectedProvinceId) params.set('province', selectedProvinceId)
    if (selectedRegencyId) params.set('regency', selectedRegencyId)
    if (val) params.set('district', val)
    navigate(`/?${params.toString()}`, { replace: true })
  }

  function handleReset() {
    navigate('/', { replace: true })
  }

  const breadcrumbItems = [
    { label: 'Indonesia', active: false },
    selectedProvince
      ? { label: selectedProvince.name, active: !selectedRegency && !selectedDistrict }
      : null,
    selectedRegency
      ? { label: selectedRegency.name, active: !selectedDistrict }
      : null,
    selectedDistrict
      ? { label: selectedDistrict.name, active: true }
      : null,
  ].filter(Boolean)

  return (
    <div className="flex min-h-screen bg-white font-sans">
      {/* Sidebar */}
      <aside className="w-72 min-h-screen border-r border-gray-200 bg-gray-50 flex flex-col px-6 py-8 shrink-0">

        {/* Logo / Title */}
        <div className="flex items-center gap-3 mb-8">
          <div className="w-9 h-9 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
            <img
              src="/images/logo.png"
              alt="Logo"
              className="logo-protected w-5 h-5 object-contain"
              onContextMenu={(e) => e.preventDefault()}
              draggable={false}
            />
          </div>
          <span className="font-bold text-gray-800 text-base">Frontend Assessment</span>
        </div>

        {/* Filter Section */}
        <div className="flex-1 pt-10">
          <p className="text-[10px] font-semibold tracking-widest text-gray-400 uppercase mb-3">
            Filter Wilayah
          </p>
          <div className="mt-7" />
          {/* Province */}
          <div className="mb-8">
            <label
              htmlFor="province"
              className="block text-xs font-semibold tracking-widest text-gray-500 uppercase mb-2"
            >
              Provinsi
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                <svg width="16" height="16" fill="none" viewBox="0 0 24 24">
                  <path d="M2 6l7-3 6 3 7-3v15l-7 3-6-3-7 3V6z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round"/>
                  <path d="M9 3v15M15 6v15" stroke="currentColor" strokeWidth="1.8"/>
                </svg>
              </span>
              <select
                id="province"
                name="province"
                value={selectedProvinceId}
                onChange={handleProvinceChange}
                className="w-full border border-gray-600 rounded-lg pl-9 pr-8 py-2.5 text-sm text-gray-800 bg-white appearance-none focus:outline-none focus:ring-2 focus:ring-blue-400 cursor-pointer"
              >
                <option value="">Pilih Provinsi</option>
                {provinces.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name}
                  </option>
                ))}
              </select>
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                <svg width="14" height="14" fill="none" viewBox="0 0 24 24">
                  <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </span>
            </div>
          </div>

          {/* Regency */}
          <div className="mb-8">
            <label
              htmlFor="regency"
              className="block text-xs font-semibold tracking-widest text-gray-500 uppercase mb-2"
            >
              Kota/Kabupaten
            </label>
            <div className="relative">
              <span className="absolute left-1 top-1/2 -translate-y-1/2 pointer-events-none">
                <img
                  src="/images/kota.png"
                  alt="kota"
                  className="w-7 h-7 object-contain opacity-100"
                  draggable={false}
                  onContextMenu={(e) => e.preventDefault()}
                />
              </span>
              <select
                id="regency"
                name="regency"
                value={selectedRegencyId}
                onChange={handleRegencyChange}
                disabled={!selectedProvinceId}
                className="w-full border border-gray-600 rounded-lg pl-9 pr-8 py-2.5 text-sm text-gray-800 bg-white appearance-none focus:outline-none focus:ring-2 focus:ring-blue-400 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <option value="">Pilih Kota/Kabupaten</option>
                {filteredRegencies.map((r) => (
                  <option key={r.id} value={r.id}>
                    {r.name}
                  </option>
                ))}
              </select>
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                <svg width="14" height="14" fill="none" viewBox="0 0 24 24">
                  <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </span>
            </div>
          </div>

          {/* District */}
          <div className="mb-14">
            <label
              htmlFor="district"
              className="block text-xs font-semibold tracking-widest text-gray-500 uppercase mb-2"
            >
              Kecamatan
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                <svg width="16" height="16" fill="none" viewBox="0 0 24 24">
                  <circle cx="12" cy="10" r="3" stroke="currentColor" strokeWidth="1.8"/>
                  <path d="M12 2C7.58 2 4 5.58 4 10c0 5.25 8 12 8 12s8-6.75 8-12c0-4.42-3.58-8-8-8z" stroke="currentColor" strokeWidth="1.8"/>
                </svg>
              </span>
              <select
                id="district"
                name="district"
                value={selectedDistrictId}
                onChange={handleDistrictChange}
                disabled={!selectedRegencyId}
                className="w-full border border-gray-600 rounded-lg pl-9 pr-8 py-2.5 text-sm text-gray-800 bg-white appearance-none focus:outline-none focus:ring-2 focus:ring-blue-400 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <option value="">Pilih Kecamatan</option>
                {filteredDistricts.map((d) => (
                  <option key={d.id} value={d.id}>
                    {d.name}
                  </option>
                ))}
              </select>
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                <svg width="14" height="14" fill="none" viewBox="0 0 24 24">
                  <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </span>
            </div>
          </div>

          {/* Reset Button */}
          <button
            onClick={handleReset}
            className="w-full flex items-center justify-center gap-2 border-2 border-blue-600 text-gray-700 rounded-xl py-4 text-xs font-semibold hover:bg-blue-100 transition-colors bg-blue-50"
          >
            <img
              src="/funnel.svg"
              alt="reset"
              className="w-3.5 h-3.5 object-contain grayscale opacity-70"
              draggable={false}
              onContextMenu={(e) => e.preventDefault()}
            />
            RESET
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-screen bg-gray-50">
        {/* Breadcrumb */}
        <nav className="px-8 py-8 border-b border-gray-200 bg-white">
          <ol className="breadcrumb flex items-center gap-3 text-xs">
            {breadcrumbItems.map((item, index) => (
              <li key={index} className="flex items-center gap-2">
                {index > 0 && (
                  <svg width="12" height="12" fill="none" viewBox="0 0 24 24" className="text-gray-400">
                    <path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                )}
                <span
                  className={
                    item.active
                      ? 'font-bold text-blue-500'
                      : 'font-bold text-gray-400'
                  }
                >
                  {item.label}
                </span>
              </li>
            ))}
          </ol>
        </nav>

        {/* Main Region Display */}
        <main className="flex-1 flex flex-col items-center justify-center gap-2 px-8 py-12">
          {!selectedProvince && !selectedRegency && !selectedDistrict ? (
            <div className="text-center text-gray-400">
              <p className="text-lg">Pilih wilayah untuk memulai</p>
            </div>
          ) : (
            <>
              {selectedProvince && (
                <div className="text-center mb-7">
                  <p className="text-xs font-semibold tracking-widest text-blue-300 uppercase mb-2">
                    Provinsi
                  </p>
                  <h1 className="text-6xl font-extrabold text-gray-900">{selectedProvince.name}</h1>
                </div>
              )}

              {selectedProvince && selectedRegency && (
                <div className="text-gray-300 text-2xl my-2 mb-7">↓</div>
              )}

              {selectedRegency && (
                <div className="text-center mb-7">
                  <p className="text-xs font-semibold tracking-widest text-blue-300 uppercase mb-2">
                    Kota / Kabupaten
                  </p>
                  <h2 className="text-5xl font-extrabold text-gray-900">{selectedRegency.name}</h2>
                </div>
              )}

              {selectedRegency && selectedDistrict && (
                <div className="text-gray-300 text-2xl my-2 mb-7">↓</div>
              )}

              {selectedDistrict && (
                <div className="text-center">
                  <p className="text-xs font-semibold tracking-widest text-blue-300 uppercase mb-2">
                    Kecamatan
                  </p>
                  <h3 className="text-4xl font-bold text-gray-900">{selectedDistrict.name}</h3>
                </div>
              )}
            </>
          )}
        </main>
      </div>
    </div>
  )
}