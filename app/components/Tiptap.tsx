import { BubbleMenu, useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Document from '@tiptap/extension-document'
import Paragraph from '@tiptap/extension-paragraph'
import BulletList from '@tiptap/extension-bullet-list'
import ListItem from '@tiptap/extension-list-item'
import Text from '@tiptap/extension-text'

import { ListBullets, ListNumbers, TextBolder, TextH, TextItalic } from 'phosphor-react'
import { useState } from 'react'

const CustomDocument = Document.extend({
  content: 'bulletList',
})

const CustomBulletItem = ListItem.extend({
  content: 'inline*',
})

export const IngredientsInput = ({ content }: { content: string }) => {
  const [html, setHtml] = useState(content)
  const editor = useEditor({
    editorProps: {
      attributes: {
        class:
          'tiptap-ingredients focus:border-black min-h-[150px] border rounded-lg p-4 outline-none leading-relaxed',
      },
    },
    editable: true,
    extensions: [CustomDocument, Paragraph, Text, BulletList, CustomBulletItem],
    content: content,
    onUpdate({ editor }) {
      setHtml(editor.getHTML())
    },
  })

  return (
    <div>
      {editor && (
        <BubbleMenu editor={editor} tippyOptions={{ duration: 100 }}>
          <div className="flex items-center gap-1 overflow-hidden rounded-md border border-gray-300 bg-white p-1 shadow-md">
            <MenuButton
              isActive={editor.isActive('bold')}
              onClick={() => editor.chain().focus().toggleBold().run()}
            >
              <TextBolder size={16} weight="bold" />
            </MenuButton>
            <MenuButton
              isActive={editor.isActive('italic')}
              onClick={() => editor.chain().focus().toggleItalic().run()}
            >
              <TextItalic size={16} weight="bold" />
            </MenuButton>
          </div>
        </BubbleMenu>
      )}
      <EditorContent editor={editor} />
      <input type="hidden" name="content" value={html} />
    </div>
  )
}

export const InstructionsInput = ({ content }: { content: string }) => {
  const [html, setHtml] = useState(content)
  const editor = useEditor({
    editorProps: {
      attributes: {
        class:
          'ingredients-input focus:border-black min-h-[150px] border rounded-lg px-4 py-3 outline-none leading-relaxed',
      },
    },
    editable: true,
    extensions: [StarterKit],
    content: content,
    onUpdate({ editor }) {
      setHtml(editor.getHTML())
    },
  })

  return (
    <div>
      {editor && (
        <BubbleMenu editor={editor} tippyOptions={{ duration: 100 }}>
          <div className="flex items-center gap-1 overflow-hidden rounded-md border border-gray-300 bg-white p-1 shadow-md">
            <MenuButton
              isActive={editor.isActive('bold')}
              onClick={() => editor.chain().focus().toggleBold().run()}
            >
              <TextBolder size={16} weight="bold" />
            </MenuButton>
            <MenuButton
              isActive={editor.isActive('italic')}
              onClick={() => editor.chain().focus().toggleItalic().run()}
            >
              <TextItalic size={16} weight="bold" />
            </MenuButton>
            <MenuButton
              isActive={editor.isActive('heading')}
              onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
            >
              <TextH size={16} weight="bold" />
            </MenuButton>
            <MenuButton
              isActive={editor.isActive('bulletList')}
              onClick={() => editor.chain().focus().toggleBulletList().run()}
            >
              <ListBullets size={16} weight="bold" />
            </MenuButton>
            <MenuButton
              isActive={editor.isActive('orderedList')}
              onClick={() => editor.chain().focus().toggleOrderedList().run()}
            >
              <ListNumbers size={16} weight="bold" />
            </MenuButton>
          </div>
        </BubbleMenu>
      )}
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
      className={`rounded p-2 hover:bg-gray-100 ${isActive ? 'bg-gray-200 hover:bg-gray-300' : ''}`}
      type="button"
      onClick={onClick}
    >
      {children}
    </button>
  )
}
