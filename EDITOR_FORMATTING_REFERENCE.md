# Blog Editor - Complete Formatting Reference

Your TipTap editor supports everything professional writers need. Here's the complete list.

---

## 📝 Text Formatting

### Character Styles
- **Bold** - Make text heavier/darker
  - Button: [B]
  - Keyboard: Ctrl+B
  - Use for: Key terms, emphasis
  
- **Italic** - Slant text
  - Button: [I]
  - Keyboard: Ctrl+I
  - Use for: Book titles, foreign words
  
- **Underline** - Add line under text
  - Button: [U]
  - Keyboard: Ctrl+U
  - Use for: Important notices (but avoid overuse)
  
- **Strikethrough** - Line through text
  - Button: [~]
  - Keyboard: None
  - Use for: Show deleted content, jokes

### Colors & Highlighting
- **Text Color** - Change font color
  - Access via: Select text → right-click (on some editors)
  - Colors: Full spectrum available
  - Use for: Don't overuse, only for emphasis
  
- **Highlighting** - Background color
  - Access via: Select text → highlight button
  - Colors: Yellow, green, blue, etc.
  - Use for: Mark important passages

---

## 🎯 Headings & Hierarchy

### H1 (Largest)
- Button: [H1]
- Size: 32px
- Use for: Page title (usually only 1 per page)
- Example: "Why Speed-to-Lead Matters"

### H2 (Medium)
- Button: [H2]
- Size: 26px
- Border: Bottom line (automatic)
- Use for: Main section headers
- Example: "The Problem" or "Key Benefits"

### H3 (Small)
- Button: [H3]
- Size: 22px
- Use for: Subsection headers
- Example: "How it works" under a main section

### Best Practice
```
[H2] Why Speed-to-Lead Matters        ← Main section
[P] Introduction paragraph...
[H3] The Data                         ← Subsection
[P] Supporting paragraph...
[H3] Real Example                     ← Another subsection
[P] More content...
```

---

## 📋 Lists

### Bullet Points (Unordered)
- Button: [•]
- Use for: Non-sequential items
- Example:
  - Fast response
  - 24/7 availability
  - Auto-qualification

### Numbered List (Ordered)
- Button: [1.]
- Use for: Sequential steps
- Example:
  1. Write heading
  2. Add paragraph
  3. Format text
  4. Save post

### Nested Lists
- **How**: In a list item, press Tab to indent
- **Indent back**: Press Shift+Tab
- Example:
  1. First point
     - Sub-point A
     - Sub-point B
  2. Second point

---

## 🎨 Text Alignment

### Left Align (Default)
- Button: [≡] (first option)
- Keyboard: -
- Use for: Normal body text

### Center Align
- Button: [≡] (second option)
- Keyboard: -
- Use for: Headings, quotes, calls-to-action

### Right Align
- Button: [≡] (third option)
- Keyboard: -
- Use for: Bylines, dates (rare)

### Justify
- Button: [≡] (fourth option)
- Keyboard: -
- Use for: Professional documents, formal writing

---

## 📖 Block Elements

### Blockquotes
- Button: ["]
- Visual: Purple left border, light background
- Font: Italic
- Use for:
  - Important quotes
  - Tips or advice
  - Testimonials
  - Key takeaways
- Example:
  > "Always respond to leads within 5 minutes." — Industry best practice

### Code (Inline)
- When: In middle of sentence
- Visual: Dark gray background, monospace font, red text
- Use for: Variable names, short code, commands
- Example: Use the `updatePost()` function to save changes

### Code Blocks (Multi-line)
- Button: [≡]
- Visual: Dark background, monospace font
- Use for: Full code snippets, long commands
- Example:
  ```
  const updatePost = async (slug, data) => {
    const res = await fetch(`/api/blog/admin/update?slug=${slug}`, {
      method: 'PUT',
      body: JSON.stringify(data)
    });
    return await res.json();
  };
  ```

### Dividers/Horizontal Line
- Use: Press [≡] for code block, or manually create with `---`
- Visual: Thin line across page
- Use for: Section breaks

---

## 🔗 Links & Media

### Hyperlinks
- Button: [🔗]
- How: Click button → paste URL → press Enter
- Or: Highlight text → click [🔗] → paste URL
- Visual: Purple, underlined, hover effects
- Use for: Internal pages, external resources
- Example: [Learn more about PAS](/pas)

### Images
- Button: [🖼️]
- How: Click button → paste image URL
- Tip: Use CDN URLs (Supabase storage auto-provides these)
- Visual: Rounded corners, shadow, responsive
- Alt text: Add descriptions for accessibility
- Max size: Recommend under 1MB for speed
- Example:
  ```
  https://your-bucket.supabase.co/storage/v1/object/public/blog-images/image.jpg
  ```

---

## 📊 Tables

### Insert Table
- Button: [≡≡]
- Default: 3 rows × 3 columns
- Edit: Click in cell → tab between cells
- Add rows/columns: Right-click cell for options
- Use for: Data comparison, feature matrices
- Example:

| Feature | PAS | ISA | Manual |
|---------|-----|-----|--------|
| Speed   | <5s | 15m | 30m+   |
| 24/7    | Yes | No  | No     |
| Cost    | $   | $$  | $$$    |

---

## 🔧 Editor Tools

### Undo/Redo
- Undo Button: [↶]
- Redo Button: [↷]
- Keyboard: Ctrl+Z (undo), Ctrl+Y (redo)
- Use for: Fix mistakes instantly
- History: Full undo stack (infinite)

### Clear Formatting
- Button: [✕]
- How: Select text → click [✕]
- Effect: Removes ALL formatting from selection
- Use for: When text gets messed up
- Shortcut: Start fresh without deleting

### Character Counter
- Location: Bottom right of editor
- Shows: Total characters typed
- Use for: Monitor post length
- Target: 1,500-3,000 words ideal

---

## 💡 Pro Tips & Tricks

### Copy-Paste from Google Docs/Word
- Just paste! Most formatting converts
- Some styles may simplify
- Use [✕] to clean up if needed

### Build Hierarchy
```
[H2] Main Topic
[P] Intro paragraph (2-3 sentences)

[H3] Key Point 1
[P] Details about point 1
[•] Supporting idea
[•] Supporting idea

[H3] Key Point 2
[P] Details about point 2
["] Important quote
```

### Format for Scannability
- Use headings to break up text
- Keep paragraphs 3-4 sentences max
- Use lists instead of long sentences
- Bold key phrases readers will scan for

### SEO-Friendly Writing
- H1: Page title (1 only)
- H2: Main sections (2-3 per page)
- H3: Subsections (under H2s)
- Include keywords naturally
- Use descriptive link text

### Visual Balance
- 1 image per 300-500 words
- Mix text and code blocks
- Use blockquotes sparingly
- Vary paragraph lengths

---

## 🎯 Formatting Checklist

Before publishing, check:

- [ ] Title is H1 or H2
- [ ] Sections use H2 or H3
- [ ] Important terms are **bold**
- [ ] Lists use bullets or numbers
- [ ] Long quotes are blockquotes
- [ ] Code has code blocks
- [ ] Links have descriptive text
- [ ] Images have alt text
- [ ] Alignment is intentional
- [ ] No orphaned formatting

---

## 🚫 What NOT to Do

- ❌ Don't use H1 multiple times (confuses readers & SEO)
- ❌ Don't use bold on >30% of text (loses emphasis)
- ❌ Don't use ALL CAPS (looks like shouting)
- ❌ Don't underline casual text (implies links)
- ❌ Don't nest lists >3 levels (confusing)
- ❌ Don't put images in middle of sentences
- ❌ Don't use 5+ different colors (looks unprofessional)
- ❌ Don't indent text manually (use alignment buttons)

---

## 📱 Mobile Considerations

The editor is fully responsive:
- Toolbar wraps on small screens
- Touch-friendly buttons
- Content expands to screen width
- Images scale automatically

---

## 🎓 Common Workflows

### How-To Post
```
[H2] How to Set Up PAS
[P] Step-by-step guide...

[H3] Step 1: Create Account
[P] Instructions...
["] Important note

[H3] Step 2: Configure Settings
[P] Instructions...
[Code] Configuration example

[H3] Step 3: Deploy
[P] Instructions...
["] Tips for success
```

### Case Study
```
[H2] Real Results: ABC Brokerage
[P] Overview...

[H3] The Challenge
[P] What was wrong...

[H3] The Solution
[P] What we did...

[H3] The Results
[P] Numbers and metrics...
[Table] Comparison table
```

### Blog Post
```
[H2] Topic Title
[P] Hook paragraph (most important!)

[H3] Section 1
[•] Key points
[P] Explanation

[H3] Section 2
[•] Key points
["] Important quote

[H3] Takeaway
[P] Wrap-up paragraph
["] Call-to-action
```

---

## ✅ You're All Set!

Your editor has everything you need:
- ✅ Full text formatting
- ✅ Professional typography
- ✅ Media support
- ✅ Tables
- ✅ Code blocks
- ✅ Quick formatting
- ✅ Undo/Redo
- ✅ Character count

**Start writing professional content!** 📝
