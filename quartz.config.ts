import { QuartzConfig } from "./quartz/cfg"
import { Staticrypt } from "./quartz/password"
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
      host: "https://umami.origaming.ch",
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
          light: "#FBF7EE",
          lightgray: "#e0dcd3",
          gray: "#b8b8b8",
          darkgray: "#2A354B",
          dark: "#08142C",
          secondary: "#274B75",
          tertiary: "#84a59d",
          highlight: "rgba(143, 159, 169, 0.15)",
        },
        darkMode: {
          light: "#17151B",
          lightgray: "#2B2734",
          gray: "#3F394D",
          darkgray: "544B66",
          dark: "#685D7E",
          secondary: "#685D7E",
          tertiary: "#7C6F97",
          highlight: "rgba(84,75,102,0.15)",
        },
      },
    },
  },
  plugins: {
    transformers: [
      Staticrypt(),
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
      Plugin.HardLineBreaks(),
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
