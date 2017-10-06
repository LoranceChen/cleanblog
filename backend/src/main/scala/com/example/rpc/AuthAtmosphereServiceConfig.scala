//package com.example.rpc
//
//class AuthAtmosphereServiceConfig[ServerRPCType](
//                                                  localRpc: (ClientId, UserContext) => DefaultExposesServerRPC[ServerRPCType],
//                                                  auth: AuthService
//                                                ) extends AtmosphereServiceConfig[ServerRPCType] {
//  private val RPCName = "RPC"
//  private val UserContextName = "UserContext"
//  private val connections = new DefaultAtmosphereResourceSessionFactory
//  override def resolveRpc(resource: AtmosphereResource): ExposesServerRPC[ServerRPCType] =
//    connections.getSession(resource).getAttribute(RPCName)
//      .asInstanceOf[ExposesServerRPC[ServerRPCType]]
//  override def initRpc(resource: AtmosphereResource): Unit = synchronized {
//    val session = connections.getSession(resource)
//    val userContext = resolveUserContext(resource)
//    if (session.getAttribute(RPCName) == null) {
//      val rpc = localRpc(ClientId(resource.uuid()), userContext)
//      session.setAttribute(RPCName, rpc)
//    }
//  }
//  /** Ignore all unauthenticated calls */
//  override def filters: Seq[(AtmosphereResource) => Try[Any]] =
//    List(authenticationFilter)
//  override def onClose(resource: AtmosphereResource): Unit = {}
//  private def authenticationFilter(resource: AtmosphereResource): Try[Unit] = {
//    val session = connections.getSession(resource)
//    session.getAttribute(UserContextName) match {
//      case context: UserContext if context != null => Success(())
//      case _ => Failure(())
//    }
//  }
//  private def resolveUserContext(resource: AtmosphereResource): UserContext = {
//    val session = connections.getSession(resource)
//    session.getAttribute(UserContextName) match {
//      case context: UserContext if context != null => context
//      case _ =>
//        val context = auth.authenticateRequest(resource)
//        session.setAttribute(UserContextName, context)
//        context
//    }
//  }
//}