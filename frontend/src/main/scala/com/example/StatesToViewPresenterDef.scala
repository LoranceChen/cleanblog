package com.example

import io.udash._
import com.example.views._

class StatesToViewPresenterDef extends ViewPresenterRegistry[RoutingState] {

  def matchStateToResolver(state: RoutingState): ViewPresenter[_ <: RoutingState] = state match {
    case RootState => RootViewPresenter
    case IndexState => IndexViewPresenter
    case BindingDemoState(urlArg) => BindingDemoViewPresenter(urlArg)
    case RPCDemoState => RPCDemoViewPresenter
    case DemoStylesState => DemoStylesViewPresenter
    case _ => ErrorViewPresenter
  }
}