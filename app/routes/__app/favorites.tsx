import { Sliders } from 'phosphor-react'

export default function Favorites() {
  return (
    <>
      <aside className="sticky top-0 h-screen w-72 border-r py-4">
        <div className="flex items-center justify-between border-b px-4 pb-4">
          <div className="mx-0.5 px-1.5 font-semibold">Favorites</div>
          <button className="mx-0.5  rounded-md p-1.5 hover:bg-gray-200">
            <Sliders weight="duotone" size={16} />
          </button>
        </div>
      </aside>
      <div>
        <h1>Favorites</h1>
      </div>
    </>
  )
}
