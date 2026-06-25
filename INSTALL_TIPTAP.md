# Install TipTap Rich Text Editor

The blog editor now uses **TipTap**, a professional WYSIWYG (What You See Is What You Get) editor with full formatting tools.

## Install Dependencies

Run this command:

```bash
npm install @tiptap/react @tiptap/pm @tiptap/starter-kit @tiptap/extension-text-align @tiptap/extension-underline @tiptap/extension-link @tiptap/extension-image @tiptap/extension-table @tiptap/extension-table-row @tiptap/extension-table-header @tiptap/extension-table-cell @tiptap/extension-color @tiptap/extension-text-style @tiptap/extension-highlight
```

Or all at once:

```bash
npm install @tiptap/react @tiptap/pm @tiptap/starter-kit @tiptap/extension-text-align @tiptap/extension-underline @tiptap/extension-link @tiptap/extension-image @tiptap/extension-table @tiptap/extension-table-row @tiptap/extension-table-header @tiptap/extension-table-cell @tiptap/extension-color @tiptap/extension-text-style @tiptap/extension-highlight lucide-react
```

## What You Get

Once installed, your blog editor will have:

✅ **Text Formatting**
- Bold, Italic, Underline, Strikethrough
- Font colors & highlighting
- Clear formatting button

✅ **Headings**
- H1, H2, H3 heading levels

✅ **Lists**
- Bullet lists
- Numbered lists

✅ **Text Alignment**
- Left, Center, Right, Justify

✅ **Block Elements**
- Blockquotes
- Code blocks
- Horizontal rules

✅ **Advanced**
- Links (with URL input)
- Images (with URL input)
- Tables (insertable grids)

✅ **Editor Tools**
- Undo/Redo
- Character counter
- Formatting toolbar

## Verify Installation

After installing, check:

```bash
npm list @tiptap/react
```

Should show something like: `@tiptap/react@2.x.x`

## If Installation Fails

Try with yarn instead:

```bash
yarn add @tiptap/react @tiptap/pm @tiptap/starter-kit @tiptap/extension-text-align @tiptap/extension-underline @tiptap/extension-link @tiptap/extension-image @tiptap/extension-table @tiptap/extension-table-row @tiptap/extension-table-header @tiptap/extension-table-cell @tiptap/extension-color @tiptap/extension-text-style @tiptap/extension-highlight
```

Or manually add to `package.json` and run `npm install`.

## Next Steps

1. Install dependencies (above)
2. Start dev server: `npm run dev`
3. Go to `/admin/blog/create`
4. You'll see the new rich text editor!

---

That's it! No configuration needed. The editor is ready to use. 🚀
