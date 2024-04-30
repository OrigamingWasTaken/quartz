import { BuildCtx } from "../../util/ctx"
import { Root as HTMLRoot } from "hast"
import { QuartzTransformerPlugin } from "../types"
import { encryptHTML } from "pagecrypt/core"
import { toString } from "hast-util-to-string"
import { VFile } from "vfile"
import { escapeHTML } from "../../util/escape"
import { fromHtml } from "hast-util-from-html"

interface Options {
  /*** Number of time to encrypt the page with the password (default: 3e6) */
  iterations?: number,
  /*** The description of every password-protected notes */
  lockedDescription?: string,
}

export const PasswordProtection: QuartzTransformerPlugin<Options> = (opts?: Options) => {
  return {
    name: "PasswordProtection",
    htmlPlugins() {
      return [
        () => {
          return async (tree: HTMLRoot,file: VFile) => {
            const frontmatter = file.data.frontmatter

            let encryptedHTML = escapeHTML(toString(tree))
            if (frontmatter && "password" in frontmatter && frontmatter.password) {
              encryptedHTML = await encryptHTML(encryptedHTML,frontmatter.password as string, opts?.iterations || 3e6)
            }
            file.data.description = opts?.lockedDescription || "This note is password-protected."
            return fromHtml(encryptedHTML)
            // file.data.htmlAst = fromHtml(encryptedHTML)
          }
        }
      ]
    }
  }
}
