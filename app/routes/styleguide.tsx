import { ArrowFatLeft } from 'phosphor-react'
import { Button, ButtonLink } from '~/components/Button'

export default function Styleguide() {
  return (
    <div className="px-6 py-8">
      <div className="mx-auto w-full max-w-2xl">
        <div className="flex">
          <ButtonLink href="/recipes">
            <ArrowFatLeft weight="duotone" size={20} />
            <span>Back to app</span>
          </ButtonLink>
        </div>
        <div className="box mt-8 p-12">
          <h1>Design system</h1>
          <p className="mt-2">
            A collection of design resources, reusable components and guidelines.
          </p>
          <hr className="my-10 border-dashed" />
          <div>
            <div className="mb-6 font-mono text-xs uppercase tracking-widest text-gray-500">
              Typography
            </div>
            <div className="flex flex-col gap-4">
              <div className="flex items-baseline justify-between">
                <h1>Heading 1</h1>
                <div className="font-mono text-xs text-gray-500">24px / 32px / 500</div>
              </div>
              <div className="flex items-baseline justify-between">
                <h2>Heading 2</h2>
                <div className="font-mono text-xs text-gray-500">18px / 28px / 500</div>
              </div>
              <div className="flex items-baseline justify-between">
                <h3>Heading 3</h3>
                <div className="font-mono text-xs text-gray-500">16px / 24px / 500</div>
              </div>
              <div className="flex items-baseline justify-between">
                <h4>Heading 4</h4>
                <div className="font-mono text-xs text-gray-500">14px / 20px / 500</div>
              </div>
              <div className="flex items-baseline justify-between">
                <p>Body normal</p>
                <div className="font-mono text-xs text-gray-500">14px / 20px / 400</div>
              </div>
            </div>
          </div>
          <hr className="my-10 border-dashed" />
          <div>
            <div className="mb-6 font-mono text-xs uppercase tracking-widest text-gray-500">
              Buttons
            </div>
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <div>
                  <Button>Button</Button>
                </div>
                <pre className="inline rounded bg-gray-100 px-1 py-0.5 text-xs">
                  {'<Button>Button</Button>'}
                </pre>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Button variant="primary">Button</Button>
                </div>
                <pre className="inline rounded bg-gray-100 px-1 py-0.5 text-xs">
                  {'<Button variant="primary">Button</Button>'}
                </pre>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Button variant="danger">Button</Button>
                </div>
                <pre className="inline rounded bg-gray-100 px-1 py-0.5 text-xs">
                  {'<Button variant="danger">Button</Button>'}
                </pre>
              </div>
            </div>
          </div>

          <hr className="my-10 border-dashed" />
          <div>
            <div className="mb-6 font-mono text-xs uppercase tracking-widest text-gray-500">
              Forms
            </div>
            <div className="flex flex-col gap-4">
              <div className="space-y-1.5">
                <label htmlFor="input">Label</label>
                <input
                  placeholder="Placeholder text looks like this..."
                  type="text"
                  name="input"
                  id="input"
                  className="input"
                />
                <p className="text-xs text-gray-500">Help text looks like this.</p>
              </div>
              <div className="space-y-1.5">
                <label className="flex items-center gap-2" htmlFor="checkbox">
                  <input
                    placeholder="Placeholder text looks like this..."
                    type="checkbox"
                    name="checkbox"
                    id="checkbox"
                  />
                  <span>Checkbox label</span>
                </label>
                <p className="text-xs text-gray-500">Help text looks like this.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
