window.hljs = {
  /** @type {Promise<any>} */
  shiki: undefined,
  configure() {
    this.shiki = import('https://esm.sh/shiki@3.4.0')
  },
  /** @param {HTMLElement} codeElement */
  async highlightBlock(codeElement) {
    const lang = [...codeElement.classList.values()]
      .map((name) => name.match(/^language-(.+)$/)?.[1])
      .find(Boolean)
    if (!lang) {
      return
    }
    const shiki = await this.shiki
    codeElement.parentElement.outerHTML = await shiki.codeToHtml(codeElement.innerText, {
      lang,
      theme: 'one-light',
    })
  },
}
