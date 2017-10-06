package com.example.views

import io.udash._
import com.example.RootState
import org.scalajs.dom.Element
import scalatags.JsDom.tags2.main
import com.example.views.components.{Footer, Header}
import com.example.styles.{DemoStyles, GlobalStyles}
import scalacss.ScalatagsCss._

object RootViewPresenter extends DefaultViewPresenterFactory[RootState.type](() => new RootView)

class RootView extends View {
  import com.example.Context._
  import scalatags.JsDom.all._

  private val child: Element = div().render

  private val content = div(
    Header.getTemplate,
    main(GlobalStyles.main)(
      div(GlobalStyles.body)(
        h1("udash-app"),
        child
      )
    )
,Footer.getTemplate
  )

  override def getTemplate: Modifier = content

  override def renderChild(view: View): Unit = {
    import io.udash.wrappers.jquery._
    jQ(child).children().remove()
    view.getTemplate.applyTo(child)
  }
}