import { QuartzConfig } from "./quartz/cfg"
import * as Plugin from "./quartz/plugins"

/**
 * Quartz 4.0 Configuration
 *
 * See https://quartz.jzhao.xyz/configuration for more information.
 */
const config: QuartzConfig = {
  configuration: {
    pageTitle: "marlonb.ch",
    enableSPA: true,
    enablePopovers: true,
    analytics: {
      provider: "umami",
      websiteId: "7debd2c9-189e-44a8-82ff-a4411df5492a",
      host: "https://umami.origaming.ch"
    },
    locale: "fr-FR",
    baseUrl: "marlonb.ch",
    ignorePatterns: ["private", "templates", ".obsidian"],
    defaultDateType: "created",
    theme: {
      fontOrigin: "googleFonts",
      cdnCaching: true,
      typography: {
        header: "DM Serif Display",
        body: "Bricolage Grotesque",
        code: "IBM Plex Mono",
      },
      colors: {
        lightMode: {
          light: "#1c1b1f",
          lightgray: "#695c7f",
          gray: "#847998",
          darkgray: "#d4d4d4",
          dark: "#8c6ec5",
          secondary: "#8c6ec5",
          tertiary: "#847996",
          highlight: "rgba(132,121,150,0.15)",
        },
        darkMode: {
          light: "#1c1b1f",
          lightgray: "#695c7f",
          gray: "#847998",
          darkgray: "#d4d4d4",
          dark: "#8c6ec5",
          secondary: "#8c6ec5",
          tertiary: "#847996",
          highlight: "rgba(132,121,150,0.15)",
        },
      },
    },
  },
  plugins: {
    transformers: [
      Plugin.PasswordProtection({iterations: 1}),  
      Plugin.FrontMatter(),
      Plugin.CreatedModifiedDate({
        priority: ["frontmatter", "filesystem"],
      }),
      Plugin.Latex({ renderEngine: "katex" }),
      Plugin.SyntaxHighlighting({
        theme: {
          light: "github-light",
          dark: "github-dark",
        },
        keepBackground: false,
      }),
      Plugin.ObsidianFlavoredMarkdown({ enableInHtmlEmbed: false }),
      Plugin.GitHubFlavoredMarkdown(),
      Plugin.TableOfContents(),
      Plugin.CrawlLinks({ markdownLinkResolution: "shortest" }),
      Plugin.Description(),
      Plugin.HardLineBreaks()
    ],
    filters: [Plugin.RemoveDrafts()],
    emitters: [
      Plugin.AliasRedirects(),
      Plugin.ComponentResources(),
      Plugin.ContentPage(),
      Plugin.FolderPage(),
      Plugin.TagPage(),
      Plugin.ContentIndex({
        enableSiteMap: true,
        enableRSS: true,
      }),
      Plugin.Assets(),
      Plugin.Static(),
      Plugin.NotFoundPage(),
    ],
  },
}

export default config
