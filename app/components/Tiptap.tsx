import { useEditor, EditorContent, type Editor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Placeholder from '@tiptap/extension-placeholder'
import { ListBullets, ListNumbers, TextBolder, TextH, TextItalic } from 'phosphor-react'
import { useState } from 'react'

const MenuBar = ({ editor }: { editor: Editor | null }) => {
  if (!editor) {
    return null
  }

  return (
    <div className="flex items-center overflow-hidden rounded-t-md border-x border-t border-black">
      <div className="flex gap-1 p-1">
        <MenuButton
          isActive={editor.isActive('bold')}
          onClick={() => editor.chain().focus().toggleBold().run()}
        >
          <TextBolder weight="bold" />
        </MenuButton>
        <MenuButton
          isActive={editor.isActive('italic')}
          onClick={() => editor.chain().focus().toggleItalic().run()}
        >
          <TextItalic weight="bold" />
        </MenuButton>
      </div>
      <div className="flex gap-1 border-x border-black p-1">
        <MenuButton
          isActive={editor.isActive('heading')}
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        >
          <TextH weight="bold" />
        </MenuButton>
        <MenuButton
          isActive={editor.isActive('bulletList')}
          onClick={() => editor.chain().focus().toggleBulletList().run()}
        >
          <ListBullets weight="bold" />
        </MenuButton>
        <MenuButton
          isActive={editor.isActive('orderedList')}
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
        >
          <ListNumbers weight="bold" />
        </MenuButton>
      </div>
    </div>
  )
}

const Tiptap = ({ content }: { content: string }) => {
  const [html, setHtml] = useState(content)
  const editor = useEditor({
    editorProps: {
      attributes: {
        class: 'border border-black tiptap rounded-b-md p-4 outline-none',
      },
    },
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder: 'List items....',
      }),
    ],
    content: content,
    onBlur({ editor }) {
      setHtml(editor.getHTML())
    },
  })

  return (
    <div>
      <MenuBar editor={editor} />
      <EditorContent editor={editor} />
      <input type="hidden" name="content" value={html} />
    </div>
  )
}

function MenuButton({
  onClick,
  children,
  isActive,
}: {
  onClick: React.MouseEventHandler<HTMLButtonElement>
  children: React.ReactNode
  isActive: boolean
}) {
  return (
    <button
      className={`rounded p-1.5 hover:bg-gray-100 ${
        isActive ? 'bg-gray-200 hover:bg-gray-200' : ''
      }`}
      type="button"
      onClick={onClick}
    >
      {children}
    </button>
  )
}

export default Tiptap
