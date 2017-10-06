package com.example.views.components
import com.example.IndexState
import com.example.config.ExternalUrls
import com.example.styles.GlobalStyles
import com.example.styles.partials.HeaderStyles
import org.scalajs.dom.raw.Element

import scalatags.JsDom.all._
import scalacss.ScalatagsCss._
import com.example.Context._

object Header {
  private lazy val template = header(HeaderStyles.header)(
    div(GlobalStyles.body, GlobalStyles.clearfix)(
      div(HeaderStyles.headerLeft)(
        a(HeaderStyles.headerLogo, href := IndexState.url)(
          Image("udash_logo_m.png", "Udash Framework", GlobalStyles.block)
        )
      ),
      div(HeaderStyles.headerRight)(
        ul(HeaderStyles.headerSocial)(
          li(HeaderStyles.headerSocialItem)(
            a(href := ExternalUrls.udashGithub, HeaderStyles.headerSocialLink, target := "_blank")(
              Image("icon_github.png", "Github")
            )
          ),
          li(HeaderStyles.headerSocialItem)(
            a(href := ExternalUrls.stackoverflow, HeaderStyles.headerSocialLink, target := "_blank")(
              Image("icon_stackoverflow.png", "StackOverflow")
            )
          ),
          li(HeaderStyles.headerSocialItem)(
            a(href := ExternalUrls.avsystem, HeaderStyles.headerSocialLinkYellow, target := "_blank")(
              Image("icon_avsystem.png", "Proudly made by AVSystem"),
              div(HeaderStyles.tooltip)(
                div(HeaderStyles.tooltipTop),
                div(HeaderStyles.tooltipText)(
                  div(HeaderStyles.tooltipTextInner)(
                    "Proudly made by AVSystem"
                  )
                )
              )
            )
          )
        )
      )
    )
  ).render

  def getTemplate: Element = template
}