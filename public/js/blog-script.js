function addBlogEntries (node, items) {
  // First, create an empty blog entry

  // .blog-entry
  const blogEntry = document.createElement('h3')
  blogEntry.className = 'blog-entry'

  // .blog-entry button
  const blogEntryButton = document.createElement('button')
  blogEntryButton.setAttribute('aria-expanded', 'false')
  blogEntry.append(blogEntryButton)

  // .entry-icon (div)
  const entryIconDiv = document.createElement('div')
  entryIconDiv.className = 'entry-icon'
  blogEntryButton.append(entryIconDiv)

  // .entry-icon svg (brackets and plus icon)
  const svgPlus = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
  svgPlus.setAttribute('aria-hidden', 'true')
  svgPlus.setAttribute('focusable', 'false')
  const svgBracketLeft = svgPlus.cloneNode()
  svgBracketLeft.setAttribute('viewBox', '0 0 2 10')
  const svgBracketRight = svgBracketLeft.cloneNode()
  svgPlus.setAttribute('viewBox', '0 0 16 20')
  entryIconDiv.append(svgBracketLeft)
  entryIconDiv.append(svgPlus)
  entryIconDiv.append(svgBracketRight)
  // SVG elements
  const plusRectVert = document.createElementNS('http://www.w3.org/2000/svg', 'rect')
  const plusRectHorz = plusRectVert.cloneNode()
  const bracketLeftRect1 = plusRectVert.cloneNode()
  const bracketLeftRect2 = plusRectVert.cloneNode()
  const bracketLeftRect3 = plusRectVert.cloneNode()
  const bracketRightRect1 = plusRectVert.cloneNode()
  const bracketRightRect2 = plusRectVert.cloneNode()
  const bracketRightRect3 = plusRectVert.cloneNode()
  // Plus icon shapes
  plusRectVert.setAttribute('class', 'vert')
  plusRectVert.setAttribute('height', '12')
  plusRectVert.setAttribute('width', '2')
  plusRectVert.setAttribute('y', '4')
  plusRectVert.setAttribute('x', '7')
  plusRectHorz.setAttribute('height', '2')
  plusRectHorz.setAttribute('width', '12')
  plusRectHorz.setAttribute('y', '9')
  plusRectHorz.setAttribute('x', '2')
  svgPlus.append(plusRectVert)
  svgPlus.append(plusRectHorz)
  // Left bracket icon shapes
  bracketLeftRect1.setAttribute('height', '1')
  bracketLeftRect1.setAttribute('width', '2')
  bracketLeftRect1.setAttribute('y', '9')
  bracketLeftRect1.setAttribute('x', '0')
  bracketLeftRect2.setAttribute('height', '10')
  bracketLeftRect2.setAttribute('width', '1')
  bracketLeftRect2.setAttribute('y', '0')
  bracketLeftRect2.setAttribute('x', '0')
  bracketLeftRect3.setAttribute('height', '1')
  bracketLeftRect3.setAttribute('width', '2')
  bracketLeftRect3.setAttribute('y', '0')
  bracketLeftRect3.setAttribute('x', '0')
  svgBracketLeft.append(bracketLeftRect1)
  svgBracketLeft.append(bracketLeftRect2)
  svgBracketLeft.append(bracketLeftRect3)
  // Right bracket icon shapes
  bracketRightRect1.setAttribute('height', '1')
  bracketRightRect1.setAttribute('width', '2')
  bracketRightRect1.setAttribute('y', '9')
  bracketRightRect1.setAttribute('x', '0')
  bracketRightRect2.setAttribute('height', '10')
  bracketRightRect2.setAttribute('width', '1')
  bracketRightRect2.setAttribute('y', '0')
  bracketRightRect2.setAttribute('x', '1')
  bracketRightRect3.setAttribute('height', '1')
  bracketRightRect3.setAttribute('width', '2')
  bracketRightRect3.setAttribute('y', '0')
  bracketRightRect3.setAttribute('x', '0')
  svgBracketRight.append(bracketRightRect1)
  svgBracketRight.append(bracketRightRect2)
  svgBracketRight.append(bracketRightRect3)

  // .blog-entry button .entry-title
  const entryTitle = document.createElement('span')
  entryTitle.className = 'entry-title'
  blogEntryButton.append(entryTitle)

  // .blog-entry button .entry-date
  const entryDate = document.createElement('span')
  entryDate.className = 'entry-date'
  blogEntryButton.append(entryDate)

  // .blog-entry-text
  const blogEntryText = document.createElement('div')
  blogEntryText.className = 'blog-entry-text'
  blogEntryText.setAttribute('hidden', '')
  const entryContent = document.createElement('p')
  blogEntryText.append(entryContent)

  const lineBreak = document.createElement('br')

  // Create the entries
  for (let i = 1; i < items + 1; i++) {
    const newBlogEntry = blogEntry.cloneNode(true)
    // Set id for entry-title-x and entry-date-x
    const newEntryTitle = newBlogEntry.querySelector('.entry-title')
    newEntryTitle.id = 'entry-title-' + i
    const newEntryDate = newBlogEntry.querySelector('.entry-date')
    newEntryDate.id = 'entry-date-' + i
    const newBlogEntryText = blogEntryText.cloneNode(true)
    // Set id for entry-content-x
    const newEntryContent = newBlogEntryText.querySelector('p')
    newEntryContent.id = 'entry-content-' + i
    const newLineBreak = lineBreak.cloneNode()
    // Add new entry to the node
    node.prepend(newLineBreak)
    node.prepend(newBlogEntryText)
    node.prepend(newBlogEntry)
  }
}

function addBlogContent (content, items) {
  for (let i = 1; i < items + 1; i++) {
    const entry = content['entry-' + i]
    document.getElementById('entry-title-' + i).textContent = entry.title
    document.getElementById('entry-date-' + i).textContent = entry.date
    document.getElementById('entry-content-' + i).textContent = entry.content
  }
}

async function getBlogContent () {
  const response = await fetch('/blog/entries.json')
  const content = await response.json()
  console.log(content)
  return content
}

document.addEventListener('DOMContentLoaded', async function (event) {
  const content = await getBlogContent()
  const numEntries = Object.keys(content).length
  addBlogEntries(document.querySelector('.blog-content'), numEntries)
  addBlogContent(content, numEntries);
  (function () {
    const headings = document.querySelectorAll('.blog-entry')
    Array.prototype.forEach.call(headings, entry => {
      const btn = entry.querySelector('button')
      const target = entry.nextElementSibling
      btn.onclick = () => {
        const expanded = btn.getAttribute('aria-expanded') === 'true'
        btn.setAttribute('aria-expanded', !expanded)
        target.hidden = expanded
      }
    })
  })()
})
