# Professional WYSIWYG Blog Editor - Complete Guide

Your blog editor is now powered by **TipTap**, a professional, headless rich text editor. No more markdown nonsense—just click, format, and write.

---

## 📥 Installation (Required!)

First, install the dependencies:

```bash
npm install @tiptap/react @tiptap/pm @tiptap/starter-kit @tiptap/extension-text-align @tiptap/extension-underline @tiptap/extension-link @tiptap/extension-image @tiptap/extension-table @tiptap/extension-table-row @tiptap/extension-table-header @tiptap/extension-table-cell @tiptap/extension-color @tiptap/extension-text-style @tiptap/extension-highlight lucide-react
```

(Or follow the detailed instructions in `INSTALL_TIPTAP.md`)

---

## ✨ What You Can Do

### Text Formatting
- **Bold** (Ctrl+B) - Make text stand out
- **Italic** (Ctrl+I) - Emphasize text
- **Underline** (Ctrl+U) - Highlight important parts
- **Strikethrough** - Mark deleted/outdated content

### Headings (3 Levels)
- **H1** - Main title/section
- **H2** - Subheading (shows with bottom border)
- **H3** - Minor subheading

### Lists
- **Bullet Points** - Unordered lists
- **Numbered Lists** - Ordered lists
- **Nesting** - Create multi-level lists

### Text Alignment
- **Left** - Default
- **Center** - Centered text
- **Right** - Right-aligned
- **Justify** - Full width

### Block Elements
- **Blockquotes** - Highlight important quotes (purple left border)
- **Code Blocks** - Multi-line code with dark background
- **Inline Code** - Single-line code highlighting

### Media & Links
- **Links** - Click, paste URL, press Enter
- **Images** - Paste image URL
- **Tables** - Insert 3×3 grid (editable)

### Advanced
- **Undo/Redo** - Full history
- **Clear Formatting** - Remove all styling
- **Character Counter** - See how long your post is

---

## 🎯 Toolbar Buttons (Left to Right)

```
[B] [I] [U] [~]  |  [H1] [H2] [H3]  |  [•] [1.]  |  [≡] [≡] [≡] [≡]  |  
["] [≡] [≡]  |  [🔗] [🖼️] [≡≡]  |  [↶] [↷]  |  [✕]
```

**Legend:**
- `B` = Bold
- `I` = Italic
- `U` = Underline
- `~` = Strikethrough
- `H1/H2/H3` = Headings
- `•` = Bullet list
- `1.` = Numbered list
- `≡` = Alignment (left/center/right/justify)
- `"` = Blockquote
- `≡` = Code block
- `🔗` = Link
- `🖼️` = Image
- `↶` `↷` = Undo/Redo
- `✕` = Clear formatting

---

## 🎨 Editor Features

### Formatting Toolbar
- **Always visible** at the top
- **Context-aware** - shows what's active
- **Keyboard shortcuts** supported for power users

### Live Editor
- **WYSIWYG** - see formatting as you type
- **Scrollable** - handles long posts
- **Auto-expanding** - grows as you write

### Status Bar
- **Character counter** - bottom right
- Shows total characters typed

---

## 🚀 Quick Workflow

1. **Write heading**: Click [H2], type "My Section"
2. **Add paragraph**: Press Enter, write text
3. **Bold important part**: Select text, click [B]
4. **Add list**: Click [•], type items, press Enter
5. **Insert quote**: Click ["], paste quote
6. **Add image**: Click [🖼️], paste image URL
7. **Insert link**: Highlight text, click [🔗], paste URL
8. **Save**: Click "Save Post" button

---

## 💻 Styling Applied

The editor outputs **clean HTML** that displays beautifully:

- **Headings** - Large, branded, with bottom borders (H2)
- **Lists** - Proper indentation, nested support
- **Code** - Dark background, monospace font, syntax-friendly
- **Blockquotes** - Purple left border, italicized
- **Links** - Purple, underlined, hover effects
- **Images** - Rounded corners, shadow, responsive
- **Tables** - Alternating row colors, header styling

All styles are defined in `src/styles/content-renderer.css`.

---

## 🔧 Tips & Tricks

### Copy-Paste from Word
- Just paste! TipTap converts most formatting
- Some Word-specific styles may be simplified

### Undo Mistakes
- Use [↶] button or Ctrl+Z
- Full history maintained

### Clear Bad Formatting
- Select content
- Click [✕] to remove all styles
- Start fresh

### Create Nested Lists
- In a list item, press Tab to indent
- Press Shift+Tab to outdent

### Add Horizontal Line
- Use [≡] (code block) or just press Enter multiple times
- Or manually insert via keyboard

### Tables
- Click [≡≡] to insert 3×3 table
- Right-click cells to add/remove rows/columns
- Move with arrow keys

### Keyboard Shortcuts
- **Ctrl+B** - Bold
- **Ctrl+I** - Italic
- **Ctrl+U** - Underline
- **Ctrl+Z** - Undo
- **Ctrl+Y** or **Ctrl+Shift+Z** - Redo
- **Ctrl+Shift+X** - Strike (on some browsers)

---

## 📋 Content Best Practices

### Structure
1. Start with **H2** heading
2. Use **H3** for subsections
3. Break into **paragraphs** (2-3 sentences each)
4. Use **lists** to show steps or ideas

### Formatting
- Use **bold** for key terms (not colors)
- Use **italic** for emphasis
- Use **blockquotes** for advice/tips
- Use **code blocks** for technical content

### Media
- Upload **1-2 images per 500 words**
- Use **alt text** (already filled in for featured image)
- Keep images **under 1MB** for speed

### Links
- Link to **internal pages** when relevant
- Use **descriptive anchor text** (not "click here")
- Links open **in same tab** (no new window)

---

## 🆘 Troubleshooting

### Editor won't load
- Check TipTap dependencies installed
- Refresh the page
- Check browser console (F12) for errors

### Formatting won't apply
- Make sure text is **selected**
- Use keyboard shortcut instead of button
- Click button **once** (not double-click)

### Can't paste images
- Paste as **URL** not file
- Use [🖼️] button, not drag-drop
- Image must be hosted online (CDN)

### Text looks weird in preview
- Clear formatting with [✕]
- Re-apply formatting
- Check `content-renderer.css` styles

### Lost content
- Use [↶] undo button
- Content is only saved when you click "Save Post"

---

## 🎨 Customizing Styles

The output HTML is styled by `src/styles/content-renderer.css`.

To customize:

1. Open `src/styles/content-renderer.css`
2. Edit color values:
   - `#0F172A` = dark text
   - `#5B3FD4` = purple brand color
   - `#E5E8F0` = light gray border
3. Edit font sizes, spacing, etc.
4. Save and refresh

Example: Change heading color from dark blue to dark red:
```css
.content-renderer h2 {
  color: #991B1B;  /* Dark red instead of #0F172A */
}
```

---

## 📊 HTML Output Example

When you write in the editor:

```
[H2] Why Speed Matters
[P] The first 5 minutes are critical.
[•] Point 1
[•] Point 2
["] "Always respond fast" - John
[Code Block] response_time = 2 minutes
[P] Learn more [Link to /blog] 
[Image] https://...
```

It stores as:

```html
<h2>Why Speed Matters</h2>
<p>The first 5 minutes are critical.</p>
<ul>
  <li>Point 1</li>
  <li>Point 2</li>
</ul>
<blockquote>
  <p>"Always respond fast" - John</p>
</blockquote>
<pre><code>response_time = 2 minutes</code></pre>
<p>Learn more <a href="/blog">here</a></p>
<img src="https://..." alt="" />
```

Which renders with all the CSS styling from `content-renderer.css`.

---

## ✅ You're Ready!

Your blog editor now has:
- ✅ Full text formatting (bold, italic, underline, etc.)
- ✅ Professional colors and fonts
- ✅ Headings, lists, quotes, code
- ✅ Image and link support
- ✅ Tables (with full editor)
- ✅ Undo/Redo
- ✅ Character counter
- ✅ Clean HTML output
- ✅ Beautiful rendering styles

Start writing professional blog posts! 🚀
