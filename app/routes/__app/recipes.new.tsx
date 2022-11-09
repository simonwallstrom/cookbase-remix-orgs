import { Plus } from 'phosphor-react'
import { Button, ButtonLink } from '~/components/Button'
import { IngredientsInput, InstructionsInput } from '~/components/Tiptap'

export default function NewRecipe() {
  return (
    <div className="">
      <div>
        {/* Image upload */}
        <div className="flex h-24 w-24 -rotate-3 items-center justify-center rounded-2xl border-2 border-dashed bg-gray-50 text-center text-xs leading-tight text-gray-500">
          Upload
          <br />
          image
        </div>
        <div className="border-b border-gray-100 py-8">
          <div className="">
            <input
              type="text"
              name="title"
              autoFocus
              id="title"
              className="input px-4 text-2xl font-medium text-gray-800 placeholder:text-gray-400"
              placeholder="Recipe title..."
            />
            <div className="mt-5 -ml-2 flex items-center gap-4">
              <button className="flex items-center gap-1.5 rounded-md py-1 px-2 text-xs font-medium hover:bg-gray-100">
                <Plus />
                <span>Add to collection</span>
              </button>
            </div>
          </div>
        </div>

        <div className="mt-7 flex gap-10">
          <div className="w-[30%]">
            <h2>Ingredients</h2>
            <div className="mt-2">
              <IngredientsInput
                content={
                  '<ul><li>Whole wheat flour</li><li>Kosher salt</li><li>1 package yeast</li></ul>'
                }
              />
            </div>
          </div>
          <div className="flex-1">
            <h2>Instructions</h2>
            <div className="mt-2">
              <InstructionsInput content={'<p>Add your instructions...</p>'} />
            </div>
          </div>
        </div>
        <div className="mt-9 flex gap-6">
          <Button variant="primary" type="submit">
            Save recipe
          </Button>
          <ButtonLink href="/tags">Cancel</ButtonLink>
        </div>
      </div>
    </div>
  )
}
