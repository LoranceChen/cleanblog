package com.example

import io.udash.{StrictLogging, _}
import io.udash.wrappers.jquery._
import org.scalajs.dom.{Element, document}

import scala.scalajs.js.JSApp
import scala.scalajs.js.annotation.JSExport
import scala.util.{Failure, Success}

object Context {
  implicit val executionContext = scalajs.concurrent.JSExecutionContext.Implicits.queue
  private val routingRegistry = new RoutingRegistryDef
  private val viewPresenterRegistry = new StatesToViewPresenterDef

  implicit val applicationInstance = new Application[RoutingState](routingRegistry, viewPresenterRegistry, RootState)

  import io.udash.rpc._
  import com.example.rpc._

  val serverRpc = DefaultServerRPC[MainClientRPC, MainServerRPC](new RPCService)
  val pingPongRpc = DefaultServerRPC[MainClientRPC, PingPongServerRPC](new RPCService, serverUrl = "/atm2/")
}

object Init extends StrictLogging {
  import Context._

  def main(arg: Array[String]): Unit = {
    jQ(document).ready((_: Element) => {
      pingPongRpc.fPing(111) onComplete {
        case Success(response) => println(s"Pong22ss22($response)")
        case Failure(ex) => println(s"PongError222($ex)")
      }
      val appRoot = jQ("#application").get(0)

      if (appRoot.isEmpty) {
        logger.error("Application root element not found! Check your index.html file!")
      } else {
        applicationInstance.run(appRoot.get)

import scalacss.DevDefaults._
import scalacss.ScalatagsCss._
import scalatags.JsDom._
import com.example.styles.GlobalStyles
import com.example.styles.DemoStyles
import com.example.styles.partials.FooterStyles
import com.example.styles.partials.HeaderStyles
jQ(GlobalStyles.render[TypedTag[org.scalajs.dom.raw.HTMLStyleElement]].render).insertBefore(appRoot.get)
jQ(DemoStyles.render[TypedTag[org.scalajs.dom.raw.HTMLStyleElement]].render).insertBefore(appRoot.get)
jQ(FooterStyles.render[TypedTag[org.scalajs.dom.raw.HTMLStyleElement]].render).insertBefore(appRoot.get)
jQ(HeaderStyles.render[TypedTag[org.scalajs.dom.raw.HTMLStyleElement]].render).insertBefore(appRoot.get)
      }
    })
  }
}